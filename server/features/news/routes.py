from flask import Blueprint, jsonify
import requests
import random

# Create a Blueprint for the news feature
news_bp = Blueprint('news', __name__)

# Function to call an API endpoint and return the response data
def call_api(endpoint):
    try:
        # Construct the full URL for the API endpoint
        url = f'https://berita-indo-api-next.vercel.app/{endpoint}'
        # Send a GET request to the API endpoint
        response = requests.get(url)
        # Raise an exception if the response status code indicates an error
        response.raise_for_status()  
        # Return the response data as a Python object
        return response.json()
    except requests.exceptions.RequestException as e:
        # If an error occurs, return a dictionary with an "error" key
        return {"error": str(e)}

# Define a route for getting news
@news_bp.route('/api/get_news')
def get_news():
    # Define the keywords to filter the news by
    params = {
        "title": [
            "desa digital", "smart village", "teknologi pedesaan",
            "infrastruktur digital desa", "internet pedesaan", "akses internet desa",
            "Kemkominfo desa digital", "Kominfo pedesaan",
            "berita daerah", "berita lokal", "berita regional",  
            "pemerintah daerah", "kebijakan daerah", "perkembangan daerah",
            "teknologi", "digital", "internet", "daerah", "desa", "pedesaan", "berita", "pemerintah", "kebijakan", "perkembangan"  # Additional keywords
        ],
    }

    try:
        # Define the API endpoints to get news from
        endpoints = [
            'api/antara-news/tekno', 
            'api/tempo-news/tekno', 
            'api/republika-news'
            ]
        # Randomize the order of the endpoints
        random.shuffle(endpoints)  
        news_data = []
        for endpoint in endpoints:
            # Call the API endpoint and get the response data
            response_data = call_api(endpoint)
            # If the response data contains a "data" key
            if 'data' in response_data:  
                # Filter the news data by the keywords
                filtered_data = [newsItem for newsItem in response_data['data'] if any(keyword.lower() in newsItem['title'].lower() or (keyword.lower() in newsItem['description'].lower() if 'description' in newsItem else False) for keyword in params['title'])]
                # Add the filtered data to the news data
                news_data.extend(filtered_data)

        # Randomize the order of the news articles
        random.shuffle(news_data)  

        # Return the news data as a JSON response
        return jsonify(news_data)
    except requests.exceptions.RequestException as e:
        # If an error occurs, return a JSON response with an "error" key
        return jsonify({"error": str(e)})
