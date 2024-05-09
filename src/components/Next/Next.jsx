/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import "./style.css";
import { Link } from "react-router-dom";

export const Next = ({
  navigate,
  next,
  back,
  linkTo1,
  linkTo2
}) => {
  return (
    <div className={`navigate ${navigate}`}>
      <button className={`back ${back}`}><Link to={linkTo2}>Back</Link></button>
      <button className={`next ${next}`}><Link to={linkTo1}>Next</Link></button>
    </div>
  );
};
