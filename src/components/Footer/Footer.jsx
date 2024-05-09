/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import "./style.css";
import {Link} from "react-router-dom";
import { number } from "prop-types";

export const Footer = ({ 
  className,
  group,
  group2,
  controlchefhigh,
  maskgroup,
  group7,
  textwrapper,
  textwrapper2,
  textwrapper3,
  textwrapper4,
  textwrapper5,
  group8,
  group9,
  group10,
  overlapwrapper,
  overlab2,
  rectangle,
  copyright,
  buttonf,
 }) => {
  return (
    <div className={`footer ${className}`}>
      <div className={`group ${group}`}>
        <div className={`group-2 ${group2}`}>
          <div className={`control-chef-high ${controlchefhigh}`}>
            <img
              className={`mask-group ${maskgroup}`}
              alt="Mask group"
              src="https://c.animaapp.com/zqIJEW6i/img/mask-group-19@2x.png"
            />
            <img
              className={`mask-group ${maskgroup}`}
              alt="Mask group"
              src="https://c.animaapp.com/zqIJEW6i/img/mask-group-20@2x.png"
            />
            <img
              className={`mask-group ${maskgroup}`}
              alt="Mask group"
              src="https://c.animaapp.com/zqIJEW6i/img/mask-group-21@2x.png"
            />
          </div>
          <div className={`group-7 ${group7}`}>
            <div className={`text-wrapper ${textwrapper}`}>Contact</div>
            <div className={`group-8 ${group8}`}>
              <div className={`text-wrapper-2 ${textwrapper2}`}><button className={`buttonf ${buttonf}`}><a href="https://mail.google.com/">Email</a></button></div>
              <div className={`text-wrapper-3 ${textwrapper3}`}><button className={`buttonf ${buttonf}`}><a href="https://www.linkedin.com/">Linkedin</a></button></div>
              <div className={`text-wrapper-4 ${textwrapper4}`}><button className={`buttonf ${buttonf}`}><a href="https://www.instagram.com/">Instgram</a></button></div>
              <div className={`text-wrapper-5 ${textwrapper5}`}><button className={`buttonf ${buttonf}`}><a href="https://www.facebook.com/">Facebook</a></button></div>
            </div>
          </div>
          <div className={`group-9 ${group9}`}>
            <div className={`text-wrapper ${textwrapper}`}>Control Chef</div>
            <div className={`group-10 ${group10}`}>
              <div className={`text-wrapper-2 ${textwrapper2}`}><Link to="/"><button className={`buttonf ${buttonf}`}>Home</button></Link></div>
              <div className={`text-wrapper-3 ${textwrapper3}`}><Link to="/#"><button className={`buttonf ${buttonf}`}>About Us</button></Link></div>
            </div>
          </div>
        </div>
      </div>
      <div className={`overlap-wrapper ${overlapwrapper}`}>
        <div className={`overlap-2 ${overlab2}`}>
          <div className={`rectangle ${rectangle}`} />
          <p className={`copyright ${copyright}`}>Copyright @ { new Date().getFullYear() } Control Chef - All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
};
