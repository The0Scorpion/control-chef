import React, { useEffect, useRef, useState } from "react";
import Plotly from "plotly.js-dist-min";
import "./style.css";
import { number } from "prop-types";

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
  updateQueue1
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
  const [idArr1, setIdArr1] = useState([]);
  const [xPosArr1, setXPosArr1] = useState([]);
  const [yPosArr1, setYPosArr1] = useState([]);
  const [xVelArr1, setXVelArr1] = useState([]);
  const [yVelArr1, setYVelArr1] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Initialize WebSocket connection
    const ws = new WebSocket('wss://w76kpcwds2.execute-api.eu-west-3.amazonaws.com/production');

    ws.addEventListener('open', event => {
      console.log('WebSocket is connected, now check for your new Connection ID in Cloudwatch on AWS');
    });

    ws.addEventListener('message', event => {
      //console.log('Your IoT payload is:', event.data);
      drawChart(event.data);
    });

    // Set the WebSocket object in state
    setSocket(ws);

    // Clean up on component unmount
    return () => {
      ws.close();
    };
  }, []);
  const sortDataById = (labels, data) => {
    const sortedData = labels.map((id, index) => ({
      id,
      value: data[index],
    })).sort((a, b) => a.id - b.id);

    const sortedLabels = sortedData.map(item => item.id);
    const sortedValues = sortedData.map(item => item.value);

    return { sortedLabels, sortedValues };
  };
  useEffect(() => {
    if (idArr.length > 0) {


      // Update charts
      updateChart(chartRefs.XPos.current, "XPos", idArr, xPosArr);
      updateChart(chartRefs.YPos.current, "YPos", idArr, yPosArr);
      updateChart(chartRefs.XVel.current, "XVel", idArr, xVelArr);
      updateChart(chartRefs.YVel.current, "YVel", idArr, xVelArr);

      // Send updated arrays to parent component via props functions
      onXPosUpdate(xPosArr);
      onYPosUpdate(yPosArr);
      onXVelUpdate(xVelArr);
      onYVelUpdate(yVelArr);
    }
  }, [idArr, xPosArr, yPosArr, xVelArr, yVelArr, onXPosUpdate, onYPosUpdate, onXVelUpdate, onYVelUpdate]);

 
  let isUpdating = false;

  const processQueue = () => {
    console.log(`Number of messgaes left: ${updateQueue1.length}`);
    if (updateQueue1.length < 1) {
      console.log(`no Queue left`);
      isUpdating = false;
      return;
    }


    isUpdating = true;
    const data = updateQueue1.shift(); //0,1,2>>1,2

    const IoT_Payload = JSON.parse(data);
    console.log("processing: ", IoT_Payload);
    if(Number(IoT_Payload.numPackets)>0){
    
    const startPacket = IoT_Payload.startPacket;
    const numPackets = IoT_Payload.numPackets;
    delete IoT_Payload.numPackets;
    delete IoT_Payload.startPacket;
    
    // Extract the remaining properties as packets
    const packets = { ...IoT_Payload };
    console.log("JSON object", packets);
    const UpdateTime=5;
    console.log(`Number of packets: ${numPackets}, Starting packet: ${startPacket}`);

    let delay = 0;
    
    for (const key in packets) {
      if(Number(key)==0){
        setIdArr([]);
          setXPosArr([]);
          setYPosArr([]);
          setXVelArr([]);
          setYVelArr([]);
      }
        const packet = packets[key];
        const { id, xpos, ypos, xvel, yvel } = packet;
        
        // Set a timeout for each packet's state update
        setTimeout(() => {
          //console.log("ID: ", key);
          //console.log("delay: ",  Number(numPackets)+Number(startPacket)-1);
          setj1(Number(xpos));
          setj2(Number(ypos));
          //console.log(key);
          setIdArr(prevState => [...prevState, Number(key)]);
          setXPosArr(prevState => [...prevState, Number(xpos)]);
          setYPosArr(prevState => [...prevState, Number(ypos)]);
          setXVelArr(prevState => [...prevState, Number(xvel)]);
          setYVelArr(prevState => [...prevState, Number(yvel)]);

          if (Number(key) == Number(numPackets)+Number(startPacket)-1) {
            console.log("Finished");
            isUpdating=false;
            processQueue();
          }
        }, delay);

        // Increase the delay for the next packet
        delay += UpdateTime; // 5ms delay between each update
    }}else{
      console.log("Skipping Heartbeat");
      processQueue();
    }
  };

  const drawChart = (data) => {
    updateQueue1.push(data); //{num:n,start:,[x,y,xdot,ydot]}
    //console.log("Pushed message to queue");
    if(!isUpdating){
      processQueue();
    }
    

  };


  const createGraph = (element, label, labels, data) => {
    //console.log("Creating chart for", label);
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
      // Destroy the existing plot
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
