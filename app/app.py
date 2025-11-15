import json
import os

import httpx
from fastapi import FastAPI

from utils.collect_model import get_vacancies_from_request
from app.models.schema import graphql_app

app = FastAPI(title="Job Aggregator API", version="0.1.0")


app.include_router(graphql_app, prefix="/graphql")

@app.get("/")
def root():
    return {"message": "Welcome to Job Aggregator API!"}


HH_API_URL = os.environ["HH_API_URL"]

@app.get("/vacs")
async def get_vacancies_from_hh():
    headers = json.loads(os.environ["HEADERS"])
    async with httpx.AsyncClient() as client:
        response = await client.get(HH_API_URL, headers=headers)
        response.raise_for_status()
        all_vacancies = get_vacancies_from_request(response.json())
        return all_vacancies