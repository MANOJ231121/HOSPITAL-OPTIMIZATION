import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import api from '../../services/api';
import { Calendar, Clock, MapPin, Bot, Heart, AlertCircle, Sparkles } from 'lucide-react';

const PatientDashboard = () => {
  const [data, setData] = useState({
    upcomingAppointments: 1,
    currentQueueToken: 'PAT-104',
    estimatedWaitTimeMinutes: 15,
    assignedDoctor: 'Dr. Sarah Jenkins',
    department: 'Cardiology'
  });

  useEffect(() => {
    api.get('/patient/dashboard')
      .then(res => {
        if (res.data && res.data.data) {
          setData(res.data.data);
        }
      })
      .catch(err => console.log('Patient API fetch info:', err));
  }, []);

  return (
    <div>
      <Navbar title="Patient Overview Portal" />
      <div className="content-body">
        
        {/* Welcome Banner */}
        <div className="glass-card" style={{
          padding: '1.75rem 2rem',
          marginBottom: '2rem',
          background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.2) 0%, rgba(139, 92, 246, 0.15) 100%)',
          border: '1px solid rgba(6, 182, 212, 0.3)'
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.4rem' }}>Welcome to Patient Care Hub</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
            Track your appointment queues, consult digital tokens, view hospital floor maps, and query the AI Assistant.
          </p>
        </div>

        {/* Metric Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Token / Queue Number</span>
              <Clock size={20} color="var(--accent-cyan)" />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>{data.currentQueueToken}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>Department: {data.department}</div>
          </div>

          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Est. Waiting Time</span>
              <Sparkles size={20} color="var(--accent-amber)" />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-amber)' }}>{data.estimatedWaitTimeMinutes} mins</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>AI Estimated based on queue flow</div>
          </div>

          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Assigned Doctor</span>
              <Heart size={20} color="var(--accent-emerald)" />
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)' }}>{data.assignedDoctor}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>OPD Room 302</div>
          </div>

          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Upcoming Appointments</span>
              <Calendar size={20} color="var(--accent-purple)" />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#a78bfa' }}>{data.upcomingAppointments}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>Confirmed Consultation</div>
          </div>

        </div>

        {/* Quick Quick Actions */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Bot color="var(--accent-cyan)" size={20} />
              <span>AI Hospital Assistant</span>
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Ask intelligent questions regarding doctor specializations, OPD working hours, lab report availability, or indoor room directions.
            </p>
            <button className="btn-primary" style={{ fontSize: '0.85rem' }} onClick={() => alert("Opening AI Assistant chat window...")}>
              Launch AI Assistant
            </button>
          </div>

          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MapPin color="var(--accent-emerald)" size={20} />
              <span>Hospital Floor Map & Navigation</span>
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Interactive floor maps with shortest pathway navigation from Front Reception to OPD rooms, Radiology, and Pharmacy.
            </p>
            <button className="btn-secondary" style={{ fontSize: '0.85rem' }} onClick={() => alert("Loading floor map navigation...")}>
              Open Hospital Map
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default PatientDashboard;
