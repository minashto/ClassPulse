import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AttendanceCorrectionModal } from '../components/AttendanceCorrectionModal';
import { TicketDetailModal } from '../components/TicketDetailModal';
import { Ticket } from '../types';
import { 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  ShieldCheck, 
  Lock, 
  FileCheck2, 
  TrendingUp, 
  Layers, 
  BarChart3, 
  Activity,
  Fingerprint
} from 'lucide-react';

export const TeacherView: React.FC = () => {
  const { currentUser, arunStats, tickets, otherStudents } = useApp();
  const [showCorrectionModal, setShowCorrectionModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  // Tickets for Arun
  const arunTickets = tickets.filter((t) => t.studentId === 'usr_arun_104');
  const mainTicket = arunTickets.find((t) => t.id === 'ticket_bit_1042') || arunTickets[0];

  return (
    <div style={{ padding: '0 24px 40px 24px', maxWidth: '1400px', margin: '0 auto' }}>
      
      {/* Top Banner */}
      <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="badge badge-academics">ClassPulse Instructor Dashboard</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Dept. of Computer Science & Engineering</span>
            </div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: '800', letterSpacing: '-0.02em', margin: 0 }}>
              {currentUser.name}
            </h1>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              {currentUser.designation} | Course Instructor: <strong>CS3501 - Operating Systems</strong>
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ background: 'rgba(255,255,255,0.04)', padding: '10px 16px', borderRadius: '10px', textAlign: 'center', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Section Strength</div>
              <div style={{ fontSize: '1.25rem', fontWeight: '800' }}>30 Students</div>
            </div>
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '10px 16px', borderRadius: '10px', textAlign: 'center', border: '1px solid rgba(239,68,68,0.3)' }}>
              <div style={{ fontSize: '0.72rem', color: '#fca5a5', textTransform: 'uppercase' }}>At Risk of Debarment</div>
              <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#ef4444' }}>
                {arunStats.overallAttendance < 75 ? '2 Students' : '1 Student'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PENDING ATTENDANCE CORRECTION ACTION BANNER (When NMC resolves ticket) */}
      {arunStats.hasFlaggedAbsences && (
        <div 
          className="glass-panel"
          style={{
            padding: '20px 24px',
            marginBottom: '24px',
            background: 'linear-gradient(90deg, rgba(245, 158, 11, 0.15) 0%, rgba(15, 23, 42, 0.95) 100%)',
            border: '2px solid rgba(245, 158, 11, 0.6)',
            borderRadius: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ 
              width: '46px', 
              height: '46px', 
              borderRadius: '12px', 
              background: 'rgba(245, 158, 11, 0.25)', 
              color: '#fbbf24', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              <FileCheck2 size={24} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="badge badge-warning" style={{ fontSize: '0.7rem' }}>
                  FACULTY ACTION REQUIRED
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Human-in-the-Loop Protocol
                </span>
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#ffffff', margin: '4px 0' }}>
                1 Ticket Resolved by NMC: 2 Absences Marked for Review for Arun Kumar
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>
                NMC verified terminal #MB2-04 biometric reader packet loss on Oct 18 & Oct 21. Per BIT Sathy policy, <strong>nothing changes automatically</strong> until you approve.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowCorrectionModal(true)}
            className="btn btn-warning"
            style={{ 
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', 
              color: '#ffffff', 
              padding: '12px 22px', 
              fontWeight: '700',
              boxShadow: '0 4px 16px rgba(245, 158, 11, 0.4)'
            }}
          >
            Review & Sign Off on Correction →
          </button>
        </div>
      )}

      {/* SUCCESS BANNER WHEN CORRECTION APPROVED */}
      {arunStats.correctionApproved && (
        <div 
          className="glass-panel"
          style={{
            padding: '16px 20px',
            marginBottom: '24px',
            background: 'rgba(16, 185, 129, 0.12)',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <CheckCircle size={22} color="#10b981" />
            <div>
              <strong style={{ fontSize: '0.9rem', color: '#34d399' }}>
                Attendance Correction Approved by Dr. S. K. Ramesh
              </strong>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Arun Kumar's absences for Oct 18 & Oct 21 credited as PRESENT. Attendance updated from 73.2% to <strong>78.0%</strong>. Risk score recalculated to <strong>24/100 (LOW)</strong>.
              </div>
            </div>
          </div>
          <span className="badge badge-success">CASE RESOLVED & SYNCED</span>
        </div>
      )}

      {/* Cohort Risk Matrix Table */}
      <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: '800', margin: 0 }}>
              Student Mentorship & Debarment Risk Matrix
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
              ClearPulse connects classroom tracking with institutional helpdesk status.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
            <Lock size={14} /> Student complaint text is kept confidential from faculty
          </div>
        </div>

        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Student Details</th>
                <th>Overall Attendance</th>
                <th>CS3501 (My Course)</th>
                <th>Early Warning Risk</th>
                <th>Campus System Context (Helpdesk)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              
              {/* PRIMARY PROTOTYPE SUBJECT: ARUN KUMAR */}
              <tr style={{ background: arunStats.hasFlaggedAbsences ? 'rgba(245, 158, 11, 0.08)' : arunStats.overallAttendance < 75 ? 'rgba(239, 68, 68, 0.06)' : 'rgba(16, 185, 129, 0.05)' }}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ 
                      width: '36px', 
                      height: '36px', 
                      borderRadius: '50%', 
                      background: 'rgba(99, 102, 241, 0.2)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      fontWeight: '700',
                      color: 'var(--primary-light)'
                    }}>
                      AK
                    </div>
                    <div>
                      <div style={{ fontWeight: '700', color: '#ffffff' }}>Arun Kumar M.</div>
                      <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--cyan-accent)' }}>7376221CS104</div>
                    </div>
                  </div>
                </td>

                {/* Overall Attendance */}
                <td>
                  <div style={{ fontSize: '1rem', fontWeight: '800', color: arunStats.overallAttendance < 75 ? '#f87171' : '#34d399' }}>
                    {arunStats.overallAttendance}%
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    {arunStats.attendedSessions} / {arunStats.totalSessions} sessions
                  </div>
                </td>

                {/* CS3501 Course Attendance */}
                <td>
                  <div style={{ fontSize: '0.95rem', fontWeight: '700', color: arunStats.correctionApproved ? '#34d399' : '#f87171' }}>
                    {arunStats.correctionApproved ? '85.7% (12/14)' : '71.4% (10/14)'}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: arunStats.correctionApproved ? '#34d399' : '#f87171' }}>
                    {arunStats.correctionApproved ? 'Safe' : 'Shortage'}
                  </div>
                </td>

                {/* Risk Score */}
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span className={`badge ${arunStats.riskLevel === 'HIGH' ? 'badge-danger' : 'badge-success'}`}>
                      {arunStats.riskScore}/100 ({arunStats.riskLevel})
                    </span>
                  </div>
                </td>

                {/* Campus System Context (Key requirement: "flags him with the note '2 open biometric tickets'") */}
                <td>
                  {arunStats.hasFlaggedAbsences ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span className="badge badge-warning" style={{ fontSize: '0.7rem' }}>
                        ⏳ NMC VERIFIED: 2 ABSENCES AWAITING REVIEW
                      </span>
                      <span style={{ fontSize: '0.75rem', color: '#fbbf24' }}>
                        Biometric terminal #MB2-04 error verified on Oct 18 & 21
                      </span>
                    </div>
                  ) : arunStats.correctionApproved ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>
                        ✅ 2 BIOMETRIC ABSENCES CORRECTED
                      </span>
                      <span style={{ fontSize: '0.75rem', color: '#34d399' }}>
                        Absences updated to present with faculty signoff
                      </span>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span className="badge badge-nmc" style={{ fontSize: '0.75rem' }}>
                        <Fingerprint size={12} /> 2 Open Biometric Tickets (NMC)
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        Terminal #MB2-04 sync failure reported to NMC
                      </span>
                    </div>
                  )}
                </td>

                {/* Actions */}
                <td>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {arunStats.hasFlaggedAbsences && (
                      <button
                        onClick={() => setShowCorrectionModal(true)}
                        className="btn btn-warning btn-sm"
                        style={{ fontSize: '0.75rem', padding: '5px 10px' }}
                      >
                        Sign Off Review
                      </button>
                    )}
                    <button
                      onClick={() => setSelectedTicket(mainTicket)}
                      className="btn btn-secondary btn-sm"
                      style={{ fontSize: '0.75rem', padding: '5px 10px', gap: '4px' }}
                    >
                      <Lock size={12} /> Protected View
                    </button>
                  </div>
                </td>
              </tr>

              {/* OTHER COHORT STUDENTS (TO PROVE CONTRAST BETWEEN SLIPPING VS SYSTEM FAILURE) */}
              {otherStudents.map((st) => (
                <tr key={st.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ 
                        width: '36px', 
                        height: '36px', 
                        borderRadius: '50%', 
                        background: 'rgba(255, 255, 255, 0.05)', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        fontSize: '0.8rem',
                        color: 'var(--text-dim)'
                      }}>
                        {st.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div style={{ fontWeight: '600' }}>{st.name}</div>
                        <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{st.rollNumber}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: '700', color: st.attendanceRate < 75 ? '#f87171' : '#f8fafc' }}>
                      {st.attendanceRate}%
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                      {st.attendedSessions} / {st.totalSessions} sessions
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: '600' }}>85.0%</div>
                  </td>
                  <td>
                    <span className={`badge ${st.riskLevel === 'HIGH' ? 'badge-danger' : st.riskLevel === 'MEDIUM' ? 'badge-warning' : 'badge-success'}`}>
                      {st.riskScore}/100 ({st.riskLevel})
                    </span>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.8rem', color: st.openTicketsCount > 0 ? '#f472b6' : 'var(--text-dim)' }}>
                      {st.ticketSummary}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                      Normal Standing
                    </span>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>

      {/* ClassPulse Confusion Pulse & Concept Mastery Insight */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: '800', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Activity size={18} color="var(--cyan-accent)" /> Continuous Lecture Confusion Pulse (CS3501 - Operating Systems)
            </h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
              Live telemetry aggregated from student confusion button clicks during active classroom lectures.
            </p>
          </div>
          <span className="badge badge-nmc">Live WebSocket Heatmap</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          
          <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '14px 18px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <strong style={{ fontSize: '0.85rem' }}>Virtual Memory & Page Replacement</strong>
              <span style={{ fontSize: '0.8rem', color: '#f87171', fontWeight: '700' }}>64% Confusion Pulse</span>
            </div>
            <div style={{ height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '64%', background: '#ef4444' }} />
            </div>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '6px', margin: 0 }}>
              19 students flagged confusion on LRU page replacement algorithm proof.
            </p>
          </div>

          <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '14px 18px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <strong style={{ fontSize: '0.85rem' }}>Process Synchronization (Semaphores)</strong>
              <span style={{ fontSize: '0.8rem', color: '#fbbf24', fontWeight: '700' }}>42% Confusion Pulse</span>
            </div>
            <div style={{ height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '42%', background: '#f59e0b' }} />
            </div>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '6px', margin: 0 }}>
              Moderate confusion reported on Dining Philosophers solution.
            </p>
          </div>

          <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '14px 18px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <strong style={{ fontSize: '0.85rem' }}>File System Inodes & Directory Trees</strong>
              <span style={{ fontSize: '0.8rem', color: '#34d399', fontWeight: '700' }}>14% Confusion Pulse</span>
            </div>
            <div style={{ height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '14%', background: '#10b981' }} />
            </div>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '6px', margin: 0 }}>
              High comprehension rate across cohort.
            </p>
          </div>

        </div>
      </div>

      {/* Attendance Correction Modal */}
      {showCorrectionModal && (
        <AttendanceCorrectionModal onClose={() => setShowCorrectionModal(false)} />
      )}

      {/* Protected Ticket Detail Modal */}
      {selectedTicket && (
        <TicketDetailModal ticket={selectedTicket} onClose={() => setSelectedTicket(null)} />
      )}

    </div>
  );
};
