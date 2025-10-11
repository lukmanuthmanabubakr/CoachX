import React from "react";
import bgImage from "../../assets/testingtwo.jpeg";
import logo from "../../assets/CoachX.svg";
import subLogo from "../../assets/mainLogo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import "./Onboard.css";

const Onboard = () => {
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/signup"); // navigate to Sign Up page
  };

  return (
    <div
      className="onboardWrapper"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="overlay"></div>

      <div className="onboardingContent">
        <img src={subLogo} alt="Sub Logo" className="subLogo" />
        <img src={logo} alt="Main Logo" className="mainLogo" />

        <p className="onboardText">
          Welcome to CoachX! Achieve your fitness goals with personalized
          coaching, track your progress effortlessly.
        </p>

        <button className="signupBtn" onClick={handleSignup}>
          Sign Up
        </button>

        <p className="loginText">
          Already have an account?{" "}
          <NavLink to="/signin" className="loginLink">
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Onboard;
