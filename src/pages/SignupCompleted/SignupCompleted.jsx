import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import "./SignupCompleted.css";

const SignupCompleted = () => {
  useEffect(() => {
    // Trigger confetti for 1.5 seconds
    const duration = 1500;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#FF8B35", "#FFD166", "#06D6A0", "#118AB2", "#EF476F"],
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#FF8B35", "#FFD166", "#06D6A0", "#118AB2", "#EF476F"],
      });
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  return (
    <div className="signup-completed">
      <div className="signup-card">
        <h2>Sign up complete!</h2>
        <p>Get ready to have the best fitness experience</p>
        <button className="begin-btn">Let’s Get Started</button>
      </div>
    </div>
  );
};

export default SignupCompleted;
