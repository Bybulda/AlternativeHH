import React, { useState } from 'react';

interface CoverLetterWidgetProps {
  vacancyTitle: string;
  companyName: string;
  onGenerate: (userInfo: string) => Promise<string>;
}

const CoverLetterWidget: React.FC<CoverLetterWidgetProps> = ({ vacancyTitle, companyName, onGenerate }) => {
  const [showWidget, setShowWidget] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLetter, setGeneratedLetter] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!userInput.trim()) return;

    setIsGenerating(true);
    try {
      const letter = await onGenerate(userInput);
      setGeneratedLetter(letter);
    } catch (error) {
      alert('Ошибка при генерации. Попробуйте позже.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClose = () => {
    setShowWidget(false);
    setGeneratedLetter(null);
    setUserInput('');
  };

  return (
    <>

      <button
        onClick={() => setShowWidget(true)}
        style={{
          padding: '10px 15px',
          backgroundColor: '#4C78A8',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '14px',
        }}
      >
        Сгенерировать отклик
      </button>


      {showWidget && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: '#1F2630',
              padding: '24px',
              borderRadius: '8px',
              width: '90%',
              maxWidth: '600px',
              maxHeight: '80vh',
              overflowY: 'auto',
              border: '1px solid #3A434F',
              color: '#FAFBFD',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
            }}
          >
            <h3 style={{ margin: '0 0 16px 0', color: '#6CAED6' }}>
              Сгенерировать отклик на вакансию: <strong>{vacancyTitle}</strong>
              <br />
              <small style={{ color: '#A3B3C4', fontSize: '14px' }}>
                Компания: {companyName}
              </small>
            </h3>

            <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: '100%' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#A3B3C4' }}>
                  Напишите о себе (до 1000 символов)
                </label>
                <textarea
                  value={userInput}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.length <= 1000) {
                      setUserInput(value);
                    }
                  }}
                  placeholder="Расскажите о своём опыте, навыках, мотивации..."
                  style={{
                    width: '100%',
                    height: '120px',
                    padding: '12px',
                    backgroundColor: '#3A434F',
                    color: '#FAFBFD',
                    border: '1px solid #4C78A8',
                    borderRadius: '4px',
                    fontSize: '16px',
                    resize: 'none',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box',
                  }}
                  maxLength={1000}
                />
                <p
                  style={{
                    marginTop: '8px',
                    fontSize: '12px',
                    color: userInput.length > 900 ? '#e74c3c' : '#A3B3C4',
                    textAlign: 'right',
                  }}
                >
                  {userInput.length}/1000
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                onClick={handleClose}
                style={{
                  padding: '10px 15px',
                  backgroundColor: '#3A434F',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                Закрыть
              </button>
              <button
                onClick={handleGenerate}
                disabled={!userInput.trim() || isGenerating}
                style={{
                  padding: '10px 15px',
                  backgroundColor: userInput.trim() && !isGenerating ? '#4C78A8' : '#3A434F',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: userInput.trim() && !isGenerating ? 'pointer' : 'not-allowed',
                  fontSize: '14px',
                }}
              >
                {isGenerating ? 'Генерируется...' : 'Сгенерировать'}
              </button>
            </div>

            {generatedLetter && (
              <div
                style={{
                  marginTop: '20px',
                  padding: '16px',
                  backgroundColor: '#3A434F',
                  border: '1px solid #4C78A8',
                  borderRadius: '4px',
                  whiteSpace: 'pre-wrap',
                  lineHeight: '1.6',
                  fontSize: '16px',
                  color: '#FAFBFD',
                  wordWrap: 'break-word',
                }}
              >
                <strong style={{ color: '#6CAED6' }}>Ваш отклик:</strong>
                <div style={{ marginTop: '8px' }}>{generatedLetter}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CoverLetterWidget;