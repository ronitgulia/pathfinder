import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, Globe, ChevronDown } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import './Header.css';

export default function Header() {
  const [search, setSearch] = useState('');
  const { addToast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const query = search.trim();
    if (query) {
      navigate(`/explore?search=${encodeURIComponent(query)}`);
      setSearch('');
    }
  };

  const handleAction = (action) => {
    addToast(`${action} clicked!`, 'info');
  };

  return (
    <header className="header">
      <div className="header-search">
        <Search className="search-icon" size={20} />
        <form onSubmit={handleSearch} style={{ width: '100%' }}>
          <input 
            type="text" 
            placeholder="Search careers, colleges, scholarships..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </div>

      <div className="header-actions">
        <button className="icon-btn" onClick={() => handleAction('Language Settings')}>
          <Globe size={20} />
        </button>
        <button className="icon-btn" onClick={() => handleAction('Notifications')}>
          <Bell size={20} />
          <span className="badge">3</span>
        </button>
        
        <div className="user-profile" onClick={() => handleAction('Profile Settings')}>
          <div className="avatar">
            {user ? user.initials : 'U'}
          </div>
          <div className="user-info">
            <span className="user-name">{user ? user.name : 'Student'}</span>
            <span className="user-grade">{user ? user.grade : 'Grade 10'}</span>
          </div>
          <ChevronDown size={16} className="chevron" />
        </div>
      </div>
    </header>
  );
}
