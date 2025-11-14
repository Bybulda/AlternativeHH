import strawberry
from strawberry.fastapi import GraphQLRouter
from typing import List
from models.models import Vacancy, Currency

# TODO: тут все для примера, надо будет сделать нормальную версию

@strawberry.type
class GraphQLVacancy:
    id: int
    title: str
    company: str
    area: str
    salary_from: float
    salary_to: float
    url: str

@strawberry.type
class GraphQLCurrency:
    code: str
    name: str
    rate: float

@strawberry.type
class Query:
    @strawberry.field
    def vacancy(self, id: int) -> GraphQLVacancy:
        return GraphQLVacancy(
            id=id,
            title="Python Developer",
            company="Yandex",
            area="Moscow",
            salary_from=200000.0,
            salary_to=300000.0,
            url="https://hh.ru/vacancy/123456"
        )

    @strawberry.field
    def vacancies(self) -> List[GraphQLVacancy]:
        return [
            GraphQLVacancy(
                id=1,
                title="Python Developer",
                company="Yandex",
                area="Moscow",
                salary_from=200000.0,
                salary_to=300000.0,
                url="https://hh.ru/vacancy/123456"
            ),
            GraphQLVacancy(
                id=2,
                title="Backend Engineer",
                company="VK",
                area="Remote",
                salary_from=180000.0,
                salary_to=250000.0,
                url="https://hh.ru/vacancy/789012"
            )
        ]

    @strawberry.field
    def currency(self, code: str) -> GraphQLCurrency:
        if code.upper() == "USD":
            return GraphQLCurrency(
                code=code.upper(),
                name="Доллар США",
                rate=81.55
            )
        return GraphQLCurrency(
            code=code.upper(),
            name=f"{code.upper()} (unknown)",
            rate=0.0
        )

schema = strawberry.Schema(query=Query)

graphql_app = GraphQLRouter(schema)