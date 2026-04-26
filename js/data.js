/* ============================================
   ATTENDANCE DATA STORE
   ============================================ */

// Predefined Users for Authentication
const USERS = [
  { id: 'STU001', password: 'student123', role: 'student', name: 'John Anderson', department: 'CSE', section: 'A' },
  { id: 'STU002', password: 'student123', role: 'student', name: 'Sarah Johnson', department: 'CSE', section: 'A' },
  { id: 'STU003', password: 'student123', role: 'student', name: 'Mike Chen', department: 'CSE', section: 'B' },
  { id: 'STU004', password: 'student123', role: 'student', name: 'Emily Davis', department: 'ECE', section: 'A' },
  { id: 'admin', password: 'admin123', role: 'admin', name: 'Dr. Robert Williams', department: 'Admin', section: '' }
];

// Departments and Sections
const DEPARTMENTS = [
  { code: 'CSE', name: 'Computer Science & Engineering' },
  { code: 'ECE', name: 'Electronics & Communication' },
  { code: 'ME', name: 'Mechanical Engineering' },
  { code: 'CE', name: 'Civil Engineering' }
];

const SECTIONS = ['A', 'B', 'C'];

// Subjects by Department
const SUBJECTS = {
  CSE: [
    { code: 'CS101', name: 'Data Structures', credits: 4 },
    { code: 'CS102', name: 'Database Systems', credits: 3 },
    { code: 'CS103', name: 'Operating Systems', credits: 4 },
    { code: 'CS104', name: 'Computer Networks', credits: 3 },
    { code: 'CS105', name: 'Web Development', credits: 3 },
    { code: 'CS106', name: 'Machine Learning', credits: 4 }
  ],
  ECE: [
    { code: 'EC101', name: 'Digital Electronics', credits: 4 },
    { code: 'EC102', name: 'Signal Processing', credits: 3 },
    { code: 'EC103', name: 'Microprocessors', credits: 4 },
    { code: 'EC104', name: 'Communication Systems', credits: 3 },
    { code: 'EC105', name: 'VLSI Design', credits: 3 },
    { code: 'EC106', name: 'Embedded Systems', credits: 4 }
  ],
  ME: [
    { code: 'ME101', name: 'Thermodynamics', credits: 4 },
    { code: 'ME102', name: 'Fluid Mechanics', credits: 3 },
    { code: 'ME103', name: 'Machine Design', credits: 4 },
    { code: 'ME104', name: 'Manufacturing', credits: 3 },
    { code: 'ME105', name: 'Heat Transfer', credits: 3 },
    { code: 'ME106', name: 'Robotics', credits: 4 }
  ],
  CE: [
    { code: 'CE101', name: 'Structural Analysis', credits: 4 },
    { code: 'CE102', name: 'Geotechnical Eng', credits: 3 },
    { code: 'CE103', name: 'Surveying', credits: 4 },
    { code: 'CE104', name: 'Construction Mgmt', credits: 3 },
    { code: 'CE105', name: 'Environmental Eng', credits: 3 },
    { code: 'CE106', name: 'Transportation Eng', credits: 4 }
  ]
};

// Generate random attendance data
function generateAttendance(totalClasses, minPercent = 60, maxPercent = 100) {
  const percentage = Math.floor(Math.random() * (maxPercent - minPercent + 1)) + minPercent;
  const attended = Math.floor((percentage / 100) * totalClasses);
  return { attended, total: totalClasses, percentage };
}

// Students Data
const STUDENTS = [
  // CSE - Section A
  { id: 'STU001', name: 'John Anderson', department: 'CSE', section: 'A', email: 'john.a@college.edu', phone: '+1234567890', year: 3 },
  { id: 'STU002', name: 'Sarah Johnson', department: 'CSE', section: 'A', email: 'sarah.j@college.edu', phone: '+1234567891', year: 3 },
  { id: 'STU005', name: 'David Lee', department: 'CSE', section: 'A', email: 'david.l@college.edu', phone: '+1234567894', year: 3 },
  { id: 'STU006', name: 'Emma Wilson', department: 'CSE', section: 'A', email: 'emma.w@college.edu', phone: '+1234567895', year: 3 },
  { id: 'STU007', name: 'James Brown', department: 'CSE', section: 'A', email: 'james.b@college.edu', phone: '+1234567896', year: 3 },
  
  // CSE - Section B
  { id: 'STU003', name: 'Mike Chen', department: 'CSE', section: 'B', email: 'mike.c@college.edu', phone: '+1234567892', year: 3 },
  { id: 'STU008', name: 'Olivia Martinez', department: 'CSE', section: 'B', email: 'olivia.m@college.edu', phone: '+1234567897', year: 3 },
  { id: 'STU009', name: 'William Taylor', department: 'CSE', section: 'B', email: 'william.t@college.edu', phone: '+1234567898', year: 3 },
  { id: 'STU010', name: 'Sophia Garcia', department: 'CSE', section: 'B', email: 'sophia.g@college.edu', phone: '+1234567899', year: 3 },
  { id: 'STU011', name: 'Benjamin White', department: 'CSE', section: 'B', email: 'benjamin.w@college.edu', phone: '+1234567800', year: 3 },
  
  // CSE - Section C
  { id: 'STU012', name: 'Isabella Thomas', department: 'CSE', section: 'C', email: 'isabella.t@college.edu', phone: '+1234567801', year: 3 },
  { id: 'STU013', name: 'Mason Jackson', department: 'CSE', section: 'C', email: 'mason.j@college.edu', phone: '+1234567802', year: 3 },
  { id: 'STU014', name: 'Mia Harris', department: 'CSE', section: 'C', email: 'mia.h@college.edu', phone: '+1234567803', year: 3 },
  { id: 'STU015', name: 'Ethan Clark', department: 'CSE', section: 'C', email: 'ethan.c@college.edu', phone: '+1234567804', year: 3 },
  
  // ECE - Section A
  { id: 'STU004', name: 'Emily Davis', department: 'ECE', section: 'A', email: 'emily.d@college.edu', phone: '+1234567893', year: 3 },
  { id: 'STU016', name: 'Alexander Lewis', department: 'ECE', section: 'A', email: 'alex.l@college.edu', phone: '+1234567805', year: 3 },
  { id: 'STU017', name: 'Charlotte Walker', department: 'ECE', section: 'A', email: 'charlotte.w@college.edu', phone: '+1234567806', year: 3 },
  { id: 'STU018', name: 'Daniel Hall', department: 'ECE', section: 'A', email: 'daniel.h@college.edu', phone: '+1234567807', year: 3 },
  { id: 'STU019', name: 'Amelia Young', department: 'ECE', section: 'A', email: 'amelia.y@college.edu', phone: '+1234567808', year: 3 },
  
  // ECE - Section B
  { id: 'STU020', name: 'Henry King', department: 'ECE', section: 'B', email: 'henry.k@college.edu', phone: '+1234567809', year: 3 },
  { id: 'STU021', name: 'Harper Scott', department: 'ECE', section: 'B', email: 'harper.s@college.edu', phone: '+1234567810', year: 3 },
  { id: 'STU022', name: 'Sebastian Green', department: 'ECE', section: 'B', email: 'sebastian.g@college.edu', phone: '+1234567811', year: 3 },
  { id: 'STU023', name: 'Evelyn Adams', department: 'ECE', section: 'B', email: 'evelyn.a@college.edu', phone: '+1234567812', year: 3 },
  
  // ME - Section A
  { id: 'STU024', name: 'Jack Nelson', department: 'ME', section: 'A', email: 'jack.n@college.edu', phone: '+1234567813', year: 3 },
  { id: 'STU025', name: 'Aria Carter', department: 'ME', section: 'A', email: 'aria.c@college.edu', phone: '+1234567814', year: 3 },
  { id: 'STU026', name: 'Owen Mitchell', department: 'ME', section: 'A', email: 'owen.m@college.edu', phone: '+1234567815', year: 3 },
  { id: 'STU027', name: 'Luna Perez', department: 'ME', section: 'A', email: 'luna.p@college.edu', phone: '+1234567816', year: 3 },
  
  // ME - Section B
  { id: 'STU028', name: 'Lucas Roberts', department: 'ME', section: 'B', email: 'lucas.r@college.edu', phone: '+1234567817', year: 3 },
  { id: 'STU029', name: 'Chloe Turner', department: 'ME', section: 'B', email: 'chloe.t@college.edu', phone: '+1234567818', year: 3 },
  { id: 'STU030', name: 'Liam Phillips', department: 'ME', section: 'B', email: 'liam.p@college.edu', phone: '+1234567819', year: 3 },
  
  // CE - Section A
  { id: 'STU031', name: 'Zoey Campbell', department: 'CE', section: 'A', email: 'zoey.c@college.edu', phone: '+1234567820', year: 3 },
  { id: 'STU032', name: 'Noah Parker', department: 'CE', section: 'A', email: 'noah.p@college.edu', phone: '+1234567821', year: 3 },
  { id: 'STU033', name: 'Lily Evans', department: 'CE', section: 'A', email: 'lily.e@college.edu', phone: '+1234567822', year: 3 },
  { id: 'STU034', name: 'Aiden Collins', department: 'CE', section: 'A', email: 'aiden.c@college.edu', phone: '+1234567823', year: 3 },
  
  // CE - Section B
  { id: 'STU035', name: 'Grace Edwards', department: 'CE', section: 'B', email: 'grace.e@college.edu', phone: '+1234567824', year: 3 },
  { id: 'STU036', name: 'Elijah Stewart', department: 'CE', section: 'B', email: 'elijah.s@college.edu', phone: '+1234567825', year: 3 },
  { id: 'STU037', name: 'Scarlett Morris', department: 'CE', section: 'B', email: 'scarlett.m@college.edu', phone: '+1234567826', year: 3 }
];

// Generate attendance records for each student
function generateStudentAttendance() {
  const attendanceData = {};
  
  STUDENTS.forEach(student => {
    const subjects = SUBJECTS[student.department];
    const subjectAttendance = {};
    let totalAttended = 0;
    let totalClasses = 0;
    
    // Add some variation - some students will have lower attendance
    const isLowAttendance = Math.random() < 0.2; // 20% chance of low attendance
    const isHighAttendance = Math.random() < 0.3; // 30% chance of high attendance
    
    subjects.forEach(subject => {
      const total = Math.floor(Math.random() * 10) + 35; // 35-45 classes
      let minPercent, maxPercent;
      
      if (isLowAttendance) {
        minPercent = 55;
        maxPercent = 78;
      } else if (isHighAttendance) {
        minPercent = 85;
        maxPercent = 100;
      } else {
        minPercent = 70;
        maxPercent = 95;
      }
      
      const attendance = generateAttendance(total, minPercent, maxPercent);
      subjectAttendance[subject.code] = attendance;
      totalAttended += attendance.attended;
      totalClasses += attendance.total;
    });
    
    // Generate consecutive absences (for alerts)
    const consecutiveAbsences = isLowAttendance ? Math.floor(Math.random() * 4) + 2 : Math.floor(Math.random() * 2);
    
    attendanceData[student.id] = {
      subjects: subjectAttendance,
      overall: {
        attended: totalAttended,
        total: totalClasses,
        percentage: Math.round((totalAttended / totalClasses) * 100)
      },
      consecutiveAbsences,
      lastUpdated: new Date().toISOString()
    };
  });
  
  return attendanceData;
}

// Initialize attendance data
let ATTENDANCE_DATA = generateStudentAttendance();

// Weekly attendance trends (simulated)
const WEEKLY_TRENDS = {
  CSE: {
    A: [92, 88, 90, 85, 91],
    B: [87, 89, 85, 88, 86],
    C: [90, 92, 88, 91, 89]
  },
  ECE: {
    A: [88, 90, 87, 89, 91],
    B: [85, 87, 89, 86, 88]
  },
  ME: {
    A: [91, 89, 92, 88, 90],
    B: [86, 88, 85, 87, 89]
  },
  CE: {
    A: [89, 91, 88, 90, 92],
    B: [84, 86, 88, 85, 87]
  }
};

// Department-wise attendance summary
function getDepartmentSummary() {
  const summary = {};
  
  DEPARTMENTS.forEach(dept => {
    const deptStudents = STUDENTS.filter(s => s.department === dept.code);
    let totalAttendance = 0;
    let atRiskCount = 0;
    
    deptStudents.forEach(student => {
      const attendance = ATTENDANCE_DATA[student.id];
      if (attendance) {
        totalAttendance += attendance.overall.percentage;
        if (attendance.overall.percentage < 75) {
          atRiskCount++;
        }
      }
    });
    
    summary[dept.code] = {
      totalStudents: deptStudents.length,
      averageAttendance: Math.round(totalAttendance / deptStudents.length),
      atRiskCount
    };
  });
  
  return summary;
}

// Export data for use in other modules
window.AppData = {
  USERS,
  DEPARTMENTS,
  SECTIONS,
  SUBJECTS,
  STUDENTS,
  ATTENDANCE_DATA,
  WEEKLY_TRENDS,
  getDepartmentSummary,
  generateStudentAttendance
};
