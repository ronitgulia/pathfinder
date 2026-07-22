import React, { useState } from 'react';
import { Search, ExternalLink } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import './ExploreCareers.css'; // Reusing layout styles

const MOCK_SCHOLARSHIPS = [
  { id: 1, name: 'Women in Tech Scholarship', amount: '$10,000', deadline: 'Oct 15, 2026', eligibility: 'Female students in CS' },
  { id: 2, name: 'National STEM Excellence', amount: 'Full Tuition', deadline: 'Nov 1, 2026', eligibility: 'High aptitude in Math/Science' },
  { id: 3, name: 'Future Leaders Grant', amount: '$5,000', deadline: 'Dec 31, 2026', eligibility: 'Leadership experience' },
];

export default function Scholarships() {
  const [search, setSearch] = useState('');
  const { addToast } = useToast();

  const handleApply = (name) => {
    addToast(`Redirecting to application portal for ${name}...`, 'info');
  };

  const filtered = MOCK_SCHOLARSHIPS.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.eligibility.toLowerCase().includes(search.toLowerCase())
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
            placeholder="Search scholarships..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="directory-grid">
        {filtered.map(item => (
          <div key={item.id} className="directory-card">
            <div className="directory-header">
              <span className="category-pill">{item.amount}</span>
            </div>
            <h3 style={{ marginBottom: '0.5rem' }}>{item.name}</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: '1rem' }}>
              <strong>Deadline:</strong> {item.deadline}
            </p>
            <p style={{ color: 'var(--color-text)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
              <strong>Eligibility:</strong> {item.eligibility}
            </p>

            <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }} onClick={() => handleApply(item.name)}>
              <ExternalLink size={16} /> Apply Now
            </button>
          </div>
        ))}

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
