import React, { useEffect, useState } from "react";
import "./style.css";

export const About = ({
  className,
  theDOFhover,
  abouttheDOF,
  img
}) => {
  const [height, setHeight] = useState('auto');

  useEffect(() => {
    const imgElement = document.querySelector('.about .element');
    const handleResize = () => {
      if (imgElement) {
        setHeight(imgElement.clientHeight);
      }
    };
    window.addEventListener("resize", handleResize);

    // Initial height set
    if (imgElement) {
      setHeight(imgElement.clientHeight);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={`about ${className}`} style={{ height }}>
      <p className={`about-the-DOF ${abouttheDOF}`}>About The 2 Dof Hover</p>
      <img className={`element ${img}`} alt="Element" src="https://c.animaapp.com/aDg8NBB3/img/3-1-1.png" />
      <p className={`the-DOF-hover ${theDOFhover}`}>
        The 2 Dof Hover System Is Ideally Suited To Study Control Concepts And Theories Relevant To Real World
        Applications Of Flight Dynamics And Control In Vertical Lift Off Vehicles.
      </p>
    </div>
  );
};
