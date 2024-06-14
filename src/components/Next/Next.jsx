import React from "react";
import "./style.css";
import { Link } from "react-router-dom";

export const Next = ({
  navigate,
  next,
  back,
  linkTo1,
  linkTo2,
  disable
}) => {
  return (
    <div className={`navigate ${navigate}`} >
      <button className={`back ${back}`} ><Link to={linkTo2}>Back</Link></button>
      <button className={`next ${next}`} disabled={disable} style={{ display: disable ? 'none' : 'block' }}><Link to={linkTo1}>Next</Link></button>
    </div>
  );
};
