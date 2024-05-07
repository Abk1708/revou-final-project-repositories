from flask import Flask, render_template
from database import db
from features.auth.routes import login_manager, init_jwt
from features.auth import auth_bp 
from features.news.routes import news_bp  
from mail import mail

import os

app = Flask(__name__)
init_jwt(app)


# Set the secret key
app.config['SECRET_KEY'] = os.urandom(16)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://tfv_user:techforvillage@127.0.0.1/User'

# Configure Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465 # Standard port for SMTP over SSL
app.config['MAIL_USE_TLS'] = False # Because of using SSL, not STARTTLS
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_USERNAME'] = os.environ.get('noreply.techforvillage@gmail.com')
app.config['MAIL_PASSWORD'] = os.environ.get('Techforvillage123')

mail.init_app(app)

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
