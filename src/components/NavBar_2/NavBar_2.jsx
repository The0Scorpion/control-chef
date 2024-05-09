/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

export const NavBar_2 = ({
  className,
  navbarclassName,
  navbardrop,
  navbartext,
  controlchef1,
  controlchef2,
  controlchef3,
  controltotal1,
  dropdowncontenttheories,
  dropdowncontentexperiments
 }) => {
  return (
    <div className={`nav-bar-2 ${className}`}>
      <div className="nav-bar-dropdown">
        <button className={`group-42 ${navbarclassName}`}>
          <div className="rectangle-8" />
          <div className="rectangle-9" />
          <div className="rectangle-10" />
        </button>
        <div className={`dropdown-content-nav ${navbardrop}`}>
          <Link className="a" to="/#"><button className={`text1 ${navbartext}`}>About us</button></Link>
          <Link className="a" to="/#"><button className={`text1 ${navbartext}`}>Contact us</button></Link>
          <Link className="a" to="/#"><button className={`text1 ${navbartext}`}>Reservation</button></Link>
          <div className="dropdown-theory">
            <div className="a">
              <button className={`theories-explanation ${navbartext}`}>Theories Explanation</button>
              <div className={`dropdown-content-theories ${dropdowncontenttheories}`}>
                <Link className="a" to="/#"><button className={`p2 ${navbartext}`}>Cascaded PID</button></Link>
                <Link className="a" to="/#"><button className={`p2 ${navbartext}`}>LQR</button></Link>
              </div>
            </div>
          </div>
          <div className="dropdown-experiment"><button className={`experiments ${navbartext}`}>Experiments</button>
            <div className={`dropdown-content-experiments ${dropdowncontentexperiments}`}>
              <Link className="a" to="/Hover-Documentation"><button className={`p2 ${navbartext}`}>2 DOF Hover</button></Link>
              <Link className="a" to="/simulation-ballbalance"><button className={`p2 ${navbartext}`}>2 DOF Ball Balance</button></Link>
              <Link className="a" to="/simulation-servo"><button className={`p2 ${navbartext}`}>Servo Base Unit</button></Link>
              <Link className="a" to="/simulation-pendulum"><button className={`p2 ${navbartext}`}>Linear Inverted Pendulum</button></Link>
            </div>
          </div>
        </div>
      </div>
      <div className={`control-chef-high-3 ${controltotal1}`}>
        <Link to="/">
          <img
            className={`mask-group-7 ${controlchef1}`}
            src="https://c.animaapp.com/zqIJEW6i/img/mask-group-16@2x.png"
          />
          <img
            className={`mask-group-7 ${controlchef2}`}
            src="https://c.animaapp.com/zqIJEW6i/img/mask-group-17@2x.png"
          />
          <img
            className={`mask-group-7 ${controlchef3}`}
            src="https://c.animaapp.com/zqIJEW6i/img/mask-group-18@2x.png"
          />
        </Link>
      </div>
    </div>
  );
};

NavBar_2.propTypes = {
  maskGroup: PropTypes.string,
};
