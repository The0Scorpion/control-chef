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
  resentDataToZeros
}) => {
  return (
    <div className={`buttons5 ${className}`}>
      <button className={`start ${startClassName}`} onClick={sendDataTostart}>Start</button>
      <button className={`stop ${stopClassName}`} onClick={sendDataTostop}>Stop</button>
      <button className={`set ${setClassName}`} onClick={sendDataToLambda}>Set</button>
      <button className={`reset ${resetClassName}`} onClick={resentDataToZeros}>Reset</button>
    </div>
  );
};
