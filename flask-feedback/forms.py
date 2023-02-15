from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import InputRequired, Length

class RegisterForm(FlaskForm):
    username = StringField("Username", validators=[InputRequired(message="Username cannot be blank"), Length(min=1, max=20)])
    password = PasswordField("Password", validators=[InputRequired(message="Password cannot be blank")])
    email = StringField("Email", validators=[InputRequired(message="Email cannot be blank"), Length(max=50)])
    first_name = StringField("First name", validators=[InputRequired(message="First name cannot be blank"), Length(max=30)])
    last_name = StringField("Last name", validators=[InputRequired(message="Last name cannot be blank"), Length(max=30)])

class LoginForm(FlaskForm):
    username = StringField("Username", validators=[InputRequired(message="Username cannot be blank"), Length(min=1, max=20)])
    password = PasswordField("Password", validators=[InputRequired(message="Password cannot be blank")])

class FeedbackForm(FlaskForm):
    title = StringField("Title", validators=[InputRequired(), Length(max=100)])
    content = StringField("Content", validators=[InputRequired()])

class DeleteForm(FlaskForm):
    """Delete form -- this form is intentionally blank."""