import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import api from '../../services/api';
import { Bed, Users, Building2, CheckCircle2, AlertCircle } from 'lucide-react';

const NurseDashboard = () => {
  const [data, setData] = useState({
    assignedWard: 'ICU Ward 2',
    patientsUnderCare: 6,
    availableBedsCount: 14,
    occupiedBedsCount: 16
  });

  const [beds, setBeds] = useState([
    { id: '1', bedNumber: 'ICU-101', wardName: 'ICU', department: 'Cardiology', status: 'OCCUPIED', assignedPatientName: 'Robert Paulson' },
    { id: '2', bedNumber: 'ICU-102', wardName: 'ICU', department: 'Cardiology', status: 'AVAILABLE', assignedPatientName: '-' },
    { id: '3', bedNumber: 'GEN-201', wardName: 'General Ward A', department: 'Orthopedics', status: 'AVAILABLE', assignedPatientName: '-' }
  ]);

  useEffect(() => {
    api.get('/nurse/dashboard')
      .then(res => { if (res.data?.data) setData(res.data.data); })
      .catch(err => console.log('Nurse API:', err));

    api.get('/nurse/beds')
      .then(res => { if (res.data?.data) setBeds(res.data.data); })
      .catch(err => console.log('Nurse beds API:', err));
  }, []);

  return (
    <div>
      <Navbar title="Nurse Ward & Bed Management" />
      <div className="content-body">
        
        {/* Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Assigned Ward</span>
              <Building2 size={20} color="var(--accent-emerald)" />
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>{data.assignedWard}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Active Duty Shift</div>
          </div>

          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Patients Under Care</span>
              <Users size={20} color="var(--accent-cyan)" />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>{data.patientsUnderCare}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>In-patient Monitoring</div>
          </div>

          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Available Beds</span>
              <Bed size={20} color="var(--accent-amber)" />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-amber)' }}>{data.availableBedsCount}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Ready for Admission</div>
          </div>

          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Occupied Beds</span>
              <Bed size={20} color="var(--accent-rose)" />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-rose)' }}>{data.occupiedBedsCount}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Currently In Use</div>
          </div>

        </div>

        {/* Beds Table */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Bed size={20} color="var(--accent-cyan)" />
            <span>Ward Beds Real-Time Status</span>
          </h3>

          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                <th style={{ padding: '0.75rem' }}>Bed ID</th>
                <th style={{ padding: '0.75rem' }}>Ward</th>
                <th style={{ padding: '0.75rem' }}>Department</th>
                <th style={{ padding: '0.75rem' }}>Status</th>
                <th style={{ padding: '0.75rem' }}>Assigned Patient</th>
                <th style={{ padding: '0.75rem' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {beds.map((b) => (
                <tr key={b.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', fontSize: '0.9rem' }}>
                  <td style={{ padding: '0.9rem 0.75rem', fontWeight: 700, color: 'var(--text-main)' }}>{b.bedNumber}</td>
                  <td style={{ padding: '0.9rem 0.75rem' }}>{b.wardName}</td>
                  <td style={{ padding: '0.9rem 0.75rem', color: 'var(--text-muted)' }}>{b.department}</td>
                  <td style={{ padding: '0.9rem 0.75rem' }}>
                    <span style={{
                      padding: '0.2rem 0.6rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      background: b.status === 'AVAILABLE' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                      color: b.status === 'AVAILABLE' ? '#10b981' : '#f87171'
                    }}>
                      {b.status}
                    </span>
                  </td>
                  <td style={{ padding: '0.9rem 0.75rem', fontWeight: 600 }}>{b.assignedPatientName || '-'}</td>
                  <td style={{ padding: '0.9rem 0.75rem' }}>
                    <button className="btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.78rem' }} onClick={() => alert(`Update status for bed ${b.bedNumber}`)}>
                      Update Status
                    </button>
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

export default NurseDashboard;
