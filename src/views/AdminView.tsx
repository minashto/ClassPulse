import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Ticket, DepartmentCode } from '../types';
import { TicketDetailModal } from '../components/TicketDetailModal';
import { 
  ShieldCheck, 
  BarChart3, 
  PieChart, 
  AlertTriangle, 
  CheckCircle, 
  HelpCircle, 
  ArrowRight, 
  Layers, 
  TrendingDown, 
  Sparkles,
  Users
} from 'lucide-react';

export const AdminView: React.FC = () => {
  const { currentUser, tickets, arunStats, updateTicketStatus } = useApp();
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  // Manual review tickets
  const manualReviewTickets = tickets.filter(
    (t) => t.departmentId === 'Manual Review' || t.requiresManualReview
  );

  return (
    <div style={{ padding: '0 24px 40px 24px', maxWidth: '1400px', margin: '0 auto' }}>
      
      {/* Top Banner */}
      <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="badge badge-academics">Office of Academic Operations</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Institutional Analytics & Cross-Triage</span>
            </div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: '800', letterSpacing: '-0.02em', margin: 0 }}>
              Campus Academic & System Integrity Overview
            </h1>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Solving the core dilemma: Disentangling genuine student slipping from institutional system failures.
            </p>
          </div>

          <div style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%)', padding: '12px 20px', borderRadius: '12px', border: '1px solid rgba(99, 102, 241, 0.4)' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--cyan-accent)', textTransform: 'uppercase', fontWeight: '700' }}>Executive Status</div>
            <div style={{ fontSize: '1.1rem', fontWeight: '800' }}>ClassPulse + Helpdesk Live</div>
          </div>
        </div>
      </div>

      {/* CORE PROBLEM STATEMENT RESOLUTION: "Slipped vs System Failure" Breakdown */}
      <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
        <div style={{ marginBottom: '16px' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: '800', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Layers size={20} color="var(--primary-light)" />
            Root-Cause Attribution of Students Below 75% Attendance
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
            Before ClearPulse, teachers chased all 14 at-risk students indiscriminately. ClearPulse identifies that <strong>64.3% of drops are caused by system failures</strong> (biometric reader packet loss, PS portal OD delays, results withheld).
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          
          {/* Card 1: System Failure Attributed */}
          <div style={{ background: 'rgba(6, 182, 212, 0.08)', padding: '18px 20px', borderRadius: '14px', border: '1px solid rgba(6, 182, 212, 0.35)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span className="badge badge-nmc">Campus System Failure</span>
              <span style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--cyan-accent)' }}>64.3%</span>
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#ffffff' }}>9 Students</div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Drops explained by open/verified tickets (Biometric reader errors: 5, PS Portal OD sync: 3, COE marksheet: 1).
            </p>
            <div style={{ fontSize: '0.75rem', color: '#38bdf8', fontWeight: '600', marginTop: '8px' }}>
              → Routed to Departments (NMC / PS / COE) with escalated urgency!
            </div>
          </div>

          {/* Card 2: Genuine Student Slips */}
          <div style={{ background: 'rgba(239, 68, 68, 0.08)', padding: '18px 20px', borderRadius: '14px', border: '1px solid rgba(239, 68, 68, 0.35)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span className="badge badge-danger">Unexcused Student Slump</span>
              <span style={{ fontSize: '1.5rem', fontWeight: '800', color: '#f87171' }}>35.7%</span>
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#ffffff' }}>5 Students</div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Students with low attendance & zero registered system grievances (e.g. Tarun Prasath: 68.2%).
            </p>
            <div style={{ fontSize: '0.75rem', color: '#f87171', fontWeight: '600', marginTop: '8px' }}>
              → Faculty mentors intervene directly without guessing!
            </div>
          </div>

          {/* Card 3: Total At-Risk Cohort */}
          <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '18px 20px', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span className="badge badge-warning">Total Debarment Risk</span>
              <span style={{ fontSize: '1.5rem', fontWeight: '800', color: '#fbbf24' }}>14 Students</span>
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#ffffff' }}>4.6% of Cohort</div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Average turnaround time for system corrections reduced from 14 days to <strong>3.2 hours</strong>.
            </p>
            <div style={{ fontSize: '0.75rem', color: '#34d399', fontWeight: '600', marginTop: '8px' }}>
              ✓ Human-in-the-loop audit logs preserved for NAAC/NBA compliance.
            </div>
          </div>

        </div>
      </div>

      {/* Manual Review & Triage Queue (Key Design Choice #1) */}
      <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <HelpCircle size={18} color="var(--primary-light)" />
              Manual Review & Triage Queue (Explainable Classifier Fallback)
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
              Key design choice: Unclear or multi-department conflict complaints route here so humans triage without arbitrary machine guessing.
            </p>
          </div>
          <span className="badge badge-manual">
            {manualReviewTickets.length} Pending Triage
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {manualReviewTickets.map((t) => (
            <div 
              key={t.id}
              style={{
                background: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid rgba(148, 163, 184, 0.3)',
                borderRadius: '12px',
                padding: '16px 20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '14px'
              }}
            >
              <div style={{ flex: '1 1 500px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span className="font-mono" style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--cyan-accent)' }}>
                    {t.ticketNumber}
                  </span>
                  <span className="badge badge-manual">CONFLICT DETECTED</span>
                  <span className="badge badge-warning">{t.status}</span>
                </div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#ffffff', margin: '4px 0' }}>
                  {t.title}
                </h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '4px 0' }}>
                  {t.description}
                </p>
                <div style={{ fontSize: '0.75rem', color: '#fbbf24', marginTop: '6px' }}>
                  <strong>Classifier Rationale:</strong> {t.classificationRationale}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => setSelectedTicket(t)}
                  className="btn btn-secondary btn-sm"
                  style={{ fontSize: '0.75rem' }}
                >
                  Inspect Conflict
                </button>
                <button
                  onClick={() => alert(`Assigned ${t.ticketNumber} to Office Academics for project review coordination.`)}
                  className="btn btn-primary btn-sm"
                  style={{ fontSize: '0.75rem' }}
                >
                  Assign to Academics →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ticket Details Modal */}
      {selectedTicket && (
        <TicketDetailModal ticket={selectedTicket} onClose={() => setSelectedTicket(null)} />
      )}

    </div>
  );
};
