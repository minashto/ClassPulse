import { AttendanceRecord, Ticket, User } from '../types';

export const MOCK_USERS: Record<string, User> = {
  arun: {
    id: 'usr_arun_104',
    name: 'Arun Kumar M.',
    email: 'arun.cs22@bitsathy.ac.in',
    role: 'student',
    rollNumber: '7376221CS104',
    departmentName: 'Computer Science and Engineering',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
  },
  teacher: {
    id: 'usr_faculty_ramesh',
    name: 'Dr. S. K. Ramesh',
    email: 'sk.ramesh@bitsathy.ac.in',
    role: 'teacher',
    designation: 'Professor & Academic Mentor',
    departmentName: 'Computer Science and Engineering',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
  },
  nmc_staff: {
    id: 'usr_nmc_murugesan',
    name: 'K. Murugesan',
    email: 'murugesan.nmc@bitsathy.ac.in',
    role: 'department',
    departmentCode: 'NMC',
    designation: 'Senior Systems Engineer (Network & Biometrics)',
    departmentName: 'Network Maintenance Cell',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
  },
  admin: {
    id: 'usr_admin_dean',
    name: 'Dr. C. Saravanan',
    email: 'dean.academics@bitsathy.ac.in',
    role: 'admin',
    designation: 'Dean (Academic Affairs & Operations)',
    departmentName: 'Office of Academic Affairs',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80'
  }
};

export const INITIAL_ATTENDANCE_RECORDS: AttendanceRecord[] = [
  {
    id: 'att_oct18',
    studentId: 'usr_arun_104',
    courseCode: 'CS3501',
    courseName: 'Operating Systems',
    date: '2026-10-18',
    sessionTime: '08:45 AM - 10:30 AM',
    status: 'ABSENT',
    flagReason: 'Biometric reader Terminal #MB2-04 failed to sync to PS Portal',
    relatedTicketId: 'ticket_bit_1042'
  },
  {
    id: 'att_oct21',
    studentId: 'usr_arun_104',
    courseCode: 'CS3501',
    courseName: 'Operating Systems',
    date: '2026-10-21',
    sessionTime: '08:45 AM - 10:30 AM',
    status: 'ABSENT',
    flagReason: 'Biometric reader Terminal #MB2-04 gateway timeout',
    relatedTicketId: 'ticket_bit_1042'
  },
  {
    id: 'att_oct22',
    studentId: 'usr_arun_104',
    courseCode: 'CS3502',
    courseName: 'Database Management Systems',
    date: '2026-10-22',
    sessionTime: '10:45 AM - 12:30 PM',
    status: 'PRESENT'
  },
  {
    id: 'att_oct23',
    studentId: 'usr_arun_104',
    courseCode: 'CS3503',
    courseName: 'Computer Networks',
    date: '2026-10-23',
    sessionTime: '01:30 PM - 03:15 PM',
    status: 'PRESENT'
  },
  {
    id: 'att_oct24',
    studentId: 'usr_arun_104',
    courseCode: 'CS3501',
    courseName: 'Operating Systems',
    date: '2026-10-24',
    sessionTime: '08:45 AM - 10:30 AM',
    status: 'PRESENT'
  }
];

export const INITIAL_TICKETS: Ticket[] = [
  {
    id: 'ticket_bit_1042',
    ticketNumber: 'BIT-2026-1042',
    title: 'Biometric Machine Not Syncing in Mech Block 2nd Floor (Oct 18 & Oct 21)',
    description: 'Sir, I punched my fingerprint at 08:48 AM on Oct 18 and 08:51 AM on Oct 21 at Terminal #MB2-04 near CSE lab. The reader beeped green with OK beep, but in PS Portal attendance sheet I am marked absent for both morning OS lecture sessions. My attendance dropped to 73.2% and I received an automated debarment risk warning. Please verify the device log buffer.',
    studentId: 'usr_arun_104',
    studentName: 'Arun Kumar M.',
    studentEmail: 'arun.cs22@bitsathy.ac.in',
    studentRollNumber: '7376221CS104',
    category: 'Biometric system issues',
    departmentId: 'NMC',
    classificationMethod: 'rule-based-keyword-v1',
    matchedKeywords: ['biometric', 'fingerprint', 'terminal #mb2', 'biometric reader'],
    requiresManualReview: false,
    classificationRationale: 'Deterministic match for NMC based on keyword tokens: [biometric, fingerprint, biometric reader] with score 13.',
    status: 'OPEN',
    urgency: 'CRITICAL',
    affectedDates: ['2026-10-18', '2026-10-21'],
    attendanceCorrectionStatus: 'NONE',
    academicContext: {
      studentId: 'usr_arun_104',
      studentName: 'Arun Kumar M.',
      rollNumber: '7376221CS104',
      department: 'Computer Science and Engineering',
      semester: 5,
      overallAttendanceRate: 73.2,
      totalSessions: 41,
      attendedSessions: 30,
      riskScore: 82,
      riskLevel: 'HIGH',
      confusionSignalsCount: 3,
      registeredCourses: [
        { code: 'CS3501', name: 'Operating Systems', attendanceRate: 71.4, faculty: 'Dr. S. K. Ramesh' },
        { code: 'CS3502', name: 'Database Management Systems', attendanceRate: 75.0, faculty: 'Dr. P. Revathi' },
        { code: 'CS3503', name: 'Computer Networks', attendanceRate: 73.3, faculty: 'Prof. M. Vignesh' }
      ],
      recentAbsences: [
        { recordId: 'att_oct18', courseCode: 'CS3501', date: '2026-10-18', session: '08:45 AM', status: 'ABSENT' },
        { recordId: 'att_oct21', courseCode: 'CS3501', date: '2026-10-21', session: '08:45 AM', status: 'ABSENT' }
      ]
    },
    comments: [
      {
        id: 'comm_1',
        senderName: 'Arun Kumar M.',
        senderRole: 'student',
        senderEmail: 'arun.cs22@bitsathy.ac.in',
        body: 'Attaching photo of classroom arrival log. Other students in batch 22BCS also experienced delay at Terminal MB2-04 on those dates.',
        timestamp: '2026-10-22 09:15 AM'
      }
    ],
    timeline: [
      {
        id: 'time_1',
        action: 'CREATED',
        actorName: 'Arun Kumar M.',
        actorRole: 'student',
        timestamp: '2026-10-22 09:12 AM',
        details: 'Ticket created with attached academic context (Attendance: 73.2%, High Risk: 82/100). Auto-routed to NMC (Biometric system issues).'
      },
      {
        id: 'time_2',
        action: 'STATUS_CHANGE',
        actorName: 'ClearPulse Urgency Router',
        actorRole: 'admin',
        timestamp: '2026-10-22 09:12 AM',
        details: 'Ticket escalated to CRITICAL priority due to student attendance falling below 75% debarment threshold.'
      }
    ],
    createdAt: '2026-10-22 09:12 AM',
    updatedAt: '2026-10-22 09:15 AM'
  },
  {
    id: 'ticket_bit_1019',
    ticketNumber: 'BIT-2026-1019',
    title: 'Fingerprint scanner failure at Library Gate biometric terminal',
    description: 'The thumb scanner device at the central library turnstile displays "Host Connection Timed Out" intermittently during peak hours.',
    studentId: 'usr_arun_104',
    studentName: 'Arun Kumar M.',
    studentEmail: 'arun.cs22@bitsathy.ac.in',
    studentRollNumber: '7376221CS104',
    category: 'Biometric system issues',
    departmentId: 'NMC',
    classificationMethod: 'rule-based-keyword-v1',
    matchedKeywords: ['fingerprint', 'biometric'],
    requiresManualReview: false,
    classificationRationale: 'Deterministic match for NMC based on keyword tokens: [fingerprint, biometric] with score 8.',
    status: 'IN_PROGRESS',
    urgency: 'HIGH',
    affectedDates: [],
    attendanceCorrectionStatus: 'NONE',
    academicContext: {
      studentId: 'usr_arun_104',
      studentName: 'Arun Kumar M.',
      rollNumber: '7376221CS104',
      department: 'Computer Science and Engineering',
      semester: 5,
      overallAttendanceRate: 73.2,
      totalSessions: 41,
      attendedSessions: 30,
      riskScore: 82,
      riskLevel: 'HIGH',
      confusionSignalsCount: 3,
      registeredCourses: [],
      recentAbsences: []
    },
    comments: [
      {
        id: 'comm_lib_1',
        senderName: 'K. Murugesan',
        senderRole: 'department',
        senderEmail: 'murugesan.nmc@bitsathy.ac.in',
        body: 'NMC technician inspected ethernet patch cord. Firmware patch scheduled.',
        timestamp: '2026-10-23 11:30 AM'
      }
    ],
    timeline: [
      {
        id: 'time_lib_1',
        action: 'CREATED',
        actorName: 'Arun Kumar M.',
        actorRole: 'student',
        timestamp: '2026-10-21 04:20 PM',
        details: 'Ticket created and routed to NMC.'
      },
      {
        id: 'time_lib_2',
        action: 'STATUS_CHANGE',
        actorName: 'K. Murugesan',
        actorRole: 'department',
        timestamp: '2026-10-23 11:30 AM',
        details: 'Status changed to IN_PROGRESS. Technician dispatched.'
      }
    ],
    createdAt: '2026-10-21 04:20 PM',
    updatedAt: '2026-10-23 11:30 AM'
  },
  {
    id: 'ticket_bit_1033',
    ticketNumber: 'BIT-2026-1033',
    title: 'PS Portal On-Duty (OD) entry not reflecting for Hackathon',
    description: 'Submitted physical OD form signed by HoD for Smart India Hackathon participation on Oct 14-16, but PS Portal still marks as Unexcused Absence.',
    studentId: 'usr_priya_088',
    studentName: 'Priya Sundaram',
    studentEmail: 'priya.it22@bitsathy.ac.in',
    studentRollNumber: '7376221IT088',
    category: 'On-Duty (OD) entry',
    departmentId: 'PS',
    classificationMethod: 'rule-based-keyword-v1',
    matchedKeywords: ['on duty', 'od entry', 'ps portal'],
    requiresManualReview: false,
    classificationRationale: 'Deterministic match for PS based on tokens: [on duty, od entry, ps portal] with score 14.',
    status: 'OPEN',
    urgency: 'HIGH',
    affectedDates: ['2026-10-14', '2026-10-15', '2026-10-16'],
    attendanceCorrectionStatus: 'NONE',
    academicContext: {
      studentId: 'usr_priya_088',
      studentName: 'Priya Sundaram',
      rollNumber: '7376221IT088',
      department: 'Information Technology',
      semester: 5,
      overallAttendanceRate: 74.5,
      totalSessions: 40,
      attendedSessions: 29,
      riskScore: 68,
      riskLevel: 'MEDIUM',
      confusionSignalsCount: 1,
      registeredCourses: [],
      recentAbsences: []
    },
    comments: [],
    timeline: [
      {
        id: 'time_ps_1',
        action: 'CREATED',
        actorName: 'Priya Sundaram',
        actorRole: 'student',
        timestamp: '2026-10-23 02:15 PM',
        details: 'Ticket created and routed to PS & Student Affairs.'
      }
    ],
    createdAt: '2026-10-23 02:15 PM',
    updatedAt: '2026-10-23 02:15 PM'
  },
  {
    id: 'ticket_bit_1025',
    ticketNumber: 'BIT-2026-1025',
    title: 'End semester exam marks missing in grade card for CS3401',
    description: 'My provisional grade card for semester 4 shows WH (Withheld) for CS3401 Algorithms, while result was declared as cleared in revaluation.',
    studentId: 'usr_kavin_045',
    studentName: 'Kavin Raj',
    studentEmail: 'kavin.ec22@bitsathy.ac.in',
    studentRollNumber: '7376221EC045',
    category: 'Results and grade-card issues',
    departmentId: 'COE',
    classificationMethod: 'rule-based-keyword-v1',
    matchedKeywords: ['grade card', 'revaluation', 'results', 'end semester'],
    requiresManualReview: false,
    classificationRationale: 'Deterministic match for COE based on tokens: [grade card, revaluation, results] with score 12.',
    status: 'IN_PROGRESS',
    urgency: 'NORMAL',
    affectedDates: [],
    attendanceCorrectionStatus: 'NONE',
    academicContext: {
      studentId: 'usr_kavin_045',
      studentName: 'Kavin Raj',
      rollNumber: '7376221EC045',
      department: 'Electronics and Communication',
      semester: 5,
      overallAttendanceRate: 84.0,
      totalSessions: 42,
      attendedSessions: 35,
      riskScore: 28,
      riskLevel: 'LOW',
      confusionSignalsCount: 0,
      registeredCourses: [],
      recentAbsences: []
    },
    comments: [],
    timeline: [
      {
        id: 'time_coe_1',
        action: 'CREATED',
        actorName: 'Kavin Raj',
        actorRole: 'student',
        timestamp: '2026-10-20 10:00 AM',
        details: 'Ticket created and routed to Controller of Examinations (COE).'
      }
    ],
    createdAt: '2026-10-20 10:00 AM',
    updatedAt: '2026-10-20 10:00 AM'
  },
  {
    id: 'ticket_bit_1040',
    ticketNumber: 'BIT-2026-1040',
    title: 'Discrepancy with project guide allocation and lab wifi',
    description: 'I cannot connect to wifi in project lab and also mini-project coordinator has not verified my zeroth review submission in the academic portal.',
    studentId: 'usr_dinesh_019',
    studentName: 'Dinesh V.',
    studentEmail: 'dinesh.me22@bitsathy.ac.in',
    studentRollNumber: '7376221ME019',
    category: 'Cross-Departmental Issue',
    departmentId: 'Manual Review',
    classificationMethod: 'rule-based-keyword-v1',
    matchedKeywords: ['wifi', 'mini-project', 'zeroth review'],
    requiresManualReview: true,
    classificationRationale: 'Conflict detected between NMC (wifi: 3 pts) and Office Academics (mini-project: 5 pts, zeroth review: 4 pts). Routed to Manual Review for triage.',
    status: 'OPEN',
    urgency: 'NORMAL',
    affectedDates: [],
    attendanceCorrectionStatus: 'NONE',
    academicContext: {
      studentId: 'usr_dinesh_019',
      studentName: 'Dinesh V.',
      rollNumber: '7376221ME019',
      department: 'Mechanical Engineering',
      semester: 5,
      overallAttendanceRate: 88.0,
      totalSessions: 40,
      attendedSessions: 35,
      riskScore: 19,
      riskLevel: 'LOW',
      confusionSignalsCount: 0,
      registeredCourses: [],
      recentAbsences: []
    },
    comments: [],
    timeline: [
      {
        id: 'time_mr_1',
        action: 'CREATED',
        actorName: 'Dinesh V.',
        actorRole: 'student',
        timestamp: '2026-10-24 03:40 PM',
        details: 'Ticket flagged for Manual Review due to multi-department keyword match.'
      }
    ],
    createdAt: '2026-10-24 03:40 PM',
    updatedAt: '2026-10-24 03:40 PM'
  }
];

export const OTHER_STUDENTS_ROSTER = [
  {
    id: 'usr_student_deepa',
    name: 'Deepa R.',
    rollNumber: '7376221CS108',
    department: 'CSE',
    attendanceRate: 91.5,
    attendedSessions: 38,
    totalSessions: 41,
    riskScore: 12,
    riskLevel: 'LOW',
    openTicketsCount: 0,
    ticketSummary: 'No open tickets'
  },
  {
    id: 'usr_student_siddharth',
    name: 'Siddharth V.',
    rollNumber: '7376221CS145',
    department: 'CSE',
    attendanceRate: 85.4,
    attendedSessions: 35,
    totalSessions: 41,
    riskScore: 28,
    riskLevel: 'LOW',
    openTicketsCount: 0,
    ticketSummary: 'No open tickets'
  },
  {
    id: 'usr_student_meena',
    name: 'Meenakshi K.',
    rollNumber: '7376221CS130',
    department: 'CSE',
    attendanceRate: 74.0,
    attendedSessions: 30,
    totalSessions: 41,
    riskScore: 71,
    riskLevel: 'MEDIUM',
    openTicketsCount: 1,
    ticketSummary: '1 open PS ticket (Medical Leave Entry)'
  },
  {
    id: 'usr_student_tarun',
    name: 'Tarun Prasath',
    rollNumber: '7376221CS189',
    department: 'CSE',
    attendanceRate: 68.2,
    attendedSessions: 28,
    totalSessions: 41,
    riskScore: 89,
    riskLevel: 'HIGH',
    openTicketsCount: 0,
    ticketSummary: 'Unexcused absences (No system grievance recorded)'
  }
];
