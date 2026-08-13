// Mock users database
const users = {
  "samarth@mitcollege.edu": {
    email: "samarth@mitcollege.edu",
    password: "password123",
    role: "student",
    name: "Samarth Bonde",
    studentId: "STU-007",
    department: "Computer Science",
    phone: "+91 9876543210",
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

export const login = (email, password) => {
  const user = users[email];
  if (user && user.password === password) {
    // In a real app, you'd store a token. Here we store the user object.
    const userToStore = { ...user };
    delete userToStore.password;
    localStorage.setItem("currentUser", JSON.stringify(userToStore));
    return { success: true, user: userToStore };
  }
  return { success: false, error: "Invalid credentials" };
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
