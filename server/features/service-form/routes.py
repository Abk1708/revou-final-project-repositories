from flask import app, flash, jsonify, redirect, request, url_for
from flask_login import LoginManager, login_required, current_user
from . import service_bp as service
from .forms import ReservationForm
from .models import Service_Form, Service
from database import db
from datetime import datetime
from itsdangerous import URLSafeTimedSerializer
from flask_mail import Message
from mail import mail
from flask_jwt import JWT, jwt_required, current_identity
import enum
import re

login_manager = LoginManager

@login_manager.user_loader
def load_reservation(reservation_id):
    return Service_Form.query.get(int(reservation_id))

def get_reservation_by_fullname(fullname):
    return Service_Form.query.filter_by(fullname=fullname).first()

jwt = None

def init_jwt(application):
    global jwt
    jwt = JWT(application, authenticate, identity)
    
@service.route('/ourService', methods=['POST'])
@login_required
def register():
    data = request.get_json()
    form = ReservationForm(data=data)
    if form.validate():
        fullname = data.get('fullname')
        village_name = data.get('village_name')
        service = Service(data.get('services'))
        address = data.get('address')
        reservation_str = data.get('reservation')
        reservation = datetime.strptime(reservation_str, '%Y-%m-%d').date()
        description = data.get('description')
        
        reserver = get_reservation_by_fullname(fullname)   
        
        # create new reservation with the form data
        new_reserver = Service(
            fullname=fullname,
            village_name=village_name,
            service=service,
            address=address,
            reservation=reservation,
            description=description
        )
        
        try:
            # add the new user to the database
            db.session.add(new_reserver)
            db.session.commit()
        except Exception as e:
            return jsonify(success=False, message='Database error: {}'.format(str(e))), 500 

    
@service.route('/ourCostumer', methods=['GET'])
@login_required
def fetch_reservation_information():
    data = request.get_json()
    reservation = Service_Form.query.get(id).all()
    if not reservation:
        return jsonify({"error": "Account not found"}), 404
    
    reservation_list = []
    for reserve in reservation:
        reservation_data = {
            'id': reserve.id,
            'fullname': reserve.fullname,
            'village_name': reserve.village_name,
            'service': reserve.account_number
        }
    reservation_list.append(reservation_data)
    
    return jsonify({"message": "Success fetching all reservations", "reservations": account_list})

@service.route("/ourCostumer/<int:id>", methods=['GET'])
@login_required
def fetch_reservation_information_by_id(id):
    reservation = Service_Form.query.get(id)
    if not reservation:
        return jsonify({"error": "Account not found"}), 404
    if reservation.id != current_user.id:
        return jsonify({"error": "Unauthorized"}), 403
    
    reservation_data = {
            'id': reservation.id,
            'fullname': reservation.fullname,
            'village_name': reservation.village_name,
            'service': reservation.account_number
        }
    
    return jsonify({"message": "Success fetching specific reservation", "reservation": reservation_data})