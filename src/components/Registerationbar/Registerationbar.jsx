/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import { Form, Link } from "react-router-dom";
import { useState } from "react";
import "./style.css";



export const Registerationbar = ({
  className,
  overlapClassName,
  registrationClassName,
  overlapClassNameOverride,
  passwordClassName,
  universityClassName,
  collegeClassName,
  countryClassName,
  birthdayClassName,
  lastNameClassName,
  confirmPasswordClassName,
  usernameEmailComClassName,
  loginButtonClassName,
  signInClassName,
  alreadyHaveAnClassName,
  firstname,
  lastname,
  password,
  college,
  country,
  confirmpassword,
  university,
  username,
  birthday,
}) => {
  return (
    <div className={`registerationbar ${className}`}>
      
        <div className={`registration ${registrationClassName}`}>Registration</div>
        <p className={`firstname ${firstname}`}>First Name:</p>
        <input type="text" value="First Name" onChange={(e) => setFirstName(e.target.value)} className={`overlap-group ${overlapClassNameOverride}`} />
        <p className={`password1 ${password}`}>Password:</p>
        <input type="password" placeholder="Password" className={`div ${passwordClassName}`} />
        <p className={`university1 ${university}`}>University:</p>
        <input type="text" placeholder="University" className={`overlap-2 ${universityClassName}`} />
        <p className={`college1 ${college}`}>College:</p>
        <input type="text" placeholder="college" className={`overlap-3 ${collegeClassName}`} />
        <p className={`countryclass ${country}`}>Country:</p>
        <input type="text" placeholder="country" className={`overlap-4 ${countryClassName}`} />
        <p className={`birthdayclass ${birthday}`}>Birthday:</p>
        <input type="date" value="birthday" className={`overlap-5 ${birthdayClassName}`} />
        <p className={`lastname1 ${lastname}`}>Last Name:</p>
        <input type="text" placeholder="Last Name" className={`overlap-6 ${lastNameClassName}`} />
        <p className={`confirmpassword1 ${confirmpassword}`}>Confirm Password:</p>
        <input type="password" placeholder="Confirm Password" className={`overlap-7 ${confirmPasswordClassName}`} />
        <p className={`username ${username}`}>Email:</p>
        <input type="email" placeholder="username@email.com" className={`overlap-8 ${usernameEmailComClassName}`} />
        <Link to="/log-in"><input type="submit" value="Sign Up" onclick={(event) => alert("signed up successfully".event)} className={`login-button ${loginButtonClassName}`} /></Link>
        <p className={`already-have-an ${alreadyHaveAnClassName}`}>Already Have An Account ?</p>
        <Link to="/log-in"><input type="button" value="Sign In" className={`overlap-wrapper ${signInClassName}`} /></Link>

      
    </div>
  );
};
