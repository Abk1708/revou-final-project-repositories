from flask.testing import FlaskClient
from app import app
import pytest

@pytest.fixture
def client() -> FlaskClient:
    with app.test_client() as client:
        yield client

def test_get_news(client: FlaskClient):
    response = client.get('/api/get_news')
    assert response.status_code == 200
    assert len(response.json) > 0