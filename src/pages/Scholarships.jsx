import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ExternalLink, CheckCircle2, Download, RefreshCw } from 'lucide-react';
import { SCHOLARSHIPS_DATA } from '../data/scholarshipsData';
import { getScholarshipApplications } from '../utils/storage';
import { downloadScholarshipApplicationPDF } from '../utils/pdfReport';
import { useAuth } from '../context/useAuth';
import { useToast } from '../context/useToast';
import './ExploreCareers.css'; // Reusing layout styles

export default function Scholarships() {
  const [search, setSearch] = useState('');
  const [applicationsByScholarship, setApplicationsByScholarship] = useState({});
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToast } = useToast();

  useEffect(() => {
    const loadApps = () => {
      const apps = getScholarshipApplications();
      const grouped = {};
      apps.forEach((app) => {
        const sid = Number(app.scholarshipId);
        if (!grouped[sid]) {
          grouped[sid] = [];
        }
        grouped[sid].push(app);
      });
      Object.keys(grouped).forEach((sid) => {
        grouped[sid].sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
      });
      setApplicationsByScholarship(grouped);
    };
    loadApps();

    window.addEventListener('pathfinder-storage-change', loadApps);
    return () => window.removeEventListener('pathfinder-storage-change', loadApps);
  }, []);

  const handleApply = (id) => {
    navigate(`/scholarships/apply/${id}`);
  };

  const handleQuickDownload = (scholarship, latestApp) => {
    if (!latestApp) return;
    try {
      downloadScholarshipApplicationPDF(latestApp, scholarship, user);
      addToast(`Downloaded PDF report for ${scholarship.name}.`, 'success');
    } catch (err) {
      console.error('PDF download error', err);
      addToast('Failed to download PDF report.', 'error');
    }
  };

  const filtered = SCHOLARSHIPS_DATA.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.eligibility.toLowerCase().includes(search.toLowerCase()) ||
    s.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="explore-container">
      <div className="explore-header">
        <h1>Scholarships & Grants</h1>
        <p className="subtitle">Financial aid opportunities tailored to your profile.</p>
      </div>

      <div className="explore-controls">
        <div className="search-bar">
          <Search size={20} className="icon" />
          <input 
            type="text" 
            placeholder="Search scholarships, eligibility, or keywords..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="directory-grid">
        {filtered.map(item => {
          const itemApps = applicationsByScholarship[item.id] || [];
          const hasApplied = itemApps.length > 0;
          const latestApp = hasApplied ? itemApps[0] : null;
          return (
            <div key={item.id} className="directory-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="directory-header">
                <span className="category-pill">{item.amount}</span>
                {hasApplied && (
                  <span style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '4px', 
                    fontSize: '0.75rem', 
                    fontWeight: 600, 
                    color: 'var(--color-secondary)' 
                  }}>
                    <CheckCircle2 size={14} /> Applied{itemApps.length > 1 ? ` (${itemApps.length})` : ''}
                  </span>
                )}
              </div>
              <h3 style={{ marginBottom: '0.5rem' }}>{item.name}</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                <strong>Deadline:</strong> {item.deadline}
              </p>
              <p style={{ color: 'var(--color-text)', fontSize: '0.875rem', marginBottom: '1.5rem', lineHeight: '1.5', flex: 1 }}>
                <strong>Eligibility:</strong> {item.eligibility}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <button 
                  className={`btn ${hasApplied ? 'btn-primary' : 'btn-outline'}`}
                  style={{ width: '100%', justifyContent: 'center' }} 
                  onClick={() => handleApply(item.id)}
                >
                  {hasApplied ? <RefreshCw size={16} /> : <ExternalLink size={16} />}
                  {hasApplied ? 'View / Apply Again' : 'Apply Now'}
                </button>
                {hasApplied && latestApp && (
                  <button
                    type="button"
                    className="btn btn-outline"
                    style={{ width: '100%', justifyContent: 'center' }}
                    onClick={() => handleQuickDownload(item, latestApp)}
                  >
                    <Download size={16} /> Download PDF Report
                  </button>
                )}
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="empty-state">
            <Search size={48} />
            <h3>No scholarships found</h3>
            <p>Try searching for a different keyword or eligibility criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
