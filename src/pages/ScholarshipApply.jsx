import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Award, 
  CheckCircle2, 
  FileText, 
  User, 
  Send 
} from 'lucide-react';
import { getScholarshipById, SCHOLARSHIPS_DATA } from '../data/scholarshipsData';
import { 
  getScholarshipApplication, 
  submitScholarshipApplication 
} from '../utils/storage';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import './ScholarshipApply.css';

export default function ScholarshipApply() {
  const { scholarshipId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToast } = useToast();

  const currentId = scholarshipId ? Number(scholarshipId) : 1;
  const scholarship = getScholarshipById(currentId);

  const [existingApp, setExistingApp] = useState(null);
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    grade: user?.grade || 'Grade 10',
    currentSchool: 'Oakridge High School',
    gpa: '3.92',
    intendedMajor: 'Computer Science & AI',
    achievements: 'President of Coding Club; Science Fair Regional 1st Place',
    essayText: '',
    confirmedAccurate: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const existing = getScholarshipApplication(scholarship.id);
    setExistingApp(existing);
  }, [scholarship.id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const wordCount = formData.essayText.trim() ? formData.essayText.trim().split(/\s+/).length : 0;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.essayText) {
      addToast('Please complete all required fields and the personal statement.', 'error');
      return;
    }

    if (!formData.confirmedAccurate) {
      addToast('Please certify that your application information is accurate.', 'error');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const applicationPayload = {
        scholarshipId: scholarship.id,
        scholarshipName: scholarship.name,
        amount: scholarship.amount,
        applicant: {
          fullName: formData.fullName,
          email: formData.email,
          grade: formData.grade,
          school: formData.currentSchool,
          gpa: formData.gpa,
          intendedMajor: formData.intendedMajor
        },
        essay: formData.essayText,
        achievements: formData.achievements
      };

      const success = submitScholarshipApplication(applicationPayload);
      setIsSubmitting(false);

      if (success) {
        addToast(`Application for ${scholarship.name} submitted successfully!`, 'success');
        setExistingApp(getScholarshipApplication(scholarship.id));
      } else {
        addToast('Failed to save application. Please try again.', 'error');
      }
    }, 600);
  };

  return (
    <div className="apply-container">
      <div className="apply-header-nav">
        <button className="apply-back-btn" onClick={() => navigate('/scholarships')}>
          <ArrowLeft size={18} /> Back to Scholarships
        </button>

        <select
          style={{
            padding: '0.5rem 1rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-bg-card)',
            color: 'var(--color-text-main)',
            fontSize: '0.875rem'
          }}
          value={scholarship.id}
          onChange={(e) => navigate(`/scholarships/apply/${e.target.value}`)}
        >
          {SCHOLARSHIPS_DATA.map(s => (
            <option key={s.id} value={s.id}>
              Switch: {s.name}
            </option>
          ))}
        </select>
      </div>

      {/* Banner */}
      <div className="apply-banner-card">
        <div>
          <span className="category-pill" style={{ marginBottom: '0.5rem', display: 'inline-block' }}>
            {scholarship.category}
          </span>
          <h1 style={{ fontSize: '1.65rem', marginBottom: '0.35rem' }}>{scholarship.name}</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
            Sponsored by <strong>{scholarship.sponsor}</strong> • Deadline: <strong>{scholarship.deadline}</strong>
          </p>
        </div>

        <div className="apply-amount-badge">
          {scholarship.amount}
          <span>{scholarship.awardType}</span>
        </div>
      </div>

      {/* If already submitted */}
      {existingApp ? (
        <div className="apply-success-box">
          <div className="success-icon-wrap">
            <CheckCircle2 size={36} />
          </div>
          <h2>Application Active & Submitted</h2>
          <p style={{ color: 'var(--color-text-muted)', maxWidth: '480px' }}>
            Your application for <strong>{scholarship.name}</strong> has been transmitted to the evaluation committee.
          </p>

          <div className="receipt-meta">
            <div>
              <span style={{ color: 'var(--color-text-muted)' }}>Confirmation ID: </span>
              <strong>{existingApp.applicationId}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--color-text-muted)' }}>Status: </span>
              <span style={{ color: 'var(--color-secondary)', fontWeight: 600 }}>
                {existingApp.status}
              </span>
            </div>
            <div>
              <span style={{ color: 'var(--color-text-muted)' }}>Submission Timestamp: </span>
              <span>{new Date(existingApp.submittedAt).toLocaleDateString()}</span>
            </div>
            <div>
              <span style={{ color: 'var(--color-text-muted)' }}>Applicant Name: </span>
              <strong>{existingApp.applicant.fullName}</strong>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button className="btn btn-primary" onClick={() => navigate('/scholarships')}>
              Explore Other Scholarships
            </button>
            <button className="btn btn-outline" onClick={() => navigate('/dashboard')}>
              Return to Dashboard
            </button>
          </div>
        </div>
      ) : (
        /* Application Form */
        <form onSubmit={handleSubmit} className="apply-form-card">
          <div>
            <h3 className="form-section-title">
              <User size={18} /> 1. Applicant Academic Profile
            </h3>
            <div className="form-grid-2" style={{ marginTop: '1rem' }}>
              <div className="apply-input-group">
                <label>Full Legal Name *</label>
                <input 
                  type="text" 
                  name="fullName" 
                  required
                  value={formData.fullName} 
                  onChange={handleChange} 
                />
              </div>
              <div className="apply-input-group">
                <label>Email Address *</label>
                <input 
                  type="email" 
                  name="email" 
                  required
                  value={formData.email} 
                  onChange={handleChange} 
                />
              </div>
              <div className="apply-input-group">
                <label>Current Grade Level *</label>
                <select name="grade" value={formData.grade} onChange={handleChange}>
                  <option value="Grade 9">Grade 9</option>
                  <option value="Grade 10">Grade 10</option>
                  <option value="Grade 11">Grade 11</option>
                  <option value="Grade 12">Grade 12</option>
                  <option value="Undergraduate Year 1">Undergraduate Year 1</option>
                </select>
              </div>
              <div className="apply-input-group">
                <label>Current Cumulative GPA (Unweighted) *</label>
                <input 
                  type="text" 
                  name="gpa" 
                  required
                  placeholder="e.g. 3.9" 
                  value={formData.gpa} 
                  onChange={handleChange} 
                />
              </div>
              <div className="apply-input-group">
                <label>Current High School / Institution *</label>
                <input 
                  type="text" 
                  name="currentSchool" 
                  required
                  value={formData.currentSchool} 
                  onChange={handleChange} 
                />
              </div>
              <div className="apply-input-group">
                <label>Intended Major / Academic Focus *</label>
                <input 
                  type="text" 
                  name="intendedMajor" 
                  required
                  value={formData.intendedMajor} 
                  onChange={handleChange} 
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="form-section-title">
              <Award size={18} /> 2. Honors, Projects & Leadership
            </h3>
            <div className="apply-input-group" style={{ marginTop: '1rem' }}>
              <label>Key Extracurriculars & Achievements</label>
              <textarea 
                name="achievements" 
                rows={3} 
                placeholder="List leadership roles, hackathons, math competitions, clubs..."
                value={formData.achievements} 
                onChange={handleChange} 
              />
            </div>
          </div>

          <div>
            <h3 className="form-section-title">
              <FileText size={18} /> 3. Scholarship Essay Prompt
            </h3>
            <div style={{ marginTop: '1rem' }}>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-main)', fontWeight: 600, marginBottom: '0.5rem', lineHeight: '1.5' }}>
                Prompt: "{scholarship.essayPrompt}"
              </p>
              <div className="apply-input-group">
                <textarea 
                  name="essayText" 
                  rows={8} 
                  required
                  placeholder="Write your response here..." 
                  value={formData.essayText} 
                  onChange={handleChange} 
                />
                <div className="word-count-note">
                  Word Count: {wordCount} / {scholarship.essayWordLimit} max words
                </div>
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.25rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', fontSize: '0.875rem' }}>
              <input 
                type="checkbox" 
                name="confirmedAccurate" 
                checked={formData.confirmedAccurate} 
                onChange={handleChange} 
                required
              />
              <span>I certify that all statements and academic records submitted in this scholarship application are true and my own work.</span>
            </label>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
            <button 
              type="button" 
              className="btn btn-outline" 
              onClick={() => navigate('/scholarships')}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={isSubmitting}
            >
              <Send size={16} /> {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
