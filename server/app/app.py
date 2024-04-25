from flask import Flask, jsonify
import requests

app = Flask(__name__)

def call_api(endpoint, params):
    try:
        url = f'https://berita-indo-api-next.vercel.app/{endpoint}'
        response = requests.get(url, params=params)
        response.raise_for_status()  # Raise an exception for bad status code
        return response.json()
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}

@app.route('/api/get_news')
def get_news():
    params = {
        'keywords': [
            ("desa", "pedesaan", "daerah terpencil", "smart village"),
            ("AI", "aplikasi", "artificial intelligence", "digital", "gadget", "industri 4.0", "IT", "media sosial", "kecerdasan buatan", "perkembangan teknologi", "robot", "robotik", "smartphone", "software", "teknologi informasi dan komunikasi", "telekomunikasi", "TIK"),
            ("beasiswa", "pendidikan daring", "keterampilan digital", "pembelajaran daring", "peningkatan kemampuan"),
            ("Kementerian Komunikasi dan Informatika", "Kemkominfo", "Kominfo")
        ],
        'region': 'Indonesia'
    }

    try:
        endpoints = ['api/antara-news/tekno', 'api/tempo-news/tekno', 'api/republika-news']
        news_data = []
        for endpoint in endpoints:
            response_data = call_api(endpoint, params)
            print(f"Response Data for {endpoint}: {response_data}") # Debug
            if 'data' in response_data:  # Check if 'data' key exists
                news_data.extend(response_data['data'])
        print(f"Final News Data: {news_data}") # Debug
        return jsonify(news_data)
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True)