// src/components/VacancyCard.tsx
import React from 'react';
import { GraphQLVacancy } from '../types/vacancy';

interface Props {
  vacancy: GraphQLVacancy;
  onOpen: () => void;
  onNext: () => void;
}

const VacancyCard: React.FC<Props> = ({ vacancy, onOpen, onNext }) => {
  return (
    <div style={styles.card}>
      <h3 style={styles.title}>{vacancy.title}</h3>
      {vacancy.salary_from && <p style={styles.detail}><strong>Зарплата:</strong> {vacancy.salary_to}</p>}
      {vacancy.address && <p style={styles.detail}><strong>Город:</strong> {vacancy.address}</p>}

      <div style={styles.buttons}>
        <button onClick={onOpen} style={styles.linkButton}>🔗 Открыть вакансию</button>
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