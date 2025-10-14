import axios from "axios";

const BACKEND_URL = "https://coachx-backend.vercel.app";
const API_URL = `${BACKEND_URL}/api/v1/users/`; // adjust if needed

// Signup
const signup = async (userData) => {
  console.log("🟡 Sending signup request:", userData);
  const response = await axios.post(`${API_URL}signup`, userData);
  console.log("✅ Signup response:", response.data);
  return response.data;
};

// Login
const login = async (userData) => {
  const response = await axios.post(`${API_URL}login`, userData);
  if (response.data.token) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Forgot Password
const forgotPassword = async (emailData) => {
  const response = await axios.post(`${API_URL}forgotpassword`, emailData);
  return response.data;
};

// Reset Password
const resetPassword = async (token, passwordData) => {
  const response = await axios.patch(
    `${API_URL}resetpassword/${token}`,
    passwordData
  );
  return response.data;
};

// Verify Email
const verifyEmail = async (token) => {
  const response = await axios.patch(`${API_URL}verifyemail/${token}`);
  return response.data;
};

// Update Me
const updateMe = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(`${API_URL}updateme`, userData, config);
  return response.data;
};

// Get Current User
const getMe = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}me`, config);
  return response.data;
};

// Logout
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  signup,
  login,
  forgotPassword,
  resetPassword,
  logout,
   verifyEmail,
  updateMe,
  getMe,
};

export default authService;
