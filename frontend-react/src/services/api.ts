import {GraphQLVacancy} from "../types/vacancy";

const GRAPHQL_ENDPOINT = 'http://localhost:8000/graphql'; // или твой URL

interface GraphQLResponse {
  data: {
    vacancies: GraphQLVacancy[];
  };
}

export const fetchVacancies = async (text: string, fields: string[]): Promise<GraphQLVacancy[]> => {
  const query = `
    query {
      vacancies(text: "${text}", onlyWithSalary: true) {
        url
        ${fields.join('\n        ')}
      }
    }
  `;

  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: { text },
    }),
  });

  if (!response.ok) {
    console.log(response.json(), response.ok)
    throw new Error('Ошибка при загрузке вакансий');
  }

  // console.log(response.text())
  const result: GraphQLResponse = await response.json();
  return result.data.vacancies;
};