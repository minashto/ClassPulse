import React, { useState } from 'react';
import { Ticket, UserRole } from '../types';
import { useApp } from '../context/AppContext';
import { 
  X, 
  ShieldAlert, 
  Lock, 
  Clock, 
  CheckCircle, 
  Send, 
  AlertCircle, 
  Layers, 
  Cpu, 
  Calendar,
  UserCheck
} from 'lucide-react';

interface TicketDetailModalProps {
  ticket: Ticket;
  onClose: () => void;
}

export const TicketDetailModal: React.FC<TicketDetailModalProps> = ({ ticket, onClose }) => {
  const { currentUser, addComment, updateTicketStatus, resolveTicketWithBiometricProof } = useApp();
  const [commentText, setCommentText] = useState('');
  const [resolutionNotes, setResolutionNotes] = useState('');
  const [showResolveForm, setShowResolveForm] = useState(false);

  const isTeacher = currentUser.role === 'teacher';
  const isDepartmentStaff = currentUser.role === 'department' && (currentUser.departmentCode === ticket.departmentId || currentUser.departmentCode === 'NMC');
  const isAdmin = currentUser.role === 'admin';

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(ticket.id, commentText);
    setCommentText('');
  };

  const handleResolve = () => {
    if (!resolutionNotes.trim()) {
      alert('Please enter resolution notes and hardware diagnostic log reference.');
      return;
    }
    resolveTicketWithBiometricProof(ticket.id, resolutionNotes);
    setShowResolveForm(false);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div 
        className="glass-panel-elevated"
        style={{
          width: '100%',
          maxWidth: '820px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          background: '#0f172a',
          border: '1px solid rgba(255, 255, 255, 0.15)'
        }}
      >
        {/* Modal Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(15, 23, 42, 0.9)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="font-mono" style={{ fontSize: '0.85rem', color: 'var(--cyan-accent)', fontWeight: '700' }}>
                {ticket.ticketNumber}
              </span>
              <span className={`badge badge-${ticket.departmentId.toLowerCase().replace(/\s+/g, '')}`}>
                {ticket.departmentId}
              </span>
              <span className={`badge ${ticket.status === 'RESOLVED' ? 'badge-success' : ticket.status === 'IN_PROGRESS' ? 'badge-warning' : 'badge-danger'}`}>
                {ticket.status}
              </span>
              {ticket.urgency === 'CRITICAL' && (
                <span className="badge badge-urgent-pulse">
                  CRITICAL: AT-RISK STUDENT
                </span>
              )}
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#ffffff', margin: 0 }}>
              {ticket.title}
            </h3>
          </div>
          <button 
            onClick={onClose} 
            className="btn btn-secondary btn-sm" 
            style={{ borderRadius: '50%', width: '36px', height: '36px', padding: 0 }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Key Design Choice Highlight: Teacher Privacy Guard */}
          {isTeacher ? (
            <div style={{
              background: 'rgba(99, 102, 241, 0.1)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              borderRadius: '12px',
              padding: '16px',
              display: 'flex',
              gap: '14px',
              alignItems: 'flex-start'
            }}>
              <Lock size={22} color="var(--primary-light)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--primary-light)', marginBottom: '4px' }}>
                  Institutional Privacy Policy Enforced (Faculty View)
                </h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.45, margin: 0 }}>
                  As specified by BIT Sathy academic governance, <strong>faculty see only the verified category, assigned department, and live resolution status</strong>. The student's confidential complaint body and private remarks are restricted to the resolving department ({ticket.departmentId}).
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', marginTop: '12px' }}>
                  <div style={{ background: 'rgba(0,0,0,0.3)', padding: '8px 12px', borderRadius: '8px' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Verified Category</span>
                    <div style={{ fontSize: '0.85rem', fontWeight: '600' }}>{ticket.category}</div>
                  </div>
                  <div style={{ background: 'rgba(0,0,0,0.3)', padding: '8px 12px', borderRadius: '8px' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Handling Cell</span>
                    <div style={{ fontSize: '0.85rem', fontWeight: '600' }}>{ticket.departmentId}</div>
                  </div>
                  <div style={{ background: 'rgba(0,0,0,0.3)', padding: '8px 12px', borderRadius: '8px' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Attendance Review</span>
                    <div style={{ fontSize: '0.85rem', fontWeight: '600', color: ticket.attendanceCorrectionStatus === 'APPROVED' ? '#34d399' : '#fbbf24' }}>
                      {ticket.attendanceCorrectionStatus === 'APPROVED' ? 'Approved & Corrected' : ticket.attendanceCorrectionStatus === 'PENDING_FACULTY_REVIEW' ? 'Pending Your Approval' : 'Under Investigation'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Student & Department Full View */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label className="form-label">Full Complaint Description</label>
                <div style={{
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '10px',
                  padding: '14px 16px',
                  fontSize: '0.9rem',
                  lineHeight: 1.5,
                  color: 'var(--text-main)'
                }}>
                  {ticket.description}
                </div>
              </div>

              {/* Explainable Classifier Card */}
              <div style={{
                background: 'rgba(6, 182, 212, 0.08)',
                border: '1px solid rgba(6, 182, 212, 0.25)',
                borderRadius: '10px',
                padding: '12px 16px',
                fontSize: '0.8rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', color: 'var(--cyan-accent)', fontWeight: '700' }}>
                  <Cpu size={16} /> Explainable Classification Engine (Rule-based v1)
                </div>
                <div style={{ color: 'var(--text-muted)', marginBottom: '8px' }}>
                  {ticket.classificationRationale}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Matched Tokens:</span>
                  {ticket.matchedKeywords.map((kw, i) => (
                    <span key={i} className="font-mono" style={{ background: 'rgba(6, 182, 212, 0.2)', color: '#38bdf8', padding: '2px 6px', borderRadius: '4px', fontSize: '0.75rem' }}>
                      "{kw}"
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Attached Academic Context (Key Problem Statement Feature!) */}
          <div style={{
            background: 'rgba(15, 23, 42, 0.9)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            padding: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700', fontSize: '0.85rem' }}>
                <Layers size={16} color="var(--primary-light)" />
                Attached Academic Context (Auto-Synced from ClassPulse)
              </div>
              <span className={`badge ${ticket.academicContext.riskLevel === 'HIGH' ? 'badge-danger' : 'badge-success'}`}>
                Risk Score: {ticket.academicContext.riskScore}/100 ({ticket.academicContext.riskLevel})
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '12px', marginBottom: '12px' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px 14px', borderRadius: '8px' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Student</div>
                <div style={{ fontSize: '0.85rem', fontWeight: '600' }}>{ticket.studentName}</div>
                <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{ticket.studentRollNumber}</div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px 14px', borderRadius: '8px' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Overall Attendance</div>
                <div style={{ fontSize: '1.1rem', fontWeight: '800', color: ticket.academicContext.overallAttendanceRate < 75 ? '#f87171' : '#34d399' }}>
                  {ticket.academicContext.overallAttendanceRate}%
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {ticket.academicContext.attendedSessions} / {ticket.academicContext.totalSessions} sessions
                </div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px 14px', borderRadius: '8px' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Debarment Status</div>
                <div style={{ fontSize: '0.85rem', fontWeight: '700', color: ticket.academicContext.overallAttendanceRate < 75 ? '#ef4444' : '#10b981' }}>
                  {ticket.academicContext.overallAttendanceRate < 75 ? '⚠️ High Risk (< 75%)' : '✅ Clear (>= 75%)'}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ClassPulse Live Sync</div>
              </div>
            </div>

            {ticket.affectedDates.length > 0 && (
              <div style={{ background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.25)', borderRadius: '8px', padding: '8px 12px', fontSize: '0.8rem', color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Calendar size={15} />
                <span>Claimed Machine Failure Dates: <strong>{ticket.affectedDates.join(', ')}</strong> (CS3501 - Operating Systems morning lectures)</span>
              </div>
            )}
          </div>

          {/* Department Resolution Box (For NMC / Department Staff) */}
          {isDepartmentStaff && ticket.status !== 'RESOLVED' && (
            <div style={{ background: 'rgba(6, 182, 212, 0.1)', border: '1px solid rgba(6, 182, 212, 0.4)', borderRadius: '12px', padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--cyan-accent)' }}>
                  NMC Terminal MB2-04 Investigation & Action
                </h4>
                <button 
                  onClick={() => setShowResolveForm(!showResolveForm)}
                  className="btn btn-sm btn-primary"
                >
                  {showResolveForm ? 'Cancel' : 'Resolve with Biometric Hardware Audit'}
                </button>
              </div>

              {showResolveForm && (
                <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Enter verification details from the campus biometric database log. Resolving this will <strong>flag the affected absence records for teacher Dr. Ramesh to review and approve</strong>.
                  </p>
                  <textarea
                    className="form-textarea"
                    rows={3}
                    placeholder="e.g. Biometric terminal #MB2-04 buffer packet loss verified on Oct 18 & Oct 21. Hardware audit log #HW-902 attached. Absences flagged for faculty verification."
                    value={resolutionNotes}
                    onChange={(e) => setResolutionNotes(e.target.value)}
                  />
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                    <button onClick={handleResolve} className="btn btn-success btn-sm">
                      <CheckCircle size={15} /> Confirm Resolution & Flag Absences
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Resolution Summary Banner if Resolved */}
          {ticket.status === 'RESOLVED' && (
            <div style={{ background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.35)', borderRadius: '10px', padding: '14px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#34d399', fontWeight: '700', fontSize: '0.85rem', marginBottom: '4px' }}>
                <CheckCircle size={16} /> Resolved by {ticket.resolvedBy || 'Department Staff'} at {ticket.resolvedAt || 'N/A'}
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-main)', margin: '4px 0' }}>
                <strong>Resolution Notes:</strong> {ticket.resolutionNotes || 'Biometric hardware failure log verified. Absences flagged for teacher review.'}
              </p>
              <div style={{ fontSize: '0.75rem', color: '#10b981', marginTop: '6px' }}>
                Status: {ticket.attendanceCorrectionStatus === 'APPROVED' ? '✅ Faculty approved attendance correction' : '⏳ Awaiting faculty attendance review'}
              </div>
            </div>
          )}

          {/* Audit Timeline */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '12px' }}>
              Transparent Audit Timeline & State Log
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {ticket.timeline.map((event) => (
                <div key={event.id} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', background: 'rgba(255,255,255,0.02)', padding: '10px 14px', borderRadius: '8px', borderLeft: '3px solid var(--primary-light)' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', fontFamily: 'JetBrains Mono', minWidth: '70px', paddingTop: '2px' }}>
                    {event.timestamp}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: '600', color: '#ffffff' }}>
                      {event.actorName} <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontWeight: 'normal' }}>({event.actorRole})</span>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      {event.details}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Comments Section (Student & Department) */}
          {!isTeacher && (
            <div>
              <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '12px' }}>
                Internal Communication & Updates
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '14px' }}>
                {ticket.comments.length === 0 ? (
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontStyle: 'italic' }}>
                    No comments yet.
                  </div>
                ) : (
                  ticket.comments.map((c) => (
                    <div key={c.id} style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '0.75rem' }}>
                        <strong style={{ color: 'var(--primary-light)' }}>{c.senderName} ({c.senderRole})</strong>
                        <span style={{ color: 'var(--text-dim)' }}>{c.timestamp}</span>
                      </div>
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-main)', margin: 0 }}>
                        {c.body}
                      </p>
                    </div>
                  ))
                )}
              </div>

              <form onSubmit={handleSendComment} style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Post an official reply or inquiry..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <button type="submit" className="btn btn-primary" style={{ padding: '0 16px', gap: '6px' }}>
                  <Send size={15} /> Post
                </button>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
