import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { setAssessmentCompleted } from '../utils/storage';
import './AptitudeTest.css'; // Reusing quiz styles

const MOCK_PERSONALITY = [
  { id: 1, text: 'You regularly make new friends.' },
  { id: 2, text: 'You spend a lot of your free time exploring various random topics that pique your interest.' },
  { id: 3, text: 'Seeing other people cry can easily make you feel like you want to cry too.' },
  { id: 4, text: 'You often make a backup plan for a backup plan.' },
];

export default function Personality() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleSelect = (score) => {
    setAnswers({ ...answers, [currentQuestion]: score });
    if (currentQuestion < MOCK_PERSONALITY.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    } else {
      setAssessmentCompleted('personality');
      addToast('Personality Assessment Completed!', 'success');
      navigate('/dashboard');
    }
  };

  const progress = ((currentQuestion + 1) / MOCK_PERSONALITY.length) * 100;
  const question = MOCK_PERSONALITY[currentQuestion];

  return (
    <div className="test-container">
      <div className="test-header">
        <div className="title-group">
          <User className="icon-primary" size={28} />
          <div>
            <h1>Personality Test</h1>
            <p className="subtitle">Understand your behavioral tendencies</p>
          </div>
        </div>
        <div className="progress-indicator">
          <span>Question {currentQuestion + 1} of {MOCK_PERSONALITY.length}</span>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>

      <div className="question-card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <h2 className="question-text">{question.text}</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
          <button className="btn btn-outline" style={{ borderColor: 'var(--color-error)', color: 'var(--color-error)' }} onClick={() => handleSelect('Disagree')}>Disagree</button>
          <button className="btn btn-outline" onClick={() => handleSelect('Neutral')}>Neutral</button>
          <button className="btn btn-outline" style={{ borderColor: 'var(--color-success)', color: 'var(--color-success)' }} onClick={() => handleSelect('Agree')}>Agree</button>
        </div>
      </div>
    </div>
  );
}
