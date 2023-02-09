"""Blogly application."""

from flask import Flask, request, redirect, render_template
from models import db, connect_db, User, Post, Tag, PostTag

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

    user = User.query.get(user_id)
    for post in user.user_posts:        
        for tag in post.tags:
            PostTag.query.filter_by(tag_id=tag.id).delete()
            db.session.commit()
        Post.query.filter_by(id=post.id).delete()
        db.session.commit()

    User.query.filter_by(id=user_id).delete()
    db.session.commit()

    return redirect("/users")

@app.route("/users/<int:user_id>/posts/new")
def post_form(user_id):
    """Show post form."""
    user = User.query.get_or_404(user_id)
    tags = Tag.query.all()
    return render_template("post_form.html", user=user, tags=tags)

@app.route("/users/<int:user_id>/posts/new", methods=["POST"])
def add_new_post(user_id):
    """Add a new post for a user."""

    title = request.form['title']
    content = request.form['content']
    if content == "": 
        content = None

    tag_ids = [int(num) for num in request.form.getlist("tags")]
    tags = Tag.query.filter(Tag.id.in_(tag_ids)).all()

    post = Post(title=title, content=content, user=user_id, tags=tags)
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
    tags = Tag.query.all()
    return render_template("post_edit.html", post=post, tags=tags)

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

    tag_ids = [int(num) for num in request.form.getlist("tags")]
    post.tags = Tag.query.filter(Tag.id.in_(tag_ids)).all()

    db.session.add(post)
    db.session.commit()

    return redirect(f"/posts/{post_id}")

@app.route("/posts/<int:post_id>/delete", methods=["POST"])
def delete_post(post_id):
    """Delete a post from user."""

    user_id = Post.query.filter_by(id=post_id).one().user_info.id

    post = Post.query.get(post_id)
    for tag in post.tags:
        PostTag.query.filter_by(tag_id=tag.id).delete()
        db.session.commit()

    Post.query.filter_by(id=post_id).delete()
    db.session.commit()

    return redirect(f"/users/{user_id}")

@app.route("/tags")
def list_tags():
    """List tags."""

    tags = Tag.query.all()
    return render_template("tags.html", tags=tags)

@app.route("/tags/new")
def new_tag():
    """Show tag form."""
    return render_template("tag_form.html")

@app.route("/tags/new", methods=["POST"])
def add_new_tag():
    """Add a tag user."""

    name = request.form['tag_name']

    tag = Tag(name=name)
    db.session.add(tag)
    db.session.commit()

    return redirect("/tags")

@app.route("/tags/<int:tag_id>")
def show_tag_details(tag_id):
    """Show tag details."""

    tag = Tag.query.get_or_404(tag_id)
    return render_template("tag_details.html", tag=tag)

@app.route("/tags/<int:tag_id>/edit")
def tag_edit_form(tag_id):
    """Show tag edit form."""
    tag = Tag.query.get_or_404(tag_id)
    return render_template("tag_edit.html", tag=tag)

@app.route("/tags/<int:tag_id>/edit", methods=["POST"])
def edit_tag_details(tag_id):
    """Edit a tag info."""

    name = request.form['tag_name']

    tag = Tag.query.get_or_404(tag_id)
    tag.name = name

    db.session.add(tag)
    db.session.commit()

    return redirect("/tags")


@app.route("/tags/<int:tag_id>/delete", methods=["POST"])
def delete_tag(tag_id):
    """Delete a tag info."""

    Tag.query.filter_by(id=tag_id).delete()
    db.session.commit()

    return redirect("/tags")