from flask import flash, jsonify, redirect, request, url_for
from flask_login import LoginManager, login_required, login_user, logout_user
from werkzeug.security import check_password_hash, generate_password_hash
from . import auth_bp as auth
from .models import User
from database import db


# Create an object of LoginManager for user authentication
login_manager = LoginManager()

# Set the login view to redirect to for user login
login_manager.login_view = 'auth.login'

# Find specific user based on their user ID
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@auth.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        
        user = User.query.filter_by(username=username).first()
        
        # check if the user is actually exist
        if not user or not check_password_hash(user.password_hash, password):
            return jsonify(success=False, message='Please check your login details and try again'), 400
        
        # if the above check passes, user has the right credentials
        login_user(user)
        return jsonify(success=True)

@auth.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        
        user = User.query.filter_by(username=username).first()
        
        # if a username is already been used, redirect to signup page
        if user:
            return jsonify(success=False, message='Username already exists'), 400
        
        # create new user with the form data
        new_user = User(username=username, password_hash=generate_password_hash(password, method='sha256'))
        
        # add the new user to the database
        db.session.add(new_user)
        db.session.commit()
        
        return jsonify(success=True, message='Account created successfully'), 201
    

@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return jsonify(success=True)
