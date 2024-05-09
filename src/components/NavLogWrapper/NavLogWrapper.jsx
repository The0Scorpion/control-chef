/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import { Link } from "react-router-dom"
import "./style.css";

export const NavLogWrapper = ({
  className,
  maskgroup,
}) => {
  return (
    <div className={`nav-log-wrapper ${className}`}>
      <Link to="/">
        <img
          className={`mask-group ${maskgroup}`}
          alt="Mask group"
          src="https://c.animaapp.com/lSpjHlHF/img/mask-group-6@2x.png"
        />
        <img
          className={`mask-group ${maskgroup}`}
          alt="Mask group"
          src="https://c.animaapp.com/lSpjHlHF/img/mask-group-7@2x.png"
        />
        <img
          className={`mask-group ${maskgroup}`}
          alt="Mask group"
          src="https://c.animaapp.com/lSpjHlHF/img/mask-group-8@2x.png"
        />
      </Link>
    </div>
  );
};
