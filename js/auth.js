/* ============================================
   AUTHENTICATION MODULE
   ============================================ */

const Auth = {
  // Current user session
  currentUser: null,

  // Initialize authentication
  init() {
    // Check for existing session
    const savedUser = sessionStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser);
      return this.currentUser;
    }
    return null;
  },

  // Login function
  login(userId, password) {
    const user = AppData.USERS.find(
      u => u.id.toLowerCase() === userId.toLowerCase() && u.password === password
    );

    if (user) {
      this.currentUser = {
        id: user.id,
        name: user.name,
        role: user.role,
        department: user.department,
        section: user.section
      };
      sessionStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      return { success: true, user: this.currentUser };
    }

    return { success: false, message: 'Invalid User ID or Password' };
  },

  // Logout function
  logout() {
    this.currentUser = null;
    sessionStorage.removeItem('currentUser');
    window.location.href = 'index.html';
  },

  // Check if user is logged in
  isAuthenticated() {
    return this.currentUser !== null;
  },

  // Get current user
  getCurrentUser() {
    return this.currentUser;
  },

  // Check if user has specific role
  hasRole(role) {
    return this.currentUser && this.currentUser.role === role;
  },

  // Redirect based on role
  redirectToDashboard() {
    if (!this.currentUser) {
      window.location.href = 'index.html';
      return;
    }

    if (this.currentUser.role === 'admin') {
      window.location.href = 'admin-dashboard.html';
    } else {
      window.location.href = 'student-dashboard.html';
    }
  },

  // Protect page - redirect if not authenticated
  requireAuth(requiredRole = null) {
    if (!this.init()) {
      window.location.href = 'index.html';
      return false;
    }

    if (requiredRole && this.currentUser.role !== requiredRole) {
      this.redirectToDashboard();
      return false;
    }

    return true;
  }
};

// Export for use in other modules
window.Auth = Auth;
