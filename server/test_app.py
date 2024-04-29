from flask import url_for
import pytest
from app import app, db
from features.auth.models import User, generate_password_hash


# Setup for test client
@pytest.fixture
def client():
    app.config['TESTING'] = True
    client = app.test_client()
    
    with app.app_context():
        db.create_all()

        # Create a dummy user
        dummy_user = User(username='dummy', password_hash=generate_password_hash('dummy', method='sha256'))
        db.session.add(dummy_user)
        db.session.commit()

    yield client
    
    with app.app_context():
        db.drop_all()
        

########## AUTH TEST ##########

# Register test
def test_register(client):
    response = client.post('/api/register',
    data=dict(
        username='test',
        password='test'
    ))
    
    
    assert response.status_code == 201
    assert b'Account created successfully' in response.data
    
# Login test
def test_login(client):
    response = client.post('/api/login', 
    data=dict(
        username='dummy',
        password='dummy'
    ))
    print(response.data) # Debug
    
    assert response.status_code == 200
    assert b'success' in response.data
    
# Logout test
def test_logout(client):
    # Log in the user
    client.post('/api/login', 
    data=dict(
        username='dummy',
        password='dummy'
    ))

    # Now try to log out
    response = client.get('/api/logout')
    
    assert response.status_code == 200
    assert b'success' in response.data


