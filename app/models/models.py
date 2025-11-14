from pydantic import BaseModel
from typing import Optional

# TODO: правильно составить модели для парсинга ответа от hh

class Vacancy(BaseModel):
    id: int
    title: str
    company: str
    area: str
    salary_from: Optional[float] = None
    salary_to: Optional[float] = None
    url: str

class Currency(BaseModel):
    code: str
    name: str
    rate: float