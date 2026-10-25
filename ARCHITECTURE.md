# ClearPulse System Architecture & Technical Specifications

**Institutional Platform for Bannari Amman Institute of Technology (BIT Sathy)**  
*Domain Enforcement: `@bitsathy.ac.in`*

---

## 1. High-Level System Architecture

ClearPulse serves as the unified intelligence bridge connecting **classroom engagement telemetry** with **campus technical infrastructure support**:

```
 ┌────────────────────────────────────────────────────────────────────────┐
 │                      ClassPulse Core Engine                            │
 │  - Rotating HMAC QR Attendance Sessions                                │
 │  - Continuous Confusion Pulse Telemetry (WebSockets)                   │
 │  - Early-Warning Dropout Risk Scoring Matrix                           │
 └───────────────────────────────────┬────────────────────────────────────┘
                                     │
                     Academic Context Injection
                                     │
                                     ▼
 ┌────────────────────────────────────────────────────────────────────────┐
 │                    ClearPulse Integration Layer                        │
 │  - Single Sign-On (@bitsathy.ac.in)                                    │
 │  - Context-Aware Ticket Prioritization Engine                          │
 │  - Privacy Filter (Faculty Grievance Masking Guard)                    │
 │  - Human-in-the-Loop Attendance Verification Drawer                   │
 └───────────────────────────────────┬────────────────────────────────────┘
                                     │
                               Rule Routing
                                     │
                                     ▼
 ┌────────────────────────────────────────────────────────────────────────┐
 │                    Campus Department Helpdesks                         │
 │  - NMC: Biometric Readers, Wi-Fi APs, LAN Hardware Diagnostics        │
 │  - PS: PS Portal, PCDP App, On-Duty (OD) Leave Entries                 │
 │  - COE: Semester Examinations, Results, Grade Cards, Revaluation       │
 │  - Office Academics: Mini-Projects, Guides, Zeroth Review Approvals   │
 │  - Manual Review: Cross-departmental conflicts and zero-match triage   │
 └────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Early-Warning Risk Score Model

The dropout and debarment risk score ($R \in [0, 100]$) is computed through a composite attribution function:

$$R = w_A \cdot \Phi(A) + w_C \cdot C + w_I \cdot I$$

Where:
- $A$ is the student's current aggregate attendance percentage.
- $\Phi(A)$ is the non-linear penalty for falling below the 75% institutional threshold:
  $$\Phi(A) = \begin{cases} 100 - \frac{A}{0.75} \times 20 & \text{if } A < 75\% \\ \max\left(0, 30 - (A - 75) \times 1.2\right) & \text{if } A \ge 75\% \end{cases}$$
- $C$ is the active course confusion rate from classroom pulse events ($w_C = 0.20$).
- $I$ is the internal assessment performance index ($w_I = 0.15$).

### The Grievance Dampening Factor
When a student's attendance drops below 75%, ClearPulse cross-references active helpdesk tickets:
- If **open system grievance tickets exist** (e.g. 2 open biometric tickets with NMC), the risk score explicitly notes **"System Discrepancy under Department Review"**.
- The department queue promotes the ticket to **CRITICAL urgency**, preventing the student from being prematurely debarred.
- Once the faculty mentor signs off on the correction, $A$ jumps to $78.0\%$ and $R$ immediately drops to **24/100 (Safe / Low Risk)**.

---

## 3. Deterministic Rule-Based Classification Engine

ClearPulse deliberately avoids unexplainable black-box classification models for institutional grievances. Ticket routing is **100% deterministic, explainable, and reproducible**:

### Mathematical Formulation of Scoring:
$$\text{Score}(D) = \sum_{t \in \mathcal{K}_D} \mathbb{I}(t \in T) \cdot W(t)$$

Where:
- $D \in \{\text{NMC}, \text{PS}, \text{COE}, \text{Office Academics}\}$
- $\mathcal{K}_D$ is the set of official department taxonomy keywords.
- $W(t)$ is the weight assigned to keyword $t$ based on semantic specificity (e.g. `biometric reader` $= 5$, `mini-project` $= 5$, `wifi` $= 3$).
- $T$ is the normalized token stream of the grievance title and body.

### Conflict & Tie Breaking
Let $D_1$ and $D_2$ be the highest and second-highest scoring departments:
$$\Delta = \text{Score}(D_1) - \text{Score}(D_2)$$
If $\Delta \le 1$ and $\text{Score}(D_1) \ge 3$:
- The ticket triggers a **Conflict Exception**.
- It is assigned to `Manual Review & Triage` with `requiresManualReview = true`.
- Zero-match tickets ($\text{Score}(D_1) = 0$) likewise route safely to `Manual Review`.

---

## 4. State Transition Machine: Human-in-the-Loop Protocol

```
 [Student Submits Ticket]
           │
           ▼
 [Status: OPEN / Prioritized by Risk]
           │
           ▼ (NMC Investigates Terminal Log)
 [Status: IN_PROGRESS]
           │
           ▼ (NMC Confirms Packet Loss)
 [Status: RESOLVED (Hardware Proof Logged)]
           │
           ├─────────────────────────────────────────┐
           ▼                                         │
 [Absences: FLAGGED_FOR_REVIEW]                      │
           │                                         │
           ▼ (Faculty Mentor Reviews)                │
 ┌──────────────────────┬──────────────────────┐     │
 │                      │                      │     │
 ▼                      ▼                      │     │
[Faculty Approves]    [Faculty Rejects]       │     │
 │                      │                      │     │
 ▼                      ▼                      ▼     ▼
[Status: PRESENT]     [Status: ABSENT]    [Audit Log Sealed]
[Attendance: 78.0%]   [Attendance: 73.2%]
[Risk Score: 24/100]  [Risk Score: 82/100]
```

---

## 5. Security, Privacy & Institutional Compliance

1. **FERPA & Institutional Privacy Boundary:**
   - Teachers are prevented from reading personal grievance descriptions or private student remarks. They only view the verified category (`Biometric system issues`) and live resolution status.
2. **Audit Timeline Immutability:**
   - Every state transition, comment, and human approval creates an immutable audit event containing actor name, role, timestamp, and verification rationale for NAAC/NBA accreditation inspections.
