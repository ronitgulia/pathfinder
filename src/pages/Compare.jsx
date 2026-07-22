import React, { useState, useEffect } from 'react';
import { 
  ArrowLeftRight, 
  TrendingUp, 
  Briefcase, 
  GraduationCap, 
  Star, 
  Bookmark, 
  Sparkles, 
  Clock, 
  Compass
} from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { getSavedCareers, saveCareer } from '../utils/storage';
import './Compare.css';

const CAREERS_CATALOG = [
  {
    id: 1,
    title: 'Data Scientist',
    category: 'Technology & AI',
    match: 98,
    salary: '$125,000 / yr',
    salaryLevel: 'High',
    growth: '+31%',
    growthLevel: 'Very High',
    education: "Master's Degree preferred",
    workStyle: 'Hybrid / Analytical',
    hollandCode: 'IRA (Investigative, Realistic, Artistic)',
    stressLevel: 'Moderate',
    skills: ['Python', 'Machine Learning', 'Statistics', 'SQL', 'Data Storytelling'],
    description: 'Build predictive models, machine learning algorithms, and distill actionable business intelligence from complex big data sets.',
    keyAdvantage: 'Top-tier salary potential and explosive market demand driven by AI adoption.'
  },
  {
    id: 2,
    title: 'Software Engineer',
    category: 'Technology',
    match: 94,
    salary: '$118,000 / yr',
    salaryLevel: 'High',
    growth: '+25%',
    growthLevel: 'High',
    education: "Bachelor's in CS / Engineering",
    workStyle: 'Remote / Agile Team',
    hollandCode: 'IRC (Investigative, Realistic, Conventional)',
    stressLevel: 'Moderate',
    skills: ['Algorithms', 'System Design', 'JavaScript/TypeScript', 'React', 'Cloud Services'],
    description: 'Design, develop, and maintain resilient distributed software systems, APIs, and responsive customer-facing web applications.',
    keyAdvantage: 'Maximum industry versatility, high remote work flexibility, and constant technical variety.'
  },
  {
    id: 3,
    title: 'Financial Analyst',
    category: 'Finance',
    match: 92,
    salary: '$95,000 / yr',
    salaryLevel: 'High',
    growth: '+9%',
    growthLevel: 'Moderate',
    education: "Bachelor's in Finance / Economics",
    workStyle: 'In-office / Fast-paced',
    hollandCode: 'CER (Conventional, Enterprising, Realistic)',
    stressLevel: 'High',
    skills: ['Financial Modeling', 'Excel / Sheets', 'Valuation', 'Accounting', 'Risk Analysis'],
    description: 'Analyze financial statements, evaluate market trends, and advise corporate executives on investments and portfolio strategies.',
    keyAdvantage: 'Clear progression toward CFO or fund management with direct executive exposure.'
  },
  {
    id: 4,
    title: 'UX Designer',
    category: 'Design & Product',
    match: 88,
    salary: '$92,000 / yr',
    salaryLevel: 'Moderate',
    growth: '+15%',
    growthLevel: 'Above Average',
    education: "Bachelor's / Design Portfolio",
    workStyle: 'Collaborative / Cross-functional',
    hollandCode: 'AIS (Artistic, Investigative, Social)',
    stressLevel: 'Low-to-Moderate',
    skills: ['Figma', 'Wireframing', 'User Research', 'Prototyping', 'Design Systems'],
    description: 'Craft intuitive digital experiences, conduct usability studies, and translate human needs into frictionless product interfaces.',
    keyAdvantage: 'High creative satisfaction without heavy mathematical prerequisites.'
  },
  {
    id: 5,
    title: 'Marketing Manager',
    category: 'Business & Growth',
    match: 78,
    salary: '$105,000 / yr',
    salaryLevel: 'High',
    growth: '+10%',
    growthLevel: 'Moderate',
    education: "Bachelor's in Marketing / Comms",
    workStyle: 'Creative / Campaign-driven',
    hollandCode: 'ESC (Enterprising, Social, Conventional)',
    stressLevel: 'Moderate',
    skills: ['Digital Marketing', 'Brand Strategy', 'Analytics', 'Content Strategy', 'Budgeting'],
    description: 'Direct multifaceted campaigns, drive customer acquisition, and oversee brand positioning across omni-channel media.',
    keyAdvantage: 'Blends strategic business leadership with creative storytelling.'
  },
  {
    id: 6,
    title: 'Psychologist',
    category: 'Healthcare & Science',
    match: 82,
    salary: '$88,000 / yr',
    salaryLevel: 'Moderate',
    growth: '+14%',
    growthLevel: 'Above Average',
    education: 'Doctorate / Licensure required',
    workStyle: 'Clinical / Person-centered',
    hollandCode: 'SIA (Social, Investigative, Artistic)',
    stressLevel: 'Moderate',
    skills: ['Active Listening', 'Cognitive Assessment', 'Empathy', 'Research Methods', 'Counseling'],
    description: 'Evaluate cognitive, emotional, and behavioral processes to support mental well-being and therapeutic recovery.',
    keyAdvantage: 'Deeply rewarding interpersonal impact and high long-term career stability.'
  }
];

export default function Compare() {
  const [careerAId, setCareerAId] = useState(1);
  const [careerBId, setCareerBId] = useState(2);
  const [savedIds, setSavedIds] = useState([]);
  const { addToast } = useToast();

  useEffect(() => {
    const loadSaved = () => {
      const items = getSavedCareers();
      setSavedIds(items.map(i => i.id));
    };
    loadSaved();
    window.addEventListener('pathfinder-storage-change', loadSaved);
    return () => window.removeEventListener('pathfinder-storage-change', loadSaved);
  }, []);

  const careerA = CAREERS_CATALOG.find(c => c.id === Number(careerAId)) || CAREERS_CATALOG[0];
  const careerB = CAREERS_CATALOG.find(c => c.id === Number(careerBId)) || CAREERS_CATALOG[1];

  const handleSwap = () => {
    setCareerAId(careerB.id);
    setCareerBId(careerA.id);
  };

  const handleToggleSave = (career) => {
    const isNowSaved = saveCareer(career);
    if (isNowSaved) {
      addToast(`Saved ${career.title} to your profile!`, 'success');
    } else {
      addToast(`Removed ${career.title} from saved careers.`, 'info');
    }
  };

  // Find shared skills between both careers
  const sharedSkills = careerA.skills.filter(s => careerB.skills.includes(s));

  // Determine top match
  const higherMatchCareer = careerA.match >= careerB.match ? careerA : careerB;

  return (
    <div className="compare-container">
      <div className="compare-header">
        <h1>Compare Careers Side-by-Side</h1>
        <p className="subtitle">
          Evaluate compensation, projected growth, educational hurdles, and day-to-day requirements.
        </p>
      </div>

      <div className="compare-selector-card">
        <div className="selector-box">
          <label>Career Option 1</label>
          <select 
            className="selector-dropdown"
            value={careerAId} 
            onChange={(e) => setCareerAId(Number(e.target.value))}
          >
            {CAREERS_CATALOG.map(c => (
              <option key={c.id} value={c.id} disabled={c.id === careerB.id}>
                {c.title} ({c.category})
              </option>
            ))}
          </select>
        </div>

        <button 
          className="swap-btn" 
          onClick={handleSwap}
          title="Swap career positions"
        >
          <ArrowLeftRight size={18} />
        </button>

        <div className="selector-box">
          <label>Career Option 2</label>
          <select 
            className="selector-dropdown"
            value={careerBId} 
            onChange={(e) => setCareerBId(Number(e.target.value))}
          >
            {CAREERS_CATALOG.map(c => (
              <option key={c.id} value={c.id} disabled={c.id === careerA.id}>
                {c.title} ({c.category})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="compare-grid">
        {/* Career A Card */}
        <div className={`career-compare-card ${careerA.id === higherMatchCareer.id ? 'winner' : ''}`}>
          {careerA.id === higherMatchCareer.id && (
            <div className="winner-ribbon">Top Match</div>
          )}
          <div className="compare-card-top">
            <div>
              <span className="category-pill">{careerA.category}</span>
              <h2>{careerA.title}</h2>
            </div>
            <div className="compare-match-pill">
              <Star size={14} fill="currentColor" /> {careerA.match}% Match
            </div>
          </div>

          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: '1.5' }}>
            {careerA.description}
          </p>

          <div className="compare-metrics-list">
            <div className="compare-metric-row">
              <span className="metric-label"><Briefcase size={16} /> Average Salary</span>
              <span className="metric-val">{careerA.salary}</span>
            </div>
            <div className="compare-metric-row">
              <span className="metric-label"><TrendingUp size={16} /> Projected Growth</span>
              <span className="metric-val" style={{ color: 'var(--color-secondary)' }}>
                {careerA.growth} ({careerA.growthLevel})
              </span>
            </div>
            <div className="compare-metric-row">
              <span className="metric-label"><GraduationCap size={16} /> Education</span>
              <span className="metric-val">{careerA.education}</span>
            </div>
            <div className="compare-metric-row">
              <span className="metric-label"><Clock size={16} /> Work Environment</span>
              <span className="metric-val">{careerA.workStyle}</span>
            </div>
            <div className="compare-metric-row">
              <span className="metric-label"><Compass size={16} /> Holland Code</span>
              <span className="metric-val">{careerA.hollandCode}</span>
            </div>
          </div>

          <div className="skills-section">
            <p className="skills-heading">Required Skills & Tools</p>
            <div className="compare-skills-wrap" style={{ marginTop: '0.5rem' }}>
              {careerA.skills.map((skill, idx) => (
                <span 
                  key={idx} 
                  className={`compare-skill-chip ${sharedSkills.includes(skill) ? 'shared' : ''}`}
                >
                  {skill} {sharedSkills.includes(skill) && '★'}
                </span>
              ))}
            </div>
          </div>

          <div className="compare-card-actions">
            <button 
              className={`btn ${savedIds.includes(careerA.id) ? 'btn-primary' : 'btn-outline'}`}
              style={{ flex: 1 }}
              onClick={() => handleToggleSave(careerA)}
            >
              <Bookmark size={16} fill={savedIds.includes(careerA.id) ? 'currentColor' : 'none'} />
              {savedIds.includes(careerA.id) ? 'Bookmarked' : 'Save Career'}
            </button>
          </div>
        </div>

        {/* Career B Card */}
        <div className={`career-compare-card ${careerB.id === higherMatchCareer.id ? 'winner' : ''}`}>
          {careerB.id === higherMatchCareer.id && (
            <div className="winner-ribbon">Top Match</div>
          )}
          <div className="compare-card-top">
            <div>
              <span className="category-pill">{careerB.category}</span>
              <h2>{careerB.title}</h2>
            </div>
            <div className="compare-match-pill">
              <Star size={14} fill="currentColor" /> {careerB.match}% Match
            </div>
          </div>

          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: '1.5' }}>
            {careerB.description}
          </p>

          <div className="compare-metrics-list">
            <div className="compare-metric-row">
              <span className="metric-label"><Briefcase size={16} /> Average Salary</span>
              <span className="metric-val">{careerB.salary}</span>
            </div>
            <div className="compare-metric-row">
              <span className="metric-label"><TrendingUp size={16} /> Projected Growth</span>
              <span className="metric-val" style={{ color: 'var(--color-secondary)' }}>
                {careerB.growth} ({careerB.growthLevel})
              </span>
            </div>
            <div className="compare-metric-row">
              <span className="metric-label"><GraduationCap size={16} /> Education</span>
              <span className="metric-val">{careerB.education}</span>
            </div>
            <div className="compare-metric-row">
              <span className="metric-label"><Clock size={16} /> Work Environment</span>
              <span className="metric-val">{careerB.workStyle}</span>
            </div>
            <div className="compare-metric-row">
              <span className="metric-label"><Compass size={16} /> Holland Code</span>
              <span className="metric-val">{careerB.hollandCode}</span>
            </div>
          </div>

          <div className="skills-section">
            <p className="skills-heading">Required Skills & Tools</p>
            <div className="compare-skills-wrap" style={{ marginTop: '0.5rem' }}>
              {careerB.skills.map((skill, idx) => (
                <span 
                  key={idx} 
                  className={`compare-skill-chip ${sharedSkills.includes(skill) ? 'shared' : ''}`}
                >
                  {skill} {sharedSkills.includes(skill) && '★'}
                </span>
              ))}
            </div>
          </div>

          <div className="compare-card-actions">
            <button 
              className={`btn ${savedIds.includes(careerB.id) ? 'btn-primary' : 'btn-outline'}`}
              style={{ flex: 1 }}
              onClick={() => handleToggleSave(careerB)}
            >
              <Bookmark size={16} fill={savedIds.includes(careerB.id) ? 'currentColor' : 'none'} />
              {savedIds.includes(careerB.id) ? 'Bookmarked' : 'Save Career'}
            </button>
          </div>
        </div>
      </div>

      {/* AI Comparison Summary */}
      <div className="compare-summary-box">
        <div className="compare-summary-header">
          <Sparkles size={20} />
          <h3>AI PathFinder Verdict</h3>
        </div>
        <p>
          Between <strong>{careerA.title}</strong> and <strong>{careerB.title}</strong>, {higherMatchCareer.title} presents your highest cognitive alignment ({higherMatchCareer.match}% match) according to your aptitude test results. 
          {sharedSkills.length > 0 ? (
            <> Both paths share foundational skills in <strong>{sharedSkills.join(', ')}</strong>, making cross-skilling advantageous.</>
          ) : (
            <> These career paths represent distinct skill domains with specialized trajectories.</>
          )} 
          {' '}{careerA.growthRate > careerB.growthRate ? careerA.title : careerB.title} leads in projected 10-year job growth, while {careerA.salary > careerB.salary ? careerA.title : careerB.title} offers higher compensation ceilings.
        </p>
      </div>
    </div>
  );
}
