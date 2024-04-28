import pytest
from pytest_mock import mocker
import requests
from app import app
from flask import json

@pytest.fixture
def client():
    with app.test_client() as client:
        yield client

def test_get_news(client):
    response = client.get('/api/get_news')
    data = json.loads(response.data)
    assert response.status_code == 200

def test_get_news_with_error(client, mocker):
    mocker.patch('requests.get', side_effect=Exception('Mocked error'))
    response = client.get('/api/get_news')
    assert response.status_code == 500