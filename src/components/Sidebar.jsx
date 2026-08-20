import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Stethoscope,
  HeartPulse,
  Calendar,
  Clock,
  Bed,
  MapPin,
  Bot,
  Bell,
  User,
  Settings,
  BarChart3,
  Sparkles,
  LogOut,
  Building2,
  Receipt,
  UserPlus,
  ShieldCheck
} from 'lucide-react';

const Sidebar = () => {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getMenuItems = () => {
    switch (role) {
      case 'PATIENT':
        return [
          { label: 'Dashboard', path: '/patient/dashboard', icon: LayoutDashboard },
          { label: 'Appointments', path: '/patient/appointments', icon: Calendar },
          { label: 'Queue Status', path: '/patient/queue', icon: Clock },
          { label: 'Hospital Map', path: '/hospital-map', icon: MapPin },
          { label: 'AI Assistant', path: '/ai-assistant', icon: Bot },
          { label: 'Notifications', path: '/patient/notifications', icon: Bell },
          { label: 'Profile', path: '/patient/profile', icon: User },
        ];

      case 'DOCTOR':
        return [
          { label: 'Dashboard', path: '/doctor/dashboard', icon: LayoutDashboard },
          { label: 'Patients', path: '/doctor/patients', icon: Users },
          { label: 'Appointments', path: '/doctor/appointments', icon: Calendar },
          { label: 'Queue', path: '/doctor/queue', icon: Clock },
          { label: 'Consultations', path: '/doctor/consultations', icon: Stethoscope },
          { label: 'Notifications', path: '/doctor/notifications', icon: Bell },
          { label: 'Profile', path: '/doctor/profile', icon: User },
        ];

      case 'NURSE':
        return [
          { label: 'Dashboard', path: '/nurse/dashboard', icon: LayoutDashboard },
          { label: 'Patients', path: '/nurse/patients', icon: Users },
          { label: 'Queue', path: '/nurse/queue', icon: Clock },
          { label: 'Beds', path: '/nurse/beds', icon: Bed },
          { label: 'Wards', path: '/nurse/wards', icon: Building2 },
          { label: 'Notifications', path: '/nurse/notifications', icon: Bell },
          { label: 'Profile', path: '/nurse/profile', icon: User },
        ];

      case 'RECEPTIONIST':
        return [
          { label: 'Dashboard', path: '/receptionist/dashboard', icon: LayoutDashboard },
          { label: 'Patient Reg.', path: '/receptionist/registration', icon: UserPlus },
          { label: 'Appointments', path: '/receptionist/appointments', icon: Calendar },
          { label: 'Queue', path: '/receptionist/queue', icon: Clock },
          { label: 'Doctors', path: '/receptionist/doctors', icon: Stethoscope },
          { label: 'Billing', path: '/receptionist/billing', icon: Receipt },
          { label: 'Notifications', path: '/receptionist/notifications', icon: Bell },
          { label: 'Profile', path: '/receptionist/profile', icon: User },
        ];

      case 'ADMIN':
        return [
          { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
          { label: 'User Control', path: '/admin/users', icon: ShieldCheck },
          { label: 'Doctors', path: '/admin/doctors', icon: Stethoscope },
          { label: 'Nurses', path: '/admin/nurses', icon: HeartPulse },
          { label: 'Receptionists', path: '/admin/receptionists', icon: UserCheck },
          { label: 'Patients', path: '/admin/patients', icon: Users },
          { label: 'Appointments', path: '/admin/appointments', icon: Calendar },
          { label: 'Departments', path: '/admin/departments', icon: Building2 },
          { label: 'Beds', path: '/admin/beds', icon: Bed },
          { label: 'Queues', path: '/admin/queues', icon: Clock },
          { label: 'Optimization', path: '/admin/optimization', icon: Sparkles },
          { label: 'Reports', path: '/admin/reports', icon: BarChart3 },
          { label: 'Settings', path: '/admin/settings', icon: Settings },
        ];

      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <aside style={{
      width: '260px',
      background: 'var(--bg-secondary)',
      borderRight: '1px solid var(--border-color)',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      padding: '1.25rem 1rem'
    }}>
      {/* Brand Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem', marginBottom: '1.5rem' }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #0284c7 0%, #06b6d4 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 15px rgba(6, 182, 212, 0.3)'
        }}>
          <HeartPulse size={24} color="#fff" />
        </div>
        <div>
          <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1.2 }}>SMART HOSPITAL</h2>
          <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>MANAGER PORTAL</span>
        </div>
      </div>

      {/* Role Badge Indicator */}
      <div style={{
        padding: '0.75rem 1rem',
        background: 'rgba(15, 23, 42, 0.6)',
        borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--border-color)',
        marginBottom: '1.25rem'
      }}>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Current Session</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '120px' }}>
            {user?.name || 'User'}
          </span>
          <span className={`role-badge ${role}`}>{role}</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.35rem', overflowY: 'auto' }}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.65rem 0.85rem',
                borderRadius: 'var(--radius-sm)',
                color: isActive ? '#ffffff' : 'var(--text-muted)',
                background: isActive ? 'linear-gradient(90deg, rgba(2, 132, 199, 0.25) 0%, rgba(6, 182, 212, 0.15) 100%)' : 'transparent',
                borderLeft: isActive ? '3px solid var(--accent-cyan)' : '3px solid transparent',
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontWeight: isActive ? 600 : 400,
                transition: 'all 0.2s ease'
              })}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer Logout Button */}
      <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-color)', marginTop: '0.5rem' }}>
        <button
          onClick={handleLogout}
          id="btn-sidebar-logout"
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.7rem 0.85rem',
            background: 'rgba(239, 68, 68, 0.1)',
            color: '#f87171',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            borderRadius: 'var(--radius-sm)',
            cursor: 'pointer',
            fontWeight: 500,
            fontSize: '0.875rem',
            transition: 'all 0.2s ease'
          }}
        >
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
