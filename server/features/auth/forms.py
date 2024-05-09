from flask_wtf import FlaskForm
from wtforms import DateField, StringField, PasswordField, SubmitField, SelectField
from wtforms.validators import DataRequired, Length, EqualTo, Email, ValidationError
from datetime import datetime
import re
from .models import Gender, User


class MyDateField(StringField):
    def process_formdata(self, valuelist):
        if valuelist:
            date_str = ' '.join(valuelist)
            try:
                self.data = datetime.strptime(date_str, '%d-%m-%Y').date()
            except ValueError:
                self.data = None
                raise ValueError('Invalid date format. Use DD-MM-YYYY.')
class RegistrationForm(FlaskForm):
    
    class Meta:
        csrf = False # Disable CSRF protection
    
    username = StringField('Username', validators=[DataRequired(), Length(min=4, max=20)])
    password = PasswordField('Password', validators=[DataRequired()])
    first_name = StringField('First Name', validators=[DataRequired()])
    last_name = StringField('Last Name', validators=[DataRequired()])
    birth_date = MyDateField('Birth Date', validators=[DataRequired()])
    email = StringField('Email', validators=[DataRequired(), Email()])
    gender = SelectField('Gender', choices=[(Gender.MALE.name, 'Male'), (Gender.FEMALE.name, 'Female')], validators=[DataRequired()])

submit = SubmitField('Sign Up') 

def validate_password(self, password):
    if len(password.data) < 6:
        raise ValidationError('Password must be at least 6 characters long.')
    if not re.search(r'[A-Z]', password.data):
        raise ValidationError('Password must contain at least one uppercase letter.')
    if not re.search(r'\d', password.data):
        raise ValidationError('Password must contain at least one number.')
    
# def validate_email(self, email):
#     user = User.query.filter_by(email=email.data).first()
#     if user:
#         raise ValidationError('That email is taken. Please choose a different one.')