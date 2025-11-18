export interface GraphQLCurrency {
  code?: string;
  name?: string;
}


export interface GraphQLEmployer {
  id?: string;
  name?: string;
  url?: string;

}


export interface GraphQLVacancy {
  id: string;
  title: string;
  area: string | null;
  salary_from: string | null;
  salary_to: string | null;
  currency: GraphQLCurrency;

  address: string | null;
  employer: GraphQLEmployer;

  requirements: string | null;
  responsibility: string | null;

  work_format: string | null;
  working_hours: string | null;

  role: string | null;
  experience: string | null;

  url: string;
}