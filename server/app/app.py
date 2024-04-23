from flask import Flask, jsonify
import requests

app = Flask(__name__)

# Tech category in the news portals
tech_categories = ['Techno', 'Tekno', 'Teknologi']

# Take the endpoint and parameters as arguments, and make the API call..
def call_api(endpoint, params): 
    url =f'https://berita-indo-api-next.vercel.app/api/{endpoint}'
    response = requests.get(url, params=params)
    return response.json()

# ..then, call this function in a loop
@app.route('/api/get_news')
def get_news():
    params = {
        'keywords': 'perkembangan+teknologi,desa,pedesaan,teknologi+digital,daerah+terpencil,transformasi+digital,era+digital,teknologi+informasi+dan+komunikasi,pendidikan+daring,keterampilan+digital,peningkatan+kemampuan+menulis,media+teknologi,pembelajaran+daring,beasiswa,teknologi+informasi+dan+komunikasi,masyarakat+umum'
    }
    
    ## Fetch list of news portals from API (try GET request to root or ../api/endpoints or ../api/news-sources)
    portal_response = requests.get(f'https://berita-indo-api-next.vercel.app/api/')
    news_portals = portal_response.json()

    ## Exclude specific news portals with outlier categories
    excluded_portals = [
        'cnbc-news', 'republika-news', 'kumparan-news', 'tribun-news' 'vice-news', 'suara-news', 'voa-news'
    ]
    news_portals = [portal for portal in news_portals if portal not in excluded_portals]

    ## Fetch news data for Technology category
    news_data = []
    for portal in news_portals:
        for category in tech_categories:
            data = call_api(f'{portal}/{category}', params)
            news_data.extend(data)
    
    return jsonify(news_data)

if __name__ == '__main__':
    app.run(debug=True)

    