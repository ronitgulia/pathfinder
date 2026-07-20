import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, ArrowRight, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import './AptitudeTest.css';

const MOCK_QUESTIONS = [
  {
    id: 1,
    category: 'Numerical Reasoning',
    text: 'If a train travels 120 km in 2 hours, how far will it travel in 5 hours at the same speed?',
    options: ['240 km', '300 km', '360 km', '400 km'],
  },
  {
    id: 2,
    category: 'Verbal Reasoning',
    text: 'Which word does NOT belong with the others?',
    options: ['Leopard', 'Cougar', 'Elephant', 'Lion'],
  },
  {
    id: 3,
    category: 'Spatial Reasoning',
    text: 'Which shape completes the pattern?',
    options: ['Circle', 'Square', 'Triangle', 'Hexagon'],
    isVisual: true
  },
  {
    id: 4,
    category: 'Logical Reasoning',
    text: 'If all bloops are razzies and all razzies are lazzies, are all bloops definitely lazzies?',
    options: ['Yes', 'No', 'Cannot be determined'],
  }
];

export default function AptitudeTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleSelect = (option) => {
    setAnswers({ ...answers, [currentQuestion]: option });
  };

  const handleNext = () => {
    if (currentQuestion < MOCK_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < MOCK_QUESTIONS.length) {
      addToast('Please answer all questions before submitting.', 'error');
      return;
    }
    
    addToast('Analyzing your responses with AI...', 'info', 2000);
    setIsSubmitted(true);
    
    setTimeout(() => {
      addToast('Aptitude Test Completed Successfully!', 'success');
      navigate('/dashboard');
    }, 2500);
  };

  const progress = ((currentQuestion + 1) / MOCK_QUESTIONS.length) * 100;
  const question = MOCK_QUESTIONS[currentQuestion];

  if (isSubmitted) {
    return (
      <div className="test-container submitting-state">
        <div className="loading-spinner">
          <Brain size={48} className="pulse-anim" />
        </div>
        <h2>Analyzing Results</h2>
        <p>Our AI is calculating your cognitive profile...</p>
      </div>
    );
  }

  return (
    <div className="test-container">
      <div className="test-header">
        <div className="title-group">
          <Brain className="icon-primary" size={28} />
          <div>
            <h1>AI Aptitude Assessment</h1>
            <p className="subtitle">Discover your cognitive strengths</p>
          </div>
        </div>
        <div className="progress-indicator">
          <span>Question {currentQuestion + 1} of {MOCK_QUESTIONS.length}</span>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>

      <div className="question-card">
        <span className="category-tag">{question.category}</span>
        <h2 className="question-text">{question.text}</h2>
        
        {question.isVisual && (
          <div className="visual-placeholder">
            <AlertCircle size={24} />
            <span>[Visual Pattern Image would display here]</span>
          </div>
        )}

        <div className="options-grid">
          {question.options.map((option, idx) => (
            <button 
              key={idx}
              className={`option-btn ${answers[currentQuestion] === option ? 'selected' : ''}`}
              onClick={() => handleSelect(option)}
            >
              <div className="radio-circle">
                {answers[currentQuestion] === option && <div className="radio-dot"></div>}
              </div>
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="test-footer">
        <button 
          className="btn btn-outline" 
          onClick={handlePrev}
          disabled={currentQuestion === 0}
        >
          <ArrowLeft size={16} /> Previous
        </button>
        
        {currentQuestion === MOCK_QUESTIONS.length - 1 ? (
          <button className="btn btn-primary" onClick={handleSubmit}>
            <CheckCircle2 size={16} /> Submit Assessment
          </button>
        ) : (
          <button className="btn btn-primary" onClick={handleNext}>
            Next <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
