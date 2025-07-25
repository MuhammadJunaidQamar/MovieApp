from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import json
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Movies API" , version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Movie(BaseModel):
    adult: bool
    backdrop_path: Optional[str]
    genre_ids: List[int]
    id: int
    original_language: str
    original_title: str
    overview: str
    popularity: float
    poster_path: Optional[str]
    release_date: str
    title: str
    video: bool
    vote_average: float
    vote_count: int

class MoviesResponse(BaseModel):
    page: int
    results: List[Movie]
    total_pages: int
    total_results: int

with open("response.json", "r", encoding="utf-8") as f:
    movies_data = json.load(f)

movies_response = MoviesResponse(**movies_data)

@app.get("/movies", response_model=MoviesResponse)
async def get_movies():
    return movies_response


@app.get("/search/movie/", response_model=List[Movie])
def search_movies(query: str):
    q = query.strip().lower()

    exact_matches = [
        movie
        for movie in movies_response.results
        if q == movie.title.lower()
    ]
    if exact_matches:
        return exact_matches
    
    terms = [word for word in q.split() if word]
    partial_matches = [
        movie
        for movie in movies_response.results
        if any(term in movie.title.lower() for term in terms)
    ]
    if partial_matches:
        return partial_matches

    raise HTTPException(status_code=404, detail="Movie not found")