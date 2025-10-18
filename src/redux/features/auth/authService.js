import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/v1/users/`;

// Register user
const signup = async (userData) => {
  const response = await axios.post(`${API_URL}signup`, userData);

  if (response.data) {
    // ✅ Properly extract token and user
    const token = response.data.token;
    const user = response.data.data?.user;

    // ✅ Save both user and token together
    localStorage.setItem("user", JSON.stringify({ ...user, token }));
  }

  return response.data;
};
//Log In
const login = async (userData) => {
  const response = await axios.post(`${API_URL}login`, userData);

  if (response.data) {
    const token = response.data.token;
    const user = response.data.data?.user || {}; // backend may not send user, adapt if needed
    localStorage.setItem("user", JSON.stringify({ ...user, token }));
    return { ...user, token };
  }

  return null;
};

// Logout
const logout = () => {
  localStorage.removeItem("user");
};
//Verify Email
const verifyEmail = async (token) => {
  const response = await axios.patch(`${API_URL}verifyemail/${token}`);

  // ✅ Always preserve token before overwriting
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const existingToken = storedUser?.token || null;

  if (!storedUser) {
    console.warn("⚠️ No user in localStorage during verification");
    return response.data;
  }

  // ✅ Merge properly
  const updatedUser = {
    ...storedUser,
    is_verified: true,
    token: existingToken, // keep token intact
  };

  // ✅ Save back
  localStorage.setItem("user", JSON.stringify(updatedUser));

  // ✅ Return consistent structure
  return {
    message: response.data.message,
    user: updatedUser,
  };
};
// Get User
const getMe = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // 👇 make the request
  const response = await axios.get(`${API_URL}me`, config);

  // 👇 handle and store properly
  if (response.data?.data?.user) {
    // ✅ read existing local user (to preserve token)
    const existing = JSON.parse(localStorage.getItem("user"));

    // ✅ merge backend user with stored token
    const updatedUser = {
      ...response.data.data.user,
      token: existing?.token, // <— re-attach token here
    };

    // ✅ save back to localStorage
    localStorage.setItem("user", JSON.stringify(updatedUser));

    // ✅ return updated user to redux
    return updatedUser;
  }

  return null;
};

// Forgot Password
const forgotPassword = async (emailData) => {
  const response = await axios.post(`${API_URL}forgotpassword`, emailData);
  return response.data;
};

// Reset Password
const resetPassword = async ({ token, passwordData }) => {
  const response = await axios.patch(`${API_URL}resetpassword/${token}`, passwordData);

  if (response.data?.token) {
    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    const updatedUser = {
      ...storedUser,
      token: response.data.token, // update token
    };
    localStorage.setItem("user", JSON.stringify(updatedUser));
  }

  return response.data;
};

const authService = {
  signup,
  login,
  logout,
  verifyEmail,
  getMe,
  forgotPassword,
  resetPassword
};

export default authService;
