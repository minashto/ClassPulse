export type UserRole = 'student' | 'teacher' | 'department' | 'admin';

export type DepartmentCode = 'NMC' | 'PS' | 'COE' | 'Office Academics' | 'Manual Review';

export type TicketStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'ESCALATED';

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export interface User {
  id: string;
  name: string;
  email: string; // ends with @bitsathy.ac.in
  role: UserRole;
  rollNumber?: string;
  departmentCode?: DepartmentCode; // for department staff
  departmentName?: string;
  designation?: string;
  avatar?: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  courseCode: string;
  courseName: string;
  date: string;
  sessionTime: string;
  status: 'PRESENT' | 'ABSENT' | 'FLAGGED_FOR_REVIEW' | 'CORRECTED_PRESENT';
  flagReason?: string;
  relatedTicketId?: string;
  correctionApprovedBy?: string;
  correctedAt?: string;
}

export interface AcademicContext {
  studentId: string;
  studentName: string;
  rollNumber: string;
  department: string;
  semester: number;
  overallAttendanceRate: number; // e.g. 73.2
  totalSessions: number;
  attendedSessions: number;
  riskScore: number; // 0 - 100
  riskLevel: RiskLevel;
  confusionSignalsCount: number;
  registeredCourses: {
    code: string;
    name: string;
    attendanceRate: number;
    faculty: string;
  }[];
  recentAbsences: {
    recordId: string;
    courseCode: string;
    date: string;
    session: string;
    status: string;
  }[];
}

export interface TicketTimelineEvent {
  id: string;
  action: 'CREATED' | 'STATUS_CHANGE' | 'DEPARTMENT_TRANSFER' | 'RESOLVED' | 'CORRECTION_APPROVED';
  actorName: string;
  actorRole: UserRole;
  timestamp: string;
  details: string;
  previousStatus?: TicketStatus;
  newStatus?: TicketStatus;
}

export interface TicketComment {
  id: string;
  senderName: string;
  senderRole: UserRole;
  senderEmail: string;
  body: string;
  timestamp: string;
}

export interface Ticket {
  id: string;
  ticketNumber: string; // e.g. BIT-2026-1042
  title: string;
  description: string; // Full complaint text (CONFIDENTIAL - HIDDEN FROM TEACHERS)
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentRollNumber: string;
  category: string;
  departmentId: DepartmentCode;
  classificationMethod: 'rule-based-keyword-v1';
  matchedKeywords: string[];
  requiresManualReview: boolean;
  classificationRationale: string;
  status: TicketStatus;
  urgency: 'NORMAL' | 'HIGH' | 'CRITICAL';
  academicContext: AcademicContext;
  affectedDates: string[]; // Dates where student claims system failure
  resolutionNotes?: string;
  resolvedAt?: string;
  resolvedBy?: string;
  comments: TicketComment[];
  timeline: TicketTimelineEvent[];
  attendanceCorrectionStatus: 'NONE' | 'PENDING_FACULTY_REVIEW' | 'APPROVED' | 'REJECTED';
  createdAt: string;
  updatedAt: string;
}

export interface ClassificationResult {
  department: DepartmentCode;
  category: string;
  matchedKeywords: string[];
  scores: Record<DepartmentCode, number>;
  requiresManualReview: boolean;
  rationale: string;
}
