from flask import Flask, jsonify, request
import requests
import random

app = Flask(__name__)

def call_api(endpoint):
    try:
        url = f'https://berita-indo-api-next.vercel.app/{endpoint}'
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception for bad status code
        return response.json()
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}

@app.route('/api/get_news')
def get_news():
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
        endpoints = [
            'api/antara-news/tekno', 
            'api/tempo-news/tekno', 
            'api/republika-news'
            ]
        random.shuffle(endpoints)  # Randomize the order of the endpoints
        news_data = []
        for endpoint in endpoints:
            response_data = call_api(endpoint)
            if 'data' in response_data:  # Check if 'data' key exists
                # Filter news about keywords in params
                filtered_data = [newsItem for newsItem in response_data['data'] if any(keyword.lower() in newsItem['title'].lower() or (keyword.lower() in newsItem['description'].lower() if 'description' in newsItem else False) for keyword in params['title'])]
                news_data.extend(filtered_data)

        random.shuffle(news_data)  # Randomize the order of the news articles

        return jsonify(news_data)
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)})