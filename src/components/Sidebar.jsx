import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BrainCircuit, 
  Compass, 
  User, 
  Star, 
  Briefcase, 
  Scale, 
  GraduationCap, 
  Award, 
  LogOut,
  Sparkles
} from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/aptitude', label: 'Aptitude Test', icon: BrainCircuit },
  { path: '/interests', label: 'Interests', icon: Compass },
  { path: '/personality', label: 'Personality', icon: User },
  { path: '/recommendations', label: 'Recommendations', icon: Star },
  { path: '/explore', label: 'Explore Careers', icon: Briefcase },
  { path: '/compare', label: 'Compare', icon: Scale },
  { path: '/colleges', label: 'Colleges', icon: GraduationCap },
  { path: '/scholarships', label: 'Scholarships', icon: Award },
];

export default function Sidebar() {
  const { addToast } = useToast();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    addToast('Logging out...', 'info');
    setTimeout(() => {
      logout();
      navigate('/login');
    }, 500);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <Sparkles className="brand-icon" size={24} />
        <h2>PathFinder <span>AI</span></h2>
      </div>
      
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
      
      <div className="sidebar-footer">
        <button className="nav-link logout-btn" onClick={handleLogout} style={{ width: '100%' }}>
          <LogOut size={20} />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
}

