import React, { useState } from 'react';
import { classifyComplaint } from '../utils/classifier';
import { Cpu, CheckCircle, AlertTriangle, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';
import { DepartmentCode } from '../types';

export const ClassifierDemoView: React.FC = () => {
  const presets = [
    {
      title: 'Biometric Machine Error',
      description: 'Biometric reader Terminal #MB2-04 near CSE lab failed to register fingerprint punching at 08:48 AM.',
      target: 'NMC'
    },
    {
      title: 'Hostel Wi-Fi Outage',
      description: 'Hostel wifi access point in D-block disconnects intermittently with captive portal gateway error.',
      target: 'NMC'
    },
    {
      title: 'PS Portal OD Attendance Delay',
      description: 'PS portal attendance not marked for Smart India Hackathon on duty entry approved by HoD.',
      target: 'PS'
    },
    {
      title: 'COE Semester Exam Revaluation',
      description: 'End semester exam grade card shows withheld for Algorithms while revaluation marks cleared.',
      target: 'COE'
    },
    {
      title: 'Mini-Project Guide Approval',
      description: 'Mini-project zeroth review submission guide approval pending in academic portal.',
      target: 'Office Academics'
    },
    {
      title: 'Conflict: Wi-Fi vs Project Portal',
      description: 'I cannot connect to hostel wifi and mini-project guide approval portal is also stuck.',
      target: 'Manual Review'
    },
    {
      title: 'Zero Match / Out-of-Scope Grievance',
      description: 'The cafeteria coffee machine is out of cups today.',
      target: 'Manual Review'
    }
  ];

  const [inputTitle, setInputTitle] = useState(presets[0].title);
  const [inputDesc, setInputDesc] = useState(presets[0].description);

  const result = classifyComplaint(inputTitle, inputDesc);

  const deptColors: Record<DepartmentCode, string> = {
    'NMC': '#06b6d4',
    'PS': '#ec4899',
    'COE': '#f59e0b',
    'Office Academics': '#8b5cf6',
    'Manual Review': '#64748b'
  };

  return (
    <div style={{ padding: '0 24px 40px 24px', maxWidth: '1400px', margin: '0 auto' }}>
      
      {/* Banner */}
      <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span className="badge badge-nmc">Explainable AI & Taxonomy</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Deterministic Rule-Based Engine</span>
        </div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: '800', letterSpacing: '-0.02em', margin: 0 }}>
          Live Classifier Sandbox & Keyword Weight Inspector
        </h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
          Key design choice: Ticket sorting stays 100% rule-based, deterministic, and explainable. Unclear complaints safely fallback to Manual Review.
        </p>
      </div>

      {/* Preset Buttons */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', alignSelf: 'center', fontWeight: '600' }}>
          Test Scenarios:
        </span>
        {presets.map((p, i) => (
          <button
            key={i}
            onClick={() => {
              setInputTitle(p.title);
              setInputDesc(p.description);
            }}
            className="btn btn-secondary btn-sm"
            style={{ fontSize: '0.75rem', padding: '6px 12px' }}
          >
            {p.title}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '24px' }}>
        
        {/* Input Form */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '16px' }}>
            Complaint Text Input
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label className="form-label">Subject Line</label>
              <input
                type="text"
                className="form-input"
                value={inputTitle}
                onChange={(e) => setInputTitle(e.target.value)}
                placeholder="Enter grievance title..."
              />
            </div>
            <div>
              <label className="form-label">Grievance Description</label>
              <textarea
                className="form-textarea"
                rows={5}
                value={inputDesc}
                onChange={(e) => setInputDesc(e.target.value)}
                placeholder="Enter full grievance text with keywords..."
              />
            </div>
          </div>
        </div>

        {/* Real-time Classification Results */}
        <div className="glass-panel" style={{ padding: '24px', border: `1px solid ${deptColors[result.department]}44` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: '700', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Cpu size={18} color="var(--cyan-accent)" /> Classifier Inference
            </h3>
            <span className={`badge badge-${result.department.toLowerCase().replace(/\s+/g, '')}`} style={{ fontSize: '0.8rem', padding: '4px 12px' }}>
              {result.department}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            
            {/* Target Category */}
            <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Target Category</div>
              <div style={{ fontSize: '1.1rem', fontWeight: '800', color: deptColors[result.department] }}>
                {result.category}
              </div>
            </div>

            {/* Scores Bar */}
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
                Department Scoring Breakdown:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {(['NMC', 'PS', 'COE', 'Office Academics'] as DepartmentCode[]).map((dept) => {
                  const s = result.scores[dept] || 0;
                  const maxScore = Math.max(...Object.values(result.scores), 1);
                  const pct = (s / maxScore) * 100;

                  return (
                    <div key={dept} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.8rem' }}>
                      <span style={{ width: '130px', fontWeight: '600', color: s > 0 ? '#ffffff' : 'var(--text-dim)' }}>
                        {dept}
                      </span>
                      <div style={{ flex: 1, height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${pct}%`, background: deptColors[dept], transition: 'width 0.3s ease' }} />
                      </div>
                      <span className="font-mono" style={{ width: '40px', textAlign: 'right', fontWeight: '700', color: s > 0 ? deptColors[dept] : 'var(--text-dim)' }}>
                        {s} pts
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Matched Tokens */}
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                Extracted Keyword Tokens:
              </div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {result.matchedKeywords.length === 0 ? (
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontStyle: 'italic' }}>
                    None (Zero matches)
                  </span>
                ) : (
                  result.matchedKeywords.map((k, i) => (
                    <span key={i} className="font-mono" style={{ background: 'rgba(99, 102, 241, 0.2)', color: 'var(--primary-light)', padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem' }}>
                      "{k}"
                    </span>
                  ))
                )}
              </div>
            </div>

            {/* Explainable Rationale */}
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px 14px', borderRadius: '10px', fontSize: '0.8rem', color: 'var(--text-main)', borderLeft: `3px solid ${deptColors[result.department]}` }}>
              <strong>Transparent Rationale:</strong> {result.rationale}
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
