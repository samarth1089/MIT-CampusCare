/**
 * AI Classification Service
 * 
 * This module provides AI-powered complaint classification.
 * Currently uses a deterministic keyword-based fallback.
 * Replace the classifyComplaint function body with a real API call
 * (e.g., OpenAI, Google Gemini, custom ML model) when ready.
 */

const CATEGORY_RULES = [
  {
    category: "IT & Network",
    department: "IT Cell",
    keywords: ["wifi", "wi-fi", "internet", "network", "computer", "laptop", "server", "email", "software", "printer", "lan", "connectivity", "online"],
    defaultPriority: "High",
    defaultSla: "24 hours",
  },
  {
    category: "Hostel",
    department: "Hostel Administration",
    keywords: ["hostel", "room", "roommate", "warden", "mess", "laundry", "dormitory", "bed", "mattress", "hostel block"],
    defaultPriority: "High",
    defaultSla: "24 hours",
  },
  {
    category: "Infrastructure",
    department: "Maintenance Department",
    keywords: ["building", "classroom", "projector", "fan", "ac", "air conditioning", "furniture", "chair", "desk", "door", "window", "lift", "elevator", "parking"],
    defaultPriority: "Medium",
    defaultSla: "48 hours",
  },
  {
    category: "Academics",
    department: "Academic Department",
    keywords: ["teacher", "professor", "exam", "marks", "grade", "attendance", "syllabus", "lecture", "assignment", "timetable", "class", "course"],
    defaultPriority: "Medium",
    defaultSla: "48 hours",
  },
  {
    category: "Finance",
    department: "Finance Department",
    keywords: ["fee", "fees", "payment", "scholarship", "refund", "receipt", "challan", "tuition", "installment"],
    defaultPriority: "Medium",
    defaultSla: "48 hours",
  },
  {
    category: "Transport",
    department: "Transport Department",
    keywords: ["bus", "transport", "shuttle", "route", "driver", "vehicle", "pick up", "drop"],
    defaultPriority: "Medium",
    defaultSla: "48 hours",
  },
  {
    category: "Library",
    department: "Library Administration",
    keywords: ["library", "book", "journal", "reading", "catalogue", "fine", "borrow", "return"],
    defaultPriority: "Low",
    defaultSla: "72 hours",
  },
  {
    category: "Canteen",
    department: "Canteen Administration",
    keywords: ["canteen", "food", "cafeteria", "meal", "hygiene", "stale", "quality", "menu"],
    defaultPriority: "Medium",
    defaultSla: "48 hours",
  },
  {
    category: "Sanitation",
    department: "Sanitation Department",
    keywords: ["clean", "dirty", "garbage", "waste", "toilet", "washroom", "bathroom", "sanitation", "sweeping", "dustbin"],
    defaultPriority: "High",
    defaultSla: "24 hours",
  },
  {
    category: "Security",
    department: "Security Department",
    keywords: ["security", "theft", "stolen", "guard", "cctv", "camera", "gate", "trespassing", "safety", "threat"],
    defaultPriority: "Critical",
    defaultSla: "4 hours",
  },
  {
    category: "Water Supply",
    department: "Maintenance Department",
    keywords: ["water", "supply", "tap", "leakage", "pipeline", "drinking water", "tanker"],
    defaultPriority: "High",
    defaultSla: "24 hours",
  },
];

/**
 * Classify a complaint using AI (prototype: keyword matching).
 * 
 * @param {string} title - Complaint title
 * @param {string} description - Complaint description
 * @returns {Promise<Object>} Classification result
 */
export async function classifyComplaint(title, description) {
  // Simulate API latency
  await new Promise((resolve) => setTimeout(resolve, 800));

  const text = `${title} ${description}`.toLowerCase();

  let bestMatch = null;
  let bestScore = 0;

  for (const rule of CATEGORY_RULES) {
    let score = 0;

    for (const keyword of rule.keywords) {
      if (text.includes(keyword)) {
        score += 1;
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestMatch = rule;
    }
  }

  // Extract location hints from text
  const locationMatch = text.match(
    /(?:block\s*[a-z]|hostel\s*(?:block\s*)?[a-z]|building\s*\d+|room\s*\d+|floor\s*\d+|lab\s*\d+)/i
  );

  const suggestedLocation = locationMatch
    ? locationMatch[0].replace(/\b\w/g, (c) => c.toUpperCase())
    : null;

  if (bestMatch && bestScore > 0) {
    return {
      category: bestMatch.category,
      department: bestMatch.department,
      priority: bestMatch.defaultPriority,
      sla: bestMatch.defaultSla,
      confidence: bestScore >= 3 ? "High" : bestScore >= 2 ? "Medium" : "Low",
      suggestedLocation,
    };
  }

  // Fallback — could not classify
  return {
    category: "Other",
    department: "Administration",
    priority: "Medium",
    sla: "48 hours",
    confidence: "Low",
    suggestedLocation,
  };
}

/**
 * Find potentially duplicate/related complaints.
 * Prototype: simple word overlap similarity.
 * 
 * @param {Object} newComplaint - The new complaint to check
 * @param {Array} existingComplaints - List of existing complaints
 * @returns {Array} List of potentially related complaints with similarity scores
 */
export function findDuplicates(newComplaint, existingComplaints) {
  const newWords = getSignificantWords(
    `${newComplaint.title} ${newComplaint.description}`
  );

  if (newWords.size === 0) return [];

  const results = [];

  for (const existing of existingComplaints) {
    const existingWords = getSignificantWords(
      `${existing.title} ${existing.description || ""}`
    );

    if (existingWords.size === 0) continue;

    // Jaccard similarity
    const intersection = new Set(
      [...newWords].filter((w) => existingWords.has(w))
    );

    const union = new Set([...newWords, ...existingWords]);
    const similarity = intersection.size / union.size;

    if (similarity >= 0.25) {
      results.push({
        complaint: existing,
        similarity: Math.round(similarity * 100),
      });
    }
  }

  return results
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 5);
}

// Stop words to ignore in similarity comparison
const STOP_WORDS = new Set([
  "the", "a", "an", "is", "are", "was", "were", "be", "been",
  "being", "have", "has", "had", "do", "does", "did", "will",
  "would", "could", "should", "may", "might", "can", "shall",
  "to", "of", "in", "for", "on", "with", "at", "by", "from",
  "it", "its", "this", "that", "these", "those", "i", "me",
  "my", "we", "our", "you", "your", "he", "she", "they",
  "not", "no", "and", "or", "but", "if", "so", "as", "very",
]);

function getSignificantWords(text) {
  return new Set(
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .split(/\s+/)
      .filter((w) => w.length > 2 && !STOP_WORDS.has(w))
  );
}
