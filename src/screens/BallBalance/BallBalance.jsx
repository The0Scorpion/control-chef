import React from "react";
import { useWindowWidth } from "../../breakpoints";

import {Link} from "react-router-dom"
import "./style.css";

export const BallBalance = () => {
  const screenWidth = useWindowWidth();


  return (
    <>
    <div>BallBalance</div>
    <button><Link to="/">homepage</Link></button>
    </>
  );
};
