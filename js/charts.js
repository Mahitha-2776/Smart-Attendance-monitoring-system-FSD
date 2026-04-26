/* ============================================
   CHARTS MODULE
   ============================================ */

const Charts = {
  // Create a donut/pie chart using CSS conic-gradient
  createPieChart(containerId, data, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const total = data.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = 0;
    const gradientParts = [];

    data.forEach(item => {
      const percentage = (item.value / total) * 100;
      const startAngle = currentAngle;
      currentAngle += (item.value / total) * 360;
      gradientParts.push(`${item.color} ${startAngle}deg ${currentAngle}deg`);
    });

    const centerValue = options.centerValue || Math.round((data[0].value / total) * 100);
    const centerLabel = options.centerLabel || 'Overall';

    container.innerHTML = `
      <div class="pie-chart" style="background: conic-gradient(${gradientParts.join(', ')})">
        <div class="pie-chart-center">
          <span class="pie-chart-value">${centerValue}%</span>
          <span class="pie-chart-label">${centerLabel}</span>
        </div>
      </div>
      <div class="chart-legend">
        ${data.map(item => `
          <div class="legend-item">
            <span class="legend-color" style="background: ${item.color}"></span>
            <span>${item.label}: ${item.value}</span>
          </div>
        `).join('')}
      </div>
    `;
  },

  // Create a bar chart
  createBarChart(containerId, data, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const maxValue = Math.max(...data.map(item => item.value));
    const chartHeight = options.height || 180;

    container.innerHTML = `
      <div class="bar-chart" style="height: ${chartHeight}px">
        ${data.map((item, index) => {
          const height = (item.value / maxValue) * chartHeight;
          const color = item.color || this.getBarColor(item.value);
          return `
            <div class="bar-item animate-fade-in stagger-${index + 1}">
              <span class="bar-value">${item.value}%</span>
              <div class="bar" style="height: ${height}px; background: linear-gradient(180deg, ${color} 0%, ${color}88 100%)"></div>
              <span class="bar-label">${item.label}</span>
            </div>
          `;
        }).join('')}
      </div>
    `;
  },

  // Create a comparison bar chart (horizontal)
  createHorizontalBarChart(containerId, data, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const maxValue = Math.max(...data.map(item => item.value));

    container.innerHTML = `
      <div class="horizontal-bar-chart">
        ${data.map((item, index) => {
          const width = (item.value / maxValue) * 100;
          const color = item.color || this.getBarColor(item.value);
          return `
            <div class="horizontal-bar-item animate-slide-in stagger-${index + 1}">
              <div class="horizontal-bar-label">
                <span>${item.label}</span>
                <span class="horizontal-bar-value">${item.value}%</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill" style="width: ${width}%; background: ${color}"></div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  },

  // Get color based on value (for attendance)
  getBarColor(value) {
    if (value >= 85) return '#10b981';
    if (value >= 75) return '#f59e0b';
    return '#ef4444';
  },

  // Get status color class
  getStatusClass(value) {
    if (value >= 85) return 'success';
    if (value >= 75) return 'warning';
    return 'danger';
  },

  // Create attendance badge
  createBadge(value) {
    const statusClass = this.getStatusClass(value);
    return `<span class="badge badge-${statusClass}">${value}%</span>`;
  },

  // Create progress bar
  createProgressBar(value, showLabel = true) {
    const statusClass = this.getStatusClass(value);
    return `
      <div class="progress-container">
        ${showLabel ? `<span class="progress-label">${value}%</span>` : ''}
        <div class="progress-bar">
          <div class="progress-fill ${statusClass}" style="width: ${value}%"></div>
        </div>
      </div>
    `;
  },

  // Animate number counter
  animateNumber(element, target, duration = 1000) {
    const start = 0;
    const startTime = performance.now();

    const updateNumber = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.floor(start + (target - start) * this.easeOutQuart(progress));
      
      element.textContent = current;
      
      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      } else {
        element.textContent = target;
      }
    };

    requestAnimationFrame(updateNumber);
  },

  // Easing function
  easeOutQuart(x) {
    return 1 - Math.pow(1 - x, 4);
  }
};

// Export for use in other modules
window.Charts = Charts;
