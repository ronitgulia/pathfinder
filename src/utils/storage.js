const SAVED_CAREERS_KEY = 'pathfinder_saved_careers';
const ASSESSMENTS_KEY = 'pathfinder_assessments';
const SCHOLARSHIP_APPLICATIONS_KEY = 'pathfinder_scholarship_applications';
const ROADMAP_PROGRESS_KEY = 'pathfinder_roadmap_milestones';
const SAVED_COLLEGES_KEY = 'pathfinder_saved_colleges';
const COLLEGE_CHECKLIST_KEY = 'pathfinder_college_checklists';

export const getSavedCareers = () => {
  try {
    const raw = localStorage.getItem(SAVED_CAREERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Failed to parse saved careers', err);
    return [];
  }
};

export const saveCareer = (career) => {
  try {
    const saved = getSavedCareers();
    const exists = saved.some(item => item.id === career.id);
    let updated;
    if (exists) {
      updated = saved.filter(item => item.id !== career.id);
    } else {
      updated = [...saved, career];
    }
    localStorage.setItem(SAVED_CAREERS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('pathfinder-storage-change'));
    return !exists;
  } catch (err) {
    console.error('Failed to save career', err);
    return false;
  }
};

export const removeCareer = (id) => {
  try {
    const saved = getSavedCareers();
    const updated = saved.filter(item => item.id !== id);
    localStorage.setItem(SAVED_CAREERS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('pathfinder-storage-change'));
  } catch (err) {
    console.error('Failed to remove career', err);
  }
};

export const isCareerSaved = (id) => {
  const saved = getSavedCareers();
  return saved.some(item => item.id === id);
};

export const getAssessmentsState = () => {
  try {
    const raw = localStorage.getItem(ASSESSMENTS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to parse assessments', err);
  }
  return {
    aptitude: true,
    interests: true,
    personality: true,
  };
};

export const setAssessmentCompleted = (key) => {
  try {
    const current = getAssessmentsState();
    const updated = { ...current, [key]: true };
    localStorage.setItem(ASSESSMENTS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('pathfinder-storage-change'));
  } catch (err) {
    console.error('Failed to update assessment', err);
  }
};

// Scholarship Application Persistence (supports multiple applications / Apply Again)
export const getScholarshipApplications = () => {
  try {
    const raw = localStorage.getItem(SCHOLARSHIP_APPLICATIONS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Failed to parse scholarship applications', err);
    return [];
  }
};

export const submitScholarshipApplication = (application) => {
  try {
    const applications = getScholarshipApplications();
    const uniqueSuffix = Math.random().toString(36).slice(2, 6).toUpperCase();
    const newApp = {
      ...application,
      scholarshipId: Number(application.scholarshipId),
      applicationId: `APP-${Date.now().toString(36).toUpperCase()}-${uniqueSuffix}`,
      status: 'Submitted - Under Review',
      submittedAt: new Date().toISOString()
    };
    const updated = [...applications, newApp];
    localStorage.setItem(SCHOLARSHIP_APPLICATIONS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('pathfinder-storage-change'));
    return newApp;
  } catch (err) {
    console.error('Failed to submit scholarship application', err);
    return null;
  }
};

export const getScholarshipApplicationsByScholarship = (scholarshipId) => {
  const numericId = Number(scholarshipId);
  const applications = getScholarshipApplications();
  return applications
    .filter(a => Number(a.scholarshipId) === numericId)
    .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
};

export const getScholarshipApplication = (scholarshipId) => {
  const list = getScholarshipApplicationsByScholarship(scholarshipId);
  return list.length > 0 ? list[0] : null;
};

export const hasAppliedScholarship = (scholarshipId) => {
  return Boolean(getScholarshipApplication(scholarshipId));
};

// Roadmap Milestone Progress Persistence
export const getRoadmapMilestoneProgress = (careerId) => {
  try {
    const raw = localStorage.getItem(ROADMAP_PROGRESS_KEY);
    const store = raw ? JSON.parse(raw) : {};
    return store[careerId] || [];
  } catch (err) {
    console.error('Failed to read roadmap progress', err);
    return [];
  }
};

export const toggleRoadmapMilestone = (careerId, milestoneId) => {
  try {
    const raw = localStorage.getItem(ROADMAP_PROGRESS_KEY);
    const store = raw ? JSON.parse(raw) : {};
    const careerMilestones = store[careerId] || [];
    
    let updatedCareerMilestones;
    if (careerMilestones.includes(milestoneId)) {
      updatedCareerMilestones = careerMilestones.filter(id => id !== milestoneId);
    } else {
      updatedCareerMilestones = [...careerMilestones, milestoneId];
    }
    store[careerId] = updatedCareerMilestones;
    localStorage.setItem(ROADMAP_PROGRESS_KEY, JSON.stringify(store));
    window.dispatchEvent(new Event('pathfinder-storage-change'));
    return updatedCareerMilestones.includes(milestoneId);
  } catch (err) {
    console.error('Failed to toggle milestone', err);
    return false;
  }
};

// Saved Colleges
export const getSavedColleges = () => {
  try {
    const raw = localStorage.getItem(SAVED_COLLEGES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Failed to read saved colleges', err);
    return [];
  }
};

export const toggleSaveCollege = (college) => {
  try {
    const list = getSavedColleges();
    const exists = list.some(c => c.id === college.id);
    let updated;
    if (exists) {
      updated = list.filter(c => c.id !== college.id);
    } else {
      updated = [...list, college];
    }
    localStorage.setItem(SAVED_COLLEGES_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('pathfinder-storage-change'));
    return !exists;
  } catch (err) {
    console.error('Failed to toggle college save', err);
    return false;
  }
};

export const isCollegeSaved = (collegeId) => {
  const list = getSavedColleges();
  return list.some(c => c.id === Number(collegeId));
};

// College Checklist Progress Persistence
export const getCollegeChecklistProgress = (collegeId) => {
  try {
    const raw = localStorage.getItem(COLLEGE_CHECKLIST_KEY);
    const store = raw ? JSON.parse(raw) : {};
    return store[collegeId] || [];
  } catch (err) {
    console.error('Failed to read college checklist progress', err);
    return [];
  }
};

export const toggleCollegeChecklistItem = (collegeId, itemId) => {
  try {
    const raw = localStorage.getItem(COLLEGE_CHECKLIST_KEY);
    const store = raw ? JSON.parse(raw) : {};
    const items = store[collegeId] || [];
    const exists = items.includes(itemId);
    const updated = exists ? items.filter(id => id !== itemId) : [...items, itemId];
    store[collegeId] = updated;
    localStorage.setItem(COLLEGE_CHECKLIST_KEY, JSON.stringify(store));
    window.dispatchEvent(new Event('pathfinder-storage-change'));
    return !exists;
  } catch (err) {
    console.error('Failed to toggle college checklist item', err);
    return false;
  }
};
