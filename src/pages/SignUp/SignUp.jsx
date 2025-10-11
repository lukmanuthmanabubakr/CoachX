import React, { useState } from "react";
import "./SignUp.css";
import signUpImg from "../../assets/signUpImg.jpg";
import logo from "../../assets/mainLogo.svg";

const SignUp = () => {
  const [role, setRole] = useState("");
  const [step, setStep] = useState(1);

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
    setStep(selectedRole === "creator" ? 2 : 3);
  };

  return (
    <div className="signup-container">
      {step === 1 && (
        <div className="signup-wrapper">
          {/* Left full image section */}
          <div className="signup-image-side">
            <img src={signUpImg} alt="CoachX" className="signup-img animate-img" />
          </div>

          {/* Right form section */}
          <div className="signup-form-side">
            <div className="signup-form">
              <img src={logo} alt="" className="logo"/>
              <p className="signup-title">Choose A Role</p>
              <form>
                <div className="radio-group">
                  <label>
                    Creator
                    <input
                      type="radio"
                      name="role"
                      value="creator"
                      checked={role === "creator"}
                      onChange={() => setRole("creator")}
                    />
                  </label>
                  <label>
                    Subscriber
                    <input
                      type="radio"
                      name="role"
                      value="subscriber"
                      checked={role === "subscriber"}
                      onChange={() => setRole("subscriber")}
                    />
                  </label>
                </div>
                <button
                  type="button"
                  disabled={!role}
                  onClick={() => handleRoleChange(role)}
                  className="signUpBtn"
                >
                  Continue
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="signup-section">
          <h2>Creator Section</h2>
          <p>Here you can create your creator account and manage content.</p>
          <button onClick={() => setStep(1)}>Back</button>
        </div>
      )}

      {step === 3 && (
        <div className="signup-section">
          <h2>Subscriber Section</h2>
          <p>Here you can subscribe and manage your subscriptions.</p>
          <button onClick={() => setStep(1)}>Back</button>
        </div>
      )}
    </div>
  );
};

export default SignUp;
