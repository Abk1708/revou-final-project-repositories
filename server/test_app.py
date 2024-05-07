from flask import url_for
import pytest
from app import app, db
from features.auth.models import User, Gender
from features.news.routes import call_api  # Assuming you want to mock this
from datetime import datetime
from werkzeug.security import generate_password_hash

# Setup for test client
@pytest.fixture
def client():
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'  # Use in-memory SQLite for tests
    client = app.test_client()
    
    with app.app_context():
        db.create_all()

        # Create a dummy user
        dummy_user = User(
            username='dummy', 
            password_hash=generate_password_hash('Dummy123', method='sha256'),
            first_name='Dummy',
            last_name='User',
            birth_date=datetime.strptime('01-01-2000', '%d-%m-%Y').date(),
            email='dummy@example.com',
            gender=Gender.MALE,
            confirmed=True
        )
        db.session.add(dummy_user)
        db.session.commit()

    yield client
    
    with app.app_context():
        db.drop_all()

########## AUTH TEST ##########

# Register test
def test_register(client):
    response = client.post('/auth/register', json=
    {'username': 'test', 'password': 'Test123', 'first_name': 'Test', 'last_name': 'User', 'birth_date': '01-01-2000', 'email': 'test@example.com', 'gender': 'MALE'})

    assert response.status_code == 201
    assert b'Account created successfully' in response.data
    
# Login test
def test_login(client):
    response = client.post('/auth/login', json=
    {'username': 'dummy', 'password': 'Dummy123'})

    assert response.status_code == 200
    assert b'success' in response.data
    
# Logout test
def test_logout(client):
    # Log in the user
    client.post('/auth/login', json=
    {'username': 'dummy', 'password': 'Dummy123'})

    # Now try to log out
    response = client.get('/auth/logout')
    
    assert response.status_code == 200
    assert b'success' in response.data

########## NEWS TEST ##########

# Test the news API integration
def test_get_news(client, monkeypatch):
    # Mock the call_api function to return a predictable response
    def mock_call_api(endpoint):
        return {
            'data': [
                {'title': 'Smart Village Project Launched', 'description': 'A new tech initiative in rural areas.'},
                {'title': 'Digital Infrastructure in Desa', 'description': 'Internet access is expanding.'}
            ]
        }
    
    monkeypatch.setattr('features.news.routes.call_api', mock_call_api)

    response = client.get('/news/get_news')
    
    assert response.status_code == 200
    assert b'Smart Village Project Launched' in response.data
    assert b'Digital Infrastructure in Desa' in response.data
