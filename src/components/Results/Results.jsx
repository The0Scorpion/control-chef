import React from "react";
import "./style.css";

export const Results = ({
  className,
  steadyStateErrorPitch,
  overshootPitch,
  settlingTimePitch,
  steadyStateErrorRoll,
  overshootRoll,
  settlingTimeRoll
}) => {
  return (
    <div className={`Results ${className}`}>
      <div className="Rtitle">Results:</div>
      <div className="result-items">
        <div className="result-item">
          <span className="label">Steady State Error of Pitch angle:</span>
          <span className="value">{steadyStateErrorPitch}</span>
        </div>
        <div className="result-item">
          <span className="label">Overshoot of Pitch angle:</span>
          <span className="value">{overshootPitch}</span>
        </div>
        <div className="result-item">
          <span className="label">Settling Time of Pitch angle:</span>
          <span className="value">{settlingTimePitch}</span>
        </div>
        <div className="result-item">
          <span className="label">Steady State Error of Roll angle:</span>
          <span className="value">{steadyStateErrorRoll}</span>
        </div>
        <div className="result-item">
          <span className="label">Overshoot of Roll angle:</span>
          <span className="value">{overshootRoll}</span>
        </div>
        <div className="result-item">
          <span className="label">Settling Time of Roll angle:</span>
          <span className="value">{settlingTimeRoll}</span>
        </div>
      </div>
    </div>
  );
};
