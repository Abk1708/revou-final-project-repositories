from flask import Blueprint, jsonify
import requests
from concurrent.futures import ThreadPoolExecutor
import random

# Create a Blueprint for the news feature
news_bp = Blueprint('news', __name__)

# Function to call an API endpoint and return the response data
def call_api(endpoint):
    try:
        url = f'https://berita-indo-api-next.vercel.app/{endpoint}'
        response = requests.get(url)
        response.raise_for_status()  
        return response.json()
    except requests.HTTPError as e:
        return {"error": str(e)}

# Define a route for getting news
@news_bp.route('/get_news')
def get_news():
    # Define the keywords to filter the news by
    params = {
        "title": [
            "desa digital", "smart village", "teknologi pedesaan",
            "infrastruktur digital desa", "internet pedesaan", "akses internet desa",
            "Kemkominfo", "Kementerian Komunikasi dan Informasi",
            "cloud", "digital", "infrastruktur", "internet", "penemuan", "perangkat", "perkembangan", "teknologi", # Additional keywords
        ],
    }

    try:
        # Define the API endpoints to get news from
        endpoints = [
            'api/antara-news/tekno', 
            'api/tempo-news/tekno', 
            'api/tribun-news/zones/techno',
            ]
        
        # List of all zones in Tribun News
        tribun_news_zones = [
            'Jabar', 'Mataram', 'Medan', 'Padang', 'Flores', 'Ambon', 'Bogor', 'Pantura',
            'Palembang', 'Pekanbaru', 'Banjarmasin', 'Pontianak', 'Papua', 'Cirebon', 'Jogja',
            'Bangka', 'Jambi', 'Palu', 'Papuabarat', 'Banten', 'Jateng', 'Aceh', 'Sumsel', 'Kalteng',
            'Makassar', 'Solo', 'Belitung', 'Kaltara', 'Lombok', 'Banyumas', 'Sultra', 'Babel', 'Kupang',
            'Ternate', 'Manado'
            ]
        
        # Randomize the order of the endpoints
        random.shuffle(endpoints)  
        
        # Use ThreadPoolExecutor to run API calls concurrently
        tasks = []
        with ThreadPoolExecutor() as executor:
            for endpoint in endpoints:
                # Create a list of endpoints or zones to iterate over
                iterate_over = tribun_news_zones if 'zones' in endpoint else [None]
                
                for item in iterate_over:
                    # Replace 'zones' with the actual zone if it exists
                    api_endpoint = endpoint.replace('zones', item) if item else endpoint
                    tasks.append(executor.submit(call_api, api_endpoint))
            responses = [task.result() for task in tasks]
                
        # Process the responses        
        news_data = []
        for response_data in responses:        
            if 'data' in response_data:  
                    filtered_data = [newsItem for newsItem in response_data['data'] if any(keyword.lower() in newsItem['title'].lower() or (keyword.lower() in newsItem['description'].lower() if 'description' in newsItem else False) for keyword in params['title'])]
                    news_data.extend(filtered_data)
                
        # Randomize the order of the news articles
        random.shuffle(news_data)  
        return jsonify(news_data)
    
    except requests.HTTPError as e:
        return jsonify({"error": str(e)})
