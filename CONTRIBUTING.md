# Contributing to ClearPulse

We welcome contributions to **ClearPulse**! To ensure the platform remains reliable and aligned with institutional governance at Bannari Amman Institute of Technology (BIT Sathy), please review our principles and workflow.

---

## 🏛️ Core Design Invariants

When contributing, you **must adhere to these three inviolable design choices**:
1. **Explainable Rule-Based Sorting:** Keyword and N-gram classification must remain 100% explainable and deterministic. Ambiguous or conflicting grievances must route to `Manual Review`.
2. **Student Privacy Protection:** Faculty mentors must never see full complaint bodies or personal grievance text. They only receive verified categories and live statuses.
3. **Human-in-the-Loop Integrity:** Campus technical resolutions must never automatically credit or change attendance records. Every correction requires positive faculty sign-off.

---

## 🛠️ Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/minashto/ClassPulse.git
   cd ClassPulse
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run unit tests:**
   ```bash
   npm test
   ```
4. **Start the local dev server:**
   ```bash
   npm run dev
   ```

---

## 🧪 Testing Checklist
Before submitting a PR:
- Run `npm test` to verify all 8 test suites pass.
- Run `npm run build` to ensure TypeScript compilation succeeds without warnings.
