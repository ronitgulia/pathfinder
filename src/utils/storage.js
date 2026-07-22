const SAVED_CAREERS_KEY = 'pathfinder_saved_careers';
const ASSESSMENTS_KEY = 'pathfinder_assessments';

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
    return !exists; // returns true if now saved, false if unsaved
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
