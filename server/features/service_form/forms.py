from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, SelectField, DateField, TextAreaField
from wtforms.validators import DataRequired, Length
import re
from .models import Service, Service_Form
from datetime import datetime

class MyDateField(StringField):
    def process_formdata(self, valuelist):
        if valuelist:
            date_str = ' '.join(valuelist)
            try:
                self.data = datetime.strptime(date_str, '%Y-%m-%d').date()
            except ValueError:
                self.data = None
                raise ValueError('Invalid date format. Use YYYY-MM-DD.')

class ReservationForm(FlaskForm):
    fullname = StringField('Full Name', validators=[DataRequired(), Length(min=4, max=20)])
    village_name = StringField('Village Name', validators=[DataRequired(), Length(min=3, max=25)])
    # services = SelectField('Services', choices=[('sv1', 'Service 1'), ('sv2', 'Service 2'), ('sv3', 'Service 3'), ('sv4', 'Service 4'), ('sv5', 'Service 5'), ('sv6', 'Service 6')])
    services = SelectField('Services', choices=[(Service.TRACTOR.name, 'Tractor'), (Service.IRRIGATION_SYSTEM.name, 'Irrigation System'), (Service.GREENHOUSE_CULTIVATION.name, 'Greenhouse Cultivation'), (Service.SOLAR_PANEL.name, 'Solar Panel')])
    address = TextAreaField('Village Address', validators=[DataRequired()])
    reservation = MyDateField('Reservation', validators=[DataRequired()])
    description = TextAreaField('Description', validators=[])

submit = SubmitField('Confirm Reservation')