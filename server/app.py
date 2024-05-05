from flask import Flask, render_template
from database import db
from features.auth.routes import login_manager
from features.auth import auth_bp 
from features.news.routes import news_bp  
from flask_mail import Mail

import os

app = Flask(__name__)

# Set the secret key
app.config['SECRET_KEY'] = os.urandom(16)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://tfv_user:techforvillage@localhost/User'

# Configure Flask-Mail
## Replace 'smtp.googlemail.com', 587, os.environ.get('EMAIL_USER'), and os.environ.get('EMAIL_PASS') with actual SMTP server details and credentials.
app.config['MAIL_SERVER'] = 'smtp.googlemail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.environ.get('EMAIL_USER')
app.config['MAIL_PASSWORD'] = os.environ.get('EMAIL_PASS')

mail = Mail(app)

db.init_app(app)
with app.app_context():
    db.create_all()
    
login_manager.init_app(app)

@app.route('/api')
def index():
    return render_template('index.html')

app.register_blueprint(auth_bp, url_prefix='/auth')  
app.register_blueprint(news_bp, url_prefix='/news')  

if __name__ == '__main__':
    app.run(debug=True)
