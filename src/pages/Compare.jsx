import React, { useState } from 'react';
import { Scale, Check } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import './ExploreCareers.css'; // Reusing layout

export default function Compare() {
  const { addToast } = useToast();
  
  const handleCompare = () => {
    addToast('Generating comparison report...', 'info');
  };

  return (
    <div className="explore-container">
      <div className="explore-header">
        <h1>Compare Careers</h1>
        <p className="subtitle">Select two careers to see a side-by-side comparison of skills, salary, and growth.</p>
      </div>

      <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem', alignItems: 'center' }}>
        <div className="card" style={{ flex: 1, padding: '2rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Career A</label>
          <select style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
            <option>Data Scientist</option>
            <option>Software Engineer</option>
            <option>Financial Analyst</option>
          </select>
        </div>
        
        <div style={{ background: 'var(--color-background)', padding: '1rem', borderRadius: '50%', color: 'var(--color-text-muted)' }}>
          <Scale size={24} />
        </div>

        <div className="card" style={{ flex: 1, padding: '2rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Career B</label>
          <select style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
            <option>Software Engineer</option>
            <option>Data Scientist</option>
            <option>UX Designer</option>
          </select>
        </div>
      </div>
      
      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <button className="btn btn-primary" onClick={handleCompare} style={{ padding: '0.75rem 2rem' }}>
          Compare Now
        </button>
      </div>
    </div>
  );
}
