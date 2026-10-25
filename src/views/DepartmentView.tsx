import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DepartmentCode, Ticket } from '../types';
import { TicketDetailModal } from '../components/TicketDetailModal';
import { 
  Server, 
  Fingerprint, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  ShieldAlert, 
  Layers, 
  Activity, 
  Search, 
  Filter,
  Cpu,
  Calendar,
  Sparkles
} from 'lucide-react';

export const DepartmentView: React.FC = () => {
  const { 
    currentUser, 
    tickets, 
    resolveTicketWithBiometricProof, 
    updateTicketStatus,
    arunStats
  } = useApp();

  const [selectedDept, setSelectedDept] = useState<DepartmentCode>('NMC');
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  // Filter tickets by department
  const deptTickets = tickets.filter((t) => t.departmentId === selectedDept);

  // Prioritize tickets: Students < 75% attendance or with high risk scores appear at the top!
  const sortedTickets = [...deptTickets].sort((a, b) => {
    const aAtRisk = a.academicContext.overallAttendanceRate < 75 ? 1 : 0;
    const bAtRisk = b.academicContext.overallAttendanceRate < 75 ? 1 : 0;
    if (aAtRisk !== bAtRisk) return bAtRisk - aAtRisk; // at-risk first

    const aScore = a.academicContext.riskScore || 0;
    const bScore = b.academicContext.riskScore || 0;
    return bScore - aScore;
  });

  const filteredTickets = filterStatus === 'ALL' 
    ? sortedTickets 
    : sortedTickets.filter((t) => t.status === filterStatus);

  const handleQuickResolve = (ticketId: string) => {
    resolveTicketWithBiometricProof(
      ticketId,
      'Biometric terminal #MB2-04 buffer packet loss verified on Oct 18 & Oct 21. Hardware audit log #HW-902 attached. Absences flagged for faculty verification.'
    );
  };

  const departments: { code: DepartmentCode; name: string; count: number }[] = [
    { code: 'NMC', name: 'Network Maintenance Cell', count: tickets.filter((t) => t.departmentId === 'NMC').length },
    { code: 'PS', name: 'PS & Student Affairs', count: tickets.filter((t) => t.departmentId === 'PS').length },
    { code: 'COE', name: 'Controller of Examinations', count: tickets.filter((t) => t.departmentId === 'COE').length },
    { code: 'Office Academics', name: 'Office of Academic Affairs', count: tickets.filter((t) => t.departmentId === 'Office Academics').length },
    { code: 'Manual Review', name: 'Manual Review & Triage', count: tickets.filter((t) => t.departmentId === 'Manual Review').length }
  ];

  return (
    <div style={{ padding: '0 24px 40px 24px', maxWidth: '1400px', margin: '0 auto' }}>
      
      {/* Top Banner */}
      <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="badge badge-nmc">Department Helpdesk Dispatch</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Institutional Queue & Telemetry</span>
            </div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: '800', letterSpacing: '-0.02em', margin: 0 }}>
              {currentUser.name}
            </h1>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              {currentUser.designation} | Active Department: <strong>{currentUser.departmentName}</strong>
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '10px 16px', borderRadius: '10px', textAlign: 'center', border: '1px solid rgba(239,68,68,0.3)' }}>
              <div style={{ fontSize: '0.72rem', color: '#fca5a5', textTransform: 'uppercase' }}>At-Risk Tickets Pinned</div>
              <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#ef4444' }}>
                {deptTickets.filter((t) => t.academicContext.overallAttendanceRate < 75).length} Urgent
              </div>
            </div>
            <div style={{ background: 'rgba(6, 182, 212, 0.1)', padding: '10px 16px', borderRadius: '10px', textAlign: 'center', border: '1px solid rgba(6,182,212,0.3)' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--cyan-accent)', textTransform: 'uppercase' }}>Total In Queue</div>
              <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#38bdf8' }}>
                {deptTickets.length} Tickets
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Department Selector Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {departments.map((d) => (
          <button
            key={d.code}
            onClick={() => setSelectedDept(d.code)}
            className="btn btn-sm"
            style={{
              padding: '8px 16px',
              borderRadius: '10px',
              border: selectedDept === d.code ? '1px solid var(--primary-light)' : '1px solid var(--border-color)',
              background: selectedDept === d.code ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(6, 182, 212, 0.2) 100%)' : 'rgba(15, 23, 42, 0.6)',
              color: selectedDept === d.code ? '#ffffff' : 'var(--text-muted)',
              fontWeight: selectedDept === d.code ? '700' : '500'
            }}
          >
            <span>{d.name}</span>
            <span style={{ 
              marginLeft: '6px', 
              fontSize: '0.7rem', 
              background: 'rgba(255,255,255,0.1)', 
              padding: '2px 6px', 
              borderRadius: '999px' 
            }}>
              {d.count}
            </span>
          </button>
        ))}
      </div>

      {/* Hardware Telemetry Card (For NMC: Biometric Terminal Status) */}
      {selectedDept === 'NMC' && (
        <div className="glass-panel" style={{ padding: '18px 24px', marginBottom: '24px', border: '1px solid rgba(6, 182, 212, 0.3)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Fingerprint size={18} color="var(--cyan-accent)" />
              <strong style={{ fontSize: '0.95rem' }}>Campus Biometric Reader Health Telemetry</strong>
            </div>
            <span className="badge badge-warning">1 Reader Buffer Sync Warning</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
            
            {/* Terminal MB2-04 (Subject of complaint) */}
            <div style={{ background: 'rgba(239, 68, 68, 0.08)', padding: '12px 14px', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.35)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span className="font-mono" style={{ fontSize: '0.85rem', fontWeight: '700', color: '#f87171' }}>Terminal #MB2-04</span>
                <span className="badge badge-danger" style={{ fontSize: '0.65rem' }}>PACKET DROP</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Mech Block 2nd Floor (CSE Lab Entrance)</div>
              <div style={{ fontSize: '0.7rem', color: '#fca5a5', marginTop: '4px' }}>
                ⚠️ Gateway timeout detected on Oct 18 & Oct 21 morning shifts. Explains Arun's attendance drop!
              </div>
            </div>

            {/* Other Terminals */}
            <div style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '12px 14px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span className="font-mono" style={{ fontSize: '0.85rem', fontWeight: '700' }}>Terminal #LB1-02</span>
                <span className="badge badge-warning" style={{ fontSize: '0.65rem' }}>INTERMITTENT</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Library Turnstile Gate</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: '4px' }}>
                Ethernet patch cord replaced. Firmware update queued.
              </div>
            </div>

            <div style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '12px 14px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span className="font-mono" style={{ fontSize: '0.85rem', fontWeight: '700' }}>Terminal #AC1-08</span>
                <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>ONLINE 100%</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Admin Block Main Lobby</div>
              <div style={{ fontSize: '0.7rem', color: '#34d399', marginTop: '4px' }}>
                Normal operation. 0 dropped packets.
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Tickets Queue Table */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: '800', margin: 0 }}>
              {selectedDept} Queue (Ranked by Student Academic Risk)
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
              Tickets carry student attendance & risk scores. At-risk students are automatically placed higher in the queue.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            {['ALL', 'OPEN', 'IN_PROGRESS', 'RESOLVED'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`btn btn-sm ${filterStatus === st ? 'btn-primary' : 'btn-secondary'}`}
                style={{ fontSize: '0.75rem', padding: '5px 12px' }}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {filteredTickets.map((ticket) => {
            const isAtRisk = ticket.academicContext.overallAttendanceRate < 75;
            const isArun = ticket.studentId === 'usr_arun_104';

            return (
              <div
                key={ticket.id}
                style={{
                  background: isAtRisk ? 'rgba(239, 68, 68, 0.05)' : 'rgba(15, 23, 42, 0.7)',
                  border: isAtRisk ? '1px solid rgba(239, 68, 68, 0.35)' : '1px solid var(--border-color)',
                  borderRadius: '12px',
                  padding: '16px 20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '16px',
                  transition: 'all 0.2s ease'
                }}
              >
                {/* Left ticket overview */}
                <div style={{ flex: '1 1 500px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span className="font-mono" style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--cyan-accent)' }}>
                      {ticket.ticketNumber}
                    </span>
                    <span className={`badge badge-${ticket.departmentId.toLowerCase().replace(/\s+/g, '')}`}>
                      {ticket.category}
                    </span>
                    <span className={`badge ${ticket.status === 'RESOLVED' ? 'badge-success' : ticket.status === 'IN_PROGRESS' ? 'badge-warning' : 'badge-danger'}`}>
                      {ticket.status}
                    </span>
                    {isAtRisk && (
                      <span className="badge badge-urgent-pulse">
                        🚨 AT-RISK STUDENT ({ticket.academicContext.overallAttendanceRate}% ATTENDANCE)
                      </span>
                    )}
                  </div>

                  <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#ffffff', margin: '4px 0' }}>
                    {ticket.title}
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '4px 0 8px 0', lineHeight: 1.4 }}>
                    {ticket.description}
                  </p>

                  {/* Attached Academic Context Pill (The core integration!) */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', background: 'rgba(0,0,0,0.25)', padding: '6px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', fontSize: '0.78rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>
                      Student: <strong>{ticket.studentName}</strong> ({ticket.studentRollNumber})
                    </span>
                    <span style={{ color: 'var(--text-dim)' }}>|</span>
                    <span style={{ color: isAtRisk ? '#f87171' : '#34d399' }}>
                      Attendance: <strong>{ticket.academicContext.overallAttendanceRate}%</strong> ({ticket.academicContext.attendedSessions}/{ticket.academicContext.totalSessions})
                    </span>
                    <span style={{ color: 'var(--text-dim)' }}>|</span>
                    <span style={{ color: isAtRisk ? '#f87171' : '#34d399' }}>
                      Risk Score: <strong>{ticket.academicContext.riskScore}/100</strong>
                    </span>
                    {ticket.affectedDates.length > 0 && (
                      <>
                        <span style={{ color: 'var(--text-dim)' }}>|</span>
                        <span style={{ color: '#fbbf24' }}>
                          Affected Dates: <strong>{ticket.affectedDates.join(', ')}</strong>
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Right Action buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
                  {ticket.status !== 'RESOLVED' && (
                    <button
                      onClick={() => handleQuickResolve(ticket.id)}
                      className="btn btn-success btn-sm"
                      style={{ padding: '8px 16px', gap: '6px' }}
                    >
                      <CheckCircle size={15} /> Verify & Resolve (Flag Absences)
                    </button>
                  )}
                  {ticket.status === 'RESOLVED' && (
                    <span className="badge badge-success" style={{ fontSize: '0.75rem', padding: '6px 12px' }}>
                      <CheckCircle size={13} /> {ticket.attendanceCorrectionStatus === 'APPROVED' ? 'Resolved & Approved by Faculty' : 'Resolved (Flagged for Teacher Review)'}
                    </span>
                  )}
                  <button
                    onClick={() => setSelectedTicket(ticket)}
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: '0.75rem', padding: '5px 12px' }}
                  >
                    View Timeline & Diagnostics
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Ticket Details Modal */}
      {selectedTicket && (
        <TicketDetailModal ticket={selectedTicket} onClose={() => setSelectedTicket(null)} />
      )}

    </div>
  );
};
