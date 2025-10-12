import React, { useState } from "react";
import "./SignUp.css";
import signUpImg from "../../assets/testingfive.jpeg";
import logo from "../../assets/Onboard.svg";
import Register from "../../components/Register/Register";

const SignUp = () => {
  const [role, setRole] = useState("");
  const [step, setStep] = useState(1);

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
    setStep(2);
  };

  return (
    <div
      className={`signup-container ${
        step === 1 ? "signup-bg" : "register-step"
      }`}
    >
      {step === 1 && (
        <div className="signup-wrapper">
          <div className="signup-image-side">
            <img
              src={signUpImg}
              alt="CoachX"
              className="signup-img animate-img"
            />
          </div>

          <div className="signup-form-side">
            <div className="signup-form">
              <img src={logo} alt="" className="logo" />
              <p className="signup-title">Who are you</p>

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
                      value="user"
                      checked={role === "user"}
                      onChange={() => setRole("user")}
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

      {/* Pass setStep to Register so it can go back */}
      {step === 2 && <Register role={role} setStep={setStep} />}
    </div>
  );
};

export default SignUp;
