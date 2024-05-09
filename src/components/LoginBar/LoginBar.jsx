/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import "./style.css";
import { Link } from "react-router-dom"

export const LoginBar = ({
  className,
  logInClassName,
  usernameEmailComClassName,
  passwordClassName,
  overlapGroupClassName,
  createClassNameOverride,

}) => {
  return (
    <div className={`login-bar ${className}`}>
      <div className={`log-in ${logInClassName}`}>Log In</div>
      <input type="email" placeholder="username@email.com" className={`username-email-com ${usernameEmailComClassName}`} />
      <input type="password" placeholder="Password" className={`password ${passwordClassName}`} />
      <input type="button" value="Log In" className={`log-in-wrapper ${overlapGroupClassName}`} />
      <Link to="/registration"><button className={`text-create-wrapper ${createClassNameOverride}`}>Create New Accout</button></Link>
    </div>
  );
};
