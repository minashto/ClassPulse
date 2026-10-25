import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  AlertTriangle, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  FileCheck2, 
  Lock, 
  Sparkles, 
  TrendingUp,
  Fingerprint
} from 'lucide-react';

export const GuidedJourneyBar: React.FC = () => {
  const { 
    activeStep, 
    setActiveStep, 
    switchRole, 
    currentUser, 
    arunStats, 
    resolveTicketWithBiometricProof,
    approveAttendanceCorrection
  } = useApp();

  const steps = [
    {
      step: 1,
      title: "1. Arun's Attendance < 75%",
      desc: "Arun is at 73.2% with 2 open biometric tickets. Teacher & Student dashboards flag risk.",
      roleTarget: 'student' as const,
      roleName: 'Student View',
      icon: <AlertTriangle size={16} />
    },
    {
      step: 2,
      title: '2. NMC Queue Prioritization',
      desc: 'Ticket sorted to NMC and prioritized at top because Arun is at risk of debarment.',
      roleTarget: 'department' as const,
      roleName: 'NMC View',
      icon: <Fingerprint size={16} />
    },
    {
      step: 3,
      title: '3. NMC Resolves Ticket',
      desc: 'NMC verifies terminal #MB2-04 error log. Absences marked for review (not auto-changed).',
      roleTarget: 'department' as const,
      roleName: 'Resolve as NMC',
      icon: <Clock size={16} />
    },
    {
      step: 4,
      title: '4. Faculty Approves Review',
      desc: 'Teacher Dr. Ramesh reviews flagged absences and approves correction.',
      roleTarget: 'teacher' as const,
      roleName: 'Teacher View',
      icon: <FileCheck2 size={16} />
    },
    {
      step: 5,
      title: '5. Risk Recalculates to 24/100',
      desc: 'Attendance jumps to 78.0%. Risk score drops to 24/100 (Safe).',
      roleTarget: 'student' as const,
      roleName: 'Result View',
      icon: <TrendingUp size={16} />
    }
  ];

  const handleStepClick = (stepNum: number, targetRole: 'student' | 'teacher' | 'department' | 'admin') => {
    setActiveStep(stepNum);
    switchRole(targetRole);
  };

  const handleFastForwardAction = () => {
    if (activeStep === 1) {
      setActiveStep(2);
      switchRole('department');
    } else if (activeStep === 2) {
      setActiveStep(3);
      switchRole('department');
    } else if (activeStep === 3) {
      resolveTicketWithBiometricProof(
        'ticket_bit_1042',
        'Biometric terminal #MB2-04 buffer packet loss verified on Oct 18 & Oct 21. Hardware audit log #HW-902 attached. Absences flagged for faculty verification.'
      );
      switchRole('teacher');
    } else if (activeStep === 4) {
      approveAttendanceCorrection('ticket_bit_1042', ['att_oct18', 'att_oct21']);
      switchRole('teacher');
    } else {
      switchRole('student');
    }
  };

  return (
    <div style={{ margin: '0 24px 20px 24px' }}>
      <div 
        className="glass-panel" 
        style={{ 
          padding: '16px 20px', 
          background: 'linear-gradient(180deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.9) 100%)',
          border: '1px solid rgba(99, 102, 241, 0.25)',
          borderRadius: '16px'
        }}
      >
        {/* Header bar of journey */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              width: '28px', 
              height: '28px', 
              borderRadius: '8px', 
              background: 'rgba(99, 102, 241, 0.2)',
              color: 'var(--primary-light)'
            }}>
              <Sparkles size={16} />
            </span>
            <div>
              <h2 style={{ fontSize: '0.95rem', fontWeight: '800', letterSpacing: '-0.01em', margin: 0 }}>
                Interactive Prototype Journey: Arun's Case Study
              </h2>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
                Walk through the connected loop between ClassPulse and Helpdesk. Click any step or use 1-Click Action.
              </p>
            </div>
          </div>

          {/* Quick Context Pill */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', background: 'rgba(0,0,0,0.3)', padding: '5px 12px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <span style={{ color: 'var(--text-muted)' }}>Arun's Attendance:</span>
              <strong style={{ color: arunStats.overallAttendance < 75 ? '#f87171' : '#34d399' }}>
                {arunStats.overallAttendance}%
              </strong>
              <span style={{ color: 'var(--text-dim)' }}>|</span>
              <span style={{ color: 'var(--text-muted)' }}>Risk Score:</span>
              <strong style={{ color: arunStats.riskScore >= 70 ? '#f87171' : '#34d399' }}>
                {arunStats.riskScore}/100 ({arunStats.riskLevel})
              </strong>
            </div>

            <button
              onClick={handleFastForwardAction}
              className="btn btn-primary btn-sm"
              style={{ fontSize: '0.78rem', padding: '7px 14px', gap: '6px' }}
            >
              {activeStep === 1 && 'Next: View NMC Queue Prioritization →'}
              {activeStep === 2 && 'Next: Resolve Ticket via NMC →'}
              {activeStep === 3 && 'Simulate: NMC Resolves & Flags Absences →'}
              {activeStep === 4 && 'Simulate: Faculty Approves Attendance →'}
              {activeStep === 5 && 'Case Closed: Review Recalculated Stats'}
              {activeStep < 5 && <ArrowRight size={14} />}
            </button>
          </div>
        </div>

        {/* Step Progression Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '12px' }}>
          {steps.map((s) => {
            const isCompleted = activeStep > s.step;
            const isCurrent = activeStep === s.step;
            
            return (
              <div
                key={s.step}
                onClick={() => handleStepClick(s.step, s.roleTarget)}
                style={{
                  cursor: 'pointer',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  background: isCurrent 
                    ? 'rgba(99, 102, 241, 0.16)' 
                    : isCompleted 
                      ? 'rgba(16, 185, 129, 0.08)' 
                      : 'rgba(15, 23, 42, 0.5)',
                  border: isCurrent 
                    ? '1px solid var(--primary-light)' 
                    : isCompleted 
                      ? '1px solid rgba(16, 185, 129, 0.4)' 
                      : '1px solid var(--border-color)',
                  transition: 'all 0.2s ease',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '6px', 
                    fontSize: '0.8rem', 
                    fontWeight: '700',
                    color: isCurrent ? 'var(--primary-light)' : isCompleted ? '#34d399' : 'var(--text-muted)'
                  }}>
                    {isCompleted ? <CheckCircle2 size={15} color="#10b981" /> : s.icon}
                    {s.title}
                  </span>
                  <span style={{ 
                    fontSize: '0.65rem', 
                    padding: '2px 6px', 
                    borderRadius: '4px',
                    background: isCurrent ? 'var(--primary)' : 'rgba(255,255,255,0.06)',
                    color: '#ffffff',
                    fontWeight: '600'
                  }}>
                    {s.roleName}
                  </span>
                </div>
                <p style={{ fontSize: '0.72rem', color: isCurrent ? 'var(--text-main)' : 'var(--text-muted)', lineHeight: 1.35, margin: 0 }}>
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
