/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import "./style.css";

export const About = ({ 
  className,
  theDOFhoverwrapper,
  theDOFhover,
  aboutwrapper,
  abouttheDOF,
  img
 }) => {
  return (
    <div className={`about ${className}`}>
      <div className={`the-DOF-hover-wrapper ${theDOFhoverwrapper}`}>
        <p className={`the-DOF-hover ${theDOFhover}`}>
          The 2 Dof Hover System Is Ideally Suited To Study Control Concepts And Theories Relevant To Real World
          Applications Of Flight Dynamics And Control In Vertical Lift Off Vehicles.
        </p>
      </div>
      <div className={`div ${aboutwrapper}`}>
        <p className={`about-the-DOF ${abouttheDOF}`}>About The 2 Dof Hover</p>
        <img className={`element ${img}`} alt="Element" src="https://c.animaapp.com/aDg8NBB3/img/3-1-1.png" />
      </div>
    </div>
  );
};
