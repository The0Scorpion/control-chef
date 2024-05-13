import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import "./style.css";

export const Graphs = ({
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
}) => {
  const chartRefs = {
    XPos: useRef(null),
    YPos: useRef(null),
    XVel: useRef(null),
    YVel: useRef(null),
  };

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // Define the API Gateway endpoint
  const apiGatewayUrl = 'https://vxg0tzfd94.execute-api.eu-west-3.amazonaws.com/test/Getdata';
  
  useEffect(() => {
    fetch(apiGatewayUrl, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Headers": "Content-Type", // Allow specific headers
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const Stream=response.body;
        console.log(Stream);
        const reader=Stream.getReader();
        let result = '';
        /*while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          // Convert the value (Uint8Array) to a string
          result += new TextDecoder().decode(value);
        }*/

        // Parse the result as JSON
        const jsonData = JSON.parse(result);

        // Update state with the data
        setData(jsonData);
        setLoading(false);
        
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const createGraph = (ctx, label, data) => {
      console.log("Creating chart for", label);
      return new Chart(ctx, {
        type: "line",
        data: {
          labels: data.map((item, index) => index),
          datasets: [{
            label: label,
            borderColor: "black",
            borderWidth: 1,
            pointRadius: 0,
            data: data.map((item) => item[label.toLowerCase()]),
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

    if (data) {
      console.log("Data available, creating charts...");
      console.log(data);
      for (const [key, ref] of Object.entries(chartRefs)) {
        if (data[key] && ref.current) {
          createGraph(ref.current.getContext("2d"), key, data[key]);
        }
      }
    }
  }, [data]);

  return (
    <div className={`graphsim ${className}`}>
      <div className={`group-22 ${groupClassName}`}>
        <canvas ref={chartRefs.XPos} className={`rectangle-5 ${rectangleClassName}`}></canvas>
        <div className={`text-wrapper-12 ${xPosClassName}`}>X Pos</div>
      </div>
      <div className={`group-24 ${divClassName}`}>
        <canvas ref={chartRefs.XVel} className={`rectangle-6 ${divClassNameOverride}`}></canvas>
        <div className={`x-vel ${xVelClassName}`}> X Vel</div>
      </div>
      <div className={`group-26 ${groupClassName2}`}>
        <canvas ref={chartRefs.YPos} className={`rectangle-5 ${rectangleClassNameOverride}`}></canvas>
        <div className={`text-wrapper-12 ${yPosClassName}`}>Y Pos</div>
      </div>
      <div className={`group-28 ${groupClassName4}`}>
        <canvas ref={chartRefs.YVel} className={`rectangle-5 ${rectangleClassName1}`}></canvas>
        <div className={`text-wrapper-12 ${yVelClassName}`}>Y Vel</div>
      </div>
      <div className={`text-wrapper-14 ${divClassName1}`}>Graphs</div>
    </div>
  );
};
