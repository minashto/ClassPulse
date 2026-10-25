import React, { createContext, useContext, useState, useMemo } from 'react';
import {
  AttendanceRecord,
  DepartmentCode,
  Ticket,
  TicketStatus,
  User,
  UserRole
} from '../types';
import {
  INITIAL_ATTENDANCE_RECORDS,
  INITIAL_TICKETS,
  MOCK_USERS,
  OTHER_STUDENTS_ROSTER
} from '../data/mockData';
import { classifyComplaint } from '../utils/classifier';

interface AppContextType {
  currentUser: User;
  setCurrentUser: (user: User) => void;
  switchRole: (role: UserRole) => void;
  tickets: Ticket[];
  attendanceRecords: AttendanceRecord[];
  activeStep: number;
  setActiveStep: (step: number) => void;
  nextStep: () => void;
  resetDemo: () => void;
  // Ticket Actions
  createTicket: (title: string, description: string, affectedDates: string[]) => Ticket;
  updateTicketStatus: (ticketId: string, status: TicketStatus, notes?: string) => void;
  addComment: (ticketId: string, body: string) => void;
  // Department Actions
  resolveTicketWithBiometricProof: (ticketId: string, resolutionNotes: string) => void;
  // Teacher Actions
  approveAttendanceCorrection: (ticketId: string, recordIds: string[]) => void;
  rejectAttendanceCorrection: (ticketId: string, reason: string) => void;
  // Calculated state for Arun
  arunStats: {
    overallAttendance: number;
    attendedSessions: number;
    totalSessions: number;
    riskScore: number;
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
    openBiometricTicketsCount: number;
    hasFlaggedAbsences: boolean;
    flaggedRecordsCount: number;
    correctionApproved: boolean;
  };
  otherStudents: typeof OTHER_STUDENTS_ROSTER;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(MOCK_USERS.arun);
  const [tickets, setTickets] = useState<Ticket[]>(INITIAL_TICKETS);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(INITIAL_ATTENDANCE_RECORDS);
  const [activeStep, setActiveStep] = useState<number>(1);

  const switchRole = (role: UserRole) => {
    switch (role) {
      case 'student':
        setCurrentUser(MOCK_USERS.arun);
        break;
      case 'teacher':
        setCurrentUser(MOCK_USERS.teacher);
        break;
      case 'department':
        setCurrentUser(MOCK_USERS.nmc_staff);
        break;
      case 'admin':
        setCurrentUser(MOCK_USERS.admin);
        break;
    }
  };

  // Dynamically calculate Arun's stats based on current attendanceRecords
  const arunStats = useMemo(() => {
    const arunRecords = attendanceRecords.filter((r) => r.studentId === 'usr_arun_104');
    const flaggedRecords = arunRecords.filter((r) => r.status === 'FLAGGED_FOR_REVIEW');
    const correctedRecords = arunRecords.filter((r) => r.status === 'CORRECTED_PRESENT');

    const totalSessions = 41;
    // Initial attended was 30. Corrected present adds to attended sessions.
    const attendedSessions = 30 + correctedRecords.length;
    const overallAttendance = Number(((attendedSessions / totalSessions) * 100).toFixed(1));

    // Open biometric tickets for Arun
    const openBiometricTickets = tickets.filter(
      (t) =>
        t.studentId === 'usr_arun_104' &&
        t.category.toLowerCase().includes('biometric') &&
        (t.status === 'OPEN' || t.status === 'IN_PROGRESS')
    );

    // Recalculate Risk Score
    let riskScore = 82;
    let riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' = 'HIGH';

    if (overallAttendance >= 75) {
      riskScore = 24;
      riskLevel = 'LOW';
    } else if (openBiometricTickets.length > 0) {
      // Attendance is low, but explained by active campus system grievance
      riskScore = 78;
      riskLevel = 'HIGH';
    }

    return {
      overallAttendance,
      attendedSessions,
      totalSessions,
      riskScore,
      riskLevel,
      openBiometricTicketsCount: openBiometricTickets.length,
      hasFlaggedAbsences: flaggedRecords.length > 0,
      flaggedRecordsCount: flaggedRecords.length,
      correctionApproved: correctedRecords.length > 0
    };
  }, [attendanceRecords, tickets]);

  const resetDemo = () => {
    setTickets(INITIAL_TICKETS);
    setAttendanceRecords(INITIAL_ATTENDANCE_RECORDS);
    setActiveStep(1);
    setCurrentUser(MOCK_USERS.arun);
  };

  const nextStep = () => {
    setActiveStep((prev) => Math.min(prev + 1, 5));
  };

  const createTicket = (title: string, description: string, affectedDates: string[]): Ticket => {
    const classification = classifyComplaint(title, description);

    // Context from student
    const isAtRisk = arunStats.overallAttendance < 75;
    const urgency = isAtRisk ? 'CRITICAL' : 'NORMAL';

    const newTicket: Ticket = {
      id: `ticket_bit_${Date.now()}`,
      ticketNumber: `BIT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      title,
      description,
      studentId: currentUser.id,
      studentName: currentUser.name,
      studentEmail: currentUser.email,
      studentRollNumber: currentUser.rollNumber || '7376221CS104',
      category: classification.category,
      departmentId: classification.department,
      classificationMethod: 'rule-based-keyword-v1',
      matchedKeywords: classification.matchedKeywords,
      requiresManualReview: classification.requiresManualReview,
      classificationRationale: classification.rationale,
      status: 'OPEN',
      urgency,
      affectedDates,
      attendanceCorrectionStatus: 'NONE',
      academicContext: {
        studentId: currentUser.id,
        studentName: currentUser.name,
        rollNumber: currentUser.rollNumber || '7376221CS104',
        department: currentUser.departmentName || 'Computer Science and Engineering',
        semester: 5,
        overallAttendanceRate: arunStats.overallAttendance,
        totalSessions: arunStats.totalSessions,
        attendedSessions: arunStats.attendedSessions,
        riskScore: arunStats.riskScore,
        riskLevel: arunStats.riskLevel,
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
      comments: [],
      timeline: [
        {
          id: `time_${Date.now()}`,
          action: 'CREATED',
          actorName: currentUser.name,
          actorRole: currentUser.role,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          details: `Ticket submitted with academic context (Attendance: ${arunStats.overallAttendance}%). Auto-classified to ${classification.department}.`
        }
      ],
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      updatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setTickets((prev) => [newTicket, ...prev]);
    return newTicket;
  };

  const updateTicketStatus = (ticketId: string, status: TicketStatus, notes?: string) => {
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          const updatedTimeline = [
            ...t.timeline,
            {
              id: `time_${Date.now()}`,
              action: 'STATUS_CHANGE' as const,
              actorName: currentUser.name,
              actorRole: currentUser.role,
              previousStatus: t.status,
              newStatus: status,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              details: notes || `Status updated from ${t.status} to ${status} by ${currentUser.name}.`
            }
          ];
          return {
            ...t,
            status,
            resolutionNotes: notes || t.resolutionNotes,
            updatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            timeline: updatedTimeline
          };
        }
        return t;
      })
    );
  };

  const addComment = (ticketId: string, body: string) => {
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          const newComment = {
            id: `comm_${Date.now()}`,
            senderName: currentUser.name,
            senderRole: currentUser.role,
            senderEmail: currentUser.email,
            body,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          return {
            ...t,
            comments: [...t.comments, newComment],
            updatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
        }
        return t;
      })
    );
  };

  // Step 3 in Journey: NMC Resolves ticket -> Flag records for review (DO NOT AUTO-CHANGE)
  const resolveTicketWithBiometricProof = (ticketId: string, resolutionNotes: string) => {
    const timestampStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          return {
            ...t,
            status: 'RESOLVED',
            resolutionNotes,
            resolvedAt: timestampStr,
            resolvedBy: currentUser.name,
            attendanceCorrectionStatus: 'PENDING_FACULTY_REVIEW',
            timeline: [
              ...t.timeline,
              {
                id: `time_res_${Date.now()}`,
                action: 'RESOLVED' as const,
                actorName: currentUser.name,
                actorRole: currentUser.role,
                timestamp: timestampStr,
                details: `Ticket resolved by ${currentUser.name} (${currentUser.departmentCode || 'NMC'}). Biometric hardware log confirmed packet drop on terminal #MB2-04. Affected absences marked for Faculty Review.`
              }
            ]
          };
        }
        return t;
      })
    );

    // Flag the affected attendance records for human faculty approval
    setAttendanceRecords((prev) =>
      prev.map((record) => {
        if (record.studentId === 'usr_arun_104' && (record.date === '2026-10-18' || record.date === '2026-10-21')) {
          return {
            ...record,
            status: 'FLAGGED_FOR_REVIEW',
            flagReason: 'NMC Hardware Audit #HW-902 confirmed terminal #MB2-04 offline sync error. Awaiting faculty approval.',
            relatedTicketId: ticketId
          };
        }
        return record;
      })
    );

    setActiveStep(4);
  };

  // Step 4 in Journey: Human faculty reviews & approves correction
  const approveAttendanceCorrection = (ticketId: string, recordIds: string[]) => {
    const timestampStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Update attendance records to CORRECTED_PRESENT
    setAttendanceRecords((prev) =>
      prev.map((rec) => {
        if (recordIds.includes(rec.id)) {
          return {
            ...rec,
            status: 'CORRECTED_PRESENT',
            correctionApprovedBy: currentUser.name,
            correctedAt: timestampStr
          };
        }
        return rec;
      })
    );

    // Update ticket state
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          return {
            ...t,
            attendanceCorrectionStatus: 'APPROVED',
            timeline: [
              ...t.timeline,
              {
                id: `time_app_${Date.now()}`,
                action: 'CORRECTION_APPROVED' as const,
                actorName: currentUser.name,
                actorRole: currentUser.role,
                timestamp: timestampStr,
                details: `Attendance correction approved by mentor ${currentUser.name} (${currentUser.designation}). 2 sessions updated from Absent to Present.`
              }
            ]
          };
        }
        return t;
      })
    );

    setActiveStep(5);
  };

  const rejectAttendanceCorrection = (ticketId: string, reason: string) => {
    const timestampStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setAttendanceRecords((prev) =>
      prev.map((rec) => {
        if (rec.relatedTicketId === ticketId && rec.status === 'FLAGGED_FOR_REVIEW') {
          return {
            ...rec,
            status: 'ABSENT',
            flagReason: `Correction rejected by faculty: ${reason}`
          };
        }
        return rec;
      })
    );

    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          return {
            ...t,
            attendanceCorrectionStatus: 'REJECTED',
            timeline: [
              ...t.timeline,
              {
                id: `time_rej_${Date.now()}`,
                action: 'STATUS_CHANGE' as const,
                actorName: currentUser.name,
                actorRole: currentUser.role,
                timestamp: timestampStr,
                details: `Attendance correction rejected by faculty ${currentUser.name}: ${reason}`
              }
            ]
          };
        }
        return t;
      })
    );
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        switchRole,
        tickets,
        attendanceRecords,
        activeStep,
        setActiveStep,
        nextStep,
        resetDemo,
        createTicket,
        updateTicketStatus,
        addComment,
        resolveTicketWithBiometricProof,
        approveAttendanceCorrection,
        rejectAttendanceCorrection,
        arunStats,
        otherStudents: OTHER_STUDENTS_ROSTER
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
