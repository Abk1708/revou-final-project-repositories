from flask import flash, jsonify, redirect, request, url_for
from flask import current_app as app
from flask_login import login_required, login_user, logout_user
from extensions import login_manager, db, mail
from werkzeug.security import check_password_hash, generate_password_hash
from . import auth_bp as auth
from .forms import RegistrationForm
from .models import User, Gender
from datetime import datetime
from itsdangerous import URLSafeTimedSerializer
from flask_mail import Message
from flask_jwt import JWT, jwt_required, current_identity
import enum
import re


# Set the login view to redirect to for user login
login_manager.login_view = 'auth.login'

# Find specific user based on their user ID
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

def get_user_by_username(username):
    return User.query.filter_by(username=username).first()

# Check user credentials during login
def authenticate(username, password):
    user = get_user_by_username(username)
    if user and check_password_hash(user.password_hash, password):
        return user
    
def identity(payload):
    user_id = payload['identity']
    return User.query.get('user_id')


def init_jwt(application):
    global jwt
    jwt = JWT(application, authenticate, identity)

@auth.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    user = get_user_by_username(username)
        
    # check if the user is actually exist
    if not user or not check_password_hash(user.password_hash, password):
        return jsonify(success=False, message='Please check your login details and try again'), 400
    
    # if the above check passes, user has the right credentials
    login_user(user)
    return jsonify(success=True)


@auth.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        form = RegistrationForm(data=data)
        if form.validate():
            # existing user check moved here to provide specific error message
            user = get_user_by_username(data.get('username'))
            if user:
                return jsonify(success=False, message='Username already exists'), 400

            new_user = User(
                username=data['username'], 
                password_hash=generate_password_hash(data['password'], method='sha256'),
                first_name=data['first_name'],
                last_name=data['last_name'],
                birth_date=datetime.strptime(data['birth_date'], '%d-%m-%Y').date(),
                email=data['email'],
                gender=Gender[data['gender']]
            )
            new_user.set_password(data['password'])
            db.session.add(new_user)
            db.session.commit()

            # Email sending logic with debug information
            token = URLSafeTimedSerializer(app.config['SECRET_KEY']).dumps(data['email'], salt='email-confirm')
            msg = Message('Confirm Email', sender='tech.for.village@outlook.com', recipients=[data['email']])
            msg.body = f'Click on the link to confirm your email: {url_for("auth.confirm_email", token=token, _external=True)}'
            mail.send(msg)
            
            return jsonify(success=True, message='Account created successfully, please check your email to confirm your account'), 201
        else:
            # Collect form errors
            errors = []
            for field, messages in form.errors.items():
                for message in messages:
                    errors.append(f"{field}: {message}")
            return jsonify(success=False, message="Invalid form data", errors=errors), 400
    except Exception as e:
        app.logger.error(f"Exception occurred: {str(e)}")
        return jsonify(success=False, message=f"An error occurred: {str(e)}"), 500

        
@auth.route('/confirm/<token>')
def confirm_email(token):
    # deserialize the token sent by email
    try:
        s = URLSafeTimedSerializer(app.config['SECRET_KEY'])
        email = s.loads(token, salt='email-confirm')
    except:
        return jsonify(success=False, message='The confirmation link is invalid or has been expired.'), 400
    
    # check for an email address match from a User
    user = User.query.filter_by(email=email).first()
    
    if user.confirmed:
        return jsonify(success=False, message='Account already confirmed'), 400
    else: 
        user.confirmed = True
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return jsonify(success=True, message='You have confirmed your account. Thanks!'), 201

@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return jsonify(success=True, message='You have been logged out successfully')
