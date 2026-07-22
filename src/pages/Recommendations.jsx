import React, { useState } from 'react';
import { Bookmark, Briefcase, GraduationCap, TrendingUp, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import './Recommendations.css';

const RECOMMENDATIONS = [
  {
    id: 1,
    title: 'Data Scientist',
    match: 98,
    category: 'Technology & AI',
    salary: 'High',
    growth: '+31%',
    education: 'Master\'s Degree preferred',
    description: 'Use advanced analytics, machine learning, and programming to extract insights from large datasets.',
    skills: ['Python', 'Machine Learning', 'Statistics', 'SQL']
  },
  {
    id: 2,
    title: 'Financial Analyst',
    match: 92,
    category: 'Finance',
    salary: 'High',
    growth: '+9%',
    education: 'Bachelor\'s Degree',
    description: 'Guide businesses and individuals in making investment decisions by analyzing financial data.',
    skills: ['Financial Modeling', 'Excel', 'Economics', 'Accounting']
  },
  {
    id: 3,
    title: 'Software Architect',
    match: 87,
    category: 'Technology',
    salary: 'Very High',
    growth: '+25%',
    education: 'Bachelor\'s/Master\'s Degree',
    description: 'Make high-level design choices and dictate technical standards for software projects.',
    skills: ['System Design', 'Cloud', 'Java/C++', 'Leadership']
  },
  {
    id: 4,
    title: 'Market Research Analyst',
    match: 85,
    category: 'Business',
    salary: 'Medium',
    growth: '+19%',
    education: 'Bachelor\'s Degree',
    description: 'Study market conditions to examine potential sales of a product or service.',
    skills: ['Data Analysis', 'Survey Design', 'Communication']
  }
];

export default function Recommendations() {
  const [savedCareers, setSavedCareers] = useState([]);
  const { addToast } = useToast();

  const toggleSave = (id, title) => {
    if (savedCareers.includes(id)) {
      setSavedCareers(savedCareers.filter(cId => cId !== id));
      addToast(`Removed ${title} from saved careers`, 'info');
    } else {
      setSavedCareers([...savedCareers, id]);
      addToast(`Saved ${title} to your careers list!`, 'success');
    }
  };

  const handleLearnMore = (title) => {
    addToast(`Loading detailed roadmap for ${title}...`, 'info');
  };

  return (
    <div className="recommendations-container">
      <div className="recommendations-header">
        <div>
          <h1>AI Career Matches</h1>
          <p className="subtitle">Based on your Aptitude, Interests (IRA), and Personality</p>
        </div>
        <div className="match-summary">
          <div className="match-badge">
            <CheckCircle2 size={16} />
            <span>Top Matches Ready</span>
          </div>
        </div>
      </div>

      <div className="career-grid">
        {RECOMMENDATIONS.map((career) => (
          <div key={career.id} className="career-card">
            <div className="career-card-header">
              <div className="match-score">
                <span className="score-value">{career.match}%</span>
                <span className="score-label">Match</span>
              </div>
              <button 
                className={`bookmark-btn ${savedCareers.includes(career.id) ? 'saved' : ''}`}
                onClick={() => toggleSave(career.id, career.title)}
                title={savedCareers.includes(career.id) ? "Unsave career" : "Save career"}
              >
                <Bookmark size={20} fill={savedCareers.includes(career.id) ? "currentColor" : "none"} />
              </button>
            </div>
            
            <div className="career-info">
              <span className="category-label">{career.category}</span>
              <h2>{career.title}</h2>
              <p>{career.description}</p>
            </div>

            <div className="career-metrics">
              <div className="metric">
                <TrendingUp size={16} />
                <span>{career.growth} Growth</span>
              </div>
              <div className="metric">
                <Briefcase size={16} />
                <span>{career.salary} Salary</span>
              </div>
              <div className="metric">
                <GraduationCap size={16} />
                <span>{career.education}</span>
              </div>
            </div>

            <div className="career-skills">
              {career.skills.map((skill, idx) => (
                <span key={idx} className="skill-tag">{skill}</span>
              ))}
            </div>

            <button className="btn btn-outline full-width" onClick={() => handleLearnMore(career.title)}>
              View Roadmap <ChevronRight size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
