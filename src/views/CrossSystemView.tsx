import React from 'react';
import { 
  Server, 
  Layers, 
  ShieldCheck, 
  Users, 
  GraduationCap, 
  ArrowRight, 
  CheckCircle, 
  Cpu, 
  Sparkles,
  Lock,
  FileCheck2
} from 'lucide-react';

export const CrossSystemView: React.FC = () => {
  return (
    <div style={{ padding: '0 24px 40px 24px', maxWidth: '1400px', margin: '0 auto' }}>
      
      {/* Banner */}
      <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span className="badge badge-nmc">System Integration Architecture</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>BIT Sathy Institutional Unified Bridge</span>
        </div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: '800', letterSpacing: '-0.02em', margin: 0 }}>
          ClearPulse Connected Dataflow & Privacy Boundary
        </h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
          How ClassPulse and the Helpdesk communicate securely while enforcing strict privacy and human approvals.
        </p>
      </div>

      {/* High-Level Architecture Flowchart Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '28px' }}>
        
        {/* Module 1: Student & ClassPulse Telemetry */}
        <div className="glass-panel" style={{ padding: '20px', borderTop: '3px solid #6366f1' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <span style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(99, 102, 241, 0.2)', color: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <GraduationCap size={20} />
            </span>
            <div>
              <strong style={{ fontSize: '0.95rem' }}>1. Academic Context Layer</strong>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ClassPulse Engine</div>
            </div>
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-main)', lineHeight: 1.45 }}>
            Tracks lecture attendance, real-time confusion pulses, and computes early-warning dropout risk scores (0-100). When a student submits a grievance, their current attendance and risk status are automatically attached.
          </p>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '8px', fontSize: '0.75rem', marginTop: '12px' }}>
            ✓ Real-time risk scoring<br/>
            ✓ Automated academic context injection<br/>
            ✓ Anti-proxy attendance audits
          </div>
        </div>

        {/* Module 2: Rule-Based Classifier & Urgency Dispatcher */}
        <div className="glass-panel" style={{ padding: '20px', borderTop: '3px solid #06b6d4' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <span style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(6, 182, 212, 0.2)', color: 'var(--cyan-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Cpu size={20} />
            </span>
            <div>
              <strong style={{ fontSize: '0.95rem' }}>2. Explainable Dispatcher</strong>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Rule-Based Classifier</div>
            </div>
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-main)', lineHeight: 1.45 }}>
            Normalizes complaint text, evaluates weighted N-grams across official campus departments (NMC, PS, COE, Office Academics), and promotes tickets from students &lt;75% attendance to the top of the queue.
          </p>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '8px', fontSize: '0.75rem', marginTop: '12px' }}>
            ✓ 100% deterministic & explainable<br/>
            ✓ Conflict fallback to Manual Review<br/>
            ✓ Dynamic risk-weighted prioritization
          </div>
        </div>

        {/* Module 3: Human-in-the-Loop Gateway */}
        <div className="glass-panel" style={{ padding: '20px', borderTop: '3px solid #10b981' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <span style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileCheck2 size={20} />
            </span>
            <div>
              <strong style={{ fontSize: '0.95rem' }}>3. Faculty Sign-Off Gateway</strong>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Human Approval Guard</div>
            </div>
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-main)', lineHeight: 1.45 }}>
            When a department resolves a technical grievance, attendance records are <strong>never automatically overwritten</strong>. Instead, they are flagged for faculty verification, ensuring institutional accountability and NAAC compliance.
          </p>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '8px', fontSize: '0.75rem', marginTop: '12px' }}>
            ✓ Zero automatic record manipulation<br/>
            ✓ Faculty mentor review drawer<br/>
            ✓ Instant post-approval risk recalculation
          </div>
        </div>

      </div>

      {/* Privacy Policy Comparison Matrix */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Lock size={18} color="var(--primary-light)" />
          Role-Based Access Control (RBAC) & Privacy Matrix
        </h3>
        
        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Data Field / Action</th>
                <th>Student</th>
                <th>Teacher (Mentor)</th>
                <th>Department (NMC / PS / COE)</th>
                <th>Admin (Dean Academics)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Attendance & Risk Score</strong></td>
                <td><span className="badge badge-success">Personal Read</span></td>
                <td><span className="badge badge-success">Cohort Read</span></td>
                <td><span className="badge badge-success">Ticket Attached Read</span></td>
                <td><span className="badge badge-success">Campus-wide Read</span></td>
              </tr>
              <tr>
                <td><strong>Full Complaint Description</strong></td>
                <td><span className="badge badge-success">Full Access</span></td>
                <td><span className="badge badge-danger">🔒 Masked / Privacy Shield</span></td>
                <td><span className="badge badge-success">Full Access</span></td>
                <td><span className="badge badge-success">Full Access</span></td>
              </tr>
              <tr>
                <td><strong>Ticket Status & Category</strong></td>
                <td><span className="badge badge-success">Read</span></td>
                <td><span className="badge badge-success">Read Only</span></td>
                <td><span className="badge badge-success">Read & Update</span></td>
                <td><span className="badge badge-success">Full Manage</span></td>
              </tr>
              <tr>
                <td><strong>Approve Attendance Correction</strong></td>
                <td><span className="badge badge-danger">Forbidden</span></td>
                <td><span className="badge badge-success">Sole Approval Authority</span></td>
                <td><span className="badge badge-warning">Verification Only</span></td>
                <td><span className="badge badge-success">Override Authority</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
