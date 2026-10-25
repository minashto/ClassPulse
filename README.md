# ClearPulse — Unified Classroom Intelligence & Institutional Helpdesk

**Bannari Amman Institute of Technology, Sathyamangalam (BIT Sathy)**  
*Authorized Institutional Domain: `@bitsathy.ac.in`*

---

## 🎯 Executive Problem Statement

When a student's attendance or marks drop at BIT Sathy, the institution previously had no way to distinguish whether the student **slipped academically** or an **underlying campus system failed them** — such as a biometric reader timeout, a PS Portal or On-Duty (OD) entry delay, or an unresolved revaluation result.

Because the classroom monitoring tool (**ClassPulse**) and the student grievance ticketing system (**Helpdesk**) operated in separate silos:
1. **Teachers chased students** for attendance drops that actually belonged to a campus department (e.g. NMC or PS).
2. **Departments handled tickets** in a generic FIFO queue without knowing if the student was on the brink of debarment (<75% attendance).
3. **No connected feedback loop existed** to rectify false absences when a technical failure was resolved.

---

## 💡 The ClearPulse Solution

**ClearPulse** integrates **ClassPulse** (attendance, real-time confusion telemetry, early-warning dropout risk scoring) and the **Helpdesk** (deterministic rule-based routing to NMC, PS, COE, or Office Academics) into **one connected platform with a single college login (`@bitsathy.ac.in`)**.

### 🔄 The Prototype Journey (Arun Kumar's Case Study)
```
┌────────────────────────┐      ┌────────────────────────┐      ┌────────────────────────┐
│  Arun Kumar (22BCS104) │      │   Faculty Dr. Ramesh   │      │ NMC Officer Murugesan  │
│  Attendance: 73.2%     ├─────►│ Teacher Dashboard sees ├─────►│ NMC Queue ranks Arun's │
│  Risk Score: 82 (HIGH) │      │ "2 Open Biometric Tix" │      │ ticket at top (URGENT) │
│  Files Biometric Tix   │      │ (Privacy Shield Active)│      │ due to <75% attendance │
└────────────────────────┘      └────────────────────────┘      └───────────┬────────────┘
                                                                            │
                                                                            ▼
┌────────────────────────┐      ┌────────────────────────┐      ┌────────────────────────┐
│     Result Updated     │      │   Teacher Signs Off    │      │    NMC Resolves Tix    │
│ Attendance: 78.0% (OK) │◄─────┤ Dr. Ramesh clicks      │◄─────┤ Terminal #MB2-04 error │
│ Risk Drops to 24 (LOW) │      │ "Approve Correction"   │      │ confirmed; absences    │
│ Full Audit Trail Saved │      │ (Human-in-the-Loop)    │      │ flagged for review     │
└────────────────────────┘      └────────────────────────┘      └────────────────────────┘
```

1. **Arun's attendance drops to 73.2%** (<75% threshold) after two biometric reader errors on Oct 18 & Oct 21. His risk score surges to **82/100 (High Risk)**.
2. **His grievance carries academic context:** When Arun submits his ticket, ClearPulse automatically attaches his attendance percentage, affected course dates, and at-risk urgency.
3. **The teacher's dashboard displays context without violating privacy:** Dr. S. K. Ramesh sees Arun flagged with the note `"2 open biometric tickets (NMC - Under Investigation)"`. The teacher cannot see private complaint text.
4. **NMC prioritizes at-risk students:** K. Murugesan (NMC) sees Arun's ticket prioritized at the top of the queue with an escalated `"CRITICAL: AT-RISK STUDENT (<75% ATTENDANCE)"` badge.
5. **NMC resolves with hardware proof:** NMC verifies packet loss in terminal `#MB2-04` buffer and resolves the ticket.
6. **Absences flagged for human review:** Instead of automatically altering attendance records, the two sessions are flagged as `"FLAGGED_FOR_REVIEW"`.
7. **Human-in-the-loop approval:** Dr. Ramesh reviews the diagnostic notes, inspects the dates, and signs off.
8. **Instant recalculation:** Attendance rises to **78.0% (32/41)** and Arun's risk score plummets from **82 to 24/100 (Low Risk)**.

---

## 🛡️ Core Architectural Principles & Key Design Choices

### 1. Rule-Based, Explainable Ticket Classifier (`src/utils/classifier.ts`)
- **Deterministic & Auditable:** Evaluates weighted N-grams and keywords across official department taxonomies:
  - **NMC (Network Maintenance Cell):** `biometric`, `fingerprint`, `thumb scanner`, `wifi`, `lan`, `access point`.
  - **PS (PS & Student Affairs):** `ps portal`, `attendance`, `od entry`, `on duty`, `pcdp app`, `leave application`.
  - **COE (Controller of Examinations):** `exam`, `timetable`, `hall ticket`, `results`, `grade card`, `revaluation`.
  - **Office Academics:** `mini-project`, `academic project`, `project guide`, `guide approval`, `zeroth review`.
- **Conflict Handling & Manual Review Fallback:** Complaints with conflicting keywords or zero keyword matches route safely to **Manual Review & Triage** so staff make informed assignments without guesswork.

### 2. Privacy-Guarded Grievance Shield
- **Strict Faculty Protection:** Mentors and teachers see **only a ticket's verified category and status**, never the confidential text or personal remarks of the student's complaint.

### 3. Human-in-the-Loop Attendance Verification
- **Zero Automatic Manipulation:** Campus system resolutions **never alter attendance records automatically**. Every record change requires positive faculty sign-off, protecting institutional integrity for NAAC and NBA compliance.

---

## 💻 Tech Stack & Project Structure

- **Framework:** React 19, TypeScript, Vite
- **Styling:** Custom Cyber-Academic Glassmorphism CSS Design System (`src/index.css`)
- **Icons:** Lucide React
- **Testing:** Node.js native test runner (`node --test tests/classification.test.mjs`)

```
ClearPulse/
├── src/
│   ├── types/
│   │   └── index.ts                 # Full domain models (User, Ticket, AcademicContext, AttendanceRecord)
│   ├── utils/
│   │   └── classifier.ts            # Deterministic, explainable rule-based grievance classifier
│   ├── data/
│   │   └── mockData.ts              # Institutional mock database & Arun's case study data
│   ├── context/
│   │   └── AppContext.tsx           # Global state, role switcher & human-in-the-loop verification
│   ├── components/
│   │   ├── Navbar.tsx               # Top bar with instant role switcher & tabs
│   │   ├── GuidedJourneyBar.tsx     # Step-by-step interactive case study walkthrough banner
│   │   ├── TicketDetailModal.tsx    # Privacy-guarded ticket modal (faculty vs department view)
│   │   └── AttendanceCorrectionModal.tsx # Faculty human-in-the-loop sign-off drawer
│   ├── views/
│   │   ├── StudentView.tsx          # Arun's portal: attendance breakdown, risk gauge, ticket submission
│   │   ├── TeacherView.tsx          # ClassPulse faculty matrix, "2 open biometric tickets", action center
│   │   ├── DepartmentView.tsx       # NMC queue prioritized by student risk, hardware telemetry
│   │   ├── AdminView.tsx            # Executive breakdown: "Slipped vs System Failure", manual triage
│   │   ├── ClassifierDemoView.tsx   # Interactive testing sandbox for the rule-based classifier
│   │   └── CrossSystemView.tsx      # Connected architecture diagram & RBAC privacy matrix
│   ├── App.tsx                      # Root application shell
│   └── index.css                    # Design system tokens, glassmorphism, responsive styles
├── tests/
│   └── classification.test.mjs      # 8 comprehensive automated unit test suites
├── index.html                       # BIT Sathy institutional metadata shell
├── package.json
└── README.md
```

---

## 🚀 Running Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Automated Test Suite
```bash
npm test
```
*Executes all 8 unit tests verifying rule classification, NMC biometric routing, student risk prioritization, conflict fallback to manual review, and human-in-the-loop attendance rules.*

### 3. Start Development Server
```bash
npm run dev
```
Open **`http://localhost:5173/`** in your browser.

### 4. Build for Production
```bash
npm run build
```

---

## 👥 Roles Available in Demo

Use the **Switch Role** buttons on the top navigation bar to test the application from any perspective:
- 👨‍🎓 **Student (Arun Kumar)** — View attendance below 75%, file grievance with auto-attached academic context.
- 👨‍🏫 **Teacher (Dr. S. K. Ramesh)** — View cohort risk matrix, see `"2 open biometric tickets"` note, and approve attendance corrections.
- 🏢 **NMC Staff (K. Murugesan)** — View prioritized helpdesk queue, inspect terminal `#MB2-04` telemetry, and resolve ticket with hardware audit log.
- 🛡️ **Dean Academics (Dr. C. Saravanan)** — Inspect root-cause attribution (64.3% system errors vs 35.7% student slips) and triage ambiguous complaints.
