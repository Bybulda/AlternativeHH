from typing import List, Optional

from app.models.models import Vacancy, Currency, Employer


def get_save_value_from_dict(json: dict, *args: str | int) -> Optional[str | int]:
    nxt = json
    for key in args:
        if nxt is None or isinstance(nxt, dict) and key not in nxt:
            return None
        elif isinstance(nxt, list) and key >= len(nxt):
            return None
        nxt = nxt[key]
    return nxt


def get_vacancy(json: dict) -> Vacancy:
    return Vacancy(
        id=json["id"],
        title=json["name"],
        area=get_save_value_from_dict(json, "area", "name"),
        salary_from=get_save_value_from_dict(json, "salary", "from"),
        salary_to=get_save_value_from_dict(json, "salary", "to"),
        currency=Currency(code=get_save_value_from_dict(json, "salary", "currency"),
                          name=None),
        address=get_save_value_from_dict(json, "address", "raw"),
        employer=Employer(id=get_save_value_from_dict(json, "employer", "id"),
                          name=get_save_value_from_dict(json, "employer", "name"),
                          url=get_save_value_from_dict(json, "employer", "url")),
        requirements=get_save_value_from_dict(json, "snippet", "requirement"),
        responsibility=get_save_value_from_dict(json, "snippet", "responsibility"),
        work_format=get_save_value_from_dict(json, "work_format", 0, "name"),
        working_hours=get_save_value_from_dict(json, "working_hours", 0, "name"),
        role=get_save_value_from_dict(json, "professional_roles", 0, "name"),
        experience=get_save_value_from_dict(json, "experience", "name"),
        url=json["alternative_url"]
    )


def get_vacancies_from_request(request: dict) -> List[Vacancy]:
    return [get_vacancy(vacancy_json) for vacancy_json in request["items"]]
