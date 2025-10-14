import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMe, logout } from "../../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const GetUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, isSuccess } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const resultAction = await dispatch(getMe());
        console.log("📦 Full backend response:", resultAction);
        console.log("✅ Payload data:", resultAction.payload);

        const userData = resultAction.payload?.data?.user;
        console.log("🧍 User Object:", userData);
      } catch (err) {
        console.error("❌ Error fetching user:", err);
      }
    };

    fetchUser();
  }, [dispatch]);

  // ✅ Get nested user safely
  const actualUser = user?.data?.user || user;

  // ✅ Logout Handler
  const handleLogout = async () => {
    try {
      await dispatch(logout());
      localStorage.removeItem("user"); // clear saved user data
      navigate("/signin"); // redirect to login page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="get-user">
      {isLoading ? (
        <div className="loader">Loading user data...</div>
      ) : isError ? (
        <div className="error-msg">Failed to load user data 😢</div>
      ) : isSuccess && actualUser ? (
        <div className="user-card">
          <h2>User Details</h2>
          <div className="user-info">
            <p><strong>Name:</strong> {actualUser.fullName || "Not available"}</p>
            <p><strong>Email:</strong> {actualUser.email}</p>
            <p><strong>Gender:</strong> {actualUser.gender || "Not set"}</p>
            <p><strong>Fitness Goals:</strong> {actualUser.fitnessGoal?.join(", ") || "None"}</p>
            <p>
              <strong>Created At:</strong>{" "}
              {actualUser.createdAt
                ? new Date(actualUser.createdAt).toLocaleString()
                : "Not available"}
            </p>
          </div>

          {/* ✅ Logout Button */}
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <p>No user data found.</p>
      )}
    </div>
  );
};

export default GetUser;
