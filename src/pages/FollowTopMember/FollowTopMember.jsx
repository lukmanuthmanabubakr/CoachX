import React, { useEffect, useState } from "react";
import "./FollowTopMember.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllCreators } from "../../redux/features/creators/creatorSlice";
import PageLoader from "../../components/PageLoader/PageLoader";

const FollowTopMember = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { creators, isLoading } = useSelector((state) => state.creators);
  const [selectedCoaches, setSelectedCoaches] = useState([]);

  useEffect(() => {
    dispatch(getAllCreators());
  }, [dispatch]);

  const toggleFollow = (id) => {
    setSelectedCoaches((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleBack = () => navigate("/choose-preferences");
  const handleNext = () => navigate("/signup-completed");

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="selectCoach-container">
      <div className="selectCoach-card">
        <div className="step-indicator">Step 6 of 6</div>

        <h1>Suggested Top-Rated Coaches</h1>
        <p className="selectCoach-sub">
          Follow experienced coaches to gain expert insights and personalized
          guidance.
        </p>

        <div className="coach-list">
          {creators?.length > 0 ? (
            creators.map((creator) => (
              <div className="coach-item" key={creator._id}>
                <img
                  src={creator.user?.profilePhoto}
                  alt={creator.user?.fullName || "Coach"}
                  className="coach-img"
                />

                <div className="coach-info">
                  <h3>{creator.user?.fullName || "Unnamed Coach"}</h3>
                  <p className="coach-clients">
                    {creator.totalSubscribers} clients
                  </p>
                  <p>Category: {creator.category || "N/A"}</p>
                </div>

                <button
                  className={`follow-btn ${
                    selectedCoaches.includes(creator._id) ? "selected" : ""
                  }`}
                  onClick={() => toggleFollow(creator._id)}
                >
                  {selectedCoaches.includes(creator._id)
                    ? "Following"
                    : "Follow"}
                </button>
              </div>
            ))
          ) : (
            <p>No coaches found.</p>
          )}
        </div>

        <div className="bottom-buttons">
          <button className="back-btn" onClick={handleBack}>
            Back
          </button>
          <button
            className="finish-btn"
            disabled={selectedCoaches.length === 0}
            onClick={handleNext}
          >
            Finish
          </button>
        </div>
      </div>
    </div>
  );
};

export default FollowTopMember;

// import React, { useState } from "react";
// import "./FollowTopMember.css";
// import coschImg from "../../assets/coach1.jpeg";
// import { useNavigate } from "react-router-dom";

// const FollowTopMember = () => {
//   const [selectedCoaches, setSelectedCoaches] = useState([]);
//   const navigate = useNavigate();

//   const coaches = [
//     {
//       id: 1,
//       name: "Coach Aisha",
//       clients: 120,
//       rating: 5,
//       image: coschImg,
//     },
//     {
//       id: 2,
//       name: "Coach Daniel",
//       clients: 95,
//       rating: 4,
//       image: coschImg,
//     },
//     {
//       id: 3,
//       name: "Coach Liam",
//       clients: 60,
//       rating: 3,
//       image: coschImg,
//     },
//     {
//       id: 4,
//       name: "Coach Emma",
//       clients: 130,
//       rating: 5,
//       image: coschImg,
//     },
//     {
//       id: 5,
//       name: "Coach Sophia",
//       clients: 80,
//       rating: 4,
//       image: coschImg,
//     },
//     {
//       id: 6,
//       name: "Coach Jacob",
//       clients: 150,
//       rating: 5,
//       image: coschImg,
//     },
//     {
//       id: 7,
//       name: "Coach Noah",
//       clients: 110,
//       rating: 4,
//       image: coschImg,
//     },
//     {
//       id: 8,
//       name: "Coach Grace",
//       clients: 90,
//       rating: 5,
//       image: coschImg,
//     },
//   ];

//   const toggleFollow = (id) => {
//     setSelectedCoaches((prev) =>
//       prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
//     );
//   };

//   const handleBack = () => {
//     navigate("/choose-preferences");
//   };
//   const handleNext = () => {
//     navigate("/signup-completed");
//   };

//   return (
//     <div className="selectCoach-container">
//       <div className="selectCoach-card">
//         <div className="step-indicator">Step 6 of 6</div>

//         <h1>Select Your Coach</h1>
//         <p className="selectCoach-sub">
//           Choose one or more coaches to follow and get guidance.
//         </p>

//         <div className="coach-list">
//           {coaches.map((coach) => (
//             <div className="coach-item" key={coach.id}>
//               <img src={coach.image} alt={coach.name} className="coach-img" />

//               <div className="coach-info">
//                 <h3>{coach.name}</h3>
//                 <p className="coach-clients">{coach.clients} clients</p>
//                 <div className="coach-rating">
//                   {Array.from({ length: 5 }).map((_, i) => (
//                     <span
//                       key={i}
//                       className={`star ${i < coach.rating ? "filled" : ""}`}
//                     >
//                       ★
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               <button
//                 className={`follow-btn ${
//                   selectedCoaches.includes(coach.id) ? "selected" : ""
//                 }`}
//                 onClick={() => toggleFollow(coach.id)}
//               >
//                 {selectedCoaches.includes(coach.id) ? "Following" : "Follow"}
//               </button>
//             </div>
//           ))}
//         </div>

//         <div className="bottom-buttons">
//           <button className="back-btn" onClick={handleBack}>
//             Back
//           </button>
//           <button
//             className="finish-btn"
//             disabled={selectedCoaches.length === 0}
//             onClick={handleNext}
//           >
//             Finish
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FollowTopMember;

// import React, { useState } from "react";
// import "./FollowTopMember.css";
// import coschImg from "../../assets/coach1.jpeg";
// import { useNavigate } from "react-router-dom";

// const FollowTopMember = () => {
//   const [selectedCoaches, setSelectedCoaches] = useState([]);
//   const navigate = useNavigate();

//   const coaches = [
//     { id: 1, name: "Coach Aisha", clients: 120, rating: 5, image: coschImg },
//     { id: 2, name: "Coach Daniel", clients: 95, rating: 4, image: coschImg },
//     { id: 3, name: "Coach Liam", clients: 60, rating: 3, image: coschImg },
//     { id: 4, name: "Coach Emma", clients: 130, rating: 5, image: coschImg },
//     { id: 5, name: "Coach Sophia", clients: 80, rating: 4, image: coschImg },
//     { id: 6, name: "Coach Jacob", clients: 150, rating: 5, image: coschImg },
//     { id: 7, name: "Coach Noah", clients: 110, rating: 4, image: coschImg },
//     { id: 8, name: "Coach Grace", clients: 90, rating: 5, image: coschImg },
//   ];

//   const toggleFollow = (id) => {
//     setSelectedCoaches((prev) =>
//       prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
//     );
//   };

//   const handleBack = () => {
//     navigate("/choose-preferences");
//   };

//   const handleNext = () => {
//     navigate("/signup-completed");
//   };

//   return (
//     <div className="selectCoach-container">
//       <div className="selectCoach-card">
//         <div className="step-indicator">Step 6 of 6</div>

//         <h1>Select Your Coach</h1>
//         <p className="selectCoach-sub">
//           Choose <strong>at least 5 coaches</strong> to follow and get guidance.
//         </p>

//         <div className="coach-list">
//           {coaches.map((coach) => (
//             <div className="coach-item" key={coach.id}>
//               <img src={coach.image} alt={coach.name} className="coach-img" />
//               <div className="coach-info">
//                 <h3>{coach.name}</h3>
//                 <p className="coach-clients">{coach.clients} clients</p>
//                 <div className="coach-rating">
//                   {Array.from({ length: 5 }).map((_, i) => (
//                     <span
//                       key={i}
//                       className={`star ${i < coach.rating ? "filled" : ""}`}
//                     >
//                       ★
//                     </span>
//                   ))}
//                 </div>
//               </div>
//               <button
//                 className={`follow-btn ${
//                   selectedCoaches.includes(coach.id) ? "selected" : ""
//                 }`}
//                 onClick={() => toggleFollow(coach.id)}
//               >
//                 {selectedCoaches.includes(coach.id) ? "Following" : "Follow"}
//               </button>
//             </div>
//           ))}
//         </div>

//         <div className="bottom-buttons">
//           <button className="back-btn" onClick={handleBack}>
//             Back
//           </button>
//           <button
//             className={`finish-btn ${
//               selectedCoaches.length < 5 ? "disabled" : ""
//             }`}
//             disabled={selectedCoaches.length < 5}
//             onClick={handleNext}
//           >
//             Finish
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FollowTopMember;
