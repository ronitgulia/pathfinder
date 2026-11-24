import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ExternalLink, CheckCircle2 } from 'lucide-react';
import { SCHOLARSHIPS_DATA } from '../data/scholarshipsData';
import { getScholarshipApplications } from '../utils/storage';
import './ExploreCareers.css'; // Reusing layout styles

export default function Scholarships() {
  const [search, setSearch] = useState('');
  const [appliedIds, setAppliedIds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadApps = () => {
      const apps = getScholarshipApplications();
      setAppliedIds(apps.map(a => a.scholarshipId));
    };
    loadApps();

    window.addEventListener('pathfinder-storage-change', loadApps);
    return () => window.removeEventListener('pathfinder-storage-change', loadApps);
  }, []);

  const handleApply = (id) => {
    navigate(`/scholarships/apply/${id}`);
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
          const hasApplied = appliedIds.includes(item.id);
          return (
            <div key={item.id} className="directory-card">
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
                    <CheckCircle2 size={14} /> Applied
                  </span>
                )}
              </div>
              <h3 style={{ marginBottom: '0.5rem' }}>{item.name}</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                <strong>Deadline:</strong> {item.deadline}
              </p>
              <p style={{ color: 'var(--color-text)', fontSize: '0.875rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                <strong>Eligibility:</strong> {item.eligibility}
              </p>

              <button 
                className={`btn ${hasApplied ? 'btn-primary' : 'btn-outline'}`}
                style={{ width: '100%', justifyContent: 'center' }} 
                onClick={() => handleApply(item.id)}
              >
                <ExternalLink size={16} /> {hasApplied ? 'View Submitted Application' : 'Apply Now'}
              </button>
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
