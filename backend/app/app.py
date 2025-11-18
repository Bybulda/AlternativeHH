import json
import os

import httpx
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI

from backend.app.models.models import CoverLetterRequest, CoverLetterResponse
from backend.app.models.schema import graphql_app
from backend.utils.collect_model import get_vacancies_from_request

load_dotenv()
app = FastAPI(title="Job Aggregator API", version="0.1.0")

app.include_router(graphql_app, prefix="/graphql")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "Welcome to Job Aggregator API!"}


HH_API_URL = os.environ["HH_API_URL"]

OPEN_AI_API_KEY = os.environ["OPEN_AI_API_KEY"]


@app.post("/coverLetter", response_model=CoverLetterResponse)
async def get_cover_letter(request: CoverLetterRequest):
    vacancy = request.vacancy_data
    user_input = request.user_input

    prompt = f"""
       Напиши краткое и профессиональное сопроводительное письмо на русском языке для отклика на вакансию:

       Вакансия: {vacancy.get('title', 'Не указана')}
       Компания: {vacancy.get('company', 'Не указана')}
       Требования: {vacancy.get('requirements', 'Не указаны')}
       Описание: {vacancy.get('responsibility', 'Не указано')}

       Информация от соискателя:
       {user_input}

       Письмо должно быть персонализированным, кратким (3-4 абзаца), с упором на соответствие требованиям вакансии и мотивацией. Не пиши "Уважаемая команда", начни с "Здравствуйте" или сразу по делу.
       Если в информации от соискателя нет определенных данных, не добавляй их от себя, например:
       Не указан опыт - напиши (для разработчиков) "Являюсь опытным разработчиком"
       Не указано с чем работал соискатель - не придумывай, пропусти этот момент 
       """
    try:
        model = OpenAI(api_key=os.getenv("OPEN_AI_API_KEY"))
        response = model.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "Ты помощник по созданию сопроводительных писем. Пиши на русском языке."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=500,
            temperature=0.7
        )

        cover_letter = response.choices[0].message.content.strip()
        return CoverLetterResponse(cover_letter=cover_letter)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ошибка при генерации письма: {str(e)}")


# DEPRECATED
@app.get("/vacs")
async def get_vacancies_from_hh():
    headers = json.loads(os.environ["HEADERS"])
    async with httpx.AsyncClient() as client:
        response = await client.get(HH_API_URL, headers=headers)
        response.raise_for_status()
        all_vacancies = get_vacancies_from_request(response.json())
        return all_vacancies
