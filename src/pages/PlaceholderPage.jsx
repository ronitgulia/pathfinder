import React from 'react';
import { Settings, Sparkles } from 'lucide-react';

export default function PlaceholderPage({ title }) {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center' }}>
      <div style={{ padding: '2rem', backgroundColor: 'var(--color-bg-body)', borderRadius: 'var(--radius-full)', marginBottom: '1.5rem' }}>
        <Sparkles size={48} color="var(--color-primary)" />
      </div>
      <h2>{title}</h2>
      <p style={{ color: 'var(--color-text-muted)', maxWidth: '400px', marginTop: '1rem' }}>
        This module is currently being powered up by our AI engine. Check back soon for personalized insights!
      </p>
      <button className="btn btn-primary" style={{ marginTop: '2rem' }}>
        Return to Dashboard
      </button>
    </div>
  );
}
