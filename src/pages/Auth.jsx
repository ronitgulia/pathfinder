import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Mail, Lock, User as UserIcon, GraduationCap, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/useAuth';
import { useToast } from '../context/useToast';
import './Auth.css';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    grade: 'Grade 10'
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, register, isAuthenticated } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate network request
    setTimeout(() => {
      if (isLogin) {
        if (!formData.email || !formData.password) {
          addToast('Please enter both email and password.', 'error');
          setIsLoading(false);
          return;
        }
        login(formData.email, formData.password);
        addToast('Welcome back!', 'success');
      } else {
        if (!formData.name || !formData.email || !formData.password) {
          addToast('Please fill in all required fields.', 'error');
          setIsLoading(false);
          return;
        }
        register(formData.name, formData.email, formData.password, formData.grade);
        addToast('Registration successful! Welcome to PathFinder.', 'success');
      }
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <div className="auth-brand">
          <Sparkles className="brand-icon" size={32} />
          <h2>PathFinder <span>AI</span></h2>
        </div>
        <div className="auth-hero-text">
          <h1>Discover your true potential.</h1>
          <p>Join thousands of students navigating their career paths with AI-driven insights and personalized recommendations.</p>
        </div>
        <div className="auth-stats">
          <div className="stat-card">
            <h3>10k+</h3>
            <span>Students</span>
          </div>
          <div className="stat-card">
            <h3>500+</h3>
            <span>Careers</span>
          </div>
          <div className="stat-card">
            <h3>98%</h3>
            <span>Match Rate</span>
          </div>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-form-container">
          <h2>{isLogin ? 'Welcome Back' : 'Create an Account'}</h2>
          <p className="auth-subtitle">
            {isLogin 
              ? 'Enter your credentials to access your dashboard.' 
              : 'Sign up to start your personalized career journey.'}
          </p>

          <form onSubmit={handleSubmit} className="auth-form">
            {!isLogin && (
              <div className="form-group">
                <label>Full Name</label>
                <div className="input-wrapper">
                  <UserIcon size={18} className="input-icon" />
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="John Doe" 
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            <div className="form-group">
              <label>Email Address</label>
              <div className="input-wrapper">
                <Mail size={18} className="input-icon" />
                <input 
                  type="email" 
                  name="email" 
                  placeholder="student@example.com" 
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            {!isLogin && (
              <div className="form-group">
                <label>Current Grade</label>
                <div className="input-wrapper">
                  <GraduationCap size={18} className="input-icon" />
                  <select name="grade" value={formData.grade} onChange={handleChange}>
                    <option value="Grade 8">Grade 8</option>
                    <option value="Grade 9">Grade 9</option>
                    <option value="Grade 10">Grade 10</option>
                    <option value="Grade 11">Grade 11</option>
                    <option value="Grade 12">Grade 12</option>
                  </select>
                </div>
              </div>
            )}

            <div className="form-group">
              <label>Password</label>
              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />
                <input 
                  type="password" 
                  name="password" 
                  placeholder="••••••••" 
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary auth-submit" disabled={isLoading}>
              {isLoading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
              {!isLoading && <ArrowRight size={18} />}
            </button>
          </form>

          <div className="auth-toggle">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button type="button" className="link-btn" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
