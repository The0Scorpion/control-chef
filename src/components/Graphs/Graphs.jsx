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
  setj1,
  setj2,
}) => {
  const chartRefs = {
    XPos: useRef(null),
    YPos: useRef(null),
    XVel: useRef(null),
    YVel: useRef(null),
  };

  const [idArr, setIdArr] = useState([]);
  const [xPosArr, setXPosArr] = useState([]);
  const [yPosArr, setYPosArr] = useState([]);
  const [xVelArr, setXVelArr] = useState([]);
  const [yVelArr, setYVelArr] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Initialize WebSocket connection
    const ws = new WebSocket('wss://w76kpcwds2.execute-api.eu-west-3.amazonaws.com/production');

    ws.addEventListener('open', event => {
      console.log('WebSocket is connected, now check for your new Connection ID in Cloudwatch on AWS');
    });

    ws.addEventListener('message', event => {
      console.log('Your iot payload is:', event.data);
      drawChart(event.data);
    });

    // Set the WebSocket object in state
    setSocket(ws);

  }, []);

  useEffect(() => {
    if (idArr.length > 0) {
      updateChart(chartRefs.XPos.current, "XPos", idArr, xPosArr);
      updateChart(chartRefs.YPos.current, "YPos", idArr, yPosArr);
      updateChart(chartRefs.XVel.current, "XVel", idArr, xVelArr);
      updateChart(chartRefs.YVel.current, "YVel", idArr, yVelArr);
    }
  }, [idArr, xPosArr, yPosArr, xVelArr, yVelArr]);

  const drawChart = (data) => {
    const IoT_Payload = JSON.parse(data);
    console.log("our json object", IoT_Payload);

    const { ID, xpos, ypos, xvel, yvel } = IoT_Payload;
    if (ID == 0) {
      setIdArr([]);
      setXPosArr([]);
      setYPosArr([]);
      setXVelArr([]);
      setYVelArr([]);
    }
    console.log(xpos);
    setj1(xpos);
    setj2(ypos);
    setIdArr(prevState => [...prevState, Number(ID)]);
    setXPosArr(prevState => [...prevState, Number(xpos)]);
    setYPosArr(prevState => [...prevState, Number(ypos)]);
    setXVelArr(prevState => [...prevState, Number(xvel)]);
    setYVelArr(prevState => [...prevState, Number(yvel)]);
  };

  const createGraph = (ctx, label, labels, data) => {
    console.log("Creating chart for", label);
    return new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
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
            type: "category", // Change to category type for string labels
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

  const updateChart = (ctx, label, labels, data) => {
    if (!ctx.chart) {
      ctx.chart = createGraph(ctx, label, labels, data);
    } else {
      ctx.chart.data.labels = labels;
      ctx.chart.data.datasets[0].data = data;
      ctx.chart.update();
    }
  };

  return (
    <div className={`graphsim ${className}`}>
      <div className={`group-22 ${groupClassName}`}>
        <canvas ref={chartRefs.XPos} className={`rectangle-5 ${rectangleClassName}`}></canvas>
        <div className={`text-wrapper-12 ${xPosClassName}`}>X Pos</div>
      </div>
      <div className={`group-24 ${divClassName}`}>
        <canvas ref={chartRefs.XVel} className={`rectangle-5 ${divClassNameOverride}`}></canvas>
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
