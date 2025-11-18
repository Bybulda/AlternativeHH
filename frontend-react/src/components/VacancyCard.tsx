// src/components/VacancyCard.tsx
import React from 'react';
import { GraphQLVacancy } from '../types/vacancy';
import CoverLetterWidget from './CoverLetterWidget';

interface Props {
  vacancy: GraphQLVacancy;
  onOpen: () => void;
  onNext: () => void;
}

const VacancyCard: React.FC<Props> = ({ vacancy, onOpen, onNext }) => {
  const renderField = (label: string, value: string | number | null | undefined) => {
    if (value === null || value === undefined) return null;
    return (
      <p style={styles.detail}>
        <strong>{label}:</strong> {value}
      </p>
    );
  };

  return (
    <div style={styles.card}>
      {renderField("Название", vacancy.title)}
      {renderField("Зарплата от", vacancy.salary_from)}
      {renderField("Адресс", vacancy.address)}
      {renderField("Название компании", vacancy.employer?.name)}
      {renderField("Необходимые навыки", vacancy.requirements)}
      {renderField("Ответственность", vacancy.responsibility)}
      {renderField("Ссылка", vacancy.url)}

      <div style={styles.buttons}>
        <button onClick={onOpen} style={styles.linkButton}>🔗 Открыть вакансию</button>
        <CoverLetterWidget
          vacancyTitle={vacancy.title}
          companyName={vacancy.employer?.name || 'Не указана'}
          onGenerate={async (userInfo: string) => {
            const response = await fetch('http://localhost:8000/coverLetter', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                vacancy_data: {
                  title: vacancy.title,
                  company: vacancy.employer?.name || 'Не указана',
                  requirements: vacancy.requirements || 'Не указаны',
                  responsibility: vacancy.responsibility || "Не указаны"
                },
                user_input: userInfo,
              }),
            });
            const data = await response.json();
            return data.cover_letter;
          }}
        />
        <button onClick={onNext} style={styles.nextButton}>▶ Следующая вакансия</button>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  card: {
    backgroundColor: '#1F2630',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
    color: '#FAFBFD',
  },
  title: {
    margin: '0 0 10px 0',
    fontSize: '18px',
    color: '#6CAED6',
  },
  detail: {
    margin: '8px 0',
    fontSize: '16px',
  },
  buttons: {
    display: 'flex',
    gap: '10px',
    marginTop: '20px',
  },
  linkButton: {
    padding: '10px 15px',
    backgroundColor: '#4C78A8',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  nextButton: {
    padding: '10px 15px',
    backgroundColor: '#4C78A8',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
  },
};

export default VacancyCard;