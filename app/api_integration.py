import json
from typing import List

import httpx

from app.models.models import Vacancy
from utils.collect_model import get_vacancies_from_request
import os

HH_API_URL = os.environ["HH_API_URL"]


async def get_hh_response(params: dict) -> List[Vacancy]:

    async with httpx.AsyncClient() as client:
        header = json.loads(os.environ["HEADERS"])
        response = await client.get(HH_API_URL, headers=header, params=params)
        response.raise_for_status()
        all_vacancies = get_vacancies_from_request(response.json())
        return all_vacancies
