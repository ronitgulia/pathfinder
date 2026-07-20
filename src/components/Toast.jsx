import React, { useEffect, useState } from 'react';
import { CheckCircle2, AlertCircle, X, Info } from 'lucide-react';
import './Toast.css';

export default function Toast({ id, message, type, duration, onClose }) {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose(id);
    }, 300); // Matches CSS animation duration
  };

  const getIcon = () => {
    switch (type) {
      case 'success': return <CheckCircle2 size={18} className="toast-icon success" />;
      case 'error': return <AlertCircle size={18} className="toast-icon error" />;
      case 'info': return <Info size={18} className="toast-icon info" />;
      default: return <Info size={18} className="toast-icon info" />;
    }
  };

  return (
    <div className={`toast-item ${type} ${isClosing ? 'closing' : ''}`}>
      {getIcon()}
      <p className="toast-message">{message}</p>
      <button className="toast-close" onClick={handleClose}>
        <X size={16} />
      </button>
    </div>
  );
}
