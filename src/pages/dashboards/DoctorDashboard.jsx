import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import api from '../../services/api';
import { Users, Calendar, Stethoscope, Clock, CheckCircle, FileText } from 'lucide-react';

const DoctorDashboard = () => {
  const [data, setData] = useState({
    assignedPatientsCount: 8,
    todayAppointments: 5,
    pendingConsultations: 3,
    currentQueueToken: 'DOC-CARD-004',
    department: 'Cardiology'
  });

  const [patients, setPatients] = useState([
    { id: 'p1', name: 'John Doe', age: 34, condition: 'Post-op Checkup', queueToken: 'DOC-CARD-001', status: 'IN_WAITING' },
    { id: 'p2', name: 'Alice Smith', age: 58, condition: 'Hypertension Consultation', queueToken: 'DOC-CARD-002', status: 'IN_WAITING' }
  ]);

  useEffect(() => {
    api.get('/doctor/dashboard')
      .then(res => { if (res.data?.data) setData(res.data.data); })
      .catch(err => console.log('Doctor API:', err));

    api.get('/doctor/patients')
      .then(res => { if (res.data?.data) setPatients(res.data.data); })
      .catch(err => console.log('Doctor patients API:', err));
  }, []);

  return (
    <div>
      <Navbar title="Doctor Consultation Workstation" />
      <div className="content-body">
        
        {/* Metric Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Assigned Patients</span>
              <Users size={20} color="var(--accent-cyan)" />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>{data.assignedPatientsCount}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Department: {data.department}</div>
          </div>

          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Today's Appointments</span>
              <Calendar size={20} color="var(--accent-emerald)" />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>{data.todayAppointments}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>OPD Consultations</div>
          </div>

          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Pending Consultations</span>
              <Clock size={20} color="var(--accent-amber)" />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-amber)' }}>{data.pendingConsultations}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Active in OPD Queue</div>
          </div>

          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Next Patient Token</span>
              <Stethoscope size={20} color="var(--accent-purple)" />
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#a78bfa' }}>{data.currentQueueToken}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Call Next Patient</div>
          </div>

        </div>

        {/* Patients Queue List */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Users size={20} color="var(--accent-cyan)" />
            <span>OPD Queue & Consultation List</span>
          </h3>

          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                <th style={{ padding: '0.75rem' }}>Token</th>
                <th style={{ padding: '0.75rem' }}>Patient Name</th>
                <th style={{ padding: '0.75rem' }}>Age</th>
                <th style={{ padding: '0.75rem' }}>Clinical Reason</th>
                <th style={{ padding: '0.75rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p) => (
                <tr key={p.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', fontSize: '0.9rem' }}>
                  <td style={{ padding: '0.9rem 0.75rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>{p.queueToken}</td>
                  <td style={{ padding: '0.9rem 0.75rem', fontWeight: 600 }}>{p.name}</td>
                  <td style={{ padding: '0.9rem 0.75rem', color: 'var(--text-muted)' }}>{p.age} yrs</td>
                  <td style={{ padding: '0.9rem 0.75rem' }}>{p.condition}</td>
                  <td style={{ padding: '0.9rem 0.75rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn-primary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }} onClick={() => alert(`Starting consultation for ${p.name}`)}>
                        <Stethoscope size={14} /> Start Consultation
                      </button>
                      <button className="btn-secondary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }} onClick={() => alert(`Opening medical history for ${p.name}`)}>
                        <FileText size={14} /> Records
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default DoctorDashboard;
