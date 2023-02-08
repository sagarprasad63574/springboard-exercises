"""Blogly application."""

from flask import Flask, request, redirect, render_template
from models import db, connect_db, User, Post

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
connect_db(app)
db.create_all()

from flask_debugtoolbar import DebugToolbarExtension
app.config['SECRET_KEY'] = "SECRET!"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

@app.route("/")
def list_of_users():
    """List users."""
    return redirect("/users")


@app.route("/users")
def list_users():
    """List users."""

    users = User.query.all()
    return render_template("users.html", users=users)

@app.route("/users/new")
def new_user():
    """Show user form."""
    return render_template("user_form.html")

@app.route("/users/new", methods=["POST"])
def add_new_user():
    """Add a new user."""

    first_name = request.form['first_name']
    last_name = request.form['last_name']
    image_url = request.form['image_url']
    if image_url == "": 
        image_url = None

    user = User(first_name=first_name, last_name=last_name, image_url=image_url)
    db.session.add(user)
    db.session.commit()

    return redirect("/users")

@app.route("/users/<int:user_id>")
def show_user_details(user_id):
    """Show user details."""

    user = User.query.get_or_404(user_id)
    posts = Post.query.filter_by(user=user_id)
    return render_template("user_details.html", user=user, posts=posts)

@app.route("/users/<int:user_id>/edit")
def user_edit_form(user_id):
    """Show user edit form."""
    user = User.query.get_or_404(user_id)
    return render_template("user_edit.html", user=user)

@app.route("/users/<int:user_id>/edit", methods=["POST"])
def edit_user_details(user_id):
    """Edit a user info."""

    first_name = request.form['first_name']
    last_name = request.form['last_name']
    image_url = request.form['image_url']
    if image_url == "": 
        image_url = None

    user = User.query.get_or_404(user_id)
    user.first_name = first_name
    user.last_name = last_name
    user.image_url = image_url

    db.session.add(user)
    db.session.commit()

    return redirect("/users")


@app.route("/users/<int:user_id>/delete", methods=["POST"])
def delete_user(user_id):
    """Delete a user info."""

    User.query.filter_by(id=user_id).delete()
    db.session.commit()

    return redirect("/users")

@app.route("/users/<int:user_id>/posts/new")
def post_form(user_id):
    """Show post form."""
    user = User.query.get_or_404(user_id)
    return render_template("post_form.html", user=user)

@app.route("/users/<int:user_id>/posts/new", methods=["POST"])
def add_new_post(user_id):
    """Add a new post for a user."""

    title = request.form['title']
    content = request.form['content']
    if content == "": 
        content = None

    post = Post(title=title, content=content, user=user_id)
    db.session.add(post)
    db.session.commit()

    return redirect(f"/users/{user_id}")

@app.route("/posts/<int:post_id>")
def show_post_details(post_id):
    """Show post details from a user."""

    post = Post.query.get_or_404(post_id)
    return render_template("post_details.html", post=post)

@app.route("/posts/<int:post_id>/edit")
def post_edit_form(post_id):
    """Show post edit form."""

    post = Post.query.get_or_404(post_id)
    return render_template("post_edit.html", post=post)

@app.route("/posts/<int:post_id>/edit", methods=["POST"])
def edit_post_details(post_id):
    """Edit a post information from user."""

    title = request.form['title']
    content = request.form['content']
    if content == "": 
        content = None


    post = Post.query.get_or_404(post_id)
    post.title = title
    post.content = content

    db.session.add(post)
    db.session.commit()

    return redirect(f"/posts/{post_id}")

@app.route("/posts/<int:post_id>/delete", methods=["POST"])
def delete_post(post_id):
    """Delete a post from user."""

    user_id = Post.query.filter_by(id=post_id).one().user_info.id

    Post.query.filter_by(id=post_id).delete()
    db.session.commit()

    return redirect(f"/users/{user_id}")