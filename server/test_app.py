from datetime import datetime
from faker import Faker
import pytest
from extensions import db
from features.auth.models import User, Gender
from unittest.mock import patch
from werkzeug.security import generate_password_hash

fake = Faker()

@pytest.fixture
def client():
    from app import create_app, app
    app = create_app()
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    client = app.test_client()

    with app.app_context():
        db.create_all()
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
        db.drop_all()

def test_register(client):
    unique_email = fake.email()
    unique_username = fake.user_name()

    with patch('features.auth.routes.send_verification_email') as mock_send_email:
        response = client.post('/auth/register', json={
            'username': unique_username, 
            'password': 'Test123', 
            'first_name': 'Test', 
            'last_name': 'User', 
            'birth_date': '01-01-2000', 
            'email': unique_email, 
            'gender': 'MALE'
        })
        
        mock_send_email.assert_called_once()

    assert response.status_code == 201, f"Expected HTTP 201 but got {response.status_code}"
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
    
# Delete account test
def test_delete_account(client):
    # Log in the user
    login_response = client.post('/auth/login', json={'username': 'dummy', 'password': 'Dummy123'})
    assert login_response.status_code == 200
    assert b'success' in login_response.data

    # Attempt to delete the account
    delete_response = client.delete('/auth/delete_account')
    assert delete_response.status_code == 200
    assert b'Your account has been deleted successfully.' in delete_response.data

    # Verify that the user can no longer log in
    relogin_response = client.post('/auth/login', json={'username': 'dummy', 'password': 'Dummy123'})
    assert relogin_response.status_code == 400  # Or appropriate status code if user not found or account is deleted
    assert b'Please check your login details and try again' in relogin_response.data


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
