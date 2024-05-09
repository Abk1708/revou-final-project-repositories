from flask import Blueprint

service_bp = Blueprint('service_form', __name__)

from . import routes
