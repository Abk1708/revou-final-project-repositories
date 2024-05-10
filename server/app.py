from dotenv import load_dotenv
load_dotenv()

import os
from flask import Flask, render_template
from extensions import db, mail, login_manager, SQLAlchemy
from features.auth.routes import init_jwt
from features.auth import auth_bp 
from features.news.routes import news_bp
from features.service_form import service_bp
import logging
from logging.handlers import RotatingFileHandler

app = None

def create_app():
    # global app // remove if not needed
    app = Flask(__name__)
    app.logger.setLevel(logging.INFO)  # Setting the log level to INFO

    # Set up the logging handler
    if not app.debug:
        file_handler = RotatingFileHandler('app_logs.log', maxBytes=1024 * 1024 * 100, backupCount=10)
        file_handler.setFormatter(logging.Formatter(
            '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'
        ))
        file_handler.setLevel(logging.INFO)
        app.logger.addHandler(file_handler)

    # Application configuration
    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', os.urandom(16))
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('MYSQL_URL')
    app.config['MAIL_SERVER'] = 'smtp-mail.outlook.com'
    app.config['MAIL_PORT'] = 587
    app.config['MAIL_USE_TLS'] = True
    app.config['MAIL_USE_SSL'] = False
    app.config['MAIL_USERNAME'] = os.environ.get('MAIL_USERNAME', 'tech.for.village@outlook.com')
    app.config['MAIL_PASSWORD'] = os.environ.get('MAIL_PASSWORD', 'Techforvillage123')

    # Initialize extensions
    mail.init_app(app)
    db.init_app(app)
    with app.app_context():
        db.create_all()
    login_manager.init_app(app)

    # Blueprints
    app.register_blueprint(auth_bp, url_prefix='/auth')  
    app.register_blueprint(news_bp, url_prefix='/news')
    app.register_blueprint(service_bp, url_prefix='/service')

    @app.route('/api')
    def index():
        return render_template('index.html')

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)