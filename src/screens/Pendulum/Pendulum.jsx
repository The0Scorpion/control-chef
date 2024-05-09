import React from "react";
import { useWindowWidth } from "../../breakpoints";

import {Link} from "react-router-dom"
import "./style.css";

export const Pendulum = () => {
  const screenWidth = useWindowWidth();


  return (
    <>
    <div>Pendulum</div>
    <button><Link to="/">homepage</Link></button>
   
    </>
  );
};
