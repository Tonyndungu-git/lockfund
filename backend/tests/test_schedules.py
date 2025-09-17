from fastapi.testclient import TestClient
from datetime import datetime, timedelta

def test_create_and_read_schedule(client: TestClient, test_db):
    # Register and login a user to get a token
    client.post("/users/register", json={"email": "scheduleuser@example.com", "password": "password", "full_name": "Schedule User"})
    login_response = client.post("/users/token", data={"username": "scheduleuser@example.com", "password": "password"})
    token = login_response.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # Create a schedule
    release_date = (datetime.utcnow() + timedelta(days=30)).isoformat()
    response = client.post("/schedules/", headers=headers, json={
        "goal_name": "New Car",
        "target_amount": 20000,
        "release_date": release_date,
        "frequency": "monthly"
    })
    assert response.status_code == 200
    data = response.json()
    assert data["goal_name"] == "New Car"
    assert data["target_amount"] == 20000
    schedule_id = data["id"]

    # Read the schedule
    response = client.get(f"/schedules/{schedule_id}", headers=headers)
    assert response.status_code == 200
    assert response.json()["goal_name"] == "New Car"

    # Read all schedules
    response = client.get("/schedules/", headers=headers)
    assert response.status_code == 200
    assert len(response.json()) > 0
