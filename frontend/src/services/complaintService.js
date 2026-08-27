/**
 * Complaint Service
 *
 * Central data layer for all complaint operations.
 * Uses localStorage for prototype persistence.
 * Replace with API calls when backend is ready.
 */

const STORAGE_KEY = "campuscare_complaints";

const now = new Date();
const h = (hoursAgo) => new Date(now.getTime() - hoursAgo * 60 * 60 * 1000).toISOString();

const defaultComplaints = [
  {
    id: "CMP-1024",
    studentId: "STU-001",
    studentName: "Rahul Sharma",
    title: "Hostel Wi-Fi not working",
    description:
      "The Wi-Fi connection has not been working properly in Hostel Block B for the last three days. Multiple students are unable to access online classes and college resources.",
    category: "IT & Network",
    location: "Hostel Block B",
    department: "IT Cell",
    priority: "High",
    status: "In Progress",
    createdAt: h(6),
    updatedAt: h(2),
    slaDeadline: new Date(new Date(h(6)).getTime() + 12 * 60 * 60 * 1000).toISOString(),
    assignedTo: "IT Support Team",
    resolution: "",
    attachments: [],
    aiClassification: {
      category: "IT & Network",
      department: "IT Cell",
      priority: "High",
      confidence: "High",
      sla: "12 hours",
    },
    feedback: null,
    timeline: [
      { event: "Complaint Submitted", description: "Complaint received successfully.", timestamp: h(6), completed: true },
      { event: "AI Analysis Completed", description: "Category: IT & Network, Priority: High, Department: IT Cell", timestamp: h(5.9), completed: true },
      { event: "Assigned to IT Cell", description: "Complaint assigned to IT Support Team.", timestamp: h(4), completed: true },
      { event: "Investigation in Progress", description: "IT team is currently investigating the network equipment.", timestamp: h(2), completed: true },
      { event: "Complaint Resolved", description: "Waiting for resolution.", timestamp: null, completed: false },
    ],
  },
  {
    id: "CMP-1023",
    studentId: "STU-002",
    studentName: "Priya Patil",
    title: "Water supply issue in Block B",
    description: "Water supply has been irregular in Hostel Block B since yesterday morning. Students are unable to use washrooms properly.",
    category: "Hostel",
    location: "Hostel Block B",
    department: "Hostel Administration",
    priority: "High",
    status: "Pending",
    createdAt: h(18),
    updatedAt: h(18),
    slaDeadline: new Date(new Date(h(18)).getTime() + 12 * 60 * 60 * 1000).toISOString(),
    assignedTo: "Hostel Administration",
    resolution: "",
    attachments: [],
    aiClassification: {
      category: "Hostel",
      department: "Hostel Administration",
      priority: "High",
      confidence: "High",
      sla: "24 hours",
    },
    feedback: null,
    timeline: [
      { event: "Complaint Submitted", description: "Complaint received successfully.", timestamp: h(18), completed: true },
      { event: "AI Analysis Completed", description: "Category: Hostel, Priority: High", timestamp: h(17.9), completed: true },
      { event: "Pending Assignment", description: "Awaiting department assignment.", timestamp: null, completed: false },
    ],
  },
  {
    id: "CMP-1022",
    studentId: "STU-003",
    studentName: "Amit Deshmukh",
    title: "Classroom projector not working",
    description: "The projector in Room 301, Building A is not displaying properly. The image is distorted and the HDMI port seems damaged.",
    category: "Infrastructure",
    location: "Room 301, Building A",
    department: "Maintenance Department",
    priority: "Medium",
    status: "Resolved",
    createdAt: h(72),
    updatedAt: h(24),
    slaDeadline: new Date(new Date(h(72)).getTime() + 48 * 60 * 60 * 1000).toISOString(),
    assignedTo: "Maintenance Team",
    resolution: "Projector HDMI port replaced and tested successfully.",
    attachments: [],
    aiClassification: {
      category: "Infrastructure",
      department: "Maintenance Department",
      priority: "Medium",
      confidence: "Medium",
      sla: "48 hours",
    },
    feedback: { rating: 4, comment: "Fixed promptly, thank you!" },
    timeline: [
      { event: "Complaint Submitted", description: "Complaint received successfully.", timestamp: h(72), completed: true },
      { event: "AI Analysis Completed", description: "Category: Infrastructure, Priority: Medium", timestamp: h(71.9), completed: true },
      { event: "Assigned to Maintenance", description: "Assigned to Maintenance Team.", timestamp: h(70), completed: true },
      { event: "Repair in Progress", description: "Technician dispatched to Room 301.", timestamp: h(48), completed: true },
      { event: "Complaint Resolved", description: "Projector HDMI port replaced and tested.", timestamp: h(24), completed: true },
    ],
  },
  {
    id: "CMP-1021",
    studentId: "STU-004",
    studentName: "Sneha Kulkarni",
    title: "Scholarship amount not credited",
    description: "My scholarship amount for the current semester has not been credited to my account. The due date was last week.",
    category: "Finance",
    location: "",
    department: "Finance Department",
    priority: "Medium",
    status: "In Progress",
    createdAt: h(48),
    updatedAt: h(12),
    slaDeadline: new Date(new Date(h(48)).getTime() + 48 * 60 * 60 * 1000).toISOString(),
    assignedTo: "Finance Department",
    resolution: "",
    attachments: [],
    aiClassification: {
      category: "Finance",
      department: "Finance Department",
      priority: "Medium",
      confidence: "High",
      sla: "48 hours",
    },
    feedback: null,
    timeline: [
      { event: "Complaint Submitted", description: "Complaint received.", timestamp: h(48), completed: true },
      { event: "AI Analysis Completed", description: "Category: Finance, Priority: Medium", timestamp: h(47.9), completed: true },
      { event: "Assigned to Finance", description: "Assigned to Finance Department.", timestamp: h(36), completed: true },
      { event: "Under Review", description: "Finance team is verifying records.", timestamp: h(12), completed: true },
      { event: "Complaint Resolved", description: "Pending resolution.", timestamp: null, completed: false },
    ],
  },
  {
    id: "CMP-1020",
    studentId: "STU-005",
    studentName: "Rohan Joshi",
    title: "Bus route timing issue",
    description: "The college bus on Route 7 has been arriving 30 minutes late consistently for the past week. Students are missing morning lectures.",
    category: "Transport",
    location: "Route 7",
    department: "Transport Department",
    priority: "Medium",
    status: "Pending",
    createdAt: h(24),
    updatedAt: h(24),
    slaDeadline: new Date(new Date(h(24)).getTime() + 48 * 60 * 60 * 1000).toISOString(),
    assignedTo: "",
    resolution: "",
    attachments: [],
    aiClassification: {
      category: "Transport",
      department: "Transport Department",
      priority: "Medium",
      confidence: "High",
      sla: "48 hours",
    },
    feedback: null,
    timeline: [
      { event: "Complaint Submitted", description: "Complaint received.", timestamp: h(24), completed: true },
      { event: "AI Analysis Completed", description: "Category: Transport, Priority: Medium", timestamp: h(23.9), completed: true },
      { event: "Pending Assignment", description: "Awaiting department assignment.", timestamp: null, completed: false },
    ],
  },
  {
    id: "CMP-1019",
    studentId: "STU-006",
    studentName: "Kavita Mehta",
    title: "Canteen food quality issue",
    description: "The food quality in the main canteen has deteriorated significantly. Multiple students have reported stale food being served.",
    category: "Canteen",
    location: "Main Canteen",
    department: "Canteen Administration",
    priority: "High",
    status: "Resolved",
    createdAt: h(96),
    updatedAt: h(72),
    slaDeadline: new Date(new Date(h(96)).getTime() + 24 * 60 * 60 * 1000).toISOString(),
    assignedTo: "Canteen Administration",
    resolution: "Canteen vendor warned. New quality checks implemented.",
    attachments: [],
    aiClassification: {
      category: "Canteen",
      department: "Canteen Administration",
      priority: "High",
      confidence: "High",
      sla: "24 hours",
    },
    feedback: { rating: 3, comment: "Issue resolved but took too long." },
    timeline: [
      { event: "Complaint Submitted", description: "Complaint received.", timestamp: h(96), completed: true },
      { event: "Assigned to Canteen Admin", description: "Assigned for investigation.", timestamp: h(90), completed: true },
      { event: "Complaint Resolved", description: "Vendor warned, new quality checks in place.", timestamp: h(72), completed: true },
    ],
  },
  {
    id: "CMP-1018",
    studentId: "STU-001",
    studentName: "Rahul Sharma",
    title: "Hostel Block B internet is down",
    description: "Internet connectivity in Hostel Block B is completely down since this morning. Cannot access any online resources.",
    category: "IT & Network",
    location: "Hostel Block B",
    department: "IT Cell",
    priority: "High",
    status: "Pending",
    createdAt: h(3),
    updatedAt: h(3),
    slaDeadline: new Date(new Date(h(3)).getTime() + 12 * 60 * 60 * 1000).toISOString(),
    assignedTo: "",
    resolution: "",
    attachments: [],
    aiClassification: {
      category: "IT & Network",
      department: "IT Cell",
      priority: "High",
      confidence: "High",
      sla: "12 hours",
    },
    feedback: null,
    timeline: [
      { event: "Complaint Submitted", description: "Complaint received.", timestamp: h(3), completed: true },
      { event: "AI Analysis Completed", description: "Category: IT & Network, Priority: High", timestamp: h(2.9), completed: true },
      { event: "Pending Assignment", description: "Awaiting department assignment.", timestamp: null, completed: false },
    ],
  },
];

function loadComplaints() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch {
    // Corrupted data, reset
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultComplaints));
  return [...defaultComplaints];
}

export function getComplaints() {
  return loadComplaints();
}

export function saveComplaints(complaints) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(complaints));
}

/**
 * Get complaints for a specific student.
 */
export function getStudentComplaints(studentName) {
  return getComplaints().filter(
    (c) => c.studentName === studentName
  );
}

/**
 * Add a new complaint and return it.
 */
export function addComplaint(complaint) {
  const complaints = getComplaints();

  const nextNum = complaints.reduce((max, c) => {
    const num = parseInt(c.id.replace("CMP-", ""), 10);
    return num > max ? num : max;
  }, 1000);

  const newComplaint = {
    id: `CMP-${nextNum + 1}`,
    studentId: complaint.studentId || "STU-000",
    studentName: complaint.studentName || complaint.student || "Student",
    title: complaint.title,
    description: complaint.description,
    category: complaint.category,
    location: complaint.location || "",
    department: complaint.department,
    priority: complaint.priority,
    status: "Pending",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    slaDeadline: complaint.slaDeadline || "",
    assignedTo: complaint.assignedTo || "",
    anonymous: complaint.anonymous || false,
    resolution: "",
    attachments: [],
    aiClassification: complaint.aiClassification || null,
    feedback: null,
    timeline: [
      {
        event: "Complaint Submitted",
        description: "Complaint received successfully.",
        timestamp: new Date().toISOString(),
        completed: true,
      },
      {
        event: "AI Analysis Completed",
        description: `Category: ${complaint.category}, Priority: ${complaint.priority}, Department: ${complaint.department}`,
        timestamp: new Date().toISOString(),
        completed: true,
      },
      {
        event: "Pending Assignment",
        description: "Awaiting department assignment.",
        timestamp: null,
        completed: false,
      },
    ],
  };

  const updated = [newComplaint, ...complaints];
  saveComplaints(updated);
  return newComplaint;
}

/**
 * Update a complaint's status and refresh the list.
 */
export function updateComplaintStatus(id, status) {
  const complaints = getComplaints();

  const updated = complaints.map((c) => {
    if (c.id !== id) return c;

    const updatedComplaint = {
      ...c,
      status,
      updatedAt: new Date().toISOString(),
    };

    // Add timeline event for status change
    if (status === "In Progress" && c.status !== "In Progress") {
      updatedComplaint.timeline = [
        ...(c.timeline || []).map((t) =>
          !t.completed ? { ...t, completed: true, timestamp: t.timestamp || new Date().toISOString() } : t
        ),
      ];
      // Replace the last incomplete event and add new ones
      const completedTimeline = updatedComplaint.timeline.filter((t) => t.completed);
      updatedComplaint.timeline = [
        ...completedTimeline,
        {
          event: "Investigation in Progress",
          description: "Team is working on this complaint.",
          timestamp: new Date().toISOString(),
          completed: true,
        },
        {
          event: "Complaint Resolved",
          description: "Waiting for resolution.",
          timestamp: null,
          completed: false,
        },
      ];
    }

    if (status === "Resolved" && c.status !== "Resolved") {
      updatedComplaint.timeline = (c.timeline || []).map((t) => ({
        ...t,
        completed: true,
        timestamp: t.timestamp || new Date().toISOString(),
      }));
      updatedComplaint.resolution = "Complaint resolved by the assigned department.";
    }

    return updatedComplaint;
  });

  saveComplaints(updated);
  return updated;
}

/**
 * Update specific fields on a complaint.
 */
export function updateComplaint(id, fields) {
  const complaints = getComplaints();

  const updated = complaints.map((c) =>
    c.id === id
      ? { ...c, ...fields, updatedAt: new Date().toISOString() }
      : c
  );

  saveComplaints(updated);
  return updated;
}

/**
 * Get a single complaint by ID.
 */
export function getComplaintById(id) {
  return getComplaints().find((c) => c.id === id) || null;
}

/**
 * Add feedback to a resolved complaint.
 */
export function addFeedback(id, feedback) {
  const complaints = getComplaints();

  const updated = complaints.map((c) =>
    c.id === id
      ? { ...c, feedback, updatedAt: new Date().toISOString() }
      : c
  );

  saveComplaints(updated);
  return updated;
}

/**
 * Reopen a resolved complaint.
 */
export function reopenComplaint(id) {
  const complaints = getComplaints();

  const updated = complaints.map((c) => {
    if (c.id !== id) return c;

    return {
      ...c,
      status: "In Progress",
      resolution: "",
      feedback: null,
      updatedAt: new Date().toISOString(),
      timeline: [
        ...(c.timeline || []),
        {
          event: "Complaint Reopened",
          description: "Student has reopened this complaint.",
          timestamp: new Date().toISOString(),
          completed: true,
        },
        {
          event: "Complaint Resolved",
          description: "Waiting for resolution.",
          timestamp: null,
          completed: false,
        },
      ],
    };
  });

  saveComplaints(updated);
  return updated;
}

/**
 * Reset to default data (useful for demo).
 */
export function resetComplaints() {
  localStorage.removeItem(STORAGE_KEY);
  return getComplaints();
}