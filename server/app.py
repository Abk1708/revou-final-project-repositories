from flask import Flask, render_template
from database import db
from features.auth.routes import login_manager
from features.news.routes import news_bp  # Import the Blueprint from the feature module

import os

# Import the Blueprint from the feature module
from features.auth import auth_bp 

app = Flask(__name__)

# Set the secret key
app.config['SECRET_KEY'] = os.urandom(16)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://tfv_user:techforvillage@localhost/User'

db.init_app(app)
login_manager.init_app(app)

@app.route('/api')
def index():
    return render_template('index.html')

app.register_blueprint(auth_bp, url_prefix='/auth')  
app.register_blueprint(news_bp, url_prefix='/news')  

if __name__ == '__main__':
    app.run(debug=True)
