from flask import app, flash, jsonify, redirect, request, url_for
from flask_login import LoginManager, login_required, login_user, logout_user
from werkzeug.security import check_password_hash, generate_password_hash
from . import auth_bp as auth
from .forms import RegistrationForm
from .models import User, Gender
from database import db
from datetime import datetime
from itsdangerous import URLSafeTimedSerializer
from flask_mail import Message
from app import mail
from flask_jwt import JWT, jwt_required, current_identity
import enum
import re


# Create an object of LoginManager for user authentication
login_manager = LoginManager()

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
    
jwt = JWT(app, authenticate, identity)

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
    form = RegistrationForm()
    if form.validate_on_submit():
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        first_name = data.get('first_name')
        last_name = data.get('last_name')
        birth_date_str = data.get('birth_date')
        birth_date = datetime.strptime(birth_date_str, '%d-%m-%Y').date()
        email = data.get('email')
        gender = Gender[data.get('gender')]
        
        user = get_user_by_username(username)    
        
    # if a username is already been used, redirect to signup page
    if user:
        return jsonify(success=False, message='Username already exists'), 400
    
    # create new user with the form data
    new_user = User(
        username=username, 
        password_hash=generate_password_hash(password, method='sha256'),
        first_name=first_name,
        last_name=last_name,
        birth_date=birth_date,
        email=email,
        gender=gender
    )
    
    # set the password using the set_password method
    new_user.set_password(password)
    
    try:
        # add the new user to the database
        db.session.add(new_user)
        db.session.commit()
    except Exception as e:
        return jsonify(success=False, message='Database error: {}'.format(str(e))), 500 

    # generate a confirmation token
    s = URLSafeTimedSerializer(app.config['SECRET_KEY'])
    token = s.dumps(email, salt='email-confirm')
    
    # send a confirmation email 
    msg = Message('Confirm Email', sender='noreply.techforvillage@gmail.com', recipients=[email])
    msg.body = 'Click on the link to confirm your email: {}'.format(url_for('auth.confirm_email', token=token, _external=True))
    mail.send(msg)
    
    return jsonify(success=True, message='Account created successfully, please check your email to confirm your account'), 201

@auth.route('/confirm/<token>')
def confirm_email(token):
    # deserialize the token sent by email
    try:
        s = URLSafeTimedSerializer(app.config['SECRET_KEY'])
        email = s.loads(token, salt='email-confirm', max_age=3600) # Max. 1 hour
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
    return jsonify(success=True)
