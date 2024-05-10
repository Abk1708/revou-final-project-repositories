from flask import jsonify, request
from flask_login import login_required, current_user
from . import service_bp as service
from .forms import ReservationForm
from .models import Service_Form, Service
from extensions import login_manager, db, mail
from datetime import datetime
from flask_jwt import JWT, jwt_required, current_identity
    
@service.route('/ourService/dashboard', methods=['POST'])
@login_required
@jwt_required
def post_form():
    bearer_token = request.headers.get('token')
    if not bearer_token:
        return jsonify({"error": "Account hasn't verified"}), 404
    
    data = request.get_json()
    new_reserver = Service_Form(
            fullname=data['fullname'],
            village_name=data['village_name'],
            services=Service[data['services']],
            address=data['address'],
            reservation = datetime.strptime(data['reservation'], '%Y-%m-%d').date(),
            description=data['description']
        )
    try:
        # add the new user to the database
        db.session.add(new_reserver)
        db.session.commit()
        return jsonify(success=True, message='Thank you for your order. You will be contacted shortly by our agent'), 201
    except Exception as e:
        return jsonify(success=False, message='Database error: {}'.format(str(e))), 500 
    
@service.route('/costumer', methods=['GET'])
@login_required
# @jwt_required
def fetch_reservation_information():
    # reservation = Service_Form.query.get(id).all()
    reservation = Service_Form.query.all()
    # if not reservation:
    #     return jsonify({"error": "Account not found"}), 404
        
    # reservation_data = [reservation.to_dict() for reservation in reservations]
        
    # return {'reservations': reservation_data}, 200
    
    reservation_list = []
    for reserve in reservation:
        reservation_data = {
            'fullname': reserve.fullname,
            'village_name': reserve.village_name,
            'services': reserve.services.name
        }
        reservation_list.append(reservation_data)
        print(reservation_list)
    
    return jsonify(success = True, message = "Success fetching all reservations", data = reservation_list), 201

# @service.route("/costumer/<fullname>", methods=['GET'])
# # @login_required
# # @jwt_required
# def fetch_reservation_information_by_bearer_token(fullname):
#     reservation = Service_Form.query.get(fullname)
#     bearer_token = request.headers.get('Token')
#     if not reservation:
#         return jsonify({"error": "Reservation not found"}), 404
#     # if reservation.id != current_user.id:
#     #     return jsonify({"error": "Unauthorized"}), 403
    
#     reservation_data = {
#             'fullname': reservation.fullname,
#             'village_name': reservation.village_name,
#             'services': reservation.services.name
#         }
    
#     return jsonify({"message": "Success fetching specific reservation", "reservation": reservation_data})

# @service.route("/costumer/<fullname>", methods=['DELETE'])
# # @login_required
# def cancel_reservation(fullname):
#     # user_id = current_user.id
#     # connection = engine.connect()
#     # Session = sessionmaker(connection)
#     # session = Session()
#     # session.begin()
    
#     reservation = Service_Form.query.get(fullname)
#     if not reservation:
#         return jsonify({"error": "Reservation not found"}), 404

#     try: 
#         db.session.delete(reservation)
#         db.session.commit()
#         return jsonify({'message': 'Account deleted successfully'}), 200
#     except Exception as e:
#         db.session.rollback()
#         return jsonify({"error": str(e)}), 500
