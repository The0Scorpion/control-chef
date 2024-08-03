import React, { useEffect } from "react";
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
  resentDataToZeros,
  isOnline,
  trials
}) => {
  useEffect(() => {
    // Perform any side effects based on the isOnline prop
    // Example side effect: Log a message or perform an action
    if (!isOnline) {
      //console.log("Hardware is offline. Buttons are disabled.");
    }
    // You can also add additional effects if needed
  }, [isOnline]); // Dependency array: only re-run the effect if isOnline changes

  return (
    <div className={`buttons5 ${className}`}>
      <div className={`status ${isOnline ? 'online' : 'offline'}`}>
        {isOnline ? "Hardware Is Online" : "Hardware Is Offline"}
        <span className={`status-dot ${isOnline ? 'green-dot' : 'red-dot'}`}></span>
      </div>
      <div className="trials-info">Remaining Runs: {trials}</div>
      <button
        className={`start ${startClassName}`}
        onClick={sendDataTostart}
        disabled={!isOnline} // Disable if not online
      >
        Start
      </button>
      <button
        className={`stop ${stopClassName}`}
        onClick={sendDataTostop}
        disabled={!isOnline} // Disable if not online
      >
        Stop
      </button>
      <button
        className={`set ${setClassName}`}
        onClick={sendDataToLambda}
        disabled={!isOnline} // Disable if not online
      >
        Set
      </button>
      <button
        className={`reset ${resetClassName}`}
        onClick={resentDataToZeros}
        disabled={!isOnline} // Disable if not online
      >
        Reset
      </button>
    </div>
  );
};
