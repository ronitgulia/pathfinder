import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '70vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <div style={{
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        backgroundColor: 'rgba(30, 58, 138, 0.08)',
        color: 'var(--color-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1.5rem'
      }}>
        <Compass size={40} />
      </div>
      <h1 style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
        404
      </h1>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Page Not Found</h2>
      <p style={{ color: 'var(--color-text-muted)', maxWidth: '440px', lineHeight: '1.6', marginBottom: '2rem' }}>
        The path you are trying to reach doesn't exist or may have been moved. Let's guide you back to your career navigation center.
      </p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button 
          className="btn btn-outline" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={16} /> Go Back
        </button>
        <button 
          className="btn btn-primary" 
          onClick={() => navigate('/dashboard')}
        >
          <Home size={16} /> Dashboard
        </button>
      </div>
    </div>
  );
}
