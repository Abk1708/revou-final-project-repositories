from functools import wraps
from flask import current_app, flash, jsonify, redirect, request, url_for, render_template_string
from flask import current_app as app
from flask_login import current_user, login_required, login_user, logout_user
from extensions import login_manager, db, mail
from werkzeug.security import check_password_hash, generate_password_hash
from . import auth_bp as auth
from .forms import RegistrationForm
from .models import User, Gender
from datetime import datetime
from itsdangerous import URLSafeTimedSerializer, SignatureExpired, BadSignature
from mail import send_verification_email
from flask_mail import Message
from flask_jwt import JWT, jwt_required, current_identity
import logging
import enum
import re

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Set the login view to redirect to for user login
login_manager.login_view = 'auth.login'

# Find specific user based on their user ID
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

def get_user_by_username(username):
    return User.query.filter_by(username=username).first()

# Token verification function
def verify_token(token):
    s = URLSafeTimedSerializer(app.config['SECRET_KEY'])
    try:
        data = s.loads(token, salt='auth-token'), 36000 
        return User.query.get(data['user_id'])
    except (SignatureExpired, BadSignature):
        return None
    
# Decorator to protect routes with token authentication
def token_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return jsonify(success=False, message="Missing token."), 403
        try:
            token = auth_header.split()[1]
        except IndexError:
            return jsonify(success=False, message="Bearer token malformed."), 400
        user = verify_token(token)
        if not user:
            return jsonify(success=False, message="Invalid or expired token."), 401
        return f(user, *args, **kwargs)
    return decorated_function

# Example protected route using the token_required decorator
@auth.route('/protected')
@token_required
def protected_route(current_user):
    return jsonify(success=True, message=f"Welcome {current_user.username}!")

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
    logger.info(f"Database URI: {app.config['SQLALCHEMY_DATABASE_URI']}")
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    user = get_user_by_username(username)
        
    # check if the user is actually exist
    if not user or not check_password_hash(user.password_hash, password):
        print(user) # debug
        return jsonify(success=False, message='Please check your login details and try again'), 400
    
    if not user.is_active:
        return jsonify(success=False, message='Please confirm your email before logging in.'), 403
        
    # if the above check passes, user has the right credentials, 
    # generate token using itsdangerous
    s = URLSafeTimedSerializer(app.config['SECRET_KEY'])
    token = s.dumps({'user_id': user.id}, salt='auth_token')
    login_user(user)
    return jsonify(success=True, token=token)


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
                password_hash=generate_password_hash(data['password']),  # Ensure password is hashed
                first_name=data['first_name'],
                last_name=data['last_name'],
                birth_date=datetime.strptime(data['birth_date'], '%d-%m-%Y').date(),
                email=data['email'],
                gender=Gender[data['gender']]
            )
            db.session.add(new_user)
            db.session.commit()
            
            # Generate verification token and link
            serializer = URLSafeTimedSerializer(current_app.config['SECRET_KEY'])
            token = serializer.dumps(new_user.email, salt='email-confirm')
            verification_link = url_for('auth.confirm_email', token=token, _external=True)

            # Send verification email
            send_verification_email(new_user.email, verification_link)            
            
            return jsonify(success=True, message='Account created successfully, please check your email to confirm your account'), 201
        else:
            errors = [{'field': field, 'message': msg} for field, messages in form.errors.items() for msg in messages]
            return jsonify(success=False, message="Invalid form data", errors=errors), 400
    except Exception as e:
        current_app.logger.error(f"Exception occurred: {str(e)}")
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
    print(user)
    
    if user.confirmed:
        return jsonify(success=False, message='Account already confirmed'), 400
    else: 
        user.confirmed = True
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return jsonify(success=True, message='You have confirmed your account. Thanks!'), 201
    
@auth.route('/delete_account', methods=['DELETE'])  
@login_required
def delete_account():
    user = current_user  
    
    if not user:
        return jsonify(success=False, message="User not found."), 404
    
    db.session.delete(user)
    db.session.commit()
    logout_user() 
    
    return jsonify(success=True, message="Your account has been deleted successfully.")

@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return jsonify(success=True, message='You have been logged out successfully')
