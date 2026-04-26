/* ============================================
   STUDENT DASHBOARD MODULE
   ============================================ */

const StudentDashboard = {
  user: null,
  studentData: null,
  attendance: null,

  // Initialize dashboard
  init() {
    // Check authentication
    if (!Auth.requireAuth('student')) return;

    this.user = Auth.getCurrentUser();
    this.studentData = AppData.STUDENTS.find(s => s.id === this.user.id);
    this.attendance = AppData.ATTENDANCE_DATA[this.user.id];

    if (!this.studentData || !this.attendance) {
      console.error('Student data not found');
      return;
    }

    this.render();
    this.setupEventListeners();
  },

  // Render the dashboard
  render() {
    this.renderHeader();
    this.renderProfile();
    this.renderStatCards();
    this.renderAlerts();
    this.renderSubjectAttendance();
    this.renderCharts();
  },

  // Render header
  renderHeader() {
    const headerRight = document.getElementById('header-right');
    if (headerRight) {
      headerRight.innerHTML = `
        <div class="user-info">
          <div class="user-avatar">${this.getInitials(this.studentData.name)}</div>
          <span class="user-name">${this.studentData.name}</span>
        </div>
        <button class="theme-toggle" onclick="toggleTheme()" title="Toggle Theme">
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
          </svg>
        </button>
        <button class="btn btn-secondary" onclick="Auth.logout()">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
          </svg>
          Logout
        </button>
      `;
    }
  },

  // Render student profile
  renderProfile() {
    const profileContainer = document.getElementById('student-profile');
    if (profileContainer) {
      profileContainer.innerHTML = `
        <div class="profile-avatar">${this.getInitials(this.studentData.name)}</div>
        <div class="profile-info">
          <h2>${this.studentData.name}</h2>
          <div class="profile-meta">
            <span>
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"/>
              </svg>
              ID: ${this.studentData.id}
            </span>
            <span>
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
              </svg>
              ${this.getDepartmentName(this.studentData.department)}
            </span>
            <span>
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
              Section ${this.studentData.section}
            </span>
            <span>
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
              </svg>
              Year ${this.studentData.year}
            </span>
          </div>
        </div>
      `;
    }
  },

  // Render stat cards
  renderStatCards() {
    const statCardsContainer = document.getElementById('stat-cards');
    if (!statCardsContainer) return;

    const subjects = AppData.SUBJECTS[this.studentData.department];
    const lowAttendanceCount = Object.values(this.attendance.subjects).filter(s => s.percentage < 75).length;
    const goodAttendanceCount = Object.values(this.attendance.subjects).filter(s => s.percentage >= 85).length;

    const stats = [
      {
        icon: `<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>`,
        value: this.attendance.overall.percentage,
        label: 'Overall Attendance',
        type: Charts.getStatusClass(this.attendance.overall.percentage),
        suffix: '%'
      },
      {
        icon: `<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
        </svg>`,
        value: subjects.length,
        label: 'Total Subjects',
        type: 'info'
      },
      {
        icon: `<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
        </svg>`,
        value: lowAttendanceCount,
        label: 'Subjects Below 75%',
        type: lowAttendanceCount > 0 ? 'danger' : 'success'
      },
      {
        icon: `<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
        </svg>`,
        value: goodAttendanceCount,
        label: 'Excellent (Above 85%)',
        type: 'success'
      }
    ];

    statCardsContainer.innerHTML = stats.map((stat, index) => `
      <div class="stat-card ${stat.type} animate-fade-in stagger-${index + 1}">
        <div class="stat-icon">${stat.icon}</div>
        <div class="stat-value">
          <span class="counter" data-target="${stat.value}">${stat.value}</span>${stat.suffix || ''}
        </div>
        <div class="stat-label">${stat.label}</div>
      </div>
    `).join('');

    // Animate counters
    document.querySelectorAll('.counter').forEach(counter => {
      Charts.animateNumber(counter, parseInt(counter.dataset.target));
    });
  },

  // Render alerts
  renderAlerts() {
    const alertsContainer = document.getElementById('alerts-container');
    if (!alertsContainer) return;

    const alerts = [];
    const subjects = AppData.SUBJECTS[this.studentData.department];

    // Check for low attendance subjects
    subjects.forEach(subject => {
      const subjectAttendance = this.attendance.subjects[subject.code];
      if (subjectAttendance && subjectAttendance.percentage < 75) {
        alerts.push({
          type: 'danger',
          icon: '⚠️',
          title: `Low Attendance Alert: ${subject.name}`,
          message: `Your attendance in ${subject.name} is ${subjectAttendance.percentage}%. Attend more classes to avoid detention.`
        });
      }
    });

    // Check for consecutive absences
    if (this.attendance.consecutiveAbsences >= 3) {
      alerts.push({
        type: 'warning',
        icon: '📢',
        title: 'Consecutive Absence Warning',
        message: `You have ${this.attendance.consecutiveAbsences} consecutive absences. Please contact your advisor.`
      });
    }

    if (alerts.length === 0) {
      alertsContainer.innerHTML = `
        <div class="alert" style="background: rgba(16, 185, 129, 0.1); border-color: rgba(16, 185, 129, 0.3);">
          <span class="alert-icon">✅</span>
          <div class="alert-content">
            <h4>Great Job!</h4>
            <p>Your attendance is on track. Keep up the good work!</p>
          </div>
        </div>
      `;
    } else {
      alertsContainer.innerHTML = alerts.map(alert => `
        <div class="alert alert-${alert.type}">
          <span class="alert-icon">${alert.icon}</span>
          <div class="alert-content">
            <h4>${alert.title}</h4>
            <p>${alert.message}</p>
          </div>
        </div>
      `).join('');
    }
  },

  // Render subject-wise attendance
  renderSubjectAttendance() {
    const container = document.getElementById('subject-attendance');
    if (!container) return;

    const subjects = AppData.SUBJECTS[this.studentData.department];

    container.innerHTML = subjects.map((subject, index) => {
      const attendance = this.attendance.subjects[subject.code];
      const statusClass = Charts.getStatusClass(attendance.percentage);

      return `
        <div class="subject-card animate-fade-in stagger-${(index % 4) + 1}">
          <div class="subject-header">
            <span class="subject-name">${subject.name}</span>
            <span class="subject-code">${subject.code}</span>
          </div>
          <div class="subject-stats">
            <div class="subject-stat">
              <div class="subject-stat-value">${attendance.attended}</div>
              <div class="subject-stat-label">Attended</div>
            </div>
            <div class="subject-stat">
              <div class="subject-stat-value">${attendance.total}</div>
              <div class="subject-stat-label">Total</div>
            </div>
            <div class="subject-stat">
              <div class="subject-stat-value" style="color: var(--${statusClass === 'success' ? 'success' : statusClass === 'warning' ? 'warning' : 'danger'})">${attendance.percentage}%</div>
              <div class="subject-stat-label">Percentage</div>
            </div>
          </div>
          <div class="progress-bar">
            <div class="progress-fill ${statusClass}" style="width: ${attendance.percentage}%"></div>
          </div>
        </div>
      `;
    }).join('');
  },

  // Render charts
  renderCharts() {
    this.renderPieChart();
    this.renderBarChart();
  },

  // Render attendance distribution pie chart
  renderPieChart() {
    const subjects = AppData.SUBJECTS[this.studentData.department];
    let excellent = 0, good = 0, low = 0;

    subjects.forEach(subject => {
      const percentage = this.attendance.subjects[subject.code].percentage;
      if (percentage >= 85) excellent++;
      else if (percentage >= 75) good++;
      else low++;
    });

    Charts.createPieChart('attendance-pie-chart', [
      { value: excellent, label: 'Excellent (85%+)', color: '#10b981' },
      { value: good, label: 'Good (75-85%)', color: '#f59e0b' },
      { value: low, label: 'Low (<75%)', color: '#ef4444' }
    ], {
      centerValue: this.attendance.overall.percentage,
      centerLabel: 'Overall'
    });
  },

  // Render subject-wise bar chart
  renderBarChart() {
    const subjects = AppData.SUBJECTS[this.studentData.department];
    const data = subjects.map(subject => ({
      label: subject.code,
      value: this.attendance.subjects[subject.code].percentage
    }));

    Charts.createBarChart('subject-bar-chart', data);
  },

  // Helper: Get initials from name
  getInitials(name) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  },

  // Helper: Get department full name
  getDepartmentName(code) {
    const dept = AppData.DEPARTMENTS.find(d => d.code === code);
    return dept ? dept.name : code;
  },

  // Setup event listeners
  setupEventListeners() {
    // Theme toggle
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.body.classList.add('light-theme');
    }
  }
};

// Theme toggle function
function toggleTheme() {
  document.body.classList.toggle('light-theme');
  const isLight = document.body.classList.contains('light-theme');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  StudentDashboard.init();
});
