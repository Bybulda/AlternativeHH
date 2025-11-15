from typing import List

import strawberry
from strawberry.fastapi import GraphQLRouter

from app.api_integration import get_hh_response
from app.models.models import Vacancy, Currency, Employer


@strawberry.type
class GraphQLEmployer:
    id: str
    name: str
    url: str

    @classmethod
    def from_pydantic(cls, employer: Employer):
        return GraphQLEmployer(id=employer.id, name=employer.name, url=employer.url)


@strawberry.type
class GraphQLCurrency:
    code: str | None
    name: str | None

    @classmethod
    def from_pydantic(cls, currency: Currency):
        return GraphQLCurrency(code=currency.code, name=currency.name)


@strawberry.type
class GraphQLVacancy:
    id: str
    title: str
    area: str | None
    salary_from: str | None
    salary_to: str | None
    currency: GraphQLCurrency

    address: str | None
    employer: GraphQLEmployer

    requirements: str | None
    responsibility: str | None

    work_format: str | None
    working_hours: str | None

    role: str | None
    experience: str | None

    url: str

    @classmethod
    def from_pydantic(cls, vacancy: Vacancy):
        return GraphQLVacancy(
            id=vacancy.id,
            title=vacancy.title,
            area=vacancy.area,
            salary_from=vacancy.salary_from,
            salary_to=vacancy.salary_to,
            currency=GraphQLCurrency.from_pydantic(vacancy.currency),
            address=vacancy.address,
            employer=GraphQLEmployer.from_pydantic(vacancy.employer),
            requirements=vacancy.requirements,
            responsibility=vacancy.responsibility,
            work_format=vacancy.work_format,
            working_hours=vacancy.working_hours,
            role=vacancy.role,
            experience=vacancy.experience,
            url=vacancy.url
        )

    @classmethod
    def from_pydantic_list(cls, vacancies: List[Vacancy]):
        return [GraphQLVacancy.from_pydantic(vacancy) for vacancy in vacancies]


async def vacancies_resolver() -> List[GraphQLVacancy]:
    pydantic_response_vacancies = await get_hh_response({})
    return GraphQLVacancy.from_pydantic_list(pydantic_response_vacancies)


@strawberry.type
class Query:
    vacancies: List[GraphQLVacancy] = strawberry.field(resolver=vacancies_resolver)


schema = strawberry.Schema(query=Query)

graphql_app = GraphQLRouter(schema)
