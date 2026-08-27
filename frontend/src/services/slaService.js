/**
 * SLA (Service Level Agreement) Configuration & Service
 * 
 * Configurable SLA deadlines and escalation logic.
 * All durations are in hours.
 */

export const SLA_CONFIG = {
  Critical: { hours: 4, label: "4 hours" },
  High: { hours: 12, label: "12 hours" },
  Medium: { hours: 48, label: "48 hours" },
  Low: { hours: 72, label: "72 hours" },
};

export const ESCALATION_CHAIN = [
  { level: 1, role: "Department", label: "Assigned Department" },
  { level: 2, role: "HOD", label: "Head of Department" },
  { level: 3, role: "Grievance Officer", label: "Grievance Redressal Officer" },
];

/**
 * Calculate SLA deadline based on priority and creation time.
 * 
 * @param {string} priority - "Critical" | "High" | "Medium" | "Low"
 * @param {string|Date} createdAt - Creation timestamp
 * @returns {string} ISO deadline string
 */
export function getSlaDeadline(priority, createdAt) {
  const config = SLA_CONFIG[priority] || SLA_CONFIG.Medium;
  const created = new Date(createdAt);
  const deadline = new Date(created.getTime() + config.hours * 60 * 60 * 1000);
  return deadline.toISOString();
}

/**
 * Get SLA label for a priority level.
 * 
 * @param {string} priority
 * @returns {string} e.g. "12 hours"
 */
export function getSlaLabel(priority) {
  const config = SLA_CONFIG[priority] || SLA_CONFIG.Medium;
  return config.label;
}

/**
 * Check the SLA status of a complaint.
 * 
 * @param {Object} complaint - Must have slaDeadline (ISO string) and status
 * @returns {Object} { isOverdue, timeRemaining, percentUsed, formattedRemaining }
 */
export function getSlaStatus(complaint) {
  if (!complaint.slaDeadline) {
    return {
      isOverdue: false,
      timeRemaining: null,
      percentUsed: 0,
      formattedRemaining: "N/A",
    };
  }

  if (complaint.status === "Resolved") {
    return {
      isOverdue: false,
      timeRemaining: 0,
      percentUsed: 100,
      formattedRemaining: "Resolved",
    };
  }

  const now = new Date();
  const deadline = new Date(complaint.slaDeadline);
  const created = new Date(complaint.createdAt);

  const totalDuration = deadline.getTime() - created.getTime();
  const elapsed = now.getTime() - created.getTime();
  const remaining = deadline.getTime() - now.getTime();

  const percentUsed = Math.min(
    100,
    Math.max(0, (elapsed / totalDuration) * 100)
  );

  const isOverdue = remaining <= 0;

  let formattedRemaining;
  if (isOverdue) {
    const overdueMs = Math.abs(remaining);
    const overdueHours = Math.floor(overdueMs / (1000 * 60 * 60));
    const overdueMinutes = Math.floor(
      (overdueMs % (1000 * 60 * 60)) / (1000 * 60)
    );
    formattedRemaining = `Overdue by ${overdueHours}h ${overdueMinutes}m`;
  } else {
    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const minutes = Math.floor(
      (remaining % (1000 * 60 * 60)) / (1000 * 60)
    );
    formattedRemaining = `${hours}h ${minutes}m`;
  }

  return {
    isOverdue,
    timeRemaining: remaining,
    percentUsed: Math.round(percentUsed),
    formattedRemaining,
  };
}

/**
 * Get the current escalation level for a complaint.
 * 
 * @param {Object} complaint
 * @returns {Object} Current escalation level info
 */
export function getEscalationLevel(complaint) {
  if (!complaint.slaDeadline || complaint.status === "Resolved") {
    return ESCALATION_CHAIN[0];
  }

  const now = new Date();
  const deadline = new Date(complaint.slaDeadline);
  const created = new Date(complaint.createdAt);
  const totalDuration = deadline.getTime() - created.getTime();
  const elapsed = now.getTime() - created.getTime();

  // Level 1: within SLA
  // Level 2: 1x–2x SLA exceeded
  // Level 3: >2x SLA exceeded
  if (elapsed <= totalDuration) {
    return ESCALATION_CHAIN[0];
  } else if (elapsed <= totalDuration * 2) {
    return ESCALATION_CHAIN[1];
  } else {
    return ESCALATION_CHAIN[2];
  }
}
