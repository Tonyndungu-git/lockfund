from fastapi.testclient import TestClient

def test_register_user(client: TestClient, test_db):
    response = client.post("/users/register", json={
        "email": "test@example.com",
        "password": "password",
        "full_name": "Test User"
    })
    assert response.status_code == 200
    assert response.json()["email"] == "test@example.com"
    assert "id" in response.json()

    # Test duplicate registration
    response = client.post("/users/register", json={
        "email": "test@example.com",
        "password": "password",
        "full_name": "Test User"
    })
    assert response.status_code == 400
    assert response.json()["detail"] == "Email already registered"

def test_login(client: TestClient, test_db):
    # First, register a user
    client.post("/users/register", json={
        "email": "login@example.com",
        "password": "password",
        "full_name": "Login User"
    })

    # Test login
    response = client.post("/users/token", data={
        "username": "login@example.com",
        "password": "password"
    })
    assert response.status_code == 200
    assert "access_token" in response.json()
    assert response.json()["token_type"] == "bearer"

    # Test incorrect password
    response = client.post("/users/token", data={
        "username": "login@example.com",
        "password": "wrongpassword"
    })
    assert response.status_code == 401
    assert response.json()["detail"] == "Incorrect email or password"
