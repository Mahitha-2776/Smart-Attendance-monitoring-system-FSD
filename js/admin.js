/* ============================================
   ADMIN DASHBOARD MODULE
   ============================================ */

const AdminDashboard = {
  user: null,
  currentDepartment: 'CSE',
  currentSection: 'A',
  currentFilter: 'all',
  searchQuery: '',
  sortColumn: 'name',
  sortDirection: 'asc',

  // Initialize dashboard
  init() {
    // Check authentication
    if (!Auth.requireAuth('admin')) return;

    this.user = Auth.getCurrentUser();
    this.render();
    this.setupEventListeners();
  },

  // Main render
  render() {
    this.renderHeader();
    this.renderStatCards();
    this.renderInsights();
    this.renderDepartmentCharts();
    this.renderFilters();
    this.renderStudentTable();
  },

  // Render header
  renderHeader() {
    const headerRight = document.getElementById('header-right');
    if (headerRight) {
      headerRight.innerHTML = `
        <div class="user-info">
          <div class="user-avatar">${this.getInitials(this.user.name)}</div>
          <span class="user-name">${this.user.name}</span>
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

  // Render stat cards
  renderStatCards() {
    const container = document.getElementById('stat-cards');
    if (!container) return;

    const summary = AppData.getDepartmentSummary();
    const totalStudents = AppData.STUDENTS.length;
    
    let totalAttendance = 0;
    let totalAtRisk = 0;
    let presentToday = 0;

    Object.values(summary).forEach(dept => {
      totalAttendance += dept.averageAttendance * dept.totalStudents;
      totalAtRisk += dept.atRiskCount;
    });

    const overallAverage = Math.round(totalAttendance / totalStudents);
    
    // Simulate today's present (based on overall attendance)
    presentToday = Math.round(totalStudents * (overallAverage / 100));

    const stats = [
      {
        icon: `<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
        </svg>`,
        value: totalStudents,
        label: 'Total Students',
        type: 'info'
      },
      {
        icon: `<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>`,
        value: presentToday,
        label: 'Present Today',
        type: 'success'
      },
      {
        icon: `<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
        </svg>`,
        value: totalAtRisk,
        label: 'At Risk Students',
        type: 'danger'
      },
      {
        icon: `<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
        </svg>`,
        value: overallAverage,
        label: 'Avg Attendance',
        type: Charts.getStatusClass(overallAverage),
        suffix: '%'
      }
    ];

    container.innerHTML = stats.map((stat, index) => `
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

  // Render insights
  renderInsights() {
    const container = document.getElementById('insights-grid');
    if (!container) return;

    // Get at-risk students
    const atRiskStudents = this.getAtRiskStudents();
    
    // Get top performers
    const topPerformers = this.getTopPerformers();
    
    // Get students with consecutive absences
    const consecutiveAbsences = this.getConsecutiveAbsences();
    
    // Get low attendance sections
    const lowSections = this.getLowAttendanceSections();

    container.innerHTML = `
      <div class="insight-card animate-fade-in stagger-1">
        <div class="insight-header">
          <div class="insight-icon danger">⚠️</div>
          <div class="insight-title">At Risk Students (Below 75%)</div>
        </div>
        <ul class="insight-list">
          ${atRiskStudents.slice(0, 5).map(s => `
            <li class="insight-item">
              <span class="insight-item-name">${s.name} (${s.department}-${s.section})</span>
              <span class="insight-item-value badge badge-danger">${s.attendance}%</span>
            </li>
          `).join('') || '<li class="insight-item"><span class="insight-item-name">No at-risk students</span></li>'}
        </ul>
      </div>

      <div class="insight-card animate-fade-in stagger-2">
        <div class="insight-header">
          <div class="insight-icon success">🏆</div>
          <div class="insight-title">Top Performers (Above 95%)</div>
        </div>
        <ul class="insight-list">
          ${topPerformers.slice(0, 5).map(s => `
            <li class="insight-item">
              <span class="insight-item-name">${s.name} (${s.department}-${s.section})</span>
              <span class="insight-item-value badge badge-success">${s.attendance}%</span>
            </li>
          `).join('') || '<li class="insight-item"><span class="insight-item-name">No top performers</span></li>'}
        </ul>
      </div>

      <div class="insight-card animate-fade-in stagger-3">
        <div class="insight-header">
          <div class="insight-icon warning">📢</div>
          <div class="insight-title">3+ Consecutive Absences</div>
        </div>
        <ul class="insight-list">
          ${consecutiveAbsences.slice(0, 5).map(s => `
            <li class="insight-item">
              <span class="insight-item-name">${s.name}</span>
              <span class="insight-item-value badge badge-warning">${s.days} days</span>
            </li>
          `).join('') || '<li class="insight-item"><span class="insight-item-name">No consecutive absences</span></li>'}
        </ul>
      </div>

      <div class="insight-card animate-fade-in stagger-4">
        <div class="insight-header">
          <div class="insight-icon warning">📊</div>
          <div class="insight-title">Low Avg Attendance Sections</div>
        </div>
        <ul class="insight-list">
          ${lowSections.slice(0, 5).map(s => `
            <li class="insight-item">
              <span class="insight-item-name">${s.name}</span>
              <span class="insight-item-value badge badge-${Charts.getStatusClass(s.avg)}">${s.avg}%</span>
            </li>
          `).join('') || '<li class="insight-item"><span class="insight-item-name">All sections performing well</span></li>'}
        </ul>
      </div>
    `;
  },

  // Render department comparison charts
  renderDepartmentCharts() {
    const summary = AppData.getDepartmentSummary();
    
    // Department comparison bar chart
    const deptData = AppData.DEPARTMENTS.map(dept => ({
      label: dept.code,
      value: summary[dept.code].averageAttendance
    }));

    Charts.createBarChart('department-chart', deptData);

    // Weekly trends chart
    const weeklyData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, i) => {
      const avgAttendance = Math.round(
        Object.values(AppData.WEEKLY_TRENDS).reduce((sum, dept) => {
          return sum + (dept[this.currentSection]?.[i] || dept.A[i]);
        }, 0) / Object.keys(AppData.WEEKLY_TRENDS).length
      );
      return { label: day, value: avgAttendance };
    });

    Charts.createBarChart('weekly-trends-chart', weeklyData);
  },

  // Render filters
  renderFilters() {
    const deptSelector = document.getElementById('dept-selector');
    if (deptSelector) {
      deptSelector.innerHTML = AppData.DEPARTMENTS.map(dept => `
        <button class="dept-btn ${dept.code === this.currentDepartment ? 'active' : ''}" 
          data-dept="${dept.code}">
          ${dept.code}
        </button>
      `).join('');
    }

    const sectionSelector = document.getElementById('section-selector');
    if (sectionSelector) {
      sectionSelector.innerHTML = `
        <option value="all">All Sections</option>
        ${AppData.SECTIONS.map(section => `
          <option value="${section}" ${section === this.currentSection ? 'selected' : ''}>
            Section ${section}
          </option>
        `).join('')}
      `;
    }
  },

  // Render student table
  renderStudentTable() {
    const tableBody = document.getElementById('student-table-body');
    if (!tableBody) return;

    const students = this.getFilteredStudents();

    if (students.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; padding: 40px; color: var(--text-secondary);">
            No students found matching your criteria
          </td>
        </tr>
      `;
      return;
    }

    tableBody.innerHTML = students.map(student => {
      const attendance = AppData.ATTENDANCE_DATA[student.id];
      const statusClass = Charts.getStatusClass(attendance.overall.percentage);
      const subjects = AppData.SUBJECTS[student.department];

      return `
        <tr>
          <td>
            <div style="display: flex; align-items: center; gap: 12px;">
              <div class="user-avatar" style="width: 32px; height: 32px; font-size: 12px;">
                ${this.getInitials(student.name)}
              </div>
              <div>
                <div style="font-weight: 500;">${student.name}</div>
                <div style="font-size: 12px; color: var(--text-muted);">${student.email}</div>
              </div>
            </div>
          </td>
          <td>${student.id}</td>
          <td>${student.department}-${student.section}</td>
          <td>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="badge badge-${statusClass}">${attendance.overall.percentage}%</span>
            </div>
          </td>
          <td>
            <div style="display: flex; gap: 4px; flex-wrap: wrap;">
              ${subjects.slice(0, 3).map(subj => {
                const subjAtt = attendance.subjects[subj.code];
                const subjClass = Charts.getStatusClass(subjAtt.percentage);
                return `<span class="badge badge-${subjClass}" style="font-size: 10px; padding: 2px 6px;">${subj.code}: ${subjAtt.percentage}%</span>`;
              }).join('')}
              ${subjects.length > 3 ? `<span style="font-size: 11px; color: var(--text-muted);">+${subjects.length - 3} more</span>` : ''}
            </div>
          </td>
          <td>
            ${attendance.consecutiveAbsences >= 3 
              ? `<span class="badge badge-warning">${attendance.consecutiveAbsences} days absent</span>` 
              : '<span style="color: var(--text-muted); font-size: 12px;">None</span>'}
          </td>
        </tr>
      `;
    }).join('');

    // Update count
    const countEl = document.getElementById('student-count');
    if (countEl) {
      countEl.textContent = `Showing ${students.length} students`;
    }
  },

  // Get filtered students
  getFilteredStudents() {
    let students = AppData.STUDENTS.filter(s => s.department === this.currentDepartment);

    // Filter by section
    if (this.currentSection !== 'all') {
      students = students.filter(s => s.section === this.currentSection);
    }

    // Filter by status
    if (this.currentFilter !== 'all') {
      students = students.filter(s => {
        const attendance = AppData.ATTENDANCE_DATA[s.id].overall.percentage;
        switch (this.currentFilter) {
          case 'at-risk': return attendance < 75;
          case 'warning': return attendance >= 75 && attendance < 85;
          case 'good': return attendance >= 85;
          default: return true;
        }
      });
    }

    // Search filter
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      students = students.filter(s => 
        s.name.toLowerCase().includes(query) || 
        s.id.toLowerCase().includes(query)
      );
    }

    // Sort
    students.sort((a, b) => {
      let aVal, bVal;
      switch (this.sortColumn) {
        case 'name':
          aVal = a.name;
          bVal = b.name;
          break;
        case 'attendance':
          aVal = AppData.ATTENDANCE_DATA[a.id].overall.percentage;
          bVal = AppData.ATTENDANCE_DATA[b.id].overall.percentage;
          break;
        case 'id':
          aVal = a.id;
          bVal = b.id;
          break;
        default:
          aVal = a.name;
          bVal = b.name;
      }

      if (typeof aVal === 'string') {
        return this.sortDirection === 'asc' 
          ? aVal.localeCompare(bVal) 
          : bVal.localeCompare(aVal);
      }
      return this.sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
    });

    return students;
  },

  // Get at-risk students
  getAtRiskStudents() {
    return AppData.STUDENTS
      .map(s => ({
        ...s,
        attendance: AppData.ATTENDANCE_DATA[s.id].overall.percentage
      }))
      .filter(s => s.attendance < 75)
      .sort((a, b) => a.attendance - b.attendance);
  },

  // Get top performers
  getTopPerformers() {
    return AppData.STUDENTS
      .map(s => ({
        ...s,
        attendance: AppData.ATTENDANCE_DATA[s.id].overall.percentage
      }))
      .filter(s => s.attendance >= 95)
      .sort((a, b) => b.attendance - a.attendance);
  },

  // Get students with consecutive absences
  getConsecutiveAbsences() {
    return AppData.STUDENTS
      .map(s => ({
        ...s,
        days: AppData.ATTENDANCE_DATA[s.id].consecutiveAbsences
      }))
      .filter(s => s.days >= 3)
      .sort((a, b) => b.days - a.days);
  },

  // Get low attendance sections
  getLowAttendanceSections() {
    const sections = [];
    
    AppData.DEPARTMENTS.forEach(dept => {
      AppData.SECTIONS.forEach(section => {
        const students = AppData.STUDENTS.filter(
          s => s.department === dept.code && s.section === section
        );
        
        if (students.length > 0) {
          const avg = Math.round(
            students.reduce((sum, s) => 
              sum + AppData.ATTENDANCE_DATA[s.id].overall.percentage, 0
            ) / students.length
          );
          
          if (avg < 80) {
            sections.push({
              name: `${dept.code} - Section ${section}`,
              avg
            });
          }
        }
      });
    });

    return sections.sort((a, b) => a.avg - b.avg);
  },

  // Helper: Get initials
  getInitials(name) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  },

  // Setup event listeners
  setupEventListeners() {
    // Department selector
    document.getElementById('dept-selector')?.addEventListener('click', (e) => {
      if (e.target.classList.contains('dept-btn')) {
        document.querySelectorAll('.dept-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        this.currentDepartment = e.target.dataset.dept;
        this.renderStudentTable();
      }
    });

    // Section selector
    document.getElementById('section-selector')?.addEventListener('change', (e) => {
      this.currentSection = e.target.value;
      this.renderStudentTable();
    });

    // Search input
    document.getElementById('search-input')?.addEventListener('input', (e) => {
      this.searchQuery = e.target.value;
      this.renderStudentTable();
    });

    // Filter tabs
    document.querySelectorAll('.filter-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.currentFilter = tab.dataset.filter;
        this.renderStudentTable();
      });
    });

    // Sort headers
    document.querySelectorAll('th[data-sort]').forEach(th => {
      th.addEventListener('click', () => {
        const column = th.dataset.sort;
        if (this.sortColumn === column) {
          this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
          this.sortColumn = column;
          this.sortDirection = 'asc';
        }
        
        // Update sort indicators
        document.querySelectorAll('th[data-sort]').forEach(h => {
          h.classList.remove('sort-asc', 'sort-desc');
        });
        th.classList.add(this.sortDirection === 'asc' ? 'sort-asc' : 'sort-desc');
        
        this.renderStudentTable();
      });
    });

    // Theme
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
  AdminDashboard.init();
});
