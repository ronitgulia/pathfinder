import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Star, 
  GraduationCap, 
  CheckCircle2, 
  Circle, 
  Calendar, 
  FileText, 
  DollarSign, 
  Bookmark, 
  ExternalLink,
  Award,
  BookOpen
} from 'lucide-react';
import { COLLEGES_DATA, getCollegeById } from '../data/collegesData';
import {
  getSavedColleges,
  toggleSaveCollege,
  getCollegeChecklistProgress,
  toggleCollegeChecklistItem
} from '../utils/storage';
import { useToast } from '../context/useToast';
import './CollegeRequirements.css';

export default function CollegeRequirements() {
  const { collegeId } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const currentId = collegeId ? Number(collegeId) : 1;
  const college = getCollegeById(currentId);

  const [checkedItems, setCheckedItems] = useState([]);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const syncState = () => {
      setIsSaved(getSavedColleges().some(c => c.id === college.id));
      setCheckedItems(getCollegeChecklistProgress(college.id));
    };
    syncState();
    window.addEventListener('pathfinder-storage-change', syncState);
    return () => window.removeEventListener('pathfinder-storage-change', syncState);
  }, [college.id]);

  const handleToggleCheck = (itemId) => {
    const nowChecked = toggleCollegeChecklistItem(college.id, itemId);
    if (nowChecked) {
      addToast('Item checked! Track your application readiness.', 'info');
    }
  };

  const handleToggleSave = () => {
    const nowSaved = toggleSaveCollege({
      id: college.id,
      name: college.name,
      location: college.location,
      type: college.type,
      match: college.match
    });
    setIsSaved(nowSaved);
    if (nowSaved) {
      addToast(`Saved ${college.name} to your shortlisted colleges!`, 'success');
    } else {
      addToast(`Removed ${college.name} from shortlisted colleges.`, 'info');
    }
  };

  const handleStartApp = () => {
    addToast(`Connecting to official ${college.name} admissions gateway...`, 'success');
  };

  return (
    <div className="requirements-container">
      <div className="req-header-nav">
        <button className="req-back-btn" onClick={() => navigate('/colleges')}>
          <ArrowLeft size={18} /> Back to Colleges
        </button>

        <div className="req-header-controls">
          <select
            className="req-switch-select"
            aria-label="Switch college"
            value={college.id}
            onChange={(e) => navigate(`/colleges/${e.target.value}/requirements`)}
          >
            {COLLEGES_DATA.map(c => (
              <option key={c.id} value={c.id}>
                Switch: {c.name}
              </option>
            ))}
          </select>

          <button 
            className={`btn ${isSaved ? 'btn-primary' : 'btn-outline'}`}
            onClick={handleToggleSave}
          >
            <Bookmark size={16} fill={isSaved ? 'currentColor' : 'none'} />
            {isSaved ? 'Shortlisted' : 'Shortlist College'}
          </button>
        </div>
      </div>

      {/* Hero Card */}
      <div className="req-hero-card">
        <div className="req-hero-top">
          <div>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
              <span className="req-meta-pill">{college.type}</span>
              <span className="req-meta-pill" style={{ color: 'var(--color-secondary)' }}>
                <Star size={14} fill="currentColor" /> {college.match}% Aptitude Match
              </span>
              <span className="req-meta-pill">
                <Award size={14} /> {college.ranking}
              </span>
            </div>
            <h1>{college.name}</h1>
            <div className="req-location">
              <MapPin size={16} /> {college.location}
            </div>
          </div>

          <button className="btn btn-primary" onClick={handleStartApp} style={{ alignSelf: 'flex-start' }}>
            <ExternalLink size={16} /> Start Application Portal
          </button>
        </div>

        <div className="req-stats-grid">
          <div className="req-stat-box">
            <span className="label">Acceptance Rate</span>
            <span className="val" style={{ color: 'var(--color-error, #ef4444)' }}>
              {college.acceptanceRate}
            </span>
          </div>
          <div className="req-stat-box">
            <span className="label">Average GPA</span>
            <span className="val">{college.avgGpa}</span>
          </div>
          <div className="req-stat-box">
            <span className="label">Middle 50% SAT</span>
            <span className="val">{college.satRange}</span>
          </div>
          <div className="req-stat-box">
            <span className="label">Testing Policy</span>
            <span className="val" style={{ fontSize: '0.95rem' }}>
              {college.testPolicy}
            </span>
          </div>
        </div>
      </div>

      {/* Main Breakdown */}
      <div className="req-sections-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* High School Coursework */}
          <div className="req-card">
            <div className="req-card-header">
              <BookOpen size={20} />
              <h3>Recommended High School Coursework</h3>
            </div>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
              Competitive applicants exceed baseline high school graduation requirements with honors, AP, or IB courses.
            </p>
            <table className="req-courses-table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Recommended</th>
                  <th>Preparation Details</th>
                </tr>
              </thead>
              <tbody>
                {college.requiredHighSchoolCourses.map((row, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 600 }}>{row.subject}</td>
                    <td>
                      <span className="category-pill" style={{ fontSize: '0.75rem' }}>
                        {row.years}
                      </span>
                    </td>
                    <td style={{ color: 'var(--color-text-muted)' }}>{row.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Application Checklist */}
          <div className="req-card">
            <div className="req-card-header">
              <FileText size={20} />
              <h3>Application Document Checklist</h3>
            </div>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
              Check off the materials you have prepared to track your readiness for submission.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {college.applicationChecklist.map((item) => {
                const isChecked = checkedItems.includes(item.id);
                return (
                  <div 
                    key={item.id} 
                    className={`req-checklist-item ${isChecked ? 'checked' : ''}`}
                    onClick={() => handleToggleCheck(item.id)}
                  >
                    {isChecked ? (
                      <CheckCircle2 size={18} color="var(--color-secondary)" style={{ marginTop: '2px' }} />
                    ) : (
                      <Circle size={18} color="var(--color-text-muted)" style={{ marginTop: '2px' }} />
                    )}
                    <div>
                      <div className="item-title">
                        {item.title} {item.required && <span style={{ color: '#ef4444' }}>*</span>}
                      </div>
                      <div className="item-desc">{item.description}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Deadlines */}
          <div className="req-card">
            <div className="req-card-header">
              <Calendar size={20} />
              <h3>Key Deadlines</h3>
            </div>
            <div className="req-deadlines-list">
              <div className="req-deadline-item">
                <span className="deadline-name">Early Action / Priority</span>
                <span className="deadline-date">{college.applicationDeadlines.earlyAction}</span>
              </div>
              <div className="req-deadline-item">
                <span className="deadline-name">Regular Decision</span>
                <span className="deadline-date">{college.applicationDeadlines.regularDecision}</span>
              </div>
              <div className="req-deadline-item">
                <span className="deadline-name">Financial Aid Priority</span>
                <span className="deadline-date">{college.applicationDeadlines.financialAidPriority}</span>
              </div>
            </div>
          </div>

          {/* Costs & Financial Aid */}
          <div className="req-card">
            <div className="req-card-header">
              <DollarSign size={20} />
              <h3>Cost & Financial Aid</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Estimated Tuition</span>
                <strong>{college.tuitionAndFees.annualTuition}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Room & Board</span>
                <strong>{college.tuitionAndFees.roomAndBoard}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--color-border)', paddingTop: '0.5rem' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Estimated Total / Yr</span>
                <strong style={{ color: 'var(--color-primary)' }}>{college.tuitionAndFees.estimatedTotal}</strong>
              </div>
            </div>
            <div style={{ padding: '0.75rem', backgroundColor: 'var(--color-bg-body)', borderRadius: 'var(--radius-md)', fontSize: '0.8rem', color: 'var(--color-text-muted)', lineHeight: '1.5' }}>
              💡 <strong>Affordability Promise:</strong> {college.tuitionAndFees.financialAidHighlight}
            </div>
          </div>

          {/* Top Programs */}
          <div className="req-card">
            <div className="req-card-header">
              <GraduationCap size={20} />
              <h3>High-Demand Programs</h3>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {college.programs.map((prog, idx) => (
                <span key={idx} className="category-pill" style={{ background: 'var(--color-bg-body)' }}>
                  {prog}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

