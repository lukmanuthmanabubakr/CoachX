import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../../redux/features/auth/authSlice";

const GetUser = () => {
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const resultAction = await dispatch(getMe());
        console.log("📦 Full backend response:", resultAction);
        console.log("✅ Payload data:", resultAction.payload);

        // ✅ Extract user from payload
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
        </div>
      ) : (
        <p>No user data found.</p>
      )}
    </div>
  );
};

export default GetUser;
