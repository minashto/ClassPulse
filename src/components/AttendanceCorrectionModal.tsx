import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  TrendingUp, 
  UserCheck, 
  ShieldCheck, 
  Calendar,
  Sparkles
} from 'lucide-react';

interface AttendanceCorrectionModalProps {
  onClose: () => void;
}

export const AttendanceCorrectionModal: React.FC<AttendanceCorrectionModalProps> = ({ onClose }) => {
  const { 
    attendanceRecords, 
    approveAttendanceCorrection, 
    rejectAttendanceCorrection, 
    currentUser,
    arunStats
  } = useApp();

  const [rejectReason, setRejectReason] = useState('');
  const [showRejectBox, setShowRejectBox] = useState(false);

  // Find flagged records for Arun
  const flaggedRecords = attendanceRecords.filter(
    (r) => r.studentId === 'usr_arun_104' && r.status === 'FLAGGED_FOR_REVIEW'
  );

  const handleApprove = () => {
    const recordIds = flaggedRecords.map((r) => r.id);
    approveAttendanceCorrection('ticket_bit_1042', recordIds);
    onClose();
  };

  const handleReject = () => {
    if (!rejectReason.trim()) {
      alert('Please specify why this correction is rejected.');
      return;
    }
    rejectAttendanceCorrection('ticket_bit_1042', rejectReason);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1050,
      padding: '20px'
    }}>
      <div 
        className="glass-panel-elevated"
        style={{
          width: '100%',
          maxWidth: '720px',
          background: '#0f172a',
          border: '1px solid rgba(16, 185, 129, 0.4)',
          borderRadius: '18px',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '18px 24px',
          borderBottom: '1px solid var(--border-color)',
          background: 'linear-gradient(90deg, rgba(16, 185, 129, 0.15) 0%, rgba(15, 23, 42, 0.9) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ 
              width: '36px', 
              height: '36px', 
              borderRadius: '10px', 
              background: 'rgba(16, 185, 129, 0.2)', 
              color: '#34d399', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              <ShieldCheck size={20} />
            </span>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#ffffff', margin: 0 }}>
                Human-in-the-Loop Attendance Verification
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
                Faculty Approval Required: System failures require teacher sign-off.
              </p>
            </div>
          </div>
          <button onClick={onClose} className="btn btn-secondary btn-sm" style={{ borderRadius: '50%', width: '32px', height: '32px', padding: 0 }}>
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          
          {/* Student Profile Card */}
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '14px 18px', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Student Under Review</div>
              <div style={{ fontSize: '1rem', fontWeight: '700' }}>Arun Kumar M.</div>
              <div className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--cyan-accent)' }}>7376221CS104 (5th Sem CSE)</div>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Current Attendance</div>
                <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#f87171' }}>
                  {arunStats.overallAttendance}% (30/41)
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Current Risk</div>
                <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#f87171' }}>
                  {arunStats.riskScore}/100 (HIGH)
                </div>
              </div>
            </div>
          </div>

          {/* NMC Diagnostic Verification Note */}
          <div style={{ background: 'rgba(6, 182, 212, 0.08)', border: '1px solid rgba(6, 182, 212, 0.3)', borderRadius: '12px', padding: '14px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--cyan-accent)', fontWeight: '700', fontSize: '0.85rem', marginBottom: '6px' }}>
              <UserCheck size={16} /> Verified by NMC (Network Maintenance Cell - K. Murugesan)
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-main)', margin: 0, lineHeight: 1.45 }}>
              "Biometric terminal #MB2-04 buffer packet loss verified on Oct 18 & Oct 21. Hardware audit log #HW-902 attached. Absences marked for faculty verification as student was physically logged on internal camera at 08:48 AM & 08:51 AM."
            </p>
          </div>

          {/* Sessions to Correct */}
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>
              Flagged Absences to be Corrected (2 Sessions):
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {flaggedRecords.map((r) => (
                <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(15, 23, 42, 0.8)', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(245, 158, 11, 0.4)' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Calendar size={14} color="#fbbf24" />
                      <strong style={{ fontSize: '0.85rem' }}>{r.date}</strong>
                      <span className="badge badge-warning" style={{ fontSize: '0.65rem', padding: '1px 6px' }}>
                        FLAGGED FOR REVIEW
                      </span>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {r.courseCode} - {r.courseName} ({r.sessionTime})
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.75rem', color: '#fca5a5', textDecoration: 'line-through', marginRight: '8px' }}>ABSENT</span>
                    <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#34d399' }}>→ PRESENT (CORRECTED)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Simulated Impact on Student's Standing */}
          <div style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(6, 182, 212, 0.12) 100%)', border: '1px solid rgba(16, 185, 129, 0.35)', borderRadius: '12px', padding: '14px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#34d399', fontWeight: '700', fontSize: '0.85rem', marginBottom: '8px' }}>
              <TrendingUp size={16} /> Projected Academic Impact Upon Approval:
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
              <div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Overall Attendance:</span>
                <div style={{ fontSize: '1rem', fontWeight: '800', color: '#ffffff' }}>
                  73.2% → <strong style={{ color: '#34d399' }}>78.0%</strong> (Safe from debarment)
                </div>
              </div>
              <div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>CS3501 Attendance:</span>
                <div style={{ fontSize: '1rem', fontWeight: '800', color: '#ffffff' }}>
                  71.4% (10/14) → <strong style={{ color: '#34d399' }}>85.7% (12/14)</strong>
                </div>
              </div>
              <div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Dropout Risk Score:</span>
                <div style={{ fontSize: '1rem', fontWeight: '800', color: '#ffffff' }}>
                  82/100 (HIGH) → <strong style={{ color: '#34d399' }}>24/100 (LOW)</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Rejection input box */}
          {showRejectBox && (
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '10px', padding: '12px' }}>
              <label className="form-label" style={{ color: '#f87171' }}>Reason for Declining Correction:</label>
              <textarea
                className="form-textarea"
                rows={2}
                placeholder="e.g. Student was confirmed absent by classroom roll call despite biometric log."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '8px' }}>
                <button onClick={() => setShowRejectBox(false)} className="btn btn-secondary btn-sm">Cancel</button>
                <button onClick={handleReject} className="btn btn-danger btn-sm">Confirm Rejection</button>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '8px' }}>
            {!showRejectBox && (
              <button onClick={() => setShowRejectBox(true)} className="btn btn-secondary" style={{ gap: '6px' }}>
                <XCircle size={16} /> Decline Correction
              </button>
            )}
            <button onClick={handleApprove} className="btn btn-success" style={{ gap: '6px', padding: '10px 22px' }}>
              <CheckCircle size={16} /> Approve & Update Attendance Records
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
