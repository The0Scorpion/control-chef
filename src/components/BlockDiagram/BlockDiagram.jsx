/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import "./style.css";

export const BlockDiagram = ({ 
  className,
  imgblockdiagram
 }) => {
  return (
    <div className={`block-diagram ${className}`}>
      <img className={`img ${imgblockdiagram}`} src= "https://c.animaapp.com/QXwh4ZEY/img/block-diagram-1.svg"/>
    </div>
  );
};
