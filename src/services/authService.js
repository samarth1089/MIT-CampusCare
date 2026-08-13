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

export const login = (emailOrName, password) => {
  const user = users[emailOrName];
  if (user && user.password === password) {
    // In a real app, you'd store a token. Here we store the user object.
    const userToStore = { ...user };
    delete userToStore.password;
    localStorage.setItem("currentUser", JSON.stringify(userToStore));
    return { success: true, user: userToStore };
  }
  return { success: false, error: "Invalid credentials" };
};

export const registerStudent = (name, password) => {
  if (users[name]) {
    return { success: false, error: "Student name already exists" };
  }
  
  users[name] = {
    email: name, // Using name as the key/identifier for students who don't provide email
    password: password,
    role: "student",
    name: name,
    status: "Active"
  };
  return { success: true };
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
