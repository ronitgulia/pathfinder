import React, { useState } from 'react';
import { Search, Filter, Bookmark, Briefcase, TrendingUp } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import './ExploreCareers.css';

const MOCK_CAREERS = [
  { id: 1, title: 'UX Designer', category: 'Design', match: 88, salary: 'Medium', growth: '+15%' },
  { id: 2, title: 'Data Scientist', category: 'Tech', match: 98, salary: 'High', growth: '+31%' },
  { id: 3, title: 'Financial Analyst', category: 'Finance', match: 92, salary: 'High', growth: '+9%' },
  { id: 4, title: 'Software Engineer', category: 'Tech', match: 85, salary: 'High', growth: '+22%' },
  { id: 5, title: 'Marketing Manager', category: 'Business', match: 78, salary: 'Medium', growth: '+10%' },
  { id: 6, title: 'Psychologist', category: 'Healthcare', match: 82, salary: 'Medium', growth: '+14%' },
];

export default function ExploreCareers() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [saved, setSaved] = useState([]);
  const { addToast } = useToast();

  const toggleSave = (id, title) => {
    if (saved.includes(id)) {
      setSaved(saved.filter(c => c !== id));
      addToast(`Removed ${title} from saved.`, 'info');
    } else {
      setSaved([...saved, id]);
      addToast(`Saved ${title} to your profile.`, 'success');
    }
  };

  const filteredCareers = MOCK_CAREERS.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' || c.category === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="explore-container">
      <div className="explore-header">
        <h1>Explore Careers</h1>
        <p className="subtitle">Discover over 1,000+ career paths mapped to your skills.</p>
      </div>

      <div className="explore-controls">
        <div className="search-bar">
          <Search size={20} className="icon" />
          <input 
            type="text" 
            placeholder="Search careers..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className="filter-group">
          <Filter size={20} className="icon" />
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="All">All Categories</option>
            <option value="Tech">Tech</option>
            <option value="Design">Design</option>
            <option value="Finance">Finance</option>
            <option value="Business">Business</option>
            <option value="Healthcare">Healthcare</option>
          </select>
        </div>
      </div>

      <div className="directory-grid">
        {filteredCareers.map(career => (
          <div key={career.id} className="directory-card">
            <div className="directory-header">
              <span className="category-pill">{career.category}</span>
              <button 
                className={`save-btn ${saved.includes(career.id) ? 'active' : ''}`}
                onClick={() => toggleSave(career.id, career.title)}
              >
                <Bookmark size={18} fill={saved.includes(career.id) ? 'currentColor' : 'none'} />
              </button>
            </div>
            <h3>{career.title}</h3>
            <div className="directory-stats">
              <span><TrendingUp size={14}/> {career.growth}</span>
              <span><Briefcase size={14}/> {career.salary}</span>
            </div>
          </div>
        ))}
        
        {filteredCareers.length === 0 && (
          <div className="empty-state">
            <Search size={48} />
            <h3>No careers found</h3>
            <p>Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
