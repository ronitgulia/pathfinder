import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Auth from './pages/Auth';
import AptitudeTest from './pages/AptitudeTest';
import Recommendations from './pages/Recommendations';
import ExploreCareers from './pages/ExploreCareers';
import Colleges from './pages/Colleges';
import Interests from './pages/Interests';
import Personality from './pages/Personality';
import Compare from './pages/Compare';
import Scholarships from './pages/Scholarships';

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return null; // Or a loading spinner
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
            
            <Route path="/compare" element={
              <ProtectedRoute>
                <AppLayout>
                  <Compare />
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
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;

