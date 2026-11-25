import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Award, 
  CheckCircle2, 
  FileText, 
  User, 
  Send,
  Download,
  RefreshCw,
  Clock
} from 'lucide-react';
import { getScholarshipById, SCHOLARSHIPS_DATA } from '../data/scholarshipsData';
import { 
  getScholarshipApplicationsByScholarship,
  submitScholarshipApplication 
} from '../utils/storage';
import { downloadScholarshipApplicationPDF } from '../utils/pdfReport';
import { useAuth } from '../context/useAuth';
import { useToast } from '../context/useToast';
import './ScholarshipApply.css';

const buildFreshFormData = (user) => ({
  fullName: user?.name || '',
  email: user?.email || '',
  grade: user?.grade || 'Grade 10',
  currentSchool: '',
  gpa: '',
  intendedMajor: '',
  achievements: '',
  essayText: '',
  confirmedAccurate: false
});

export default function ScholarshipApply() {
  const { scholarshipId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToast } = useToast();

  const currentId = scholarshipId ? Number(scholarshipId) : 1;
  const scholarship = getScholarshipById(currentId);

  const [appHistory, setAppHistory] = useState([]);
  const [isReapplying, setIsReapplying] = useState(false);
  const [formData, setFormData] = useState(() => buildFreshFormData(user));
  const [isSubmitting, setIsSubmitting] = useState(false);

  const refreshApplications = useCallback(() => {
    const history = getScholarshipApplicationsByScholarship(scholarship.id);
    setAppHistory(history);
  }, [scholarship.id]);

  useEffect(() => {
    refreshApplications();
    setIsReapplying(false);
    setFormData(buildFreshFormData(user));

    window.addEventListener('pathfinder-storage-change', refreshApplications);
    return () => window.removeEventListener('pathfinder-storage-change', refreshApplications);
  }, [refreshApplications, user]);

  const latestApp = appHistory.length > 0 ? appHistory[0] : null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const wordCount = formData.essayText.trim() ? formData.essayText.trim().split(/\s+/).length : 0;

  const handleApplyAgain = () => {
    setFormData(buildFreshFormData(user));
    setIsReapplying(true);
    addToast('Application form reset. You can now submit a new application.', 'info');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDownloadPdf = (applicationToDownload) => {
    const targetApp = applicationToDownload || latestApp;
    if (!targetApp) {
      addToast('No submitted application data found to export.', 'error');
      return;
    }
    try {
      downloadScholarshipApplicationPDF(targetApp, scholarship, user);
      addToast('Application PDF report downloaded successfully!', 'success');
    } catch (err) {
      console.error('Failed to generate application PDF', err);
      addToast('Unable to generate PDF report. Please try again.', 'error');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.currentSchool.trim() ||
      !formData.gpa.trim() ||
      !formData.intendedMajor.trim() ||
      !formData.essayText.trim()
    ) {
      addToast('Please complete all required fields and your personal statement.', 'error');
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
          fullName: formData.fullName.trim(),
          email: formData.email.trim(),
          grade: formData.grade,
          school: formData.currentSchool.trim(),
          gpa: formData.gpa.trim(),
          intendedMajor: formData.intendedMajor.trim()
        },
        essay: formData.essayText.trim(),
        achievements: formData.achievements.trim()
      };

      const createdApp = submitScholarshipApplication(applicationPayload);
      setIsSubmitting(false);

      if (createdApp) {
        addToast(`Application for ${scholarship.name} submitted successfully!`, 'success');
        setIsReapplying(false);
        setFormData(buildFreshFormData(user));
        refreshApplications();
      } else {
        addToast('Failed to save application. Please try again.', 'error');
      }
    }, 500);
  };

  const showSuccessReceipt = Boolean(latestApp) && !isReapplying;

  return (
    <div className="apply-container">
      <div className="apply-header-nav">
        <button className="apply-back-btn" onClick={() => navigate('/scholarships')}>
          <ArrowLeft size={18} /> Back to Scholarships
        </button>

        <select
          className="apply-switch-select"
          aria-label="Switch scholarship"
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

      {showSuccessReceipt ? (
        <div className="apply-success-box">
          <div className="success-icon-wrap">
            <CheckCircle2 size={36} />
          </div>
          <h2>Application Active & Submitted</h2>
          <p style={{ color: 'var(--color-text-muted)', maxWidth: '500px' }}>
            Your application for <strong>{scholarship.name}</strong> has been saved and transmitted to the evaluation committee.
          </p>

          <div className="receipt-meta">
            <div>
              <span style={{ color: 'var(--color-text-muted)' }}>Confirmation ID: </span>
              <strong>{latestApp.applicationId}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--color-text-muted)' }}>Status: </span>
              <span style={{ color: 'var(--color-secondary)', fontWeight: 600 }}>
                {latestApp.status}
              </span>
            </div>
            <div>
              <span style={{ color: 'var(--color-text-muted)' }}>Submission Timestamp: </span>
              <span>{new Date(latestApp.submittedAt).toLocaleString()}</span>
            </div>
            <div>
              <span style={{ color: 'var(--color-text-muted)' }}>Applicant Name: </span>
              <strong>{latestApp.applicant?.fullName}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--color-text-muted)' }}>School & GPA: </span>
              <span>{latestApp.applicant?.school} • GPA {latestApp.applicant?.gpa}</span>
            </div>
            <div>
              <span style={{ color: 'var(--color-text-muted)' }}>Intended Major: </span>
              <span>{latestApp.applicant?.intendedMajor}</span>
            </div>
          </div>

          <div className="apply-receipt-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handleDownloadPdf(latestApp)}
            >
              <Download size={16} /> Download PDF Report
            </button>
            <button
              type="button"
              className="btn btn-secondary-action"
              onClick={handleApplyAgain}
            >
              <RefreshCw size={16} /> Apply Again
            </button>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => navigate('/scholarships')}
            >
              Explore Other Scholarships
            </button>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => navigate('/dashboard')}
            >
              Return to Dashboard
            </button>
          </div>

          {appHistory.length > 1 && (
            <div className="apply-history-section">
              <h4>
                <Clock size={15} /> Submission History ({appHistory.length} Applications)
              </h4>
              <div className="apply-history-list">
                {appHistory.map((item, idx) => (
                  <div key={item.applicationId} className="apply-history-row">
                    <div className="apply-history-meta">
                      <strong>{item.applicationId}</strong>
                      <span>
                        {idx === 0 ? 'Latest • ' : ''}
                        {new Date(item.submittedAt).toLocaleString()} • {item.status}
                      </span>
                    </div>
                    <button
                      type="button"
                      className="btn btn-outline apply-history-pdf-btn"
                      onClick={() => handleDownloadPdf(item)}
                    >
                      <Download size={14} /> PDF
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Application Form */
        <form onSubmit={handleSubmit} className="apply-form-card">
          {isReapplying && latestApp && (
            <div className="reapply-notice-banner">
              <div>
                <strong>New Application Mode</strong>
                <p>
                  Previous submission ({latestApp.applicationId}) is preserved. Complete this form to submit a new application.
                </p>
              </div>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setIsReapplying(false)}
              >
                View Latest Receipt
              </button>
            </div>
          )}

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
                  placeholder="Enter your full legal name"
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
                  placeholder="student@example.com"
                  value={formData.email} 
                  onChange={handleChange} 
                />
              </div>
              <div className="apply-input-group">
                <label>Current Grade Level *</label>
                <select name="grade" value={formData.grade} onChange={handleChange}>
                  <option value="Grade 8">Grade 8</option>
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
                  placeholder="e.g. 3.92" 
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
                  placeholder="e.g. Oakridge High School"
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
                  placeholder="e.g. Computer Science & AI"
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
                <div className={`word-count-note ${wordCount > scholarship.essayWordLimit ? 'over-limit' : ''}`}>
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

          <div className="apply-form-actions">
            <button 
              type="button" 
              className="btn btn-outline" 
              onClick={() => (isReapplying && latestApp ? setIsReapplying(false) : navigate('/scholarships'))}
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
