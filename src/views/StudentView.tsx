import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { classifyComplaint } from '../utils/classifier';
import { TicketDetailModal } from '../components/TicketDetailModal';
import { Ticket } from '../types';
import { 
  AlertTriangle, 
  Send, 
  Clock, 
  CheckCircle, 
  PlusCircle, 
  Layers, 
  Calendar, 
  ShieldAlert, 
  Cpu, 
  BookOpen, 
  ArrowUpRight,
  Sparkles,
  Fingerprint
} from 'lucide-react';

export const StudentView: React.FC = () => {
  const { currentUser, tickets, arunStats, createTicket, attendanceRecords } = useApp();
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [affectedDates, setAffectedDates] = useState('2026-10-18, 2026-10-21');
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Real-time classification preview
  const liveClassification = title || description ? classifyComplaint(title, description) : null;

  // Arun's personal tickets
  const myTickets = tickets.filter((t) => t.studentId === currentUser.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert('Please fill out both the title and complaint description.');
      return;
    }
    const datesArray = affectedDates
      .split(',')
      .map((d) => d.trim())
      .filter(Boolean);

    const created = createTicket(title, description, datesArray);
    setTitle('');
    setDescription('');
    setShowSubmitModal(false);
    setSelectedTicket(created);
  };

  return (
    <div style={{ padding: '0 24px 40px 24px', maxWidth: '1400px', margin: '0 auto' }}>
      
      {/* Top Welcome & Context Banner */}
      <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="badge badge-nmc">Student Academic Portal</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>BIT Sathy Institutional Single Sign-On</span>
            </div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: '800', letterSpacing: '-0.02em', margin: 0 }}>
              Welcome, {currentUser.name}
            </h1>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Roll Number: <strong className="font-mono" style={{ color: 'var(--cyan-accent)' }}>{currentUser.rollNumber}</strong> | B.E. Computer Science & Engineering (Semester 5)
            </p>
          </div>

          <button 
            onClick={() => setShowSubmitModal(true)} 
            className="btn btn-primary"
            style={{ padding: '12px 20px', gap: '8px', fontSize: '0.9rem' }}
          >
            <PlusCircle size={18} /> File Grievance with Academic Context
          </button>
        </div>
      </div>

      {/* Metrics Row: ClassPulse Attendance & Early Warning Risk Score */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        
        {/* Attendance Card */}
        <div className="glass-panel metric-card" style={{ borderColor: arunStats.overallAttendance < 75 ? 'rgba(239, 68, 68, 0.4)' : 'rgba(16, 185, 129, 0.4)' }}>
          <div className="metric-title">
            <span>ClassPulse Attendance</span>
            <span className={`badge ${arunStats.overallAttendance < 75 ? 'badge-danger' : 'badge-success'}`}>
              {arunStats.overallAttendance < 75 ? 'Below 75% Threshold' : 'Good Standing'}
            </span>
          </div>
          <div className="metric-value" style={{ color: arunStats.overallAttendance < 75 ? '#f87171' : '#34d399' }}>
            {arunStats.overallAttendance}%
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Attended <strong>{arunStats.attendedSessions}</strong> of <strong>{arunStats.totalSessions}</strong> lectures across 3 registered courses.
          </div>
          {arunStats.overallAttendance < 75 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#fca5a5', marginTop: '6px', background: 'rgba(239, 68, 68, 0.1)', padding: '6px 10px', borderRadius: '6px' }}>
              <AlertTriangle size={14} /> At risk of exam debarment unless attendance corrections are approved!
            </div>
          )}
          {arunStats.correctionApproved && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#34d399', marginTop: '6px', background: 'rgba(16, 185, 129, 0.1)', padding: '6px 10px', borderRadius: '6px' }}>
              <CheckCircle size={14} /> 2 absences corrected by faculty Dr. S. K. Ramesh!
            </div>
          )}
        </div>

        {/* Risk Score Card */}
        <div className="glass-panel metric-card" style={{ borderColor: arunStats.riskScore >= 70 ? 'rgba(239, 68, 68, 0.4)' : 'rgba(16, 185, 129, 0.4)' }}>
          <div className="metric-title">
            <span>Early Warning Risk Score</span>
            <span className={`badge ${arunStats.riskLevel === 'HIGH' ? 'badge-danger' : 'badge-success'}`}>
              {arunStats.riskLevel} RISK
            </span>
          </div>
          <div className="metric-value" style={{ color: arunStats.riskScore >= 70 ? '#f87171' : '#34d399' }}>
            {arunStats.riskScore} <span style={{ fontSize: '1rem', color: 'var(--text-dim)' }}>/ 100</span>
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            ClassPulse Explainable AI Matrix (Attendance: 65%, Course Confusion: 20%, Ingestion: 15%)
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '6px' }}>
            {arunStats.openBiometricTicketsCount > 0 ? (
              <span style={{ color: 'var(--cyan-accent)' }}>
                ℹ️ Risk score linked to {arunStats.openBiometricTicketsCount} open biometric tickets.
              </span>
            ) : (
              <span>All campus system grievances resolved. Low risk.</span>
            )}
          </div>
        </div>

        {/* Active Campus System Grievances Card */}
        <div className="glass-panel metric-card">
          <div className="metric-title">
            <span>Linked System Tickets</span>
            <span className="badge badge-nmc">NMC & PS Linked</span>
          </div>
          <div className="metric-value" style={{ color: 'var(--cyan-accent)' }}>
            {myTickets.length} <span style={{ fontSize: '1rem', color: 'var(--text-dim)' }}>Tickets Active</span>
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {arunStats.hasFlaggedAbsences ? (
              <span style={{ color: '#fbbf24', fontWeight: '600' }}>
                ⏳ 2 absences verified by NMC; awaiting faculty review
              </span>
            ) : arunStats.correctionApproved ? (
              <span style={{ color: '#34d399', fontWeight: '600' }}>
                ✅ All flagged absences approved & credited
              </span>
            ) : (
              <span>2 open biometric tickets carrying academic context</span>
            )}
          </div>
        </div>

      </div>

      {/* Course Breakdown & Absences Ledger */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px', marginBottom: '24px' }}>
        
        {/* Registered Courses Attendance */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BookOpen size={18} color="var(--primary-light)" /> Course Attendance Breakdown
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            
            {/* CS3501 */}
            <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <div>
                  <strong style={{ fontSize: '0.9rem' }}>CS3501 - Operating Systems</strong>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Mentor: Dr. S. K. Ramesh</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '1rem', fontWeight: '800', color: arunStats.correctionApproved ? '#34d399' : '#f87171' }}>
                    {arunStats.correctionApproved ? '85.7% (12/14)' : '71.4% (10/14)'}
                  </span>
                  <div style={{ fontSize: '0.68rem', color: arunStats.correctionApproved ? '#34d399' : '#f87171' }}>
                    {arunStats.correctionApproved ? 'Safe' : 'Critical Shortage'}
                  </div>
                </div>
              </div>
              <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: arunStats.correctionApproved ? '85.7%' : '71.4%', background: arunStats.correctionApproved ? '#10b981' : '#ef4444', transition: 'width 0.5s ease' }} />
              </div>
            </div>

            {/* CS3502 */}
            <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <div>
                  <strong style={{ fontSize: '0.9rem' }}>CS3502 - Database Management Systems</strong>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Faculty: Dr. P. Revathi</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '1rem', fontWeight: '800', color: '#fbbf24' }}>75.0% (9/12)</span>
                  <div style={{ fontSize: '0.68rem', color: '#fbbf24' }}>Borderline</div>
                </div>
              </div>
              <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '75%', background: '#f59e0b' }} />
              </div>
            </div>

            {/* CS3503 */}
            <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <div>
                  <strong style={{ fontSize: '0.9rem' }}>CS3503 - Computer Networks</strong>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Faculty: Prof. M. Vignesh</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '1rem', fontWeight: '800', color: '#f87171' }}>73.3% (11/15)</span>
                  <div style={{ fontSize: '0.68rem', color: '#f87171' }}>Shortage</div>
                </div>
              </div>
              <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '73.3%', background: '#ef4444' }} />
              </div>
            </div>

          </div>
        </div>

        {/* Recent Attendance Session Logs */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calendar size={18} color="var(--cyan-accent)" /> Detailed Session Attendance Records
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {attendanceRecords.filter((r) => r.studentId === currentUser.id).map((record) => {
              const isFlagged = record.status === 'FLAGGED_FOR_REVIEW';
              const isCorrected = record.status === 'CORRECTED_PRESENT';
              const isAbsent = record.status === 'ABSENT';

              return (
                <div 
                  key={record.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    background: isFlagged 
                      ? 'rgba(245, 158, 11, 0.1)' 
                      : isCorrected 
                        ? 'rgba(16, 185, 129, 0.1)' 
                        : isAbsent 
                          ? 'rgba(239, 68, 68, 0.08)' 
                          : 'rgba(15, 23, 42, 0.6)',
                    border: isFlagged 
                      ? '1px solid rgba(245, 158, 11, 0.35)' 
                      : isCorrected 
                        ? '1px solid rgba(16, 185, 129, 0.35)' 
                        : '1px solid var(--border-color)'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <strong style={{ fontSize: '0.85rem' }}>{record.date}</strong>
                      <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{record.courseCode}</span>
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      {record.courseName} ({record.sessionTime})
                    </div>
                    {record.flagReason && (
                      <div style={{ fontSize: '0.7rem', color: isCorrected ? '#34d399' : '#fbbf24', marginTop: '2px' }}>
                        ℹ️ {record.flagReason}
                      </div>
                    )}
                  </div>
                  <div>
                    {isCorrected && (
                      <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>
                        <CheckCircle size={12} /> PRESENT (CORRECTED)
                      </span>
                    )}
                    {isFlagged && (
                      <span className="badge badge-warning" style={{ fontSize: '0.7rem' }}>
                        <Clock size={12} /> FLAGGED FOR REVIEW
                      </span>
                    )}
                    {isAbsent && (
                      <span className="badge badge-danger" style={{ fontSize: '0.7rem' }}>
                        ABSENT
                      </span>
                    )}
                    {record.status === 'PRESENT' && (
                      <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>
                        PRESENT
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Submitted Complaints Table */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', margin: 0 }}>
              My Helpdesk Grievances
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
              Tickets carry your academic standing to the resolving department.
            </p>
          </div>
          <button onClick={() => setShowSubmitModal(true)} className="btn btn-secondary btn-sm" style={{ gap: '6px' }}>
            <PlusCircle size={15} /> New Grievance
          </button>
        </div>

        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Subject & Category</th>
                <th>Target Cell</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {myTickets.map((t) => (
                <tr key={t.id} style={{ cursor: 'pointer' }} onClick={() => setSelectedTicket(t)}>
                  <td className="font-mono" style={{ color: 'var(--cyan-accent)', fontWeight: '700' }}>
                    {t.ticketNumber}
                  </td>
                  <td>
                    <div style={{ fontWeight: '600', color: 'var(--text-main)' }}>{t.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.category}</div>
                  </td>
                  <td>
                    <span className={`badge badge-${t.departmentId.toLowerCase().replace(/\s+/g, '')}`}>
                      {t.departmentId}
                    </span>
                  </td>
                  <td>
                    {t.urgency === 'CRITICAL' ? (
                      <span className="badge badge-urgent-pulse" style={{ fontSize: '0.65rem' }}>
                        CRITICAL (AT-RISK)
                      </span>
                    ) : (
                      <span className="badge badge-warning" style={{ fontSize: '0.65rem' }}>
                        HIGH
                      </span>
                    )}
                  </td>
                  <td>
                    <span className={`badge ${t.status === 'RESOLVED' ? 'badge-success' : t.status === 'IN_PROGRESS' ? 'badge-warning' : 'badge-danger'}`}>
                      {t.status}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="btn btn-secondary btn-sm" 
                      onClick={(e) => { e.stopPropagation(); setSelectedTicket(t); }}
                      style={{ fontSize: '0.75rem', padding: '4px 10px' }}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ticket Filing Modal with Real-Time Rule Classifier Preview */}
      {showSubmitModal && (
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
          zIndex: 1000,
          padding: '20px'
        }}>
          <div className="glass-panel-elevated" style={{ width: '100%', maxWidth: '750px', background: '#0f172a', padding: '24px', borderRadius: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', margin: 0 }}>
                  Submit Campus Grievance
                </h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
                  Single Institutional Login: Your attendance & course context will automatically be attached.
                </p>
              </div>
              <button onClick={() => setShowSubmitModal(false)} className="btn btn-secondary btn-sm" style={{ borderRadius: '50%', width: '32px', height: '32px', padding: 0 }}>
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label className="form-label">Subject Line</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Biometric terminal #MB2-04 not syncing for morning OS lectures"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="form-label">Detailed Complaint Description</label>
                <textarea
                  className="form-textarea"
                  rows={4}
                  placeholder="Describe what occurred, terminal ID or portal issue, exact timestamps..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="form-label">Claimed System Failure Dates (Comma-separated)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="2026-10-18, 2026-10-21"
                  value={affectedDates}
                  onChange={(e) => setAffectedDates(e.target.value)}
                />
              </div>

              {/* Real-time Explainable Classifier Preview */}
              {liveClassification && (
                <div style={{ background: 'rgba(6, 182, 212, 0.08)', border: '1px solid rgba(6, 182, 212, 0.3)', borderRadius: '12px', padding: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--cyan-accent)', fontWeight: '700', fontSize: '0.8rem' }}>
                      <Cpu size={15} /> Real-Time Rule Classifier Preview
                    </div>
                    <span className={`badge badge-${liveClassification.department.toLowerCase().replace(/\s+/g, '')}`}>
                      Routing to: {liveClassification.department}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-main)', marginBottom: '6px' }}>
                    <strong>Category:</strong> {liveClassification.category}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {liveClassification.rationale}
                  </div>
                </div>
              )}

              {/* Automatic Academic Context Attach Banner */}
              <div style={{ background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.25)', borderRadius: '10px', padding: '12px 14px', fontSize: '0.78rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Layers size={16} color="var(--primary-light)" />
                  <span>
                    Auto-attaching: <strong>Arun Kumar (73.2% Attendance, High Risk: 82/100)</strong>
                  </span>
                </div>
                <span className="badge badge-urgent-pulse" style={{ fontSize: '0.65rem' }}>
                  Will be placed higher in queue
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '6px' }}>
                <button type="button" onClick={() => setShowSubmitModal(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ gap: '6px' }}>
                  <Send size={16} /> Submit Grievance
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Ticket Details Modal */}
      {selectedTicket && (
        <TicketDetailModal ticket={selectedTicket} onClose={() => setSelectedTicket(null)} />
      )}

    </div>
  );
};
