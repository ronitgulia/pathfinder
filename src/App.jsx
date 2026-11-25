import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/useAuth';
import Auth from './pages/Auth';
import AptitudeTest from './pages/AptitudeTest';
import Recommendations from './pages/Recommendations';
import ExploreCareers from './pages/ExploreCareers';
import Colleges from './pages/Colleges';
import CollegeRequirements from './pages/CollegeRequirements';
import Interests from './pages/Interests';
import Personality from './pages/Personality';
import Scholarships from './pages/Scholarships';
import ScholarshipApply from './pages/ScholarshipApply';
import CareerRoadmap from './pages/CareerRoadmap';
import NotFound from './pages/NotFound';

function LoadingScreen() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      gap: '1.25rem',
      backgroundColor: 'var(--color-bg-body)'
    }}>
      <div style={{
        width: '42px',
        height: '42px',
        border: '3px solid var(--color-border)',
        borderTopColor: 'var(--color-primary)',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite'
      }} />
      <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', fontWeight: 500 }}>
        Loading PathFinder AI...
      </p>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <LoadingScreen />;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

function AppLayout({ children }) {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <Header />
        {children}
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Route */}
            <Route path="/login" element={<Auth />} />
            
            {/* Protected Routes */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <AppLayout>
                  <Dashboard />
                </AppLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/aptitude" element={
              <ProtectedRoute>
                <AppLayout>
                  <AptitudeTest />
                </AppLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/interests" element={
              <ProtectedRoute>
                <AppLayout>
                  <Interests />
                </AppLayout>
              </ProtectedRoute>
            } />

            <Route path="/personality" element={
              <ProtectedRoute>
                <AppLayout>
                  <Personality />
                </AppLayout>
              </ProtectedRoute>
            } />

            <Route path="/recommendations" element={
              <ProtectedRoute>
                <AppLayout>
                  <Recommendations />
                </AppLayout>
              </ProtectedRoute>
            } />

            <Route path="/roadmap" element={
              <ProtectedRoute>
                <AppLayout>
                  <CareerRoadmap />
                </AppLayout>
              </ProtectedRoute>
            } />

            <Route path="/roadmap/:careerId" element={
              <ProtectedRoute>
                <AppLayout>
                  <CareerRoadmap />
                </AppLayout>
              </ProtectedRoute>
            } />

            <Route path="/explore" element={
              <ProtectedRoute>
                <AppLayout>
                  <ExploreCareers />
                </AppLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/colleges" element={
              <ProtectedRoute>
                <AppLayout>
                  <Colleges />
                </AppLayout>
              </ProtectedRoute>
            } />

            <Route path="/colleges/:collegeId/requirements" element={
              <ProtectedRoute>
                <AppLayout>
                  <CollegeRequirements />
                </AppLayout>
              </ProtectedRoute>
            } />

            <Route path="/colleges/requirements" element={
              <ProtectedRoute>
                <AppLayout>
                  <CollegeRequirements />
                </AppLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/scholarships" element={
              <ProtectedRoute>
                <AppLayout>
                  <Scholarships />
                </AppLayout>
              </ProtectedRoute>
            } />

            <Route path="/scholarships/apply/:scholarshipId" element={
              <ProtectedRoute>
                <AppLayout>
                  <ScholarshipApply />
                </AppLayout>
              </ProtectedRoute>
            } />

            <Route path="/scholarships/apply" element={
              <ProtectedRoute>
                <AppLayout>
                  <ScholarshipApply />
                </AppLayout>
              </ProtectedRoute>
            } />

            {/* 404 Fallback Route */}
            <Route path="*" element={
              <ProtectedRoute>
                <AppLayout>
                  <NotFound />
                </AppLayout>
              </ProtectedRoute>
            } />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
