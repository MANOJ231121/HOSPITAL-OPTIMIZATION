import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HeartPulse, Lock, Mail, ShieldAlert, ArrowRight, KeyRound } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Please enter both Email and Password.');
      setLoading(false);
      return;
    }

    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      // Role-based automatic redirection
      switch (result.role) {
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
    } else {
      setError(result.message);
    }
  };

  const fillQuickDemoCredentials = (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(ellipse at top, #0f172a 0%, #0b0f19 100%)',
      padding: '1.5rem'
    }}>
      <div style={{ width: '100%', maxWidth: '440px' }}>
        
        {/* Header Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #0284c7 0%, #06b6d4 100%)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 25px rgba(6, 182, 212, 0.35)',
            marginBottom: '1rem'
          }}>
            <HeartPulse size={36} color="#ffffff" />
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>
            Smart Hospital Manager
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.3rem' }}>
            Enterprise Authentication & Authorization System
          </p>
        </div>

        {/* Login Card */}
        <div className="glass-card" style={{ padding: '2.25rem' }}>
          
          <div style={{
            background: 'rgba(6, 182, 212, 0.08)',
            border: '1px solid rgba(6, 182, 212, 0.2)',
            borderRadius: 'var(--radius-sm)',
            padding: '0.75rem 1rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            fontSize: '0.82rem',
            color: 'var(--accent-cyan)'
          }}>
            <Lock size={16} />
            <span>Role authorization is determined strictly by the backend server.</span>
          </div>

          {error && (
            <div className="alert-error" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <ShieldAlert size={18} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} id="form-login">
            <div className="form-group">
              <label htmlFor="login-email">Email Address / Username</label>
              <div style={{ position: 'relative' }}>
                <input
                  id="login-email"
                  type="email"
                  className="form-control"
                  placeholder="name@hospital.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ paddingLeft: '2.5rem' }}
                />
                <Mail size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label htmlFor="login-password">Password</label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); alert("Password reset link sent to registered administrator email."); }} style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', textDecoration: 'none' }}>
                  Forgot Password?
                </a>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  id="login-password"
                  type="password"
                  className="form-control"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ paddingLeft: '2.5rem' }}
                />
                <KeyRound size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <button
              type="submit"
              id="btn-login-submit"
              className="btn-primary"
              disabled={loading}
              style={{ width: '100%', justifyContent: 'center', padding: '0.85rem', marginTop: '1rem' }}
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Pre-fill Pills */}
          <div style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.6rem', textAlign: 'center' }}>
              Quick Demo Accounts (Click to Autofill):
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', justifyContent: 'center' }}>
              <button onClick={() => fillQuickDemoCredentials('admin@hospital.com', 'Admin@123')} className="role-badge ADMIN" style={{ cursor: 'pointer', border: 'none' }}>ADMIN</button>
              <button onClick={() => fillQuickDemoCredentials('doctor@hospital.com', 'Doctor@123')} className="role-badge DOCTOR" style={{ cursor: 'pointer', border: 'none' }}>DOCTOR</button>
              <button onClick={() => fillQuickDemoCredentials('nurse@hospital.com', 'Nurse@123')} className="role-badge NURSE" style={{ cursor: 'pointer', border: 'none' }}>NURSE</button>
              <button onClick={() => fillQuickDemoCredentials('receptionist@hospital.com', 'Receptionist@123')} className="role-badge RECEPTIONIST" style={{ cursor: 'pointer', border: 'none' }}>RECEPTIONIST</button>
              <button onClick={() => fillQuickDemoCredentials('patient@hospital.com', 'Patient@123')} className="role-badge PATIENT" style={{ cursor: 'pointer', border: 'none' }}>PATIENT</button>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            New patient?{' '}
            <Link to="/register" style={{ color: 'var(--accent-cyan)', fontWeight: 600, textDecoration: 'none' }}>
              Register as Patient
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
