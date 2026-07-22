import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import './AptitudeTest.css'; // Reusing quiz styles

const MOCK_INTERESTS = [
  { id: 1, text: 'I enjoy designing graphics and visual layouts.', category: 'Artistic' },
  { id: 2, text: 'I like organizing files, data, and schedules.', category: 'Conventional' },
  { id: 3, text: 'I prefer starting and running my own projects or businesses.', category: 'Enterprising' },
  { id: 4, text: 'I love solving complex math or science problems.', category: 'Investigative' },
];

export default function Interests() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleSelect = (score) => {
    setAnswers({ ...answers, [currentQuestion]: score });
    if (currentQuestion < MOCK_INTERESTS.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    } else {
      addToast('Interest Assessment Completed!', 'success');
      navigate('/dashboard');
    }
  };

  const progress = ((currentQuestion + 1) / MOCK_INTERESTS.length) * 100;
  const question = MOCK_INTERESTS[currentQuestion];

  return (
    <div className="test-container">
      <div className="test-header">
        <div className="title-group">
          <Compass className="icon-primary" size={28} />
          <div>
            <h1>Interest Profiler</h1>
            <p className="subtitle">Discover what activities you enjoy</p>
          </div>
        </div>
        <div className="progress-indicator">
          <span>Question {currentQuestion + 1} of {MOCK_INTERESTS.length}</span>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>

      <div className="question-card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <h2 className="question-text">{question.text}</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
          <button className="btn btn-outline" onClick={() => handleSelect('Dislike')}>Strongly Dislike</button>
          <button className="btn btn-outline" onClick={() => handleSelect('Neutral')}>Neutral</button>
          <button className="btn btn-primary" onClick={() => handleSelect('Like')}>Strongly Like</button>
        </div>
      </div>
    </div>
  );
}
