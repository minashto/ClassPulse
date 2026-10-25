import React from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { 
  GraduationCap, 
  Users, 
  Server, 
  ShieldCheck, 
  RotateCcw, 
  Cpu, 
  Sparkles,
  School
} from 'lucide-react';

interface NavbarProps {
  currentTab: 'dashboard' | 'classifier' | 'crossSystem';
  setCurrentTab: (tab: 'dashboard' | 'classifier' | 'crossSystem') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, setCurrentTab }) => {
  const { currentUser, switchRole, resetDemo, arunStats } = useApp();

  const roles: { role: UserRole; label: string; icon: React.ReactNode; subtitle: string }[] = [
    {
      role: 'student',
      label: 'Student Portal',
      icon: <GraduationCap size={16} />,
      subtitle: 'Arun Kumar (73.2% Att)'
    },
    {
      role: 'teacher',
      label: 'ClassPulse (Faculty)',
      icon: <Users size={16} />,
      subtitle: 'Dr. S. K. Ramesh (Mentor)'
    },
    {
      role: 'department',
      label: 'NMC Helpdesk',
      icon: <Server size={16} />,
      subtitle: 'K. Murugesan (Systems Engr)'
    },
    {
      role: 'admin',
      label: 'Dean Academics',
      icon: <ShieldCheck size={16} />,
      subtitle: 'Audit & Cross-Triage'
    }
  ];

  return (
    <header className="glass-panel" style={{ margin: '16px 24px', padding: '14px 24px', borderRadius: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        
        {/* Brand identity */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ 
            width: '42px', 
            height: '42px', 
            borderRadius: '12px', 
            background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(6, 182, 212, 0.4)'
          }}>
            <School size={22} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: '800', letterSpacing: '-0.02em', background: 'linear-gradient(90deg, #ffffff, #cbd5e1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                ClearPulse
              </span>
              <span className="badge badge-nmc" style={{ fontSize: '0.65rem', padding: '2px 8px' }}>
                BIT SATHY
              </span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', fontFamily: 'JetBrains Mono, monospace' }}>
                @bitsathy.ac.in
              </span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Unified Classroom Intelligence & Explainable Helpdesk
            </p>
          </div>
        </div>

        {/* View Navigation Tabs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(15, 23, 42, 0.6)', padding: '4px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
          <button
            onClick={() => setCurrentTab('dashboard')}
            className={`btn btn-sm ${currentTab === 'dashboard' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ border: 'none', padding: '7px 14px' }}
          >
            Role Dashboard
          </button>
          <button
            onClick={() => setCurrentTab('classifier')}
            className={`btn btn-sm ${currentTab === 'classifier' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ border: 'none', padding: '7px 14px' }}
          >
            <Cpu size={14} /> Rule Classifier Sandbox
          </button>
          <button
            onClick={() => setCurrentTab('crossSystem')}
            className={`btn btn-sm ${currentTab === 'crossSystem' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ border: 'none', padding: '7px 14px' }}
          >
            <Sparkles size={14} /> System Architecture
          </button>
        </div>

        {/* Role Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(15, 23, 42, 0.8)', padding: '4px 6px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-dim)', paddingLeft: '6px' }}>
              Switch Role:
            </span>
            {roles.map((r) => {
              const isActive = currentUser.role === r.role;
              return (
                <button
                  key={r.role}
                  onClick={() => switchRole(r.role)}
                  className="btn btn-sm"
                  style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    border: isActive ? '1px solid var(--primary-light)' : '1px solid transparent',
                    background: isActive ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.3) 0%, rgba(6, 182, 212, 0.2) 100%)' : 'transparent',
                    color: isActive ? '#ffffff' : 'var(--text-muted)'
                  }}
                  title={r.subtitle}
                >
                  {r.icon}
                  <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1.1 }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: isActive ? '700' : '500' }}>{r.label}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Reset Demo Button */}
          <button
            onClick={resetDemo}
            className="btn btn-secondary btn-sm"
            style={{ padding: '8px 12px', fontSize: '0.75rem', gap: '6px' }}
            title="Reset Arun's state back to 73.2% attendance with 2 open tickets"
          >
            <RotateCcw size={14} />
            Reset Demo
          </button>
        </div>

      </div>
    </header>
  );
};
