import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Circle, 
  Bookmark, 
  Star, 
  BookOpen, 
  Compass, 
  Share2 
} from 'lucide-react';
import { CAREER_ROADMAPS, getRoadmapByCareerId } from '../data/careerRoadmaps';
import { 
  getSavedCareers, 
  saveCareer, 
  getRoadmapMilestoneProgress, 
  toggleRoadmapMilestone 
} from '../utils/storage';
import { useToast } from '../context/useToast';
import './CareerRoadmap.css';

export default function CareerRoadmap() {
  const { careerId } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const currentId = careerId ? Number(careerId) : 1;
  const roadmap = getRoadmapByCareerId(currentId);

  const [completedMilestones, setCompletedMilestones] = useState([]);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Load persisted milestones
    const persisted = getRoadmapMilestoneProgress(roadmap.id);
    setCompletedMilestones(persisted);

    // Check if saved
    const savedList = getSavedCareers();
    setIsSaved(savedList.some(c => c.id === roadmap.id));

    const handleStorageChange = () => {
      setCompletedMilestones(getRoadmapMilestoneProgress(roadmap.id));
      setIsSaved(getSavedCareers().some(c => c.id === roadmap.id));
    };

    window.addEventListener('pathfinder-storage-change', handleStorageChange);
    return () => window.removeEventListener('pathfinder-storage-change', handleStorageChange);
  }, [roadmap.id]);

  const handleMilestoneClick = (milestoneId) => {
    const isNowDone = toggleRoadmapMilestone(roadmap.id, milestoneId);
    if (isNowDone) {
      addToast('Milestone completed! Great job advancing your roadmap.', 'success');
    }
  };

  const handleToggleSave = () => {
    const nowSaved = saveCareer({
      id: roadmap.id,
      title: roadmap.title,
      category: roadmap.category,
      match: roadmap.match,
      salary: roadmap.salary,
      growth: roadmap.growth
    });
    setIsSaved(nowSaved);
    if (nowSaved) {
      addToast(`Saved ${roadmap.title} to your career profile!`, 'success');
    } else {
      addToast(`Removed ${roadmap.title} from saved careers.`, 'info');
    }
  };

  const handleShareRoadmap = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(window.location.href);
      }
      addToast('Roadmap link copied to clipboard! Share with mentors or parents.', 'success');
    } catch {
      addToast('Roadmap ready to share! Copy the link from your browser address bar.', 'info');
    }
  };

  // Calculate total and completed count
  const allMilestones = roadmap.phases.flatMap(p => p.milestones);
  const totalCount = allMilestones.length;
  const completedCount = allMilestones.filter(m => completedMilestones.includes(m.id)).length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="roadmap-container">
      <div className="roadmap-header-nav">
        <button className="roadmap-back-btn" onClick={() => navigate('/recommendations')}>
          <ArrowLeft size={18} /> Back to Recommendations
        </button>

        <div className="roadmap-header-actions">
          <select 
            style={{
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-bg-card)',
              color: 'var(--color-text-main)',
              fontSize: '0.875rem'
            }}
            value={roadmap.id}
            onChange={(e) => navigate(`/roadmap/${e.target.value}`)}
          >
            {Object.values(CAREER_ROADMAPS).map(c => (
              <option key={c.id} value={c.id}>
                Switch: {c.title}
              </option>
            ))}
          </select>

          <button 
            className={`btn ${isSaved ? 'btn-primary' : 'btn-outline'}`}
            onClick={handleToggleSave}
          >
            <Bookmark size={16} fill={isSaved ? 'currentColor' : 'none'} />
            {isSaved ? 'Saved' : 'Save Career'}
          </button>

          <button className="btn btn-outline" onClick={handleShareRoadmap}>
            <Share2 size={16} /> Share
          </button>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="roadmap-hero">
        <div className="roadmap-hero-top">
          <div>
            <div className="roadmap-badge-group">
              <span className="roadmap-pill">
                <Compass size={14} /> {roadmap.category}
              </span>
              <span className="roadmap-pill">
                <Star size={14} fill="currentColor" /> {roadmap.match}% Aptitude Match
              </span>
            </div>
            <h1>{roadmap.title} Career Roadmap</h1>
            <p className="roadmap-hero-desc">{roadmap.summary}</p>
          </div>
        </div>

        <div className="roadmap-stats-strip">
          <div className="roadmap-stat-item">
            <span className="roadmap-stat-label">Average Annual Compensation</span>
            <span className="roadmap-stat-val">{roadmap.salary}</span>
          </div>
          <div className="roadmap-stat-item">
            <span className="roadmap-stat-label">Projected 10-Yr Job Growth</span>
            <span className="roadmap-stat-val">{roadmap.growth}</span>
          </div>
          <div className="roadmap-stat-item">
            <span className="roadmap-stat-label">Roadmap Timeline</span>
            <span className="roadmap-stat-val">{roadmap.duration}</span>
          </div>
        </div>
      </div>

      {/* Progress Card */}
      <div className="roadmap-progress-card">
        <div className="roadmap-progress-info">
          <h3>Your Milestone Progress</h3>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
            {completedCount} of {totalCount} roadmap milestones unlocked
          </p>
        </div>
        <div className="roadmap-progress-bar-wrap">
          <div className="roadmap-progress-track">
            <div className="roadmap-progress-fill" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>
        <span style={{ fontWeight: 700, fontSize: '1.25rem', color: 'var(--color-secondary)' }}>
          {progressPercent}%
        </span>
      </div>

      {/* Phases Timeline */}
      <div className="roadmap-timeline">
        {roadmap.phases.map((phase) => (
          <div key={phase.phase} className="roadmap-phase-card">
            <div className="roadmap-phase-header">
              <div className="phase-title-group">
                <div className="phase-number-badge">{phase.phase}</div>
                <div>
                  <h3>{phase.title}</h3>
                  <span className="phase-timeframe">{phase.timeframe}</span>
                </div>
              </div>
            </div>

            <div className="roadmap-phase-body">
              <p className="phase-objective">{phase.objective}</p>

              <div>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '0.75rem', fontWeight: 600 }}>
                  Key Milestones & Goals
                </h4>
                <div className="milestones-list">
                  {phase.milestones.map((m) => {
                    const isDone = completedMilestones.includes(m.id);
                    return (
                      <div 
                        key={m.id} 
                        className={`milestone-item ${isDone ? 'done' : ''}`}
                        onClick={() => handleMilestoneClick(m.id)}
                      >
                        {isDone ? (
                          <CheckCircle2 size={18} className="milestone-check" />
                        ) : (
                          <Circle size={18} color="var(--color-text-muted)" />
                        )}
                        <span className="milestone-text">{m.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {phase.courses && phase.courses.length > 0 && (
                <div>
                  <h4 style={{ fontSize: '0.85rem', marginBottom: '0.5rem', color: 'var(--color-text-muted)' }}>
                    Recommended Preparation & Courses
                  </h4>
                  <div className="courses-strip">
                    {phase.courses.map((course, idx) => (
                      <span key={idx} className="course-chip">
                        <BookOpen size={12} style={{ display: 'inline', marginRight: '4px' }} />
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
