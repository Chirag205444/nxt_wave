# NxtWave GrowthPilot 🚀
### 7-Day Growth Campaign Tracker | NxtWave Growth Intern Challenge

**NxtWave GrowthPilot** is a modern, responsive web application engineered to plan, execute, and track a 7-day marketing campaign to get **500 final-year engineering students** registered for the free workshop **"Build Your First AI Project in 60 Minutes"**, operating within a lean budget of **₹2,000**.

---

## 🌟 Key Highlights & Design
- **Theme:** Strict Premium Light Theme (Background: `#FFFFFF` / `#F8FAFC`, Typography: `#0F172A` Navy and `#64748B` Slate, Accent: Modern Blue `#2563EB` and Purple `#7C3AED`).
- **Zero Backend / Zero Paid APIs:** Self-contained with real-time `localStorage` persistence.
- **Data Consistency:** Seamless synchronization between registrations, ambassador referral counts, channel conversion rates, and budget ledger.
- **Demo Mode:** Seeded with realistic initial demo data and a one-click "+15 Leads Simulation" & "Reset Demo Data" control.

---

## 🛠 Tech Stack
- **Framework:** React 18 (Vite)
- **Language:** JavaScript (ES Modules)
- **Styling:** Tailwind CSS (Light theme only, Inter font, custom utilities)
- **Icons:** Lucide React
- **Routing:** React Router v6
- **Persistence:** Browser `localStorage`

---

## 📱 Core Features

### 1. Executive Dashboard (`/`)
- **Key Metrics:** Target (500 registrations), Current registered count, Percentage of goal achieved, Campaign budget (₹2,000), Budget used, Budget remaining, and Days remaining (3 days left in 7-day sprint).
- **Progress Visualizer:** Progress bar towards 500 registrations with milestone badges (100, 250, 400, 500).
- **Daily Registrations Trend:** Visual bar chart detailing registrations across Day 1 through Day 7.
- **Channel Breakdown:** Distribution of leads across the 3 primary funnels with cost per student.
- **Quick Links:** Top 3 campus ambassador podium preview and latest student registrations.

### 2. Registration Tracker (`/registrations`)
- **Full Interactive Table:** Displays Student Name, College Email, Engineering College, Referral Code, Acquisition Channel, and Date.
- **Search & Filtering:** Real-time search across student names, emails, colleges, and referral codes; filter by channel and college.
- **Duplicate Prevention:** Case-insensitive duplicate check on emails with instant feedback.
- **Add Registration Modal:** Add simulated leads with automatic channel attribution and ambassador crediting.
- **Export to CSV:** One-click download of filtered student records formatted for workshop operations.
- **Delete Record:** Safely remove any simulated registration.

### 3. Ambassador Referral Leaderboard (`/ambassadors`)
- **Podium Display:** Top 3 campus leaders highlighted with Gold, Silver, and Bronze badges.
- **Ranked Table:** Real-time ranking based on confirmed registrations.
- **Automatic Code Generation:** Add new college ambassadors with auto-generated unique codes (e.g. `PRIYA25`, `AARAV10`).
- **One-Click Copy:** Copy referral code to clipboard with visual confirmation toast.
- **Attribution Engine:** Entering an ambassador's code anywhere (dashboard or student page) dynamically increments their count.

### 4. Campaign Channels & Budget Tracker (`/channels`)
- **3 Primary Acquisition Channels:**
  1. *College WhatsApp Groups* (Target: 220)
  2. *College Clubs and Student Ambassadors* (Target: 180)
  3. *LinkedIn and Instagram* (Target: 100)
- **Editable Targets:** Custom in-line target adjustment summing to 500.
- **Budget Control:** Real-time ledger tracking the ₹2,000 budget cap with utilization progress.
- **Log Marketing Expense Form:** Add expenses with description, channel, and amount (₹).

### 5. 7-Day Campaign Execution Plan (`/plan`)
- **Actionable 7-Day Roadmap:**
  - Day 1: Prepare the campaign message and registration form
  - Day 2: Contact college clubs and student ambassadors
  - Day 3: Share through relevant WhatsApp groups
  - Day 4: Publish a short AI project demo on LinkedIn and Instagram
  - Day 5: Share referral leaderboard updates and reminders
  - Day 6: Follow up through approved college communities
  - Day 7: Final reminder and campaign performance review
- **Interactive Checklist:** Mark daily objectives as complete (persisted in `localStorage`).
- **Growth Intern Playbook:** Practical tactical tips for outreach, timing, and engagement.

### 6. Public Student Registration Landing Page (`/register`)
- **Dedicated Route:** `/register`
- **Workshop Title:** *"Build Your First AI Project in 60 Minutes"*
- **Target Audience:** Specifically crafted for final-year engineering students.
- **Key Benefits:** Placement edge, zero prerequisites, hands-on build, and verified NxtWave certificate.
- **3 Project Steps:** 1. Connect LLM Core ➔ 2. Assemble UI & Logic ➔ 3. Ship Live to Portfolio.
- **Live Registration Form:** Instant seat confirmation, duplicate check, and automatic ambassador attribution.
- **Demo Mode Notice:** Prominently clarifies that this is a simulated prototype for the challenge.

---

## 🚀 Running Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Steps
1. Open the project root folder in your terminal:
   ```bash
   cd nxtwave
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to:
   ```text
   http://localhost:5173
   ```

---

## 🌐 Deploying to Vercel

The project includes `vercel.json` configured with SPA fallback rewrites for seamless routing.

### Option 1: Via Vercel CLI
```bash
npm install -g vercel
vercel
```

### Option 2: Via Vercel Web Dashboard (GitHub / Git)
1. Push this repository to GitHub or GitLab.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your repository.
4. Framework Preset will auto-detect as **Vite**.
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Click **"Deploy"**.

---

## 🔗 Workshop Page URL
- Local: `http://localhost:5173/register`
- Vercel (Production): `https://<your-project>.vercel.app/register`

