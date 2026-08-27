// Mock users database
const users = {
  "samarth@mitcollege.edu": {
    email: "samarth@mitcollege.edu",
    password: "1234",
    role: "admin",
    name: "System Administrator",
    department: "Administration",
    status: "Active"
  },
  "admin@mitcollege.edu": {
    email: "admin@mitcollege.edu",
    password: "admin",
    role: "admin",
    name: "System Administrator",
    department: "Administration",
    status: "Active"
  }
};

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/auth";

export const login = async (emailOrName, password) => {
  // Handle Admin login mock
  if (users[emailOrName]) {
    const user = users[emailOrName];
    if (user && user.password === password) {
      const userToStore = { ...user };
      delete userToStore.password;
      localStorage.setItem("currentUser", JSON.stringify(userToStore));
      return { success: true, user: userToStore };
    }
    return { success: false, error: "Invalid credentials" };
  }

  // Student login via MongoDB backend
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: emailOrName, password })
    });
    const data = await response.json();
    
    if (data.success) {
      localStorage.setItem("currentUser", JSON.stringify(data.user));
      return { success: true, user: data.user };
    } else {
      return { success: false, error: data.error || "Invalid credentials" };
    }
  } catch (err) {
    return { success: false, error: "Backend unavailable" };
  }
};

export const registerStudent = async (name, password) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, password })
    });
    const data = await response.json();
    
    if (data.success) {
      return { success: true };
    } else {
      return { success: false, error: data.error || "Student name already exists" };
    }
  } catch (err) {
    return { success: false, error: "Backend unavailable" };
  }
};

export const logout = () => {
  localStorage.removeItem("currentUser");
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem("currentUser");
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

export const isAuthenticated = () => {
  return getCurrentUser() !== null;
};
