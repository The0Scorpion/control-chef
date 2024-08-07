import React, { useEffect, useRef, useState } from "react";
import Plotly from "plotly.js-dist-min";
import "./style.css";

export const Graphs = ({
  className,
  groupClassName,
  rectangleClassName,
  xPosClassName,
  yPosClassName,
  divClassName,
  xVelClassName,
  yVelClassName,
  groupClassName4,
  divClassName1,
  setj1,
  setj2,
  onXPosUpdate,
  onYPosUpdate,
  onXVelUpdate,
  onYVelUpdate,
  updateQueue1,
  setactive,
  setsaveData,
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
    const ws = new WebSocket('wss://w76kpcwds2.execute-api.eu-west-3.amazonaws.com/production');

    ws.addEventListener('open', () => {
      // console.log('WebSocket is connected, now check for your new Connection ID in Cloudwatch on AWS');
    });

    ws.addEventListener('message', (event) => {
      drawChart(event.data);
    });

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    if (idArr.length > 0) {
      const sortedData = sortDataById(idArr, xPosArr, yPosArr, xVelArr, yVelArr);

      const { sortedIds, sortedXPos, sortedYPos, sortedXVel, sortedYVel } = sortedData;

      updateChart(chartRefs.XPos.current, "XPos", sortedIds, sortedXPos);
      updateChart(chartRefs.YPos.current, "YPos", sortedIds, sortedYPos);
      updateChart(chartRefs.XVel.current, "XVel", sortedIds, sortedXVel);
      updateChart(chartRefs.YVel.current, "YVel", sortedIds, sortedYVel);

      onXPosUpdate(sortedXPos);
      onYPosUpdate(sortedYPos);
      onXVelUpdate(sortedXVel);
      onYVelUpdate(sortedYVel);
    }
  }, [idArr, xPosArr, yPosArr, xVelArr, yVelArr, onXPosUpdate, onYPosUpdate, onXVelUpdate, onYVelUpdate]);

  let isUpdating = false;

  const processQueue = () => {
    if (updateQueue1.length < 1) {
      isUpdating = false;
      return;
    }

    isUpdating = true;
    const data = updateQueue1.shift();

    const IoT_Payload = JSON.parse(data);
    if (Number(IoT_Payload.numPackets) > 0) {
      const startPacket = IoT_Payload.startPacket;
      const numPackets = IoT_Payload.numPackets;
      delete IoT_Payload.numPackets;
      delete IoT_Payload.startPacket;

      const packets = { ...IoT_Payload };
      const UpdateTime = 5;

      let delay = 0;

      for (const key in packets) {
        if (Number(key) == 0) {
          setIdArr([]);
          setXPosArr([]);
          setYPosArr([]);
          setXVelArr([]);
          setYVelArr([]);
        } else if (Number(key) == 2000) {
          setsaveData(1);
          return;
        }
        const packet = packets[key];
        const { id, xpos, ypos, xvel, yvel } = packet;

        setTimeout(() => {
          setj1(Number(xpos));
          setj2(Number(ypos));
          setIdArr((prevState) => [...prevState, Number(key)]);
          setXPosArr((prevState) => [...prevState, Number(xpos)]);
          setYPosArr((prevState) => [...prevState, Number(ypos)]);
          setXVelArr((prevState) => [...prevState, Number(xvel)]);
          setYVelArr((prevState) => [...prevState, Number(yvel)]);

          if (Number(key) == Number(numPackets) + Number(startPacket) - 1) {
            isUpdating = false;
            processQueue();
          }
        }, delay);

        delay += UpdateTime;
      }
    } else {
      processQueue();
    }
  };

  const drawChart = (data) => {
    updateQueue1.push(data);
    setactive(Date.now());
    if (!isUpdating) {
      processQueue();
    }
  };

  const sortDataById = (ids, xPos, yPos, xVel, yVel) => {
    const combined = ids.map((id, index) => ({
      id,
      xpos: xPos[index],
      ypos: yPos[index],
      xvel: xVel[index],
      yvel: yVel[index],
    }));

    combined.sort((a, b) => a.id - b.id);

    return {
      sortedIds: combined.map((item) => item.id),
      sortedXPos: combined.map((item) => item.xpos),
      sortedYPos: combined.map((item) => item.ypos),
      sortedXVel: combined.map((item) => item.xvel),
      sortedYVel: combined.map((item) => item.yvel),
    };
  };

  const createGraph = (element, label, labels, data) => {
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

  const updateChart = (element, label, sortedLabels, sortedValues) => {
    if (element.data) {
      Plotly.purge(element);
    }
    createGraph(element, label, sortedLabels, sortedValues);
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
          <div className={`x-vel1 ${xVelClassName}`}>Pitch Angular Velocity</div>
          <div ref={chartRefs.XVel} className={`rectangle2 ${rectangleClassName}`}></div>
        </div>
      </div>
      <div className="graphs-wrap2">
        <div className={`group-3 ${groupClassName}`}>
          <div className={`y-pos ${yPosClassName}`}>Roll Angle</div>
          <div ref={chartRefs.YPos} className={`rectangle3 ${rectangleClassName}`}></div>
        </div>
        <div className={`group-4 ${groupClassName}`}>
          <div className={`y-vel ${yVelClassName}`}>Roll Angular Velocity</div>
          <div ref={chartRefs.YVel} className={`rectangle4 ${rectangleClassName}`}></div>
        </div>
      </div>
    </div>
  );
};
