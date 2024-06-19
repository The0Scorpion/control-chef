import React from "react";
import "./style.css";

export const Aboutus = ({
  className
}) => {
  return (
    <div className={`aboutus ${className}`}>
          <div className="about-us">About Us</div>
          <p className="about-us-text">
            The IOT motion lab is an idea inspired by many
            students who like to learn by active participation,
            We are Senior-2 students at FOE Ain Shams University,
            Our team has many talented members in many domains
            such as: mechanical design, Electric and PCB design,
            Website design and Modeling and control systems design,
            We at ASU aim to provide an exceptional experience to
            all our customers.
          </p>
          <img className="img" alt="About us" src="https://c.animaapp.com/1RUP1aFo/img/about-us-1.png" />
    </div>
  );
};
