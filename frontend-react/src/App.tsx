// src/App.tsx
import React from 'react';
import SearchForm from './components/SearchForm';
import VacancyCard from './components/VacancyCard';
import { useVacancy } from './hooks/useVacancy';


function App() {
  const {
    currentVacancy,
    loading,
    error,
    loadVacancies,
    nextVacancy,
    hasVacancies,
    isLastVacancy,
  } = useVacancy();

  const handleSearch = (text: string, fields: string[]) => {
    loadVacancies(text, fields);
  };

  return (
    <div style={styles.app}>
      <div style={styles.container}>
        {loading && <div style={styles.loading}>Загрузка вакансий...</div>}

        {error && <div style={styles.error}>Ошибка: {error}</div>}

        {!hasVacancies && (
          <>
            <h1 style={styles.title}>🔍 Умный поиск вакансий</h1>
            <SearchForm onSearch={handleSearch} loading={loading} />
          </>
        )}

        {currentVacancy && (
          <>
            <SearchForm onSearch={handleSearch} loading={loading} />
            <VacancyCard
              vacancy={currentVacancy}
              onOpen={() => window.open(currentVacancy.url, '_blank')}
              onNext={nextVacancy}
            />
          </>
        )}

        {isLastVacancy && !loading && (
          <>
            <h1 style={styles.title}>🎉 Вакансии закончились</h1>
            <p style={styles.endText}>Нажмите «Найти вакансии», чтобы начать новый поиск</p>
            <SearchForm onSearch={handleSearch} loading={loading} />
          </>
        )}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  app: {
    backgroundColor: '#0E1117',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '40px 20px',
    color: '#FAFBFD',
    fontFamily: 'sans-serif',
  },
  container: {
    width: '100%',
    maxWidth: '600px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    color: '#FAFBFD',
    textAlign: 'center',
    fontSize: '24px',
    margin: '20px 0',
  },
  loading: {
    color: '#FAFBFD',
    fontSize: '18px',
    textAlign: 'center',
    margin: '40px 0',
  },
  error: {
    color: '#FF4C4C',
    fontSize: '18px',
    textAlign: 'center',
    margin: '40px 0',
  },
  endText: {
    color: '#FAFBFD',
    fontSize: '18px',
    textAlign: 'center',
    margin: '20px 0',
  },
};

export default App;