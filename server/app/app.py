from flask import Flask, jsonify
import requests

app = Flask(__name__)

technology_categories = ['teknologi', 'tekno', 'techno']

def call_api(endpoint, params):
    url = f'https://berita-indo-api-next.vercel.app/{endpoint}'
    response = requests.get(url, params=params)
    return response.json()

@app.route('/api/get_news')
def get_news():
    params = {
        'keywords': 'perkembangan+teknologi,desa,pedesaan,teknologi+digital,daerah+terpencil,transformasi+digital,era+digital,teknologi+informasi+dan+komunikasi,pendidikan+daring,keterampilan+digital,peningkatan+kemampuan+menulis,media+teknologi,pembelajaran+daring,beasiswa,teknologi+informasi+dan+komunikasi,masyarakat+umum',
        'region': 'Indonesia'
    }

    # Fetch list of news portals from API
    portal_response = requests.get('https://berita-indo-api-next.vercel.app/api/')
    data = portal_response.json()

    # Exclude specific news portals
    excluded_portals = ['cnbc-news', 'republika-news', 'bbc-news', 'kumparan-news', 'tribun-news','vice-news', 'suara-news', 'voa-news']
    news_portals = [portal for portal in data['data'] if portal not in excluded_portals]

    # Fetch news data for Technology category
    news_data = []
    for portal in news_portals:
        for category in technology_categories:
            if 'type' in data['data'][portal]:
                endpoint = data['data'][portal]['type'].replace(':type', category)
                response_data = call_api(endpoint, params)
                if 'data' in response_data:  # Check if 'data' key exists
                    news_data.extend(response_data['data'])
    return jsonify(news_data)

if __name__ == '__main__':
    app.run(debug=True)