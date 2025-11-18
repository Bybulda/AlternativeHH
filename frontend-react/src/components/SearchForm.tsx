// src/components/SearchForm.tsx
import React, { useState } from 'react';

interface Props {
  onSearch: (text: string, fields: string[]) => void;
  loading: boolean;
}

const SearchForm: React.FC<Props> = ({ onSearch, loading }) => {
  const [searchText, setSearchText] = useState('');
  const [selectedFields, setSelectedFields] = useState<string[]>(['title', 'role', 'salaryFrom']);

  const fieldOptions = [
    { label: 'Название', value: 'title' },
    { label: 'Роль', value: 'role' },
    { label: 'Минимальная зарплата', value: 'salaryFrom' },
    { label: 'Адресс', value: 'address' },
    { label: 'Ссылка', value: 'url' },
  ];

  const handleFieldChange = (value: string) => {
    setSelectedFields(prev =>
      prev.includes(value) ? prev.filter(f => f !== value) : [...prev, value]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchText, selectedFields);
  };

  return (
    <div style={styles.formContainer}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <textarea
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Введите запрос: Python, удалёнка, зарплата от 200к"
          style={styles.textarea}
          rows={3}
          disabled={loading}
        />

        <div style={styles.fieldsSection}>
          <label style={styles.label}>Показывать поля:</label>
          <div style={styles.fieldsList}>
            {fieldOptions.map(field => (
              <label key={field.value} style={styles.fieldLabel}>
                <input
                  type="checkbox"
                  checked={selectedFields.includes(field.value)}
                  onChange={() => handleFieldChange(field.value)}
                  style={styles.checkbox}
                />
                {field.label}
              </label>
            ))}
          </div>
        </div>

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Ищем...' : '🔍 Найти вакансии'}
        </button>
      </form>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  formContainer: {
    width: '100%',
    marginBottom: '30px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  textarea: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#1F2630',
    color: '#FAFBFD',
    border: '1px solid #4C78A8',
    borderRadius: '8px',
    fontSize: '16px',
    resize: 'vertical',
  },
  fieldsSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    color: '#FAFBFD',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  fieldsList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
  },
  fieldLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    color: '#FAFBFD',
    fontSize: '14px',
  },
  checkbox: {
    cursor: 'pointer',
  },
  button: {
    padding: '12px 20px',
    width: '100%',
    backgroundColor: '#4C78A8',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    alignSelf: 'flex-start',
  },
};

export default SearchForm;