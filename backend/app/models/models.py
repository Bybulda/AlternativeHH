from pydantic import BaseModel
from typing import Optional


class Currency(BaseModel):
    code: Optional[str] = None
    name: Optional[str] = None


class Employer(BaseModel):
    id: str
    name: str
    url: str


class Vacancy(BaseModel):
    id: str
    title: str
    area: Optional[str] = None
    salary_from: Optional[float] = None
    salary_to: Optional[float] = None
    currency: Currency

    address: Optional[str] = None
    employer: Employer

    requirements: Optional[str] = None
    responsibility: Optional[str] = None

    work_format: Optional[str] = None
    working_hours: Optional[str] = None

    role: Optional[str] = None
    experience: Optional[str] = None

    url: str


class CoverLetterRequest(BaseModel):
    vacancy_data: dict
    user_input: str


class CoverLetterResponse(BaseModel):
    cover_letter: str
