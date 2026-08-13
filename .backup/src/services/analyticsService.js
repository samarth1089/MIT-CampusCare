/**
 * Analytics Service
 * 
 * Provides aggregated analytics data from complaint records
 * for admin dashboard charts and campus insights.
 */

import { getComplaints } from "./complaintService";
import { getSlaStatus } from "./slaService";

/**
 * Get complaint counts grouped by category.
 * @returns {Array<{name: string, count: number}>}
 */
export function getComplaintsByCategory() {
  const complaints = getComplaints();
  const map = {};

  for (const c of complaints) {
    const cat = c.category || "Other";
    map[cat] = (map[cat] || 0) + 1;
  }

  return Object.entries(map)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Get complaint counts grouped by department.
 * @returns {Array<{name: string, count: number}>}
 */
export function getComplaintsByDepartment() {
  const complaints = getComplaints();
  const map = {};

  for (const c of complaints) {
    const dept = c.department || "Unassigned";
    map[dept] = (map[dept] || 0) + 1;
  }

  return Object.entries(map)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Get resolution status breakdown.
 * @returns {Array<{name: string, value: number, color: string}>}
 */
export function getResolutionStats() {
  const complaints = getComplaints();
  const map = { Pending: 0, "In Progress": 0, Resolved: 0, Overdue: 0 };

  for (const c of complaints) {
    const sla = getSlaStatus(c);
    if (sla.isOverdue && c.status !== "Resolved") {
      map.Overdue += 1;
    } else {
      map[c.status] = (map[c.status] || 0) + 1;
    }
  }

  const colors = {
    Pending: "#f59e0b",
    "In Progress": "#3b82f6",
    Resolved: "#10b981",
    Overdue: "#ef4444",
  };

  return Object.entries(map)
    .filter(([, value]) => value > 0)
    .map(([name, value]) => ({
      name,
      value,
      color: colors[name] || "#64748b",
    }));
}

/**
 * Get top recurring issues (locations/topics with most complaints).
 * @returns {Array<{issue: string, count: number, trend: number}>}
 */
export function getRecurringIssues() {
  const complaints = getComplaints();
  const issueMap = {};

  for (const c of complaints) {
    // Group by category + location when available
    const key = c.location
      ? `${c.category} — ${c.location}`
      : c.category;

    if (!issueMap[key]) {
      issueMap[key] = { issue: key, count: 0, category: c.category };
    }
    issueMap[key].count += 1;
  }

  return Object.values(issueMap)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)
    .map((item, index) => ({
      ...item,
      // Simulated trend percentage for prototype
      trend: [64, 42, 28, 15, 8][index] || 0,
    }));
}

/**
 * Get department workload stats.
 * @returns {Array<{department: string, total: number, pending: number, resolved: number}>}
 */
export function getDepartmentWorkload() {
  const complaints = getComplaints();
  const map = {};

  for (const c of complaints) {
    const dept = c.department || "Unassigned";

    if (!map[dept]) {
      map[dept] = { department: dept, total: 0, pending: 0, resolved: 0 };
    }

    map[dept].total += 1;

    if (c.status === "Resolved") {
      map[dept].resolved += 1;
    } else {
      map[dept].pending += 1;
    }
  }

  return Object.values(map).sort((a, b) => b.total - a.total);
}

/**
 * Get overdue complaint count.
 * @returns {number}
 */
export function getOverdueCount() {
  const complaints = getComplaints();
  let count = 0;

  for (const c of complaints) {
    if (c.status !== "Resolved") {
      const sla = getSlaStatus(c);
      if (sla.isOverdue) {
        count += 1;
      }
    }
  }

  return count;
}
