import React from "react";
import "./style.css";

export const SimulationStreaming = ({ 
  className, 
  title,
  simulationStreamingClassName
 }) => {
  return (
    <div className={`simulation-streaming ${className}`}>
      <div className={`text-wrapper-8 ${simulationStreamingClassName}`}>{title}</div>
    </div>
  );
};
