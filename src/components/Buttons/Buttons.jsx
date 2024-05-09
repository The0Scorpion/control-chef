/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import "./style.css";

export const Buttons = ({
  className,
  stopClassName,
  startClassName,
  setClassName,
  resetClassName,
  sendDataToLambda,
  sendDataTostart,
  sendDataTostop,
}) => {

  return (
    <div className={`buttons ${className}`}>
      <button className={`stop ${stopClassName}`} onClick={sendDataTostop} >Stop</button>
      <button className={`start ${startClassName}`} onClick={sendDataTostart}>Start</button>
      <button className={`set ${setClassName}`} onClick={sendDataToLambda}>Set</button>
      <button className={`reset ${resetClassName}`}>Reset</button>
    </div>
  );
};
