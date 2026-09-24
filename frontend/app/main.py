from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
import os

app = FastAPI(title="RailConnect API", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to RailConnect API! Backend is running."}

# Stations API
@app.get("/api/v1/stations")
def get_stations(q: str = ""):
    file_path = os.path.join(os.path.dirname(__file__), '../data/stations.json')
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            stations = json.load(f)
            if q:
                q = q.lower()
                filtered = [s for s in stations if q in str(s.get('name', '')).lower() or q in str(s.get('code', '')).lower()]
                return filtered
            return stations
    except Exception as e:
        return {"error": str(e)}

# Trains API (Naya Endpoint)
@app.get("/api/v1/trains")
def get_trains(q: str = ""):
    file_path = os.path.join(os.path.dirname(__file__), '../data/trains.json')
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            trains = json.load(f)
            if q:
                q = q.lower()
                filtered = [t for t in trains if q in str(t.get('number', '')).lower() or q in str(t.get('name', '')).lower()]
                return filtered
            return trains
    except Exception as e:
        return {"error": str(e)}
