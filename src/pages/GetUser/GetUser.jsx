import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMe, logout } from "../../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const GetUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    const fetchUser = async () => {
      const resultAction = await dispatch(getMe());
      console.log("📦 Full backend response:", resultAction);
      console.log("✅ Payload data:", resultAction.payload);

      // 🚨 If payload contains verification error
      if (
        typeof resultAction.payload === "string" &&
        resultAction.payload.includes("You must be verified")
      ) {
        navigate("/check-mail-verification");
      }
    };

    fetchUser();
  }, [dispatch, navigate]);

  // ✅ Logout Handler
  const handleLogout = async () => {
    await dispatch(logout());
    localStorage.removeItem("user");
    navigate("/signin");
  };

  if (isLoading) return <div className="loader">Loading user data...</div>;

  if (isError) {
    // ❌ Don't just show error, redirect if needed
    if (message?.includes("You must be verified")) {
      navigate("/check-mail-verification");
      return null;
    }

    return <div className="error-msg">Failed to load user data 😢</div>;
  }

  if (isSuccess && user) {
    return (
      <div className="user-card">
        <h2>User Details</h2>
        <div className="user-info">
          <p>
            <strong>Name:</strong> {user.fullName || "Not available"}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Gender:</strong> {user.gender || "Not set"}
          </p>
          <p>
            <strong>Fitness Goals:</strong>{" "}
            {user.fitnessGoal?.join(", ") || "None"}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {user.createdAt
              ? new Date(user.createdAt).toLocaleString()
              : "Not available"}
          </p>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    );
  }

  return <p>No user data found.</p>;
};

export default GetUser;
