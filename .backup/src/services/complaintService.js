const STORAGE_KEY = "campuscare_complaints";

const defaultComplaints = [
  {
    id: "CMP-1024",
    student: "Rahul Sharma",
    title: "Hostel Wi-Fi not working",
    description:
      "The Wi-Fi connection has not been working properly in Hostel Block B.",
    category: "IT & Network",
    department: "IT Department",
    priority: "High",
    status: "In Progress",
    sentiment: "Negative",
    sla: "24 hours",
    assignedTo: "IT Support Team",
    createdAt: "Aug 12, 2026 • 10:32 AM",
  },
  {
    id: "CMP-1023",
    student: "Priya Patil",
    title: "Water supply issue in Block B",
    description: "Water supply is not working properly.",
    category: "Hostel",
    department: "Hostel Administration",
    priority: "High",
    status: "Pending",
    sentiment: "Negative",
    sla: "24 hours",
    assignedTo: "Hostel Administration",
    createdAt: "Aug 12, 2026 • 08:30 AM",
  },
];

export function getComplaints() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(defaultComplaints)
    );

    return defaultComplaints;
  }

  return JSON.parse(saved);
}

export function saveComplaints(complaints) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(complaints)
  );
}

export function addComplaint(complaint) {
  const complaints = getComplaints();

  const newComplaint = {
    ...complaint,
    id: `CMP-${1000 + complaints.length + 1}`,
    createdAt: new Date().toLocaleString(),
  };

  const updated = [newComplaint, ...complaints];

  saveComplaints(updated);

  return newComplaint;
}

export function updateComplaintStatus(id, status) {
  const complaints = getComplaints();

  const updated = complaints.map((complaint) =>
    complaint.id === id
      ? {
          ...complaint,
          status,
        }
      : complaint
  );

  saveComplaints(updated);

  return updated;
}

export function getComplaintById(id) {
  const complaints = getComplaints();

  return complaints.find(
    (complaint) => complaint.id === id
  );
}