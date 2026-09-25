from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
import json
import os

app = FastAPI(title="RailConnect API", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Aapka asli Google Client ID
GOOGLE_CLIENT_ID = "589438554910-r9p9np9ujfka7dm3elfjm3m7kobiv650.apps.googleusercontent.com"

class LoginUser(BaseModel):
    email: str
    password: str

class RegisterUser(BaseModel):
    fullName: str
    email: str
    mobile: str
    password: str

class GoogleToken(BaseModel):
    token: str

@app.post("/api/v1/auth/google")
def google_auth(data: GoogleToken):
    try:
        # Verify token with Google
        idinfo = id_token.verify_oauth2_token(data.token, google_requests.Request(), GOOGLE_CLIENT_ID)
        
        # Extract user data from Google
        return {
            "success": True,
            "message": "Google Login successful!",
            "token": "real_jwt_token_123", 
            "user": {
                "name": idinfo.get("name"),
                "email": idinfo.get("email"),
                "picture": idinfo.get("picture") # Profile Picture
            }
        }
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid Google token")

@app.post("/api/v1/auth/login")
def login(user: LoginUser):
    if user.email and user.password:
        return {"success": True, "token": "mock_token", "user": {"email": user.email, "name": user.email.split('@')[0]}}
    raise HTTPException(status_code=400, detail="Invalid credentials")

@app.post("/api/v1/auth/register")
def register(user: RegisterUser):
    return {"success": True, "user": {"name": user.fullName, "email": user.email}}

@app.get("/api/v1/stations")
def get_stations(q: str = ""):
    file_path = os.path.join(os.path.dirname(__file__), '../data/stations.json')
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            raw_stations = json.load(f)
            formatted_stations = []
            for s in raw_stations:
                if isinstance(s, dict):
                    s_name = s.get('name') or s.get('Name') or s.get('stationName') or s.get('eng_name') or "Unknown"
                    s_code = s.get('code') or s.get('Code') or s.get('stationCode') or ""
                    s_state = s.get('state') or s.get('State') or s.get('state_city') or ""
                    formatted_stations.append({"name": str(s_name), "code": str(s_code), "state_city": str(s_state)})
            if q:
                return [s for s in formatted_stations if q.lower() in s['name'].lower() or q.lower() in s['code'].lower()]
            return formatted_stations
    except Exception as e:
        return {"error": str(e)}

@app.get("/api/v1/trains")
def get_trains(q: str = ""):
    file_path = os.path.join(os.path.dirname(__file__), '../data/trains.json')
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            trains = json.load(f)
            if q:
                return [t for t in trains if q.lower() in str(t.get('number', '')).lower() or q.lower() in str(t.get('name', '')).lower()]
            return trains
    except Exception as e:
        return {"error": str(e)}
