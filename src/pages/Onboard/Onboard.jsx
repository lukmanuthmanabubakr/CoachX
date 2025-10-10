import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Onboard.css";
import onboardOne from "../../assets/onboard1.jpg";
import onboardTwo from "../../assets/onboard3.jpg";
import onboardThree from "../../assets/onboard2.jpg";
import onboardX from "../../assets/Onboard.svg";

const Onboard = () => {
  return (
    <>
      <Navbar />
      <div className="onboardSection">
        <div className="onboardSecOne">
          <div className="coahesImages">
            <img src={onboardOne} alt="Coach 1" />
            <img src={onboardTwo} alt="Coach 2" />
            <img src={onboardThree} alt="Coach 3" />
          </div>

          <div className="onboardLogo">
            <img src={onboardX} alt="Onboard Logo" />
          </div>
        </div>
        <div className="onboardSecTwo">
          <h2>Choose who you are</h2>
        </div>
      </div>
    </>
  );
};

export default Onboard;
