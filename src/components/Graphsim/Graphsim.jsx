import React, { useEffect, useRef } from "react";
import Plotly from "plotly.js-dist-min"; // Import Plotly library
import "./style.css";

export const Graphsim = ({
  className,
  groupClassName,
  rectangleClassName,
  xPosClassName,
  rectangleClassNameOverride,
  yPosClassName,
  divClassName,
  divClassNameOverride,
  xVelClassName,
  rectangleClassName1,
  yVelClassName,
  groupClassName2,
  groupClassName4,
  divClassName1,
  SimulationPoints,
  Simulation,
}) => {
  // Define chartRefs object
  const chartRefs = {
    XPos: useRef(),
    XVel: useRef(),
    YPos: useRef(),
    YVel: useRef(),
  };

  useEffect(() => {
    // Call the main function to get XPos, YPos, XVel, and YVel values
    if (Simulation === 5) {
      for (const [key, ref] of Object.entries(chartRefs)) {
        if (SimulationPoints[key] && ref.current) {
          // Destroy existing chart if it exists
          const chartId = `chart-${key}`;
          Plotly.purge(chartId); // Destroy the chart instance
        }
      }
    }

    if (SimulationPoints) {
      // Create charts when data changes
      for (const [key, ref] of Object.entries(chartRefs)) {
        if (SimulationPoints[key] && ref.current) {
          // Destroy existing chart if it exists
          const chartId = `chart-${key}`;
          Plotly.purge(chartId); // Destroy the chart instance
        }
        if (SimulationPoints[key] && ref.current) {
          createGraph(ref.current, key, SimulationPoints[key]);
        }
      }
    }
    // Cleanup function
    return () => {
      for (const [key, ref] of Object.entries(chartRefs)) {
        if (ref.current) {
          Plotly.purge(ref.current.id);
        }
      }
    };
  }, [SimulationPoints]); // Run effect whenever SimulationPoints change

  // Function to create chart
  const createGraph = (element, label, data) => {
    Plotly.newPlot(element, [
      {
        x: data.map((_, index) => index),
        y: data,
        type: "scatter",
        mode: "lines",
        name: label,
        line: { color: "black" },
      },
    ], {
      title: label,
      xaxis: {
        title: "Index",
      },
      yaxis: {
        title: label,
      },
    });
  };

  return (
    <div className={`graphsim1 ${className}`}>
      <div className={`text-wrapper-14 ${divClassName1}`}>Graphs</div>
      <div className="graphs-wrap1">
        <div className={`group-1 ${groupClassName}`}>
          <div className={`x-pos ${xPosClassName}`}>Pitch Angle</div>
          <div ref={chartRefs.XPos} className={`rectangle1 ${rectangleClassName}`} id="chart-XPos"></div>
        </div>
        <div className={`group-2 ${groupClassName}`}>
          <div className={`x-vel1 ${xVelClassName}`}>Pitch Angular Velocity</div>
          <div ref={chartRefs.XVel} className={`rectangle2 ${rectangleClassName}`} id="chart-XVel"></div>
        </div>
      </div>
      <div class="graphs-wrap2">
        <div className={`group-3 ${groupClassName}`}>
          <div className={`y-pos ${yPosClassName}`}>Roll Angle</div>  
          <div ref={chartRefs.YPos} className={`rectangle3 ${rectangleClassName}`} id="chart-YPos"></div>
        </div>
        <div className={`group-4 ${groupClassName}`}>
          <div className={`y-vel ${yVelClassName}`}>Roll Angular Velocity</div>
          <div ref={chartRefs.YVel} className={`rectangle4 ${rectangleClassName}`} id="chart-YVel"></div>
        </div>
      </div>
    </div>
  );
};
