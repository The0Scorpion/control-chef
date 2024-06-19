import React from "react";
import "./style.css";
import { Link } from "react-router-dom";

export const NavBar = ({
  className,
  navalltext,
  onclick,
  contact,
  about,
  reservation,
  dropdowntheory,
  dropdownexp,
  dropdowncontentexperiments,
  dropdowncontenttheory,
  theoriesexp,
  experiments,
  signoutbtn
}) => {
  return (
    <div className={`nav-bar ${className}`}>
      <div className="logo">
        <Link to="/">
          <img
            className="mask-group-3"
            alt="Mask group"
            src="https://c.animaapp.com/Kvyg7vC4/img/group-1@2x.png"
          />
        </Link>
      </div>
      <div className={`group-21 ${navalltext}`}>
        <div className={`dropdown-theory ${dropdowntheory}`}>
          <button className={`theories-explanation ${theoriesexp}`}>Theories Explanation</button>
          <div className={`dropdown-content-theories ${dropdowncontenttheory}`}>
            <Link to="/#"><button className="p2">Cascaded PID</button></Link>
            <Link to="/#"><button className="p2">LQR</button></Link>
          </div>
        </div>
        <div className={`dropdown-exp ${dropdownexp}`}>
          <button className={`experiments ${experiments}`}>Experiments</button>
          <div className={`dropdown-content-experiments ${dropdowncontentexperiments}`}>
            <Link to="/Hover-Documentation"><button className="p2">2 DOF Hover</button></Link>
            <Link to="/simulation-ballbalance"><button className="p2">2 DOF Ball Balance</button></Link>
            <Link to="/simulation-servo"><button className="p2">Servo Base Unit</button></Link>
            <Link to="/simulation-pendulum"><button className="p2">Linear Inverted Pendulum</button></Link>
          </div>
        </div>
        <button className={`text-wrapper-10 ${contact}`}><Link to="/Contact-US"><p className="p">Contact us</p></Link></button>
        <button className={`text-wrapper-11 ${about}`}><Link to="/About-US"><p className="p">About us</p></Link></button>
        <button className={`reservation5 ${reservation}`}><Link to="/"><p className="p">Reservation</p></Link></button>
        <button className={`Signoutbtn ${signoutbtn}`} onClick={onclick}><p className="p">Sign Out</p></button>
      </div>
    </div>
  );
};
