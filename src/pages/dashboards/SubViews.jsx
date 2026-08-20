import React from 'react';
import Navbar from '../../components/Navbar';
import { useAuth } from '../../context/AuthContext';
import { Bot, MapPin, Calendar, Clock, Bed, Sparkles, BarChart3, Settings, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';

export const GenericSubView = ({ title, subtitle, icon: Icon = Sparkles }) => {
  const { role, user } = useAuth();

  return (
    <div>
      <Navbar title={title} />
      <div className="content-body">
        
        <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #0284c7 0%, #06b6d4 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff'
            }}>
              <Icon size={26} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700 }}>{title}</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{subtitle}</p>
            </div>
          </div>

          <div style={{
            background: 'rgba(15, 23, 42, 0.6)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)',
            padding: '1.5rem',
            marginTop: '1.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-emerald)', fontWeight: 600, marginBottom: '0.75rem' }}>
              <CheckCircle2 size={18} />
              <span>Role-Based Access Verified ({role})</span>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              You are viewing <strong>{title}</strong> under active authentication token for <strong>{user?.name}</strong> ({user?.email}).
              All sub-module API transactions are authenticated with Spring Security JWT headers.
            </p>
          </div>
        </div>

        {/* Dynamic Mock Data Container */}
        <div className="glass-card" style={{ padding: '1.75rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>Module Operational Data</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            <div style={{ padding: '1rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Status</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>ACTIVE & RUNNING</div>
            </div>
            <div style={{ padding: '1rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Security Level</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-emerald)' }}>RESTRICTED ROLE: {role}</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export const PatientAppointmentsView = () => <GenericSubView title="Patient Appointments" subtitle="Manage and request consultation appointments with specialized doctors." icon={Calendar} />;
export const PatientQueueView = () => <GenericSubView title="Digital Queue & Token Tracker" subtitle="Live token queue position and estimated doctor wait time calculation." icon={Clock} />;
export const HospitalMapView = () => <GenericSubView title="Smart Hospital Map & Indoor Navigation" subtitle="Interactive indoor pathways and floor plan guide." icon={MapPin} />;
export const AiAssistantView = () => <GenericSubView title="AI Hospital Medical Assistant" subtitle="Symptom checker, triage guide, and hospital query assistant." icon={Bot} />;
export const DoctorPatientsView = () => <GenericSubView title="Assigned Patients Roster" subtitle="View and update clinical notes for currently assigned OPD patients." icon={FileText} />;
export const NurseBedsView = () => <GenericSubView title="IPD Bed & Ward Allocation" subtitle="Real-time occupancy tracking for ICU, General, and Private wards." icon={Bed} />;
export const AdminOptimizationView = () => <GenericSubView title="Hospital Optimization Analytics Engine" subtitle="Machine learning algorithms predicting wait times, bed availability, and patient flow efficiency." icon={Sparkles} />;
export const AdminReportsView = () => <GenericSubView title="Analytics & Audit Reports" subtitle="Exportable hospital throughput, revenue, and queue latency reports." icon={BarChart3} />;
export const AdminSettingsView = () => <GenericSubView title="System Settings & Security Config" subtitle="JWT secret rotation, session timeout parameters, and CORS configurations." icon={Settings} />;
