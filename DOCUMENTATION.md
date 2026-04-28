## 📖 AttendIQ — Project Documentation


> **GitHub Repo:** https://github.com/Mahitha-2776/Smart-Attendance-monitoring-system-FSD
> **Tech Stack:** HTML5 · CSS3 · Vanilla JavaScript
> **Type:** Multi-Page Web Application — Role-Based Attendance Monitoring System

---

## 📚 Table of Contents

1. [Project Introduction](#1-project-introduction)
2. [Problem Statement](#2-problem-statement)
3. [Objectives](#3-objectives)
4. [Features](#4-features)
5. [User Interface Overview](#5-user-interface-overview)
6. [How to Use the App](#6-how-to-use-the-app)
7. [File Structure](#7-file-structure)
8. [Technology Stack](#8-technology-stack)
9. [System Architecture](#9-system-architecture)
10. [Data Models](#10-data-models)
11. [All Functions Reference](#11-all-functions-reference)
12. [Authentication Flow](#12-authentication-flow)
13. [SessionStorage & LocalStorage Usage](#13-sessionstorage--localstorage-usage)
14. [Attendance Status Logic](#14-attendance-status-logic)
15. [Charts & Visualizations](#15-charts--visualizations)
16. [Responsive Design](#16-responsive-design)
17. [How to Extend the Project](#17-how-to-extend-the-project)
18. [Challenges Faced](#18-challenges-faced)
19. [Learnings](#19-learnings)
20. [Future Improvements](#20-future-improvements)
21. [Login Credentials](#21-login-credentials)
22. [How to Run](#22-how-to-run)
23. [Credits & References](#23-credits--references)

---

## 1. Project Introduction

**AttendIQ** is a responsive, browser-based Smart Attendance Monitoring System developed as a **Full Stack Development (FSD) Lab Project**. It simulates a real-world attendance management system used in engineering colleges, with role-based access for **Students** and **Admins**.

The system allows an Admin to monitor attendance across all departments, sections, and students with visual analytics and actionable insights. A Student can log in and see their own subject-wise attendance, progress bars, charts, and alerts — all in a clean, modern dashboard.

The entire application runs in the browser with **zero backend**, **zero external libraries**, and **zero build tools**. Just open the HTML file and it works.

### Project Tagline
> *"Track. Analyze. Improve."*

---

## 2. Problem Statement

In most engineering colleges today:
- Attendance is maintained in **physical registers** or disconnected Excel sheets
- Students have **no easy way** to see their own attendance percentage per subject
- Faculty and admin staff have to **manually calculate** who is at risk of falling below 75%
- There is **no central dashboard** to view attendance across departments and sections at once
- Students often don't know they're about to be detained until it's too late

**AttendIQ solves this** by providing a centralized, visual, and role-aware attendance monitoring platform where admins can oversee the entire college's attendance in one view, and students can track their own subject-wise progress with real-time alerts.

---

## 3. Objectives

- Build a **role-based login system** with separate dashboards for Admin and Student
- Display **department-wise and section-wise** attendance records for admins
- Show **subject-wise attendance** with progress bars and percentage for each student
- Generate **visual analytics** — pie charts and bar charts — for quick understanding
- Flag **at-risk students** (below 75%) and students with **consecutive absences**
- Support **4 departments** — CSE, ECE, ME, CE — with **3 sections** (A, B, C) each
- Provide **search, filter, and sort** functionality in the admin student table
- Build a **dark/light theme toggle** with preference saved across sessions
- Make it **fully responsive** for mobile, tablet, and desktop
- Ensure **no external dependencies** — pure HTML, CSS, and Vanilla JavaScript

---

## 4. Features

### Core Features

| Feature | Description |
|---|---|
| 🔐 Role-Based Login | Separate login for Admin and Student with route protection |
| 📊 Admin Dashboard | Full overview of all departments, sections, and students |
| 🎓 Student Dashboard | Personal attendance view with subject-wise breakdown |
| 📈 Visual Charts | Pie chart (attendance distribution) and bar charts (dept comparison, weekly trends, subject performance) |
| 🏫 Multi-Department Support | CSE, ECE, ME, CE — each with 6 subjects |
| 📋 Section-Wise Records | Filter by Section A, B, or C in the admin table |
| ⚠️ Insights Panel | At-risk students, top performers, consecutive absences, low-avg sections |
| 🔍 Search & Filter | Live search + status filter tabs (All / At Risk / Warning / Good) |
| ↕️ Sortable Table | Click column headers to sort by Name, ID, or Attendance % |
| 🌙 Dark / Light Theme | Toggle with LocalStorage persistence |
| 📱 Responsive Design | Works on desktop, tablet, and mobile |
| ⚡ Animated Counters | Stat card values animate from 0 to target on load |
| 🎨 Staggered Animations | Cards and insights fade in with staggered timing |

### UI/UX Features
- Sticky header that stays visible while scrolling
- Colour-coded attendance badges — green (good), amber (warning), red (at-risk)
- Progress bars in subject cards that reflect attendance percentage with colour
- User avatar with initials generated from the logged-in user's name
- Shake animation on the login card when wrong credentials are entered
- Empty state message shown in the table when no students match filters
- Smooth hover effects on all cards, buttons, and table rows

---

## 5. User Interface Overview

### Login Page Layout

```
┌─────────────────────────────────────────┐
│                                         │
│              AttendIQ                   │
│    Smart Attendance Monitoring System   │
│                                         │
│   ┌─────────────────────────────────┐   │
│   │         User ID                 │   │
│   │  [________________________]     │   │
│   │         Password                │   │
│   │  [________________________]     │   │
│   │                                 │   │
│   │        [ Sign In → ]            │   │
│   │                                 │   │
│   │  ── Demo Credentials ──         │   │
│   │  Student: STU001 / student123   │   │
│   │  Admin:   admin  / admin123     │   │
│   └─────────────────────────────────┘   │
│                                         │
└─────────────────────────────────────────┘
```

### Admin Dashboard Layout

```
┌────────────────────────────────────────────────────────────────┐
│  AttendIQ  [Admin]          [Avatar] [Name] [🌙] [Logout]     │
├────────────────────────────────────────────────────────────────┤
│  Management Dashboard                                          │
│  Monitor attendance across all departments and sections        │
│                                                                │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐         │
│  │  Total   │ │ Present  │ │ At Risk  │ │   Avg    │         │
│  │ Students │ │  Today   │ │ Students │ │Attendance│         │
│  │   37     │ │   32     │ │    5     │ │   86%    │         │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘         │
│                                                                │
│  ┌──────────────────┐ ┌──────────────────┐                    │
│  │ ⚠️ At Risk (5)  │ │ 🏆 Top Perf (3) │                    │
│  │ 📢 Consec Abs   │ │ 📊 Low Sections  │                    │
│  └──────────────────┘ └──────────────────┘                    │
│                                                                │
│  ┌──────────────────────┐ ┌──────────────────────┐            │
│  │ Department Comparison│ │   Weekly Trends       │            │
│  │   [Bar Chart]        │ │   [Bar Chart]         │            │
│  └──────────────────────┘ └──────────────────────┘            │
│                                                                │
│  Student Attendance Records                                    │
│  [CSE] [ECE] [ME] [CE]   Section: [All ▼]                     │
│  [🔍 Search...]  [All][At Risk][Warning][Good]                 │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ Student ↕ │ ID ↕ │ Dept-Sec │ Overall % ↕ │ Subjects │  │ │
│  ├──────────────────────────────────────────────────────────┤ │
│  │ John A.  │ STU001│ CSE-A   │   87%       │ CS101 ...  │  │ │
│  └──────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────┘
```

### Student Dashboard Layout

```
┌────────────────────────────────────────────────────────────────┐
│  AttendIQ  [Student]        [Avatar] [Name] [🌙] [Logout]     │
├────────────────────────────────────────────────────────────────┤
│  My Attendance Dashboard                                       │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  [JA]  John Anderson                                     │ │
│  │        ID: STU001 | CSE | Section A | Year 3             │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐                 │
│  │Overall │ │Total   │ │Below   │ │Above   │                 │
│  │  87%   │ │  6     │ │  75%   │ │  85%   │                 │
│  │Attend. │ │Subjects│ │  1     │ │  4     │                 │
│  └────────┘ └────────┘ └────────┘ └────────┘                 │
│                                                                │
│  ┌───────────────────────┐ ┌───────────────────────┐          │
│  │ Attendance Distribution│ │  Subject Performance  │          │
│  │    [Donut Chart]       │ │    [Bar Chart]        │          │
│  └───────────────────────┘ └───────────────────────┘          │
│                                                                │
│  Subject-wise Attendance                                       │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐         │
│  │CS101     │ │CS102     │ │CS103     │ │CS104     │         │
│  │Data Str. │ │Database  │ │OS        │ │Networks  │         │
│  │38/42     │ │30/40     │ │35/38     │ │28/35     │         │
│  │  90% ▓▓▓▓│ │  75% ▓▓▓ │ │  92% ▓▓▓▓│ │  80% ▓▓▓ │         │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘         │
└────────────────────────────────────────────────────────────────┘
```

---

## 6. How to Use the App

### As a Student

**Step 1 — Login**
Open `index.html` in your browser. Enter `STU001` as User ID and `student123` as Password. Click Sign In.

**Step 2 — View your profile**
Your name, student ID, department, section, and year are shown at the top of the dashboard.

**Step 3 — Check your stat cards**
See your overall attendance %, total subjects, how many subjects are below 75%, and how many are above 85%.

**Step 4 — Read your alerts**
If any subject is below 75%, a red danger alert appears with the subject name and message. If you have 3+ consecutive absences, an amber warning appears. If everything is fine, a green success message is shown.

**Step 5 — Analyse your charts**
The donut chart shows how many subjects fall in Excellent (85%+), Good (75–85%), and Low (<75%) categories. The bar chart shows each subject's attendance percentage visually.

**Step 6 — Review subject cards**
Scroll down to see individual cards for each subject — with attended/total classes, percentage, and a colour-coded progress bar.

---

### As an Admin

**Step 1 — Login**
Enter `admin` as User ID and `admin123` as Password. Click Sign In.

**Step 2 — Read the stat cards**
See the total number of students, estimated present today, students at risk, and overall average attendance across the college.

**Step 3 — Check the insights panel**
Four insight boxes show: students below 75% (at-risk), top performers above 95%, students with 3+ consecutive absences, and sections with average below 80%.

**Step 4 — Explore the charts**
The Department Comparison bar chart shows average attendance per department. The Weekly Trends chart shows Mon–Fri attendance patterns.

**Step 5 — Filter students by department**
Click CSE, ECE, ME, or CE to switch the student table to that department.

**Step 6 — Filter by section**
Use the Section dropdown to view All sections or a specific section (A, B, or C).

**Step 7 — Search for a student**
Type a student's name or ID in the search box. The table updates live as you type.

**Step 8 — Filter by attendance status**
Click At Risk to see only students below 75%, Warning for 75–84%, Good for 85%+, or All to see everyone.

**Step 9 — Sort the table**
Click the Student, ID, or Overall % column headers to sort ascending or descending. An arrow icon shows the active sort direction.

**Step 10 — Toggle theme**
Click the moon/sun icon in the header to switch between dark and light mode.

---

## 7. File Structure

```
Smart-Attendance-monitoring-system-FSD/
│
├── index.html                  ← Login page (entry point)
├── admin-dashboard.html        ← Admin management dashboard
├── student-dashboard.html      ← Student personal dashboard
│
├── css/
│   └── styles.css              ← Entire design system — variables, components, animations, responsive
│
├── js/
│   ├── data.js                 ← All raw data + AppData global namespace
│   ├── auth.js                 ← Login, logout, session management — Auth namespace
│   ├── charts.js               ← Chart rendering library — Charts namespace
│   ├── admin.js                ← Admin dashboard controller — AdminDashboard module
│   └── student.js              ← Student dashboard controller — StudentDashboard module
│
└── README.md / DOCUMENTATION.md
```

### Script Load Order

Scripts are loaded in strict dependency order in each HTML file:

```
data.js  →  auth.js  →  charts.js  →  admin.js (or student.js)
```

Each script must be loaded before the next because they depend on the global objects exposed by the previous one (`AppData`, `Auth`, `Charts`).

---

## 8. Technology Stack

| Layer | Technology | Why Used |
|---|---|---|
| Structure | HTML5 | Semantic page markup for all 3 pages |
| Styling | CSS3 | Custom design system with CSS variables, Grid, Flexbox |
| Logic | Vanilla JavaScript (ES6+) | All rendering, filtering, auth, charts, animations |
| Session | SessionStorage | Keeps user logged in during the browser tab session |
| Preferences | LocalStorage | Saves dark/light theme preference across sessions |
| Charts | CSS + JS (custom) | Pie chart via conic-gradient; bar chart via flexbox |
| No frameworks | — | No React, Vue, jQuery, or Chart.js used |
| No backend | — | No Node.js, PHP, or database |
| No build tools | — | No npm, webpack, or Vite needed |

---

## 9. System Architecture

All three pages share the same JS modules via the global window object. There is no module bundler — each file adds its exports to `window` directly.

```
┌─────────────────────────────────────────────────────────────┐
│                         Browser                             │
│                                                             │
│   index.html          admin-dashboard       student-dash    │
│   (Login Page)             .html                .html       │
│        │                    │                    │          │
│        ▼                    ▼                    ▼          │
│   ┌─────────────────────────────────────────────────────┐   │
│   │                    data.js                          │   │
│   │  USERS | STUDENTS | SUBJECTS | ATTENDANCE_DATA      │   │
│   │  window.AppData = { ... }                           │   │
│   └─────────────────────────────────────────────────────┘   │
│        │                    │                    │          │
│        ▼                    ▼                    ▼          │
│   ┌──────────┐        ┌──────────┐        ┌──────────┐     │
│   │ auth.js  │        │charts.js │        │ auth.js  │     │
│   │window.   │        │window.   │        │window.   │     │
│   │Auth={}   │        │Charts={} │        │Auth={}   │     │
│   └──────────┘        └──────────┘        └──────────┘     │
│        │                    │                    │          │
│        ▼                    ▼                    ▼          │
│  [Inline JS]           admin.js            student.js       │
│  Form submit           AdminDashboard      StudentDashboard  │
│  Auth.login()          .init()             .init()          │
│                                                             │
│  SessionStorage ←──── Auth ────────────────────────────►   │
│  LocalStorage   ←──── toggleTheme() ───────────────────►   │
└─────────────────────────────────────────────────────────────┘
```

---

## 10. Data Models

### User Object
Stored in the `USERS` array in `data.js`. Used for login authentication.

```javascript
{
  id: "STU001",
  password: "student123",
  role: "student",          // "student" or "admin"
  name: "John Anderson",
  department: "CSE",
  section: "A"
}
```

### Student Object
Stored in the `STUDENTS` array. Represents a student's profile details.

```javascript
{
  id: "STU001",
  name: "John Anderson",
  department: "CSE",        // "CSE" | "ECE" | "ME" | "CE"
  section: "A",             // "A" | "B" | "C"
  email: "john.a@college.edu",
  phone: "+1234567890",
  year: 3
}
```

### Attendance Record Object
Generated at runtime by `generateStudentAttendance()`. Stored in `ATTENDANCE_DATA[studentId]`.

```javascript
{
  subjects: {
    "CS101": { attended: 38, total: 42, percentage: 90 },
    "CS102": { attended: 30, total: 40, percentage: 75 },
    "CS103": { attended: 35, total: 38, percentage: 92 },
    // one entry per subject
  },
  overall: {
    attended: 220,
    total: 252,
    percentage: 87
  },
  consecutiveAbsences: 1,
  lastUpdated: "2024-01-15T10:30:00.000Z"
}
```

### Subject Object
Stored in the `SUBJECTS` map, keyed by department code.

```javascript
{ code: "CS101", name: "Data Structures", credits: 4 }
```

### Weekly Trends Object
Stores Mon–Fri attendance % per department and section. Used for the Admin weekly trends chart.

```javascript
WEEKLY_TRENDS = {
  CSE: {
    A: [92, 88, 90, 85, 91],   // Mon to Fri
    B: [87, 89, 85, 88, 86],
    C: [90, 92, 88, 91, 89]
  },
  ECE: { A: [...], B: [...] },
  // ...
}
```

### Department Summary Object
Returned by `getDepartmentSummary()` at runtime.

```javascript
{
  CSE: { totalStudents: 14, averageAttendance: 86, atRiskCount: 2 },
  ECE: { totalStudents: 8,  averageAttendance: 88, atRiskCount: 1 },
  ME:  { totalStudents: 7,  averageAttendance: 89, atRiskCount: 0 },
  CE:  { totalStudents: 8,  averageAttendance: 87, atRiskCount: 2 }
}
```

---

## 11. All Functions Reference

### `data.js` Functions

| Function | Parameters | Returns | What It Does |
|---|---|---|---|
| `generateAttendance()` | `totalClasses, minPercent, maxPercent` | `{ attended, total, percentage }` | Generates a random attendance record within the given % range |
| `generateStudentAttendance()` | none | `ATTENDANCE_DATA` object | Loops all 37 students and generates per-subject and overall attendance. 20% students get low range (55–78%), 30% get high (85–100%), 50% get average (70–95%) |
| `getDepartmentSummary()` | none | Summary object | Calculates total students, average attendance, and at-risk count for each department |

### `auth.js` Functions

| Function | Parameters | Returns | What It Does |
|---|---|---|---|
| `Auth.init()` | none | User object \| null | Reads SessionStorage and restores the logged-in user if a session exists |
| `Auth.login()` | `userId, password` | `{ success, user }` or `{ success, message }` | Searches USERS array (case-insensitive ID match) and returns success or error |
| `Auth.logout()` | none | void | Sets currentUser to null, removes SessionStorage key, redirects to index.html |
| `Auth.isAuthenticated()` | none | boolean | Returns true if currentUser is not null |
| `Auth.getCurrentUser()` | none | User object \| null | Returns the active session user |
| `Auth.hasRole()` | `role` | boolean | Returns true if the current user's role matches the given role |
| `Auth.redirectToDashboard()` | none | void | Redirects admin → admin-dashboard.html, student → student-dashboard.html |
| `Auth.requireAuth()` | `requiredRole?` | boolean | Guards a page — redirects to index.html if not logged in, or to own dashboard if wrong role |

### `charts.js` Functions

| Function | Parameters | What It Does |
|---|---|---|
| `Charts.createPieChart()` | `containerId, data[], options?` | Renders a CSS donut chart using conic-gradient. Each data item needs `{ value, label, color }`. The center shows overall % and a label |
| `Charts.createBarChart()` | `containerId, data[], options?` | Renders a vertical bar chart. Bar height is proportional to the max value. Colours are assigned by attendance threshold |
| `Charts.createHorizontalBarChart()` | `containerId, data[], options?` | Renders horizontal progress-bar-style chart |
| `Charts.getBarColor()` | `value` | Returns `#10b981` (green) for ≥85%, `#f59e0b` (amber) for ≥75%, `#ef4444` (red) for <75% |
| `Charts.getStatusClass()` | `value` | Returns the CSS class string — `"success"`, `"warning"`, or `"danger"` |
| `Charts.createBadge()` | `value` | Returns an HTML string for a colour-coded attendance badge span |
| `Charts.createProgressBar()` | `value, showLabel?` | Returns an HTML string for a progress bar with the right colour fill |
| `Charts.animateNumber()` | `element, target, duration?` | Animates an element's text from 0 to target using easeOutQuart over 1000ms |
| `Charts.easeOutQuart()` | `x` | Easing math function: `1 - (1 - x)^4` — used to decelerate the counter animation |

### `admin.js` Functions

| Function | DOM Target | What It Does |
|---|---|---|
| `AdminDashboard.init()` | — | Calls `Auth.requireAuth("admin")`, gets current user, calls render() and setupEventListeners() |
| `AdminDashboard.render()` | — | Calls all render methods in sequence |
| `AdminDashboard.renderHeader()` | `#header-right` | Injects user avatar with initials, username, theme toggle button, and logout button |
| `AdminDashboard.renderStatCards()` | `#stat-cards` | Renders 4 KPI cards — Total Students, Present Today, At Risk, Avg Attendance % — with animated counters |
| `AdminDashboard.renderInsights()` | `#insights-grid` | Renders 4 insight panels with lists of at-risk students, top performers, consecutive absences, and low-avg sections |
| `AdminDashboard.renderDepartmentCharts()` | chart containers | Builds department comparison bar chart and weekly trends bar chart using Charts module |
| `AdminDashboard.renderFilters()` | `#dept-selector`, `#section-selector` | Renders department tab buttons and section dropdown |
| `AdminDashboard.renderStudentTable()` | `#student-table-body` | Calls getFilteredStudents(), renders each student as a table row with badges and mini subject badges |
| `AdminDashboard.getFilteredStudents()` | — | Applies department → section → status → search → sort filters in sequence and returns student array |
| `AdminDashboard.getAtRiskStudents()` | — | Filters STUDENTS where overall % < 75, sorted ascending |
| `AdminDashboard.getTopPerformers()` | — | Filters STUDENTS where overall % ≥ 95, sorted descending |
| `AdminDashboard.getConsecutiveAbsences()` | — | Filters STUDENTS where consecutiveAbsences ≥ 3, sorted descending |
| `AdminDashboard.getLowAttendanceSections()` | — | Calculates per-section averages across all departments, returns sections with avg < 80% |
| `AdminDashboard.getInitials()` | `name` | Splits the name by space and returns the first 2 initials in uppercase |
| `AdminDashboard.setupEventListeners()` | — | Attaches click/change/input handlers for dept selector, section dropdown, search box, filter tabs, and sort headers |
| `toggleTheme()` | — | Toggles `.light-theme` class on body, saves preference to LocalStorage |

### `student.js` Functions

| Function | DOM Target | What It Does |
|---|---|---|
| `StudentDashboard.init()` | — | Calls `Auth.requireAuth("student")`, loads student data and attendance from AppData, calls render() |
| `StudentDashboard.render()` | — | Calls all render methods in sequence |
| `StudentDashboard.renderHeader()` | `#header-right` | Injects avatar, username, theme toggle, and logout button |
| `StudentDashboard.renderProfile()` | `#student-profile` | Renders avatar with initials, student name, ID, department full name, section, and year |
| `StudentDashboard.renderStatCards()` | `#stat-cards` | Renders 4 stat cards — Overall %, Total Subjects, Subjects below 75%, Subjects above 85% |
| `StudentDashboard.renderAlerts()` | `#alerts-container` | Checks each subject for < 75% attendance, checks consecutiveAbsences ≥ 3. Shows danger/warning alerts or a green success message |
| `StudentDashboard.renderSubjectAttendance()` | `#subject-attendance` | Renders a card for each subject with attended/total/percentage and a colour-coded progress bar |
| `StudentDashboard.renderCharts()` | — | Calls renderPieChart() and renderBarChart() |
| `StudentDashboard.renderPieChart()` | `#attendance-pie-chart` | Counts subjects in Excellent/Good/Low categories and passes them to Charts.createPieChart() |
| `StudentDashboard.renderBarChart()` | `#subject-bar-chart` | Maps subject codes to attendance % and passes to Charts.createBarChart() |
| `StudentDashboard.getInitials()` | `name` | Returns first 2 initials from name |
| `StudentDashboard.getDepartmentName()` | `code` | Finds the full department name from AppData.DEPARTMENTS |
| `StudentDashboard.setupEventListeners()` | — | Restores saved theme from LocalStorage |
| `toggleTheme()` | — | Toggles `.light-theme` class on body, saves to LocalStorage |

---

## 12. Authentication Flow

### Login
```
User fills in User ID + Password and clicks Sign In
         │
         ▼
Auth.login(userId, password) called
         │
    ┌────┴─────┐
    │  Found?  │
    └────┬─────┘
         │
       YES ──► Save session to SessionStorage
               ──► Auth.redirectToDashboard()
                   ──► role === "admin" → admin-dashboard.html
                       role === "student" → student-dashboard.html
         │
        NO  ──► Show error message in red
               ──► Play shake animation on login card
```

### Page Protection (every dashboard)
```
Page loads → Auth.requireAuth("admin" or "student")
         │
         ▼
Auth.init() checks SessionStorage
         │
    ┌────┴──────────┐
    │ Session found?│
    └────┬──────────┘
         │
        NO  ──► Redirect to index.html (login)
         │
       YES
         │
    ┌────┴──────────┐
    │ Correct role? │
    └────┬──────────┘
         │
        NO  ──► Redirect to own dashboard
         │
       YES ──► Allow page to render
```

### Logout
```
User clicks Logout
    → Auth.logout()
    → Auth.currentUser = null
    → sessionStorage.removeItem("currentUser")
    → window.location.href = "index.html"
```

---

## 13. SessionStorage & LocalStorage Usage

| Storage | Key | Type | What Is Stored | When Written | When Read |
|---|---|---|---|---|---|
| SessionStorage | `currentUser` | JSON object | Logged-in user's id, name, role, department, section | On successful login | On every page load via Auth.init() |
| LocalStorage | `theme` | String (`"light"` or `"dark"`) | User's preferred theme | On every theme toggle | On every page load to restore theme |

What persists vs what resets:
- ✅ Login session — persists across page refreshes within the same tab
- ✅ Theme preference — persists even after closing and reopening the browser
- ⚠️ Login session — clears when the browser tab is closed (SessionStorage behavior)
- ⚠️ Attendance data — regenerates fresh on every page load (no database)

---

## 14. Attendance Status Logic

All attendance percentages are classified into 3 tiers used throughout the app for badges, progress bars, chart colours, and filter tabs:

| Tier | Range | CSS Class | Colour | Meaning |
|---|---|---|---|---|
| Good / Excellent | ≥ 85% | `success` | `#10b981` Green | Satisfactory — no action needed |
| Warning | 75% – 84% | `warning` | `#f59e0b` Amber | Below ideal — student should attend more |
| At Risk / Danger | < 75% | `danger` | `#ef4444` Red | Below minimum — risk of detention |

This threshold logic lives in `Charts.getStatusClass(value)` and `Charts.getBarColor(value)`, which are called everywhere a colour-coded element is rendered.

---

## 15. Charts & Visualizations

### Pie / Donut Chart (`createPieChart`)
- Built with CSS `conic-gradient` — no canvas, no SVG, no external library
- Accepts an array of `{ value, label, color }` objects
- Calculates each segment's start and end degree based on the proportion of total
- The center circle shows the overall attendance % and a label
- A legend row is rendered below with colour dots and labels

### Bar Chart (`createBarChart`)
- Built with flexbox — each bar is a div with dynamic height using JS
- Bar height = `(value / maxValue) * chartHeight` in pixels
- Colour is assigned by `Charts.getBarColor(value)` — green, amber, or red
- Each bar has a value label above and a name label below
- Bars animate in with staggered `.animate-fade-in` classes

### Usage in Admin Dashboard
- **Department Comparison** — bar chart with CSE, ECE, ME, CE averages
- **Weekly Trends** — bar chart with Mon–Fri percentages for current section

### Usage in Student Dashboard
- **Attendance Distribution** — donut chart showing Excellent / Good / Low subject count
- **Subject Performance** — bar chart with each subject code and its %

---

## 16. Responsive Design

| Screen Size | Layout Behavior |
|---|---|
| 1400px and above | Full layout — 4-column stat cards, 2-column insights, 2-column charts |
| 1200px to 1400px | Stat cards: 4-column → 2-column, Insights: 2-column → 1-column |
| 768px to 1200px | Stat cards: 2-column, filters stack |
| Below 768px | Stat cards: 1-column, header wraps, filters stack vertically, student profile stacks |

Techniques used:
- CSS Grid with `repeat(4, 1fr)` reduced via `@media` queries
- Flexbox `flex-wrap` for header and filter bar
- `min-width` on search box so it expands to full width on mobile
- Relative units and `max-width: 1400px` container for large screens

---

## 17. How to Extend the Project

### Add a new department
1. Add entry to `DEPARTMENTS` array in `data.js`:
```javascript
{ code: "IT", name: "Information Technology" }
```
2. Add subjects to `SUBJECTS` map in `data.js`:
```javascript
IT: [
  { code: "IT101", name: "Python Programming", credits: 4 },
  // ...
]
```
3. Add students with `department: "IT"` to the `STUDENTS` array

### Add a new student
```javascript
// In data.js STUDENTS array
{ id: "STU038", name: "New Student", department: "CSE", section: "A",
  email: "new.s@college.edu", phone: "+1234567888", year: 2 }
```
Also add to `USERS` if they need login access:
```javascript
{ id: "STU038", password: "student123", role: "student",
  name: "New Student", department: "CSE", section: "A" }
```

### Connect to a real backend API
```javascript
// Replace generateStudentAttendance() in data.js with:
async function loadAttendanceFromAPI() {
  const res = await fetch('https://your-api.com/api/attendance');
  const data = await res.json();
  window.AppData.ATTENDANCE_DATA = data;
}
// Call this before rendering dashboards
```

### Add a new filter tab (e.g., Excellent)
1. Add button in `admin-dashboard.html`:
```html
<button class="filter-tab" data-filter="excellent">Excellent</button>
```
2. Add case in `getFilteredStudents()` in `admin.js`:
```javascript
case 'excellent': return attendance >= 90;
```

### Add a new stat card to Admin Dashboard
```javascript
// In renderStatCards() in admin.js, add to the stats array:
{
  icon: `<svg>...</svg>`,
  value: yourValue,
  label: 'Your Label',
  type: 'info'   // success | warning | danger | info
}
```

---

## 18. Challenges Faced

| Challenge | How It Was Solved |
|---|---|
| All three JS modules needed to share data without a bundler | Each module assigns itself to `window` (e.g., `window.AppData = {...}`) so all files share the same global scope |
| Dashboard pages must not be accessible without login | `Auth.requireAuth(role)` is called at the top of each dashboard's `init()` — it redirects immediately if the session is missing or the role is wrong |
| Attendance data needed to be realistic — not all students at 100% | Random profile assignment at generation time: 20% of students get low attendance range, 30% get high, 50% get average |
| Charts needed to be built without any external library | Pie charts built with CSS `conic-gradient`, bar charts built with flexbox and dynamic `height` in pixels via JavaScript |
| Stat card counters animate from 0 to target on load | `Charts.animateNumber()` uses `requestAnimationFrame` with `easeOutQuart` timing to smoothly count up |
| Sorting needed to work for both strings (name) and numbers (attendance %) | `getFilteredStudents()` checks `typeof aVal` — if string, uses `.localeCompare()`, if number, uses subtraction |
| Search, filter, sort, and section all needed to work together | All filters are applied in a single `getFilteredStudents()` function that chains each condition one after another |
| Wrong role user could manually type the admin URL in the browser | `Auth.requireAuth("admin")` on the admin page checks role and redirects students back to their own dashboard |
| Theme had to persist even when navigating between pages | Theme is saved to `localStorage`, and every page reads it on load before rendering anything |

---

## 19. Learnings

### HTML
- How to structure a multi-page application with semantic HTML
- Using `id` attributes as render targets for JavaScript `innerHTML` injection
- Loading scripts in the correct dependency order at the bottom of `<body>`
- Using `data-*` attributes (`data-sort`, `data-filter`, `data-dept`) for clean JS integration

### CSS
- CSS Custom Properties (`--bg-primary`, `--accent-primary`) for a switchable design system
- How to override all variables with a single `.light-theme` class on `<body>`
- CSS `conic-gradient` to build a pie/donut chart without any library
- `@keyframes` for fade-in, slide-in animations and staggered delays
- CSS Grid with `repeat(4, 1fr)` and media queries for responsive layouts
- `position: sticky` for the dashboard header that stays visible while scrolling
- Using `::before` pseudo-elements for the 3px accent bar on stat cards

### JavaScript
- Building a global namespace pattern (`window.AppData`, `window.Auth`, `window.Charts`) to share data across multiple script files
- How `SessionStorage` and `LocalStorage` differ — and when to use each
- Route protection — checking session and role before allowing a page to render
- Generating realistic random data at runtime using `Math.random()` with range control
- `requestAnimationFrame` for smooth counter animations with easing functions
- Event delegation — attaching one listener to a parent instead of many on dynamic children
- Using `Array.sort()` with a custom comparator for both string and numeric sorting
- Template literals to generate complex HTML strings from JavaScript objects
- Chaining array methods — `filter()`, `sort()`, `map()`, `find()`, `reduce()`

### General
- How to plan a multi-page app before writing any code
- Importance of a design system — consistent variables for colours, spacing, and radii
- How to simulate a real system (with random data) when no backend is available
- Debugging with Chrome DevTools — console, responsive view, Application tab for storage
- How GitHub Pages hosts static HTML/CSS/JS files for free

---

## 20. Future Improvements

### Short Term (No Backend Needed)
- Add more students across all sections so the data is richer
- Add a section-wise average chart below the department chart
- Export admin table data as a CSV file using a download link
- Add a "Show my classes this week" timetable view for students
- Add print-friendly styles for attendance reports

### Medium Term (Needs Backend)
- Connect to Firebase Firestore or a REST API for real data persistence
- Add real user authentication with password hashing
- Let faculty mark attendance session by session from a teacher panel
- Calculate consecutive absences from actual daily records, not random values
- Email or SMS alerts to students when their attendance drops below 75%

### Long Term (Advanced Features)
- Add a Teacher role with subject-specific attendance marking
- Add biometric/QR code-based attendance marking simulation
- Multi-semester support — view attendance history across semesters
- Admin CRUD — add, edit, and remove students, subjects, and departments from the UI
- PWA support — install as a mobile app with offline access
- Dashboard analytics export as PDF using jsPDF
- Integration with a college ERP system

---

## 21. Login Credentials

| Role | User ID | Password | Redirects To |
|---|---|---|---|
| 👨‍💼 Admin | `admin` | `admin123` | admin-dashboard.html |
| 🎓 Student | `STU001` | `student123` | student-dashboard.html |
| 🎓 Student | `STU002` | `student123` | student-dashboard.html |
| 🎓 Student | `STU003` | `student123` | student-dashboard.html |
| 🎓 Student | `STU004` | `student123` | student-dashboard.html |

All students use the same password `student123`. Each student sees their own data based on their ID.

---

## 22. How to Run

### Option 1 — Open Directly in Browser
```bash
git clone https://github.com/Mahitha-2776/Smart-Attendance-monitoring-system-FSD.git
cd Smart-Attendance-monitoring-system-FSD
# Open index.html in your browser
```

### Option 2 — Local Server (Recommended)
```bash
# Using Python
python -m http.server 8000
# Open → http://localhost:8000

# Using Node.js
npx serve .
# Open → http://localhost:3000
```

No npm install, no build step, no environment setup needed.

---

## 23. Credits & References

### Learning Resources
- MDN Web Docs — https://developer.mozilla.org
- CSS Tricks — https://css-tricks.com
- JavaScript.info — https://javascript.info

### Tools Used
- **VS Code** — Code editor
- **GitHub** — Version control and repository hosting
- **GitHub Pages** — Free static site deployment
- **Chrome DevTools** — Debugging and responsive design testing

### Team Members

| Name | Role |
|---|---|
| **K. Mahitha** | Frontend Developer & UI Design |
| **S. Divya Sri** | UI Design & Styling |
| **Surekha** | Testing & Documentation |
| **Jaswanth** | JavaScript & Data Logic |


