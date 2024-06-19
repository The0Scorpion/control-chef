import React, { useEffect, useRef, useState } from "react";
import Plotly from "plotly.js-dist-min";
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

    // Clean up on component unmount
    return () => {
      ws.close();
    };
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
    if (ID == 1) {
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

  const createGraph = (element, label, labels, data) => {
    console.log("Creating chart for", label);
    const trace = {
      x: labels,
      y: data,
      type: 'scatter',
      mode: 'lines',
      name: label,
    };

    const layout = {
      title: label,
      xaxis: {
        title: 'ID',
      },
      yaxis: {
        title: label,
      },
    };

    Plotly.newPlot(element, [trace], layout);
  };

  const updateChart = (element, label, labels, data) => {
    if (element.data) {
      Plotly.update(element, {
        x: [labels],
        y: [data],
      });
    } else {
      createGraph(element, label, labels, data);
    }
  };

  return (
    <div className={`graphsim ${className}`}>
      <div className={`text-wrapper-14 ${divClassName1}`}>Graphs</div>
      <div className="graphs-wrap1">
        <div className={`group-1 ${groupClassName}`}>
          <div className={`x-pos ${xPosClassName}`}>Pitch Angle</div>
          <div ref={chartRefs.XPos} className={`rectangle1 ${rectangleClassName}`}></div>
        </div>
        <div className={`group-2 ${groupClassName}`}>
          <div className={`x-vel1 ${xVelClassName}`}> Pitch Angular Velocity</div>
          <div ref={chartRefs.XVel} className={`rectangle2 ${rectangleClassName}`}></div>
        </div>
      </div>
      <div class="graphs-wrap2">
        <div className={`group-3 ${groupClassName}`}>
          <div className={`y-pos ${yPosClassName}`}>Roll Angle</div>
          <div ref={chartRefs.YPos} className={`rectangle3 ${rectangleClassName}`}></div>
        </div>
        <div className={`group-4 ${groupClassName4}`}>
          <div className={`y-vel ${yVelClassName}`}>Roll Angular Velocity</div>
          <div ref={chartRefs.YVel} className={`rectangle4 ${rectangleClassName}`}></div>
        </div>
      </div>
    </div>
  );
};
