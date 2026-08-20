import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import api from '../../services/api';
import { UserPlus, Calendar, Clock, Stethoscope, Receipt, Users } from 'lucide-react';

const ReceptionistDashboard = () => {
  const [data, setData] = useState({
    opdRegistrationsToday: 42,
    activeTokensGenerated: 38,
    doctorsAvailable: 12,
    pendingBillingInvoices: 5
  });

  useEffect(() => {
    api.get('/receptionist/dashboard')
      .then(res => { if (res.data?.data) setData(res.data.data); })
      .catch(err => console.log('Receptionist API:', err));
  }, []);

  return (
    <div>
      <Navbar title="Receptionist Front Desk Hub" />
      <div className="content-body">
        
        {/* Metric Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>OPD Registrations</span>
              <UserPlus size={20} color="var(--accent-amber)" />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-amber)' }}>{data.opdRegistrationsToday}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Walk-in & Online Today</div>
          </div>

          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Tokens Issued</span>
              <Clock size={20} color="var(--accent-cyan)" />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>{data.activeTokensGenerated}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Active Queue Dispensed</div>
          </div>

          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>On-Duty Doctors</span>
              <Stethoscope size={20} color="var(--accent-emerald)" />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>{data.doctorsAvailable}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Across 8 Departments</div>
          </div>

          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Pending Invoices</span>
              <Receipt size={20} color="var(--accent-rose)" />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-rose)' }}>{data.pendingBillingInvoices}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Awaiting Counter Payment</div>
          </div>

        </div>

        {/* Quick Action Panels */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <UserPlus color="var(--accent-amber)" size={20} />
              <span>OPD Patient Registration & Token Dispenser</span>
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Register new walk-in patients, allocate doctor appointments, and issue smart queue tokens.
            </p>
            <button className="btn-primary" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #06b6d4 100%)' }} onClick={() => alert("Opening Token Dispenser modal...")}>
              Issue New Token / Register Walk-in
            </button>
          </div>

          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Receipt color="var(--accent-cyan)" size={20} />
              <span>Billing & Checkout Counter</span>
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Generate invoices for doctor consultations, lab tests, and hospital medicine dispensaries.
            </p>
            <button className="btn-secondary" onClick={() => alert("Opening Billing Counter...")}>
              Open Billing Counter
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ReceptionistDashboard;
