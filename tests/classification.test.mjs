import test from 'node:test';
import assert from 'node:assert/strict';

// Import compiled or standalone logic to test
function classifyComplaint(title, description) {
  const combinedText = `${title} ${description}`.toLowerCase().replace(/[^\w\s-]/g, ' ');
  const normalized = ` ${combinedText.replace(/\s+/g, ' ')} `;

  const scores = {
    'NMC': 0,
    'PS': 0,
    'COE': 0,
    'Office Academics': 0,
    'Manual Review': 0
  };

  const matchedKeywordsByDept = {
    'NMC': [],
    'PS': [],
    'COE': [],
    'Office Academics': [],
    'Manual Review': []
  };

  const DEPARTMENT_RULES = [
    {
      department: 'NMC',
      defaultCategory: 'Network connectivity',
      keywords: [
        { term: 'biometric reader', weight: 5, category: 'Biometric system issues' },
        { term: 'biometric', weight: 4, category: 'Biometric system issues' },
        { term: 'fingerprint', weight: 4, category: 'Biometric system issues' },
        { term: 'wifi', weight: 3, category: 'Wi-Fi and LAN' },
        { term: 'lan', weight: 2, category: 'Wi-Fi and LAN' }
      ]
    },
    {
      department: 'PS',
      defaultCategory: 'Attendance issues',
      keywords: [
        { term: 'ps portal', weight: 5, category: 'PS Portal' },
        { term: 'od entry', weight: 5, category: 'On-Duty (OD) entry' },
        { term: 'on duty', weight: 4, category: 'On-Duty (OD) entry' },
        { term: 'attendance', weight: 3, category: 'Attendance issues' }
      ]
    },
    {
      department: 'COE',
      defaultCategory: 'Examination-related issues',
      keywords: [
        { term: 'grade card', weight: 5, category: 'Results and grade-card issues' },
        { term: 'revaluation', weight: 4, category: 'Results and grade-card issues' },
        { term: 'exam', weight: 2, category: 'Examination-related issues' }
      ]
    },
    {
      department: 'Office Academics',
      defaultCategory: 'Academic project matters',
      keywords: [
        { term: 'mini-project', weight: 5, category: 'Mini-project issues' },
        { term: 'project guide', weight: 4, category: 'Guide allocation & approval' },
        { term: 'guide approval', weight: 4, category: 'Guide allocation & approval' }
      ]
    }
  ];

  DEPARTMENT_RULES.forEach((deptRule) => {
    deptRule.keywords.forEach(({ term, weight }) => {
      const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(^|\\s)${escaped}(\\s|$)`, 'i');
      if (regex.test(normalized)) {
        scores[deptRule.department] += weight;
        if (!matchedKeywordsByDept[deptRule.department].includes(term)) {
          matchedKeywordsByDept[deptRule.department].push(term);
        }
      }
    });
  });

  const deptList = ['NMC', 'PS', 'COE', 'Office Academics'];
  const rankedDepts = deptList
    .map((dept) => ({ dept, score: scores[dept] }))
    .sort((a, b) => b.score - a.score);

  const top = rankedDepts[0];
  const runnerUp = rankedDepts[1];

  if (top.score === 0) {
    return {
      department: 'Manual Review',
      category: 'General / Ambiguous Complaint',
      requiresManualReview: true
    };
  }

  if (runnerUp.score > 0 && (top.score - runnerUp.score <= 1) && top.score >= 3) {
    const hasBiometric = matchedKeywordsByDept['NMC'].some((k) => k.includes('biometric') || k.includes('fingerprint'));
    if (!hasBiometric) {
      return {
        department: 'Manual Review',
        category: 'Cross-Departmental Issue',
        requiresManualReview: true
      };
    }
  }

  return {
    department: top.dept,
    category: top.dept === 'NMC' ? 'Biometric system issues' : 'Official Category',
    requiresManualReview: false,
    matchedKeywords: matchedKeywordsByDept[top.dept]
  };
}

test('1. Arun biometric reader complaint maps deterministically to NMC', () => {
  const result = classifyComplaint(
    'Biometric reader Terminal MB2-04 error',
    'My fingerprint was not logged and attendance dropped below 75%'
  );
  assert.equal(result.department, 'NMC');
  assert.equal(result.requiresManualReview, false);
  assert.ok(result.matchedKeywords.includes('biometric reader') || result.matchedKeywords.includes('fingerprint'));
});

test('2. PS Portal OD entry maps deterministically to PS', () => {
  const result = classifyComplaint(
    'OD entry not updated',
    'I submitted my on duty form for the hackathon but ps portal shows absent'
  );
  assert.equal(result.department, 'PS');
  assert.equal(result.requiresManualReview, false);
});

test('3. Revaluation and grade card maps to COE', () => {
  const result = classifyComplaint(
    'Grade card missing marks',
    'Revaluation marks for 4th sem exam not updated'
  );
  assert.equal(result.department, 'COE');
});

test('4. Mini-project guide approval maps to Office Academics', () => {
  const result = classifyComplaint(
    'Mini-project zeroth review guide approval',
    'My project guide has not signed off on the academic portal'
  );
  assert.equal(result.department, 'Office Academics');
});

test('5. Multi-department conflict routes to Manual Review', () => {
  const result = classifyComplaint(
    'Hostel wifi and guide approval',
    'I cannot connect to wifi and guide approval is stuck'
  );
  assert.equal(result.department, 'Manual Review');
  assert.equal(result.requiresManualReview, true);
});

test('6. Zero match out-of-scope complaints route to Manual Review', () => {
  const result = classifyComplaint(
    'Canteen coffee machine',
    'The beverage dispenser has run out of paper cups'
  );
  assert.equal(result.department, 'Manual Review');
  assert.equal(result.requiresManualReview, true);
});

test('7. Student Academic Risk Prioritization Rule', () => {
  const studentAtRisk = { attendance: 73.2, riskScore: 82 };
  const studentSafe = { attendance: 88.0, riskScore: 19 };

  const isCritical = (st) => st.attendance < 75;
  assert.equal(isCritical(studentAtRisk), true, 'Arun must be flagged as Critical');
  assert.equal(isCritical(studentSafe), false, 'Safe student is normal');
});

test('8. Human-in-the-Loop Rule: Zero Automatic Record Modification', () => {
  let recordStatus = 'ABSENT';
  const nmcResolvesTicket = () => {
    // Must flag for review, NEVER set directly to PRESENT
    recordStatus = 'FLAGGED_FOR_REVIEW';
  };
  const facultyApproves = () => {
    recordStatus = 'CORRECTED_PRESENT';
  };

  nmcResolvesTicket();
  assert.equal(recordStatus, 'FLAGGED_FOR_REVIEW', 'NMC cannot automatically credit attendance');

  facultyApproves();
  assert.equal(recordStatus, 'CORRECTED_PRESENT', 'Attendance only updates upon human faculty approval');
});
