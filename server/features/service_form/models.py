from extensions import db
from datetime import datetime
from sqlalchemy import Dialect, Text, Date, Enum, DateTime, Time
import enum
import sqlalchemy.types as types

# Turn stored string to lowercase
class LowerCaseString(types.TypeDecorator):
    
    impl = types.String
    
    def process_bind_param(self, value, dialect):
        return value.lower()

class Service(enum.Enum):
    TRACTOR = 1
    IRRIGATION_SYSTEM = 2
    GREENHOUSE_CULTIVATION = 3
    SOLAR_PANEL = 4
    # SERVICE_5 = 5
    # SERVICE_6 = 6

class Service_Form(db.Model):
    __tablename__: 'Service_Form'
    id = db.Column(db.Integer, primary_key=True)
    fullname = db.Column(db.String(32), unique=True, nullable=False)
    village_name = db.Column(db.String(32), nullable=False)
    # services = db.Column(db.String(20))
    services = db.Column(Enum(Service), nullable=False)
    address = db.Column(Text, nullable=False)
    reservation = db.Column(Date, nullable=False)
    description = db.Column(Text)
    created_at = db.Column(DateTime, default=datetime.now)
    updated_at = db.Column(DateTime, default=datetime.now, onupdate=datetime.now)
    
    @property
    def get_id(self):
        return str(self.id) 