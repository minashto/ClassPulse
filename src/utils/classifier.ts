import { ClassificationResult, DepartmentCode } from '../types';

interface DepartmentRule {
  department: DepartmentCode;
  defaultCategory: string;
  categoryRules: {
    category: string;
    keywords: string[];
    weight: number;
  }[];
  keywords: {
    term: string;
    weight: number;
    category?: string;
  }[];
}

const DEPARTMENT_RULES: DepartmentRule[] = [
  {
    department: 'NMC',
    defaultCategory: 'Network connectivity',
    categoryRules: [
      {
        category: 'Biometric system issues',
        keywords: ['biometric', 'fingerprint', 'thumb scanner', 'biometric reader', 'biometric machine', 'terminal mb2', 'punching machine', 'biometric attendance', 'biometric error'],
        weight: 4
      },
      {
        category: 'Wi-Fi and LAN',
        keywords: ['wifi', 'wi-fi', 'lan', 'ethernet', 'hostel wifi', 'eduroam', 'mac address', 'ssid', 'hotspot'],
        weight: 3
      },
      {
        category: 'Network access points',
        keywords: ['access point', 'ap device', 'router', 'switch', 'network cable', 'patch cord', 'signal drop'],
        weight: 3
      },
      {
        category: 'Network connectivity',
        keywords: ['captive portal', 'no internet', 'bandwidth', 'packet loss', 'dns', 'ping', 'ip address'],
        weight: 2
      }
    ],
    keywords: [
      { term: 'biometric reader', weight: 5, category: 'Biometric system issues' },
      { term: 'biometric attendance', weight: 5, category: 'Biometric system issues' },
      { term: 'biometric machine', weight: 4, category: 'Biometric system issues' },
      { term: 'fingerprint', weight: 4, category: 'Biometric system issues' },
      { term: 'biometric', weight: 4, category: 'Biometric system issues' },
      { term: 'thumb scanner', weight: 4, category: 'Biometric system issues' },
      { term: 'hostel wifi', weight: 4, category: 'Wi-Fi and LAN' },
      { term: 'captive portal', weight: 4, category: 'Network connectivity' },
      { term: 'mac address', weight: 3, category: 'Wi-Fi and LAN' },
      { term: 'access point', weight: 3, category: 'Network access points' },
      { term: 'wi-fi', weight: 3, category: 'Wi-Fi and LAN' },
      { term: 'wifi', weight: 3, category: 'Wi-Fi and LAN' },
      { term: 'ethernet', weight: 3, category: 'Wi-Fi and LAN' },
      { term: 'lan', weight: 2, category: 'Wi-Fi and LAN' },
      { term: 'router', weight: 2, category: 'Network access points' },
      { term: 'internet', weight: 1, category: 'Network connectivity' }
    ]
  },
  {
    department: 'PS',
    defaultCategory: 'Attendance issues',
    categoryRules: [
      {
        category: 'Attendance issues',
        keywords: ['attendance', 'absent', 'attendance discrepancy', 'present marked absent', 'attendance percentage', 'shortage'],
        weight: 4
      },
      {
        category: 'PS Portal',
        keywords: ['ps portal', 'ps login', 'student portal', 'portal server', 'erp portal', 'profile error'],
        weight: 4
      },
      {
        category: 'PCDP App',
        keywords: ['pcdp', 'pcdp app', 'bit app', 'mobile app login', 'pcdp sync'],
        weight: 4
      },
      {
        category: 'On-Duty (OD) entry',
        keywords: ['on duty', 'od entry', 'od form', 'od approval', 'leave application', 'medical leave', 'duty leave'],
        weight: 4
      }
    ],
    keywords: [
      { term: 'ps portal', weight: 5, category: 'PS Portal' },
      { term: 'pcdp app', weight: 5, category: 'PCDP App' },
      { term: 'od entry', weight: 5, category: 'On-Duty (OD) entry' },
      { term: 'on duty', weight: 4, category: 'On-Duty (OD) entry' },
      { term: 'duty leave', weight: 4, category: 'On-Duty (OD) entry' },
      { term: 'leave application', weight: 4, category: 'On-Duty (OD) entry' },
      { term: 'pcdp', weight: 4, category: 'PCDP App' },
      { term: 'ps login', weight: 4, category: 'PS Portal' },
      { term: 'attendance percentage', weight: 4, category: 'Attendance issues' },
      { term: 'attendance', weight: 3, category: 'Attendance issues' },
      { term: 'absent', weight: 2, category: 'Attendance issues' }
    ]
  },
  {
    department: 'COE',
    defaultCategory: 'Examination-related issues',
    categoryRules: [
      {
        category: 'Results and grade-card issues',
        keywords: ['results', 'grade card', 'marksheet', 'gpa', 'cgpa', 'revaluation', 'marks correction', 'grade calculation'],
        weight: 4
      },
      {
        category: 'Examination timetable',
        keywords: ['exam timetable', 'exam schedule', 'clash in dates', 'exam slot', 'exam routine'],
        weight: 4
      },
      {
        category: 'Examination-related issues',
        keywords: ['hall ticket', 'admit card', 'arrear', 'sem exam', 'end semester', 'internal marks', 'exam registration'],
        weight: 3
      }
    ],
    keywords: [
      { term: 'grade card', weight: 5, category: 'Results and grade-card issues' },
      { term: 'hall ticket', weight: 5, category: 'Examination-related issues' },
      { term: 'exam timetable', weight: 5, category: 'Examination timetable' },
      { term: 'end semester', weight: 4, category: 'Examination-related issues' },
      { term: 'revaluation', weight: 4, category: 'Results and grade-card issues' },
      { term: 'marksheet', weight: 4, category: 'Results and grade-card issues' },
      { term: 'internal marks', weight: 4, category: 'Results and grade-card issues' },
      { term: 'results', weight: 3, category: 'Results and grade-card issues' },
      { term: 'cgpa', weight: 3, category: 'Results and grade-card issues' },
      { term: 'gpa', weight: 3, category: 'Results and grade-card issues' },
      { term: 'arrear', weight: 3, category: 'Examination-related issues' },
      { term: 'exam', weight: 2, category: 'Examination-related issues' },
      { term: 'timetable', weight: 2, category: 'Examination timetable' }
    ]
  },
  {
    department: 'Office Academics',
    defaultCategory: 'Academic project matters',
    categoryRules: [
      {
        category: 'Mini-project issues',
        keywords: ['mini-project', 'mini project', 'zeroth review', 'first review', 'mini project coordinator', 'mini project portal'],
        weight: 4
      },
      {
        category: 'Guide allocation & approval',
        keywords: ['project guide', 'guide approval', 'guide change', 'mentor signoff', 'faculty mentor'],
        weight: 4
      },
      {
        category: 'Academic project matters',
        keywords: ['academic project', 'final year project', 'capstone', 'project viva', 'thesis approval', 'patent review'],
        weight: 3
      }
    ],
    keywords: [
      { term: 'mini-project', weight: 5, category: 'Mini-project issues' },
      { term: 'mini project', weight: 5, category: 'Mini-project issues' },
      { term: 'final year project', weight: 5, category: 'Academic project matters' },
      { term: 'project guide', weight: 4, category: 'Guide allocation & approval' },
      { term: 'guide approval', weight: 4, category: 'Guide allocation & approval' },
      { term: 'academic project', weight: 4, category: 'Academic project matters' },
      { term: 'zeroth review', weight: 4, category: 'Mini-project issues' },
      { term: 'capstone', weight: 3, category: 'Academic project matters' },
      { term: 'project review', weight: 3, category: 'Mini-project issues' }
    ]
  }
];

export function classifyComplaint(title: string, description: string): ClassificationResult {
  const combinedText = `${title} ${description}`.toLowerCase().replace(/[^\w\s-]/g, ' ');
  const normalized = ` ${combinedText.replace(/\s+/g, ' ')} `;

  const scores: Record<DepartmentCode, number> = {
    'NMC': 0,
    'PS': 0,
    'COE': 0,
    'Office Academics': 0,
    'Manual Review': 0
  };

  const matchedKeywordsByDept: Record<DepartmentCode, string[]> = {
    'NMC': [],
    'PS': [],
    'COE': [],
    'Office Academics': [],
    'Manual Review': []
  };

  const categoryScoresByDept: Record<DepartmentCode, Record<string, number>> = {
    'NMC': {},
    'PS': {},
    'COE': {},
    'Office Academics': {},
    'Manual Review': {}
  };

  // Evaluate each department's keyword match
  DEPARTMENT_RULES.forEach((deptRule) => {
    deptRule.keywords.forEach(({ term, weight, category }) => {
      // Regex check with word boundary or clean substring
      const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(^|\\s)${escaped}(\\s|$)`, 'i');
      if (regex.test(normalized)) {
        scores[deptRule.department] += weight;
        if (!matchedKeywordsByDept[deptRule.department].includes(term)) {
          matchedKeywordsByDept[deptRule.department].push(term);
        }
        if (category) {
          categoryScoresByDept[deptRule.department][category] =
            (categoryScoresByDept[deptRule.department][category] || 0) + weight;
        }
      }
    });
  });

  const deptList: DepartmentCode[] = ['NMC', 'PS', 'COE', 'Office Academics'];
  const rankedDepts = deptList
    .map((dept) => ({ dept, score: scores[dept] }))
    .sort((a, b) => b.score - a.score);

  const top = rankedDepts[0];
  const runnerUp = rankedDepts[1];

  // Zero-match case
  if (top.score === 0) {
    return {
      department: 'Manual Review',
      category: 'General / Ambiguous Complaint',
      matchedKeywords: [],
      scores,
      requiresManualReview: true,
      rationale: 'Zero keyword matches across official department taxonomies. Routed to Manual Review & Triage.'
    };
  }

  // Conflict / Tie Case (score difference <= 1 and both have >= 3 points)
  if (runnerUp.score > 0 && (top.score - runnerUp.score <= 1) && top.score >= 3) {
    // Check if biometric vs attendance: biometric system issues belong strictly to NMC
    const hasBiometric = matchedKeywordsByDept['NMC'].some((k) => k.includes('biometric') || k.includes('fingerprint'));
    if (hasBiometric && top.dept === 'NMC') {
      // Biometric explicitly prioritizes NMC
    } else if (hasBiometric && runnerUp.dept === 'NMC' && runnerUp.score >= 4) {
      // Prioritize NMC for hardware biometric
    } else {
      return {
        department: 'Manual Review',
        category: 'Cross-Departmental Issue',
        matchedKeywords: Array.from(new Set([...matchedKeywordsByDept[top.dept], ...matchedKeywordsByDept[runnerUp.dept]])),
        scores,
        requiresManualReview: true,
        rationale: `Conflict detected between ${top.dept} (${top.score} pts) and ${runnerUp.dept} (${runnerUp.score} pts). Routed to Manual Review for human triage.`
      };
    }
  }

  // Determine top category in winning department
  const winningDeptRule = DEPARTMENT_RULES.find((r) => r.department === top.dept)!;
  const catScores = categoryScoresByDept[top.dept];
  let bestCategory = winningDeptRule.defaultCategory;
  let maxCatScore = 0;

  Object.entries(catScores).forEach(([cat, s]) => {
    if (s > maxCatScore) {
      maxCatScore = s;
      bestCategory = cat;
    }
  });

  return {
    department: top.dept,
    category: bestCategory,
    matchedKeywords: matchedKeywordsByDept[top.dept],
    scores,
    requiresManualReview: false,
    rationale: `Deterministic match for ${top.dept} based on keyword tokens: [${matchedKeywordsByDept[top.dept].join(', ')}] with score ${top.score}.`
  };
}
