"""Forms for Flask app."""

from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField, SelectField, TextAreaField
from wtforms.validators import InputRequired, Optional, URL, NumberRange


class AddPetForm(FlaskForm):
    """Form for adding pets."""

    name = StringField("Pet's name", validators=[InputRequired(message="Name cannot be blank")])
    species = SelectField("Pet's specie", choices=[('cat', 'Cat'),  ('dog', 'Dog'),  ('porcupine', 'Porcupine')],
                                        validators=[InputRequired(message="Species cannot be blank")])
    photo_url = StringField("Pet's photo",  validators=[Optional(), URL()])
    age = IntegerField("Pet's age", validators=[Optional(), NumberRange(min=0, max=30)])
    notes = TextAreaField("Notes", validators=[Optional()])

class EditPetForm(FlaskForm):
    """Form for editing an existing pet."""

    photo_url = StringField("Photo URL", validators=[Optional(), URL()])
    notes = TextAreaField("Notes", validators=[Optional()])
    available = BooleanField("Is Pet Available?")