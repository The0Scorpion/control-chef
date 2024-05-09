import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto"; // Import Chart.js library
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

  // Define state to hold thetaX and thetaY values
  //const [thetaValues, setThetaValues] = useState({ XPos: [], YPos: [], XVel: [], YVel: [] });

  useEffect(() => {
    // Call the main function to get XPos, YPos, XVel, and YVel values
    if (Simulation === 5) {
      for (const [key, ref] of Object.entries(chartRefs)) {
        if (SimulationPoints[key] && ref.current) {
          // Destroy existing chart if it exists
          const canvasId = `chart-${key}`;
          const existingChart = Chart.getChart(canvasId);
          if (existingChart) {
            existingChart.destroy(); // Destroy the chart instance
          } 
        }
      }
    }
     
    if(SimulationPoints){
    // Create charts when data changes
    for (const [key, ref] of Object.entries(chartRefs)) {
      console.log("THETA:"+ SimulationPoints);
      if (SimulationPoints[key] && ref.current) {
        // Destroy existing chart if it exists
        const canvasId = `chart-${key}`;
        const existingChart = Chart.getChart(canvasId);
        if (existingChart) {
          existingChart.destroy(); // Destroy the chart instance
        }
      }  
      if (SimulationPoints[key] && ref.current) {
        try{
        createGraph(ref.current.getContext("2d"), key, SimulationPoints[key]);
        } catch(e){
          if (typeof Chart !== 'undefined' && Chart.helpers && Chart.helpers.each) {
            Chart.helpers.each(Chart.instances, function (instance) {
              instance.destroy();
            });
          }
        }
      }
    }
  }
    // Cleanup function
    return () => {
      // Destroy all existing charts if Chart.js is loaded
      if (typeof Chart !== 'undefined' && Chart.helpers && Chart.helpers.each) {
        Chart.helpers.each(Chart.instances, function (instance) {
          instance.destroy();
        });
      }
    };
  }, [SimulationPoints]); // Run effect whenever thetaValues change
  // Function to create chart
  const createGraph = (ctx, label, data) => {
    return new Chart(ctx, {
      type: "line",
      data: {
        labels: data.map((_, index) => index),
        datasets: [{
          label: label,
          borderColor: "black",
          borderWidth: 1,
          pointRadius: 0,
          data: data,
          fill: false,
        }],
      },
      options: {
        scales: {
          x: {
            type: "linear",
            position: "bottom",
          },
          y: {
            type: "linear",
            position: "left",
          },
        },
      },
    });
  };

  return (
    <div className={`graphsim ${className}`}>
      <div className={`group-22 ${groupClassName}`}>
        <canvas ref={chartRefs.XPos} className={`rectangle-5 ${rectangleClassName}`} id={`chart-XPos`}></canvas>
        <div className={`text-wrapper-12 ${xPosClassName}`}>X Pos</div>
      </div>
      <div className={`group-24 ${divClassName}`}>
        <canvas ref={chartRefs.XVel} className={`rectangle-6 ${divClassNameOverride}`} id={`chart-XVel`}></canvas>
        <div className={`x-vel ${xVelClassName}`}> X Vel</div>
      </div>
      <div className={`group-26 ${groupClassName2}`}>
        <canvas ref={chartRefs.YPos} className={`rectangle-5 ${rectangleClassNameOverride}`} id={`chart-YPos`}></canvas>
        <div className={`text-wrapper-12 ${yPosClassName}`}>Y Pos</div>
      </div>
      <div className={`group-28 ${groupClassName4}`}>
        <canvas ref={chartRefs.YVel} className={`rectangle-5 ${rectangleClassName1}`} id={`chart-YVel`}></canvas>
        <div className={`text-wrapper-12 ${yVelClassName}`}>Y Vel</div>
      </div>
      <div className={`text-wrapper-14 ${divClassName1}`}>Graphs</div>
    </div>
  );
};
