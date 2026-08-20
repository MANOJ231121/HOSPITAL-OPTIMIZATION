import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HeartPulse, UserPlus, ShieldAlert, CheckCircle2 } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: 'Male',
    address: '',
    emergencyContact: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { registerPatient } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    const result = await registerPatient(formData);
    setLoading(false);

    if (result.success) {
      navigate('/patient/dashboard');
    } else {
      setError(result.message);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(ellipse at top, #0f172a 0%, #0b0f19 100%)',
      padding: '2rem 1.5rem'
    }}>
      <div style={{ width: '100%', maxWidth: '580px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #0284c7 0%, #8b5cf6 100%)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 25px rgba(139, 92, 246, 0.35)',
            marginBottom: '0.75rem'
          }}>
            <UserPlus size={30} color="#ffffff" />
          </div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)' }}>
            Patient Portal Registration
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Create your personal medical profile for appointments and digital queuing
          </p>
        </div>

        <div className="glass-card" style={{ padding: '2rem' }}>
          
          <div style={{
            background: 'rgba(139, 92, 246, 0.1)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            borderRadius: 'var(--radius-sm)',
            padding: '0.75rem 1rem',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            fontSize: '0.82rem',
            color: '#a78bfa'
          }}>
            <CheckCircle2 size={16} />
            <span>Registration automatically assigns PATIENT role authority. Staff accounts require Admin creation.</span>
          </div>

          {error && (
            <div className="alert-error" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <ShieldAlert size={18} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleRegister} id="form-register">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              
              <div className="form-group">
                <label htmlFor="reg-name">Full Name *</label>
                <input
                  id="reg-name"
                  name="name"
                  type="text"
                  className="form-control"
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="reg-email">Email Address *</label>
                <input
                  id="reg-email"
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="patient@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="reg-phone">Phone Number *</label>
                <input
                  id="reg-phone"
                  name="phone"
                  type="tel"
                  className="form-control"
                  placeholder="+1 555-0199"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="reg-dob">Date of Birth</label>
                <input
                  id="reg-dob"
                  name="dateOfBirth"
                  type="date"
                  className="form-control"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="reg-gender">Gender</label>
                <select
                  id="reg-gender"
                  name="gender"
                  className="form-control"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="reg-emergency">Emergency Contact</label>
                <input
                  id="reg-emergency"
                  name="emergencyContact"
                  type="text"
                  className="form-control"
                  placeholder="Name & Phone"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                />
              </div>

            </div>

            <div className="form-group">
              <label htmlFor="reg-address">Residential Address</label>
              <input
                id="reg-address"
                name="address"
                type="text"
                className="form-control"
                placeholder="Street address, City, State"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="reg-password">Password *</label>
                <input
                  id="reg-password"
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="At least 6 characters"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="reg-confirmPassword">Confirm Password *</label>
                <input
                  id="reg-confirmPassword"
                  name="confirmPassword"
                  type="password"
                  className="form-control"
                  placeholder="Repeat password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              id="btn-register-submit"
              className="btn-primary"
              disabled={loading}
              style={{ width: '100%', justifyContent: 'center', padding: '0.85rem', marginTop: '1rem', background: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)' }}
            >
              {loading ? 'Registering Account...' : 'Complete Patient Registration'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Already registered?{' '}
            <Link to="/login" style={{ color: 'var(--accent-cyan)', fontWeight: 600, textDecoration: 'none' }}>
              Sign in to Patient Portal
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Register;
