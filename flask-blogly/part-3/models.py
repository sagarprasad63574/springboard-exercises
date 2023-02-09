"""Models for Blogly."""

from flask_sqlalchemy import SQLAlchemy
import datetime

db = SQLAlchemy()

def connect_db(app):
    """Connect to database."""

    db.app = app
    db.init_app(app)


class User(db.Model):
    """User."""

    __tablename__ = "users"

    id = db.Column(db.Integer,
                   primary_key=True,
                   autoincrement=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    image_url = db.Column(db.String(200), nullable=False, default="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png")

    def __repr__(self):
        """Show info about user."""

        u = self
        return f"<User {u.id} {u.first_name} {u.last_name} {u.image_url}>"

class Post(db.Model):
    """Post."""

    __tablename__ = "posts"

    id = db.Column(db.Integer,
                   primary_key=True,
                   autoincrement=True)
    title = db.Column(db.String(50), nullable=False)
    content = db.Column(db.Text, default="New post, add details")
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    user = db.Column(db.Integer, db.ForeignKey('users.id'))

    user_info = db.relationship( 'User', backref='user_posts')

    post_tags = db.relationship('PostTag', backref='post')

    tags = db.relationship('Tag', secondary='posts_tags', backref='posts')


class Tag(db.Model):
    """Tag."""

    __tablename__ = "tags"

    id = db.Column(db.Integer, primary_key = True, autoincrement=True)
    name = db.Column(db.Text, nullable=False, unique=True)

    post_tags = db.relationship('PostTag', backref='tag')

class PostTag(db.Model):
    """Mapping of an post to a tag."""

    __tablename__ = "posts_tags"

    post_id = db.Column(db.Integer, 
                        db.ForeignKey("posts.id"), 
                        primary_key=True)
    tag_id = db.Column(db.Integer,
                        db.ForeignKey("tags.id"),
                        primary_key=True)