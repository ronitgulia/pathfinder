import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Star, GraduationCap } from 'lucide-react';
import { COLLEGES_DATA } from '../data/collegesData';
import './ExploreCareers.css'; // Reusing layout styles

export default function Colleges() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleViewRequirements = (id) => {
    navigate(`/colleges/${id}/requirements`);
  };

  const filteredColleges = COLLEGES_DATA.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.location.toLowerCase().includes(search.toLowerCase()) ||
    c.programs.some(p => p.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="explore-container">
      <div className="explore-header">
        <h1>Recommended Colleges</h1>
        <p className="subtitle">Institutions matching your career goals and aptitude profile.</p>
      </div>

      <div className="explore-controls">
        <div className="search-bar">
          <Search size={20} className="icon" />
          <input 
            type="text" 
            placeholder="Search universities, locations, or programs..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="directory-grid">
        {filteredColleges.map(college => (
          <div key={college.id} className="directory-card">
            <div className="directory-header">
              <span className="category-pill">{college.type}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-success)', fontWeight: 600, fontSize: '0.875rem' }}>
                <Star size={14} fill="currentColor" /> {college.match}% Match
              </div>
            </div>
            <h3 style={{ marginBottom: '0.5rem' }}>{college.name}</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: '1rem' }}>
              <MapPin size={14} /> {college.location}
            </div>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {college.programs.map((prog, idx) => (
                <span key={idx} style={{ fontSize: '0.75rem', background: 'var(--color-background)', padding: '4px 8px', borderRadius: '4px' }}>
                  {prog}
                </span>
              ))}
            </div>

            <button 
              className="btn btn-outline" 
              style={{ width: '100%', justifyContent: 'center' }} 
              onClick={() => handleViewRequirements(college.id)}
            >
              <GraduationCap size={16} /> View Requirements
            </button>
          </div>
        ))}

        {filteredColleges.length === 0 && (
          <div className="empty-state">
            <Search size={48} />
            <h3>No colleges found</h3>
            <p>Try adjusting your search query.</p>
          </div>
        )}
      </div>
    </div>
  );
}
