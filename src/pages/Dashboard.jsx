import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, Share2, CheckCircle2, Trophy, Star, Target, Brain, Bookmark } from 'lucide-react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Cell
} from 'recharts';
import { useToast } from '../context/ToastContext';
import './Dashboard.css';

const aptitudeData = [
  { subject: 'Verbal', A: 90, fullMark: 100 },
  { subject: 'Spatial', A: 50, fullMark: 100 },
  { subject: 'Abstract', A: 40, fullMark: 100 },
  { subject: 'Numerical', A: 85, fullMark: 100 },
];

const interestData = [
  { name: 'Artistic', score: 80, color: 'var(--color-secondary)' },
  { name: 'Conventional', score: 75, color: 'var(--color-secondary)' },
  { name: 'Enterprising', score: 75, color: 'var(--color-secondary)' },
  { name: 'Investigative', score: 100, color: 'var(--color-secondary)' },
  { name: 'Realistic', score: 95, color: 'var(--color-secondary)' },
  { name: 'Social', score: 60, color: 'var(--color-accent)' },
];

export default function Dashboard() {
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleDownload = () => {
    addToast('Generating PDF Report... Download will start shortly.', 'info');
    setTimeout(() => addToast('PDF Report downloaded successfully!', 'success'), 2000);
  };

  const handleShare = () => {
    addToast('Report link copied to clipboard. You can now share it with your parents.', 'success');
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Welcome back, Student! 👋</h1>
          <p className="subtitle">All assessments complete — explore your recommendations!</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-outline" onClick={handleDownload}>
            <Download size={16} />
            Download PDF Report
          </button>
          <button className="btn btn-primary" onClick={handleShare}>
            <Share2 size={16} />
            Share with Parents
          </button>
        </div>
      </div>

      <div className="dashboard-widgets">
        <div className="card widget-progress">
          <h3>Your Progress</h3>
          <div className="progress-content">
            <div className="progress-circle">
              <svg viewBox="0 0 36 36" className="circular-chart">
                <path className="circle-bg"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path className="circle"
                  strokeDasharray="100, 100"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <text x="18" y="20.35" className="percentage">100%</text>
              </svg>
            </div>
            <div className="progress-details">
              <p>3/3 completed</p>
              <ul>
                <li><CheckCircle2 size={14} className="check-icon" /> Aptitude Test</li>
                <li><CheckCircle2 size={14} className="check-icon" /> Interests</li>
                <li><CheckCircle2 size={14} className="check-icon" /> Personality</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="card widget-badges">
          <h3>Badges</h3>
          <div className="badges-container">
            <div className="badge-item">
              <div className="badge-icon-wrap"><Trophy size={20} /></div>
              <span>PathFinder Pro</span>
            </div>
            <div className="badge-item">
              <div className="badge-icon-wrap"><Star size={20} /></div>
              <span>Self-Aware Star</span>
            </div>
            <div className="badge-item">
              <div className="badge-icon-wrap"><Target size={20} /></div>
              <span>Interest Explorer</span>
            </div>
            <div className="badge-item">
              <div className="badge-icon-wrap"><Brain size={20} /></div>
              <span>Aptitude Ace</span>
            </div>
          </div>
        </div>

        <div className="card widget-saved">
          <div className="widget-header-row">
            <h3>Saved Careers</h3>
            <button className="link-btn" onClick={() => navigate('/recommendations')}>View all</button>
          </div>
          <div className="saved-empty">
            <Bookmark size={24} className="bookmark-icon" />
            <p>Bookmark careers you like to revisit them here.</p>
          </div>
        </div>
      </div>

      <div className="dashboard-charts">
        <div className="card chart-card">
          <div className="widget-header-row">
            <h3>Aptitude Profile</h3>
            <button className="link-btn" onClick={() => navigate('/aptitude')}>Retake</button>
          </div>
          <div className="chart-container radar-container">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={aptitudeData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }} />
                <Radar name="Student" dataKey="A" stroke="var(--color-primary)" fill="var(--color-primary)" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-insight">
            <p>💡 With exceptionally high scores in numerical and verbal domains, you have a strong foundation for careers in fields like finance, law, or management. Your spatial reasoning skills, although relatively weaker, can still be developed with practice and dedication. The abstract reasoning domain appears to be the area where you need the most improvement.</p>
          </div>
        </div>

        <div className="card chart-card">
          <div className="widget-header-row">
            <h3>Interest Profile (RIASEC)</h3>
            <button className="link-btn" onClick={() => navigate('/interests')}>Retake</button>
          </div>
          <div className="chart-container bar-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={interestData}
                margin={{ top: 20, right: 30, left: -20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                <XAxis dataKey="name" tick={{ fill: 'var(--color-text-muted)', fontSize: 10 }} axisLine={true} tickLine={false} />
                <YAxis tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }} axisLine={true} tickLine={false} />
                <RechartsTooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                  {
                    interestData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))
                  }
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-insight">
            <p>Your Holland Code: <strong>IRA</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
}
