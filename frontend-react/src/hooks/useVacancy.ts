import { useState } from 'react';
import { GraphQLVacancy } from '../types/vacancy';
import { fetchVacancies } from '../services/api';

export const useVacancy = () => {
  const [vacancies, setVacancies] = useState<GraphQLVacancy[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadVacancies = async (text: string, fields: string[]) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchVacancies(text, fields);
      setVacancies(data);
      setCurrentIndex(0);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
    } finally {
      setLoading(false);
    }
  };

  const nextVacancy = () => {
    if (currentIndex < vacancies.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const currentVacancy = vacancies[currentIndex] || null;

  return {
    vacancies,
    currentVacancy,
    currentIndex,
    loading,
    error,
    loadVacancies,
    nextVacancy,
    hasVacancies: vacancies.length > 0,
    isLastVacancy: currentIndex === vacancies.length - 1,
  };
};