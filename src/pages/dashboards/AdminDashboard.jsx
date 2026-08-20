import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import api from '../../services/api';
import { ShieldCheck, Users, Stethoscope, HeartPulse, UserCheck, Sparkles, Plus, AlertTriangle } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 5,
    patientsCount: 1,
    doctorsCount: 1,
    nursesCount: 1,
    receptionistsCount: 1,
    systemStatus: 'OPERATIONAL'
  });

  const [users, setUsers] = useState([]);
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);
  const [newStaff, setNewStaff] = useState({
    name: '',
    email: '',
    phone: '',
    password: 'Password@123',
    role: 'DOCTOR',
    department: 'Cardiology',
    specialization: 'Cardiologist'
  });

  const fetchAdminData = () => {
    api.get('/admin/dashboard-stats')
      .then(res => { if (res.data?.data) setStats(res.data.data); })
      .catch(err => console.log('Admin stats error:', err));

    api.get('/admin/users')
      .then(res => { if (res.data?.data) setUsers(res.data.data); })
      .catch(err => console.log('Admin users error:', err));
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleCreateStaff = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/admin/users/staff', newStaff);
      if (res.data && res.data.success) {
        alert(`Staff member ${newStaff.name} created successfully with role ${newStaff.role}`);
        setShowAddStaffModal(false);
        fetchAdminData();
      } else {
        alert(res.data?.message || 'Error creating staff');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create staff member');
    }
  };

  return (
    <div>
      <Navbar title="Hospital System Administration Control" />
      <div className="content-body">
        
        {/* Metric Overview Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
          
          <div className="glass-card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Total Users</span>
              <ShieldCheck size={20} color="var(--accent-rose)" />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)' }}>{stats.totalUsers}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>System-wide Registered</div>
          </div>

          <div className="glass-card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Doctors</span>
              <Stethoscope size={20} color="var(--accent-cyan)" />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>{stats.doctorsCount}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Authorized Doctors</div>
          </div>

          <div className="glass-card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Nurses</span>
              <HeartPulse size={20} color="var(--accent-emerald)" />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>{stats.nursesCount}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Ward Personnel</div>
          </div>

          <div className="glass-card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Receptionists</span>
              <UserCheck size={20} color="var(--accent-amber)" />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-amber)' }}>{stats.receptionistsCount}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Front-desk Staff</div>
          </div>

          <div className="glass-card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Patients</span>
              <Users size={20} color="var(--accent-purple)" />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#a78bfa' }}>{stats.patientsCount}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Registered Patients</div>
          </div>

        </div>

        {/* User Management & Role Authorization Panel */}
        <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldCheck size={22} color="var(--accent-rose)" />
                <span>System Accounts & Role Management</span>
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                Admin authority allows creating staff accounts (Doctors, Nurses, Receptionists) and revoking access.
              </p>
            </div>
            <button
              className="btn-primary"
              id="btn-admin-add-staff"
              onClick={() => setShowAddStaffModal(true)}
              style={{ fontSize: '0.85rem', background: 'linear-gradient(135deg, #f43f5e 0%, #06b6d4 100%)' }}
            >
              <Plus size={16} /> Add Staff Account
            </button>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                <th style={{ padding: '0.75rem' }}>Name</th>
                <th style={{ padding: '0.75rem' }}>Email</th>
                <th style={{ padding: '0.75rem' }}>Role</th>
                <th style={{ padding: '0.75rem' }}>Department / Detail</th>
                <th style={{ padding: '0.75rem' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id || u.email} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', fontSize: '0.9rem' }}>
                  <td style={{ padding: '0.85rem 0.75rem', fontWeight: 600 }}>{u.name}</td>
                  <td style={{ padding: '0.85rem 0.75rem', color: 'var(--text-muted)' }}>{u.email}</td>
                  <td style={{ padding: '0.85rem 0.75rem' }}>
                    <span className={`role-badge ${u.role}`}>{u.role}</span>
                  </td>
                  <td style={{ padding: '0.85rem 0.75rem', color: 'var(--text-muted)' }}>{u.department || u.specialization || 'Standard Access'}</td>
                  <td style={{ padding: '0.85rem 0.75rem' }}>
                    <span style={{ color: u.active ? '#10b981' : '#f87171', fontWeight: 600, fontSize: '0.8rem' }}>
                      {u.active ? '● Active' : '○ Inactive'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal for Creating Staff Accounts */}
        {showAddStaffModal && (
          <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999
          }}>
            <div className="glass-card" style={{ width: '100%', maxWidth: '480px', padding: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-main)' }}>
                Provision Staff Account
              </h3>
              <form onSubmit={handleCreateStaff}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Dr. John Smith"
                    value={newStaff.name}
                    onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="john@hospital.com"
                    value={newStaff.email}
                    onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Assigned Role</label>
                  <select
                    className="form-control"
                    value={newStaff.role}
                    onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })}
                  >
                    <option value="DOCTOR">DOCTOR</option>
                    <option value="NURSE">NURSE</option>
                    <option value="RECEPTIONIST">RECEPTIONIST</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Department</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Cardiology / Emergency / Front Desk"
                    value={newStaff.department}
                    onChange={(e) => setNewStaff({ ...newStaff, department: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Temporary Password</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newStaff.password}
                    onChange={(e) => setNewStaff({ ...newStaff, password: e.target.value })}
                    required
                  />
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                  <button type="submit" className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                    Create Account
                  </button>
                  <button type="button" className="btn-secondary" onClick={() => setShowAddStaffModal(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;
