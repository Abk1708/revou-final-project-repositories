from flask import Flask, render_template

# Import the Blueprint from the feature module
from features.auth import auth_bp 
from features.news import news_bp 


app = Flask(__name__)

@app.route('/api')
def index():
    return render_template('index.html')

# Register the Blueprint with the app
app.register_blueprint(auth_bp, url_prefix='/api')  
app.register_blueprint(news_bp, url_prefix='/api')  

if __name__ == '__main__':
    app.run(debug=True)
