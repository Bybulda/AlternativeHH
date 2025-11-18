# AlternativeHH

Веб-приложение по поиску вакансий с HH.ru, с возможностью генерации сопроводительного письма с помощью GPT 4o-mini.

---

## Структура проекта (ключевые файлы)
```
streamlit_assistant/
├── docker-compose.yaml
├── .env.example
├── README.md
├── backend/
│   └── app/
│       ├── app.py
│       ├── api_integration.py
│       ├── models/
│       │   ├── models.py
│       │   ├── schema.py
│       └── utils/
│           └── collect_model.py
└── frontend-react/
    ├── public/
    ├── Dockerfile
    └── src/
        ├── components/
        │   ├── CoberLetterWidget.tsx
        │   ├── SearchForm.tsx
        │   └── VacancyCard.tsx
        ├── hooks/
        │   └── useVacancy.ts
        ├── services/
        │   └── api.ts
        └── types/
            └── vacancy.ts

```

---

## Что делает проект (вкратце)
1. Пользователь заходит на сайт поиска вакансий: https://localhost:3000 и получает возможность подобрать себе вакансии
2. Пользователь может ввести в поиске слова, которые будут учитываться при подборе вакансии
3. Пользователь может выбрать, какие данные он хочет видеть в карточке вакансии, только эти данные будут на ней показаны, и только эти данные вернет Graphql
4. После появления карточек можно перейти по ссылки на конкретную вакансию на HH, посмотреть следующую вакансию или сгенерировать сопроводительное письмо
5. Для генерации сопроводительного письма используется chatgpt 4o-mini

---

## Основные эндпоинты API

- GET /graphql  
  Обращение к graphql, требует обязательно query

- POST /coverLetter
  Принимает запрос пользователя для генерации сопроводительного письма, возвращает ответ модели
---

## Как запустить локально (рекомендуемый способ)
1. Установлен Docker и docker-compose.
2. Запустить все сервисы:
```sh
docker-compose up --build
```
Это поднимет: Backend часть и Frontend часть. Конфигурация в [docker-compose.yaml](docker-compose.yaml).


---

## Пример .env 
```env
HH_API_URL = "https://api.hh.ru/vacancies"

HEADERS = '{
    "HH-User-Agent": "api-test-agent"
}'

OPEN_AI_API_KEY=Ваш ключ 


```
