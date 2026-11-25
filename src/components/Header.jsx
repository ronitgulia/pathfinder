import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, Globe, ChevronDown, LogOut, User as UserIcon, CheckCircle2, Award } from 'lucide-react';
import { useToast } from '../context/useToast';
import { useAuth } from '../context/useAuth';
import { getAssessmentsState, getSavedCareers, getScholarshipApplications } from '../utils/storage';
import './Header.css';

export default function Header() {
  const [search, setSearch] = useState('');
  const [openMenu, setOpenMenu] = useState(null); // 'notifications' | 'profile' | null
  const [stats, setStats] = useState({ completed: 3, savedCount: 0, appsCount: 0 });
  const { addToast } = useToast();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const actionsRef = useRef(null);

  useEffect(() => {
    const loadStats = () => {
      const assessments = getAssessmentsState();
      const completed = [assessments.aptitude, assessments.interests, assessments.personality].filter(Boolean).length;
      const savedCount = getSavedCareers().length;
      const appsCount = getScholarshipApplications().length;
      setStats({ completed, savedCount, appsCount });
    };
    loadStats();
    window.addEventListener('pathfinder-storage-change', loadStats);
    return () => window.removeEventListener('pathfinder-storage-change', loadStats);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (actionsRef.current && !actionsRef.current.contains(e.target)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = search.trim();
    if (query) {
      navigate(`/explore?search=${encodeURIComponent(query)}`);
      setSearch('');
    }
  };

  const handleLanguage = () => {
    setOpenMenu(null);
    addToast('Language is set to English (US).', 'info');
  };

  const handleLogout = () => {
    setOpenMenu(null);
    addToast('Logging out...', 'info');
    setTimeout(() => {
      logout();
      navigate('/login');
    }, 300);
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

      <div className="header-actions" ref={actionsRef}>
        <button
          type="button"
          className="icon-btn"
          title="Language: English (US)"
          aria-label="Language Settings"
          onClick={handleLanguage}
        >
          <Globe size={20} />
        </button>

        <div className="header-menu-wrap">
          <button
            type="button"
            className="icon-btn"
            aria-label="Notifications"
            onClick={() => setOpenMenu(openMenu === 'notifications' ? null : 'notifications')}
          >
            <Bell size={20} />
            <span className="badge"></span>
          </button>

          {openMenu === 'notifications' && (
            <div className="header-dropdown notifications-dropdown">
              <div className="dropdown-title">Activity Summary</div>
              <div className="dropdown-item" onClick={() => { setOpenMenu(null); navigate('/dashboard'); }}>
                <CheckCircle2 size={16} color="var(--color-secondary)" />
                <span>{stats.completed}/3 Assessments completed</span>
              </div>
              <div className="dropdown-item" onClick={() => { setOpenMenu(null); navigate('/recommendations'); }}>
                <UserIcon size={16} color="var(--color-primary)" />
                <span>{stats.savedCount} Saved career path{stats.savedCount === 1 ? '' : 's'}</span>
              </div>
              <div className="dropdown-item" onClick={() => { setOpenMenu(null); navigate('/scholarships'); }}>
                <Award size={16} color="var(--color-accent)" />
                <span>{stats.appsCount} Scholarship application{stats.appsCount === 1 ? '' : 's'} submitted</span>
              </div>
            </div>
          )}
        </div>
        
        <div className="header-menu-wrap">
          <button
            type="button"
            className="user-profile"
            onClick={() => setOpenMenu(openMenu === 'profile' ? null : 'profile')}
          >
            <div className="avatar">
              {user ? user.initials : 'U'}
            </div>
            <div className="user-info">
              <span className="user-name">{user ? user.name : 'Student'}</span>
              <span className="user-grade">{user ? user.grade : 'Grade 10'}</span>
            </div>
            <ChevronDown size={16} className="chevron" />
          </button>

          {openMenu === 'profile' && (
            <div className="header-dropdown profile-dropdown">
              <div className="dropdown-user-meta">
                <strong>{user?.name || 'Student'}</strong>
                <span>{user?.email || ''}</span>
                <span className="dropdown-grade-pill">{user?.grade || 'Grade 10'}</span>
              </div>
              <button
                type="button"
                className="dropdown-item"
                onClick={() => { setOpenMenu(null); navigate('/dashboard'); }}
              >
                <UserIcon size={16} /> Dashboard
              </button>
              <button
                type="button"
                className="dropdown-item danger"
                onClick={handleLogout}
              >
                <LogOut size={16} /> Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
