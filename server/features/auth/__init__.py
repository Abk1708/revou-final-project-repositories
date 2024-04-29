from flask import Blueprint

auth_bp = Blueprint('auth', __name__)

# Import the routes module to register the routes with the Blueprint
from . import routes