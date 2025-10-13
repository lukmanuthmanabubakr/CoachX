import axios from "axios";

const BACKEND_URL = "https://coachx-backend.vercel.app";
const API_URL = `${BACKEND_URL}/api/v1/users/`; // adjust if needed

// Signup
const signup = async (userData) => {
  const response = await axios.post(`${API_URL}signup`, userData);
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
  const response = await axios.patch(`${API_URL}resetpassword/${token}`, passwordData);
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
};

export default authService;
