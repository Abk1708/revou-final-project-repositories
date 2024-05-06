from database import db
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy import Date, Enum
import enum

class Gender(enum.Enum):
    MALE = 1
    FEMALE = 2

class User(db.Model):
    __tablename__: 'User'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True)
    password_hash = db.Column(db.String(128))
    first_name = db.Column(db.String(64))
    last_name = db.Column(db.String(64))
    birth_date = db.Column(Date)
    email = db.Column(db.String(120), unique=True)
    gender = db.Column(Enum(Gender), nullable=False)
    confirmed = db.Column(db.Boolean, default=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    @property
    def is_active(self):
        return self.confirmed
    
    def get_id(self):
        return str(self.id) 
    
    @property
    def is_authenticated(self):
        # This should return True if the user is authenticated.
        return True