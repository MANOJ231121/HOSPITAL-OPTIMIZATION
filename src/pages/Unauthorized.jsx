import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldX, ArrowLeft, LayoutDashboard } from 'lucide-react';

const Unauthorized = () => {
  const navigate = useNavigate();
  const { role } = useAuth();

  const handleGoDashboard = () => {
    switch (role) {
      case 'PATIENT':
        navigate('/patient/dashboard');
        break;
      case 'DOCTOR':
        navigate('/doctor/dashboard');
        break;
      case 'NURSE':
        navigate('/nurse/dashboard');
        break;
      case 'RECEPTIONIST':
        navigate('/receptionist/dashboard');
        break;
      case 'ADMIN':
        navigate('/admin/dashboard');
        break;
      default:
        navigate('/login');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(ellipse at center, #1f1225 0%, #0b0f19 100%)',
      padding: '2rem'
    }}>
      <div className="glass-card" style={{ maxWidth: '480px', width: '100%', textAlign: 'center', padding: '3rem 2rem' }}>
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          background: 'rgba(244, 63, 94, 0.15)',
          border: '2px solid rgba(244, 63, 94, 0.4)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.5rem',
          color: '#f43f5e'
        }}>
          <ShieldX size={40} />
        </div>

        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
          Access Denied
        </h1>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: 1.6 }}>
          You do not have permission to access this page. This module requires explicit authorization privileges for your role (<strong style={{ color: '#f43f5e' }}>{role || 'UNAUTHENTICATED'}</strong>).
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button
            onClick={() => navigate(-1)}
            className="btn-secondary"
            id="btn-unauthorized-back"
          >
            <ArrowLeft size={18} />
            <span>Go Back</span>
          </button>

          <button
            onClick={handleGoDashboard}
            className="btn-primary"
            id="btn-unauthorized-dashboard"
          >
            <LayoutDashboard size={18} />
            <span>Go to Dashboard</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
