from flask import Flask
from features.news.routes import news_bp  # Import the Blueprint from the feature module

app = Flask(__name__)
app.register_blueprint(news_bp)  # Register the Blueprint with the app

if __name__ == '__main__':
    app.run(debug=True)
