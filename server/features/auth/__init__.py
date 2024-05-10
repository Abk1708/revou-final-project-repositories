from flask import Blueprint

auth_bp = Blueprint('auth', __name__, template_folder='templates')

# Import the routes module to register the routes with the Blueprint
from . import routes