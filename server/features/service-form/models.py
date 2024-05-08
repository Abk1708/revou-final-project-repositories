from database import db
from sqlalchemy import Text, Date
from sqlalchemy import Date, Enum
import enum

class Service(enum.Enum):
    SERVICE_1 = 1
    SERVICE_2 = 2
    SERVICE_3 = 3
    SERVICE_4 = 4
    SERVICE_5 = 5
    SERVICE_6 = 6

class Service_Form(db.Model):
    __tablename__: 'Service_Form'
    id = db.Column(db.Integer, primary_key=True)
    fullname = db.Column(db.String(32), unique=True)
    village_name = db.Colum(db.String(32))
    # services = db.Column(db.String(20))
    services = db.Column(Enum(Service), nullable=False)
    address = db.Column(Text)
    reservation = db.Column(Date)
    description = db.Column(Text)
    
    @property
    def get_id(self):
        return str(self.id) 