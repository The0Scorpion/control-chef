import React, { useState, useEffect } from "react";
import { useWindowWidth } from "../../breakpoints";
import { useLocation } from "react-router-dom";
import { Buttons } from "../../components/Buttons";
import { Footer } from "../../components/Footer";
import { Graphs } from "../../components/Graphs";
import { Results } from "../../components/Results";
import { NavBar } from "../../components/NavBar";
import { NavBar_2 } from "../../components/NavBar_2";
import { Parametersnew } from "../../components/Parametersnew";
import { Parameters } from "../../components/Parameters";
import { SimulationStreaming } from "../../components/SimulationStreaming";
import { Next } from "../../components/Next";
import { URDFViewer } from "../../components/URDFViewer";
import { Amplify } from "aws-amplify";

import { fetchAuthSession } from "@aws-amplify/auth"; // Import Auth from @
import awsConfig from "../../aws-export";
import { withAuthenticator, Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "./style.css";

// Configure AWS Amplify with your aws-exports.js configuration
Amplify.configure(awsConfig);

export const HoverRTcomponent = () => {
  const location = useLocation();
  const screenWidth = useWindowWidth();
  const [scrollToTop, setScrollToTop] = useState(false);
  const [parameterData, setParameterData] = useState(null);
  const [Work, setWork] = useState(0);
  const [JointAngle1, setJointAngle1] = useState(0);
  const [JointAngle2, setJointAngle2] = useState(0);
  const urdfUrl1 = '2dofhover/urdf/2dofhover.urdf';
  const [idToken, setidToken] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const [xPosArr, setXPosArr] = useState([]);
  const [yPosArr, setYPosArr] = useState([]);
  const [xVelArr, setXVelArr] = useState([]);
  const [yVelArr, setYVelArr] = useState([]);

  const [Xovershoot, setXovershoot] = useState(0);
  const [Yovershoot, setYovershoot] = useState(0);
  const [XError, setXError] = useState(0);
  const [YError, setYError] = useState(0);
  const [xtime, setXtime] = useState(0);
  const [ytime, setYtime] = useState(0);
  const [Authed, setAuthed] = useState(false);
  const [QueuePosition, setQueuePosition] = useState("");
  const calculateOvershoot = (simData, setp) => {
    const initialSign = Math.sign(simData[0] - setp);
    let indexOfFirstZeroCrossing = -1;
    let extremeValueAfterCrossing = null;

    for (let i = 1; i < simData.length; i++) {
      if (Math.sign(simData[i] - setp) !== initialSign) {
        indexOfFirstZeroCrossing = i;
        break;
      }
    }

    if (indexOfFirstZeroCrossing === -1) {
      return { overshoot: 0, indexOfFirstZeroCrossing };
    }

    const lookForMaxValue = initialSign === 1;

    for (let i = indexOfFirstZeroCrossing; i < simData.length; i++) {
      if (lookForMaxValue && (extremeValueAfterCrossing === null || simData[i] > extremeValueAfterCrossing)) {
        extremeValueAfterCrossing = simData[i] - setp;
      } else if (!lookForMaxValue && (extremeValueAfterCrossing === null || simData[i] < extremeValueAfterCrossing)) {
        extremeValueAfterCrossing = simData[i] - setp;
      }
    }

    return { overshoot: Math.abs(extremeValueAfterCrossing), indexOfFirstZeroCrossing };
  };

  const calculateVariance = (simData, setp) => {
    const initialSign = Math.sign(simData[0] - setp);
    let indexOfFirstSignFlip = -1;
    let dataAfterSignFlip = [];

    for (let i = 1; i < simData.length; i++) {
      if (Math.sign(simData[i] - setp) !== initialSign) {
        indexOfFirstSignFlip = i;
        dataAfterSignFlip = simData.slice(indexOfFirstSignFlip + 1);
        break;
      }
    }

    if (indexOfFirstSignFlip === -1) return 0;

    const mean = dataAfterSignFlip.reduce((acc, val) => acc + val, 0) / dataAfterSignFlip.length;
    const squaredDifferences = dataAfterSignFlip.map((val) => (val - mean) ** 2);
    const variance = squaredDifferences.reduce((acc, val) => acc + val, 0) / dataAfterSignFlip.length;

    return variance;
  };

  useEffect(() => {
    if (xPosArr.length > 0 && yPosArr.length > 0 && parameterData) {
      const XovershootResult = calculateOvershoot(xPosArr, parameterData.xposSet);
      const YovershootResult = calculateOvershoot(yPosArr, parameterData.yposSet);

      const newXError = Math.abs(parameterData.xposSet - xPosArr[xPosArr.length - 1]);
      const newYError = Math.abs(parameterData.yposSet - yPosArr[yPosArr.length - 1]);

      setXtime(XovershootResult.indexOfFirstZeroCrossing * 0.05);
      setYtime(YovershootResult.indexOfFirstZeroCrossing * 0.05);

      setXovershoot(XovershootResult.overshoot);
      setYovershoot(YovershootResult.overshoot);
      setXError(newXError);
      setYError(newYError);
    }
    const fetchSession = async () => {
      try {
        const session = await fetchAuthSession();
        const idTokenPayload = session.credentials.sessionToken;
        setidToken(idTokenPayload);
      } catch (err) {
        console.log("Error fetching session:", err);
      }
    };
    fetchSession();
  }, [parameterData, xPosArr, yPosArr]);


  

  const sendDataToLambda = () => {
    if (!parameterData) {
      console.error("No parameter data to send.");
      return;
    }

    fetch("https://rq0btgzijg.execute-api.eu-west-3.amazonaws.com/teststage", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}` // Use idToken in Authorization header
      },
      body: JSON.stringify(parameterData) // Stringify the parameterData object
    })
      .then(response => {
        if (response.ok) {
          console.log('Data sent to Lambda successfully');
          console.log("Parameter Data:", parameterData);
          console.log("ID Token:", idToken); // Log ID Token here
        } else {
          console.error('Failed to send data to Lambda');
        }
      })
      .catch(error => {
        console.error('Error sending data to Lambda:', error);
      });
  };

  const sendDataTostart = () => {
    setWork(1);
    fetch("https://rq0btgzijg.execute-api.eu-west-3.amazonaws.com/teststage", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}` // Use idToken in idToken header
      },
      body: JSON.stringify({ work: 1 }) // Example body
    })
      .then(response => {
        if (response.ok) {
          console.log('Data sent to Lambda successfully');
          console.log("Work:", 1);
        } else {
          console.error('Failed to send data to Lambda');
        }
      })
      .catch(error => {
        console.error('Error sending data to Lambda:', error);
      });
  };

  const sendDataTostop = () => {
    setWork(0);
    fetch("https://rq0btgzijg.execute-api.eu-west-3.amazonaws.com/teststage", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}` // Use idToken in idToken header
      },
      body: JSON.stringify({ work: 0 }) // Example body
    })
      .then(response => {
        if (response.ok) {
          console.log('Data sent to Lambda successfully');
          console.log("Work:", 0);
        } else {
          console.error('Failed to send data to Lambda');
        }
      })
      .catch(error => {
        console.error('Error sending data to Lambda:', error);
      });
  };

  const retrieveDataFromDynamoDB = async () => {
    try {
      const response = await fetch(
        'https://rq0btgzijg.execute-api.eu-west-3.amazonaws.com/teststage',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`, // Use idToken in Authorization header
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch data from DynamoDB');
      }

      const responseData = await response.json();

      // Assuming the response is an object containing the arrays as properties
      const { xPosArr: newXPosArr, yPosArr: newYPosArr, xVelArr: newXVelArr, yVelArr: newYVelArr } = responseData;

      setXPosArr(newXPosArr || []);
      setYPosArr(newYPosArr || []);
      setXVelArr(newXVelArr || []);
      setYVelArr(newYVelArr || []);
    } catch (error) {
      console.error('Error retrieving data from DynamoDB:', error);
    }
  };
  // Flag to track if the user has already been added to the queue
let userAddedToQueue = false;

const checkQueueStatus = async () => {
  const response = await sendQueueRequest('status', 'GET');
  if (response.ok) {
    const data = await response.json();
    const queueItems = data.queueItems;
    const currentTime = new Date();
    const twoMinutes = 2 * 60 * 1000; // 2 minutes in milliseconds

    // Remove users who have been inactive for over 2 minutes
    const activeUsers = queueItems.filter(item => {
      const lastActiveTime = new Date(item.lastActiveTime);
      return currentTime - lastActiveTime < twoMinutes;
    });

    // If no users remain, set auth to true
    if (activeUsers.length === 0) {
      setAuthed(true);
      setQueueStatus(true);
      userAddedToQueue = false; // Reset flag when no active users are present
    } else {
      // Only add user to queue once
      if (!userAddedToQueue) {
        joinQueue();
        userAddedToQueue = true; // Set flag to true once user is added to queue
      }
      
      setAuthed(false);
      setQueueStatus(false);
      const estimatedTime = 5 * activeUsers.length; // Approximate wait time
      setQueuePosition(`Estimated wait time: ${estimatedTime} minutes`);

      // Rerun the checkQueueStatus function every minute
      setTimeout(checkQueueStatus, 60 * 1000); // 1 minute in milliseconds
    }
  } else {
    console.error('Failed to retrieve queue status');
  }
};


  const joinQueue = async () => {
    const response = await sendQueueRequest('join', 'POST');
    if (response.ok) {
      setQueuePosition('You are in the queue');
      const id = setTimeout(() => {
        alert('Session timed out');
        leaveQueue();
      }, 300000); // 5 minutes
      setTimeoutId(id);
      startSessionTimeoutUpdate();
    }
  };

  const leaveQueue = async () => {
    clearTimeout(timeoutId);
    await sendQueueRequest('leave', 'DELETE');
    setQueuePosition(null);
  };

  const startSessionTimeoutUpdate = () => {
    const intervalId = setInterval(async () => {
      await sendQueueRequest('sessionTimeout', 'PATCH');
    }, 60000); // Update every minute
    return () => clearInterval(intervalId);
  };

  const sendQueueRequest = async (endpoint, method) => {
    return fetch(`https://cjedoxbspa.execute-api.eu-west-3.amazonaws.com/prod/queue/${endpoint}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        //'Authorization': idToken // Use idToken in Authorization header
      },
      body: method === 'GET' ? null : JSON.stringify({ userId: idToken }) // Sending userId for identification
    }).then(response => {
      if (response.ok) {
        console.log("ID Token:", idToken); // Log ID Token here
      } else {
        console.error('Failed to send data to Lambda');
      }
    })
    .catch(error => {
      console.error('Error sending data to Lambda:', error);
    });;
  };
  useEffect(() => {
    const scrollFunction = () => {
      if (window.scrollY > 20) {
        setScrollToTop(true);
      } else {
        setScrollToTop(false);
      }
    };

    window.addEventListener("scroll", scrollFunction);

    return () => {
      window.removeEventListener("scroll", scrollFunction);
    };
  }, []);

  const renderContent = () => {
    
      checkQueueStatus();
      if(Authed){
        return ( <Authenticator>
        {({ signOut, user }) => (
          <>
            <div className="hover"
              style={{
                width: { screenWidth }
              }}
            >
              {screenWidth >= 834 && screenWidth < 1300 && (
                <>
                  <NavBar_2
                    onclick={signOut}
                    className="nav-bar-tab" />
                  <SimulationStreaming
                    title="Real Time Operation"
                    className="simulation-streaming-instance"
                  />
                  <div className="input1300">
                    <Parametersnew
                      setParameterData={setParameterData}
                      className="parameters-instance"
                      rollgroup="rollgroup1"
                      pitchgroup="pitchgroup1"
                      plantgroup="plantimg1"
                      arrow3="arrow1"
                      arrow4="arrow1"
                    />
                    <Buttons
                      sendDataToLambda={sendDataToLambda}
                      sendDataTostart={sendDataTostart}
                      sendDataTostop={sendDataTostop}
                      parameterData={parameterData}
                      className="buttons-instance"
                      startClassName="button-start"
                      setClassName="button-start"
                      resetClassName="button-start"
                      stopClassName="button-start"
                    />
                  </div>
                  <URDFViewer
                    urdfUrl={urdfUrl1}
                    className="video-stream-instance1"
                    width="800"
                    height="500"
                    buttonWrap5="buttonUrdf"
                    joint1={JointAngle1}
                    joint2={JointAngle2}
                  />
                  <Graphs
                    className="graphs-instance"
                    setj1={setJointAngle1}
                    setj2={setJointAngle2}
                  />
                  <Next navigate="nav1"
                    next="next1"
                    linkTo2="/hover-simulation" />
                  <Footer
                    className="footer1"
                  />
                  <div style={{ height: 0 }}></div>
                </>
              )}
  
              {screenWidth >= 1300 && (
                <>
                  <NavBar
                    onclick={signOut}
                    className="navbardoc"
                  />
                  <SimulationStreaming
                    title="Real Time Operation"
                    className="simulation-streaming-2" />
                  <div className="inputpb">
                    <Parametersnew
                      setParameterData={setParameterData}
                      className="parameters-2" />
                    <Buttons
                      sendDataToLambda={sendDataToLambda}
                      sendDataTostart={sendDataTostart}
                      sendDataTostop={sendDataTostop}
                      parameterData={parameterData}
                      className="buttons-2" />
                  </div>
                  <URDFViewer
                    urdfUrl={urdfUrl1}
                    className="video-stream-instance"
                    width="1000"
                    height="600"
                    joint1={JointAngle1}
                    joint2={JointAngle2}
                  />
                  <Graphs className="graphs-17"
                    setj1={setJointAngle1}
                    setj2={setJointAngle2}
                    onXPosUpdate={setXPosArr}
                    onYPosUpdate={setYPosArr}
                    onXVelUpdate={setXVelArr}
                    onYVelUpdate={setYVelArr}
                  />
                  <Results
                    className="Results1300"
                    steadyStateErrorPitch={XError}
                    overshootPitch={Xovershoot}
                    settlingTimePitch={xtime}
                    steadyStateErrorRoll={YError}
                    overshootRoll={Yovershoot}
                    settlingTimeRoll={ytime}
                    />
                  <Next navigate="nav"
                    next="next"
                    linkTo2="/hover-simulation" />
                  <Footer className="footer-instance" />
                  <div style={{ height: 0 }}></div>
                </>
              )}
  
              {screenWidth < 834 && (
                <>
                  <NavBar_2
                    onclick={signOut}
                    className="nav-bar-tab-instance"
                    controlchef1="logo1-control"
                    navbardrop="nav-bar-drop"
                    dropdowncontentexperiments="drop-down-exp"
                    dropdowncontenttheories="drop-down-theory"
                    navbartext="nav-bar-text"
                  />
                  <SimulationStreaming
                    className="simulation-streaming-3"
                    title="Real Time Operation"
                    simulationStreamingClassName="titlesize"
                  />
                  <Parameters
                    setParameterData={setParameterData}
                    className="BlockDiagram5"
                  />
                  <Buttons
                    sendDataToLambda={sendDataToLambda}
                    sendDataTostart={sendDataTostart}
                    sendDataTostop={sendDataTostop}
                    parameterData={parameterData}
                    className="buttons-3"
                    resetClassName="ButtonSingle"
                    setClassName="ButtonSingle"
                    startClassName="ButtonSingle"
                    stopClassName="ButtonSingle"
                  />
                  <URDFViewer
                    urdfUrl={urdfUrl1}
                    className="video-stream-instance2"
                    buttonWrap5="buttonsURDF5"
                    urdfbutton="buttonsURDF6"
                    urdfbutton1="buttonsURDF7"
                    width="300"
                    height="200"
                    joint1={JointAngle1}
                    joint2={JointAngle2}
                  />
                  <Graphs
                    className="graphs-18"
                    divClassName1="titlegraph"
                    xPosClassName="singlegraphtitle"
                    yPosClassName="singlegraphtitle"
                    xVelClassName="singlegraphtitle"
                    yVelClassName="singlegraphtitle"
                    rectangleClassName="graphsize"
                    groupClassName="graphsize-warp"
                    setj1={setJointAngle1}
                    setj2={setJointAngle2}
                  />
                  <Next navigate="nav2"
                    next="next2"
                    back="back2"
                    linkTo2="/hover-simulation"
                  />
                  <Footer
                    className="footer5"
                    group="groupwrap"
                    group7="group7footer"
                    buttonf="buttonfooter"
                    textwrapper="textwrapperfooter"
                    textwrapper2="textwrapper2footer"
                    textwrapper3="textwrapper3footer"
                    textwrapper4="textwrapper4footer"
                    textwrapper5="textwrapper5footer"
                    group8="group8footer"
                    group9="group9footer"
                    group10="group10footer"
                    copyright="copyrightfooter"
                  />
                  <div style={{ height: 0 }}></div>
                </>
              )}
            </div>
          </>
        )}
      </Authenticator>
    );
      }else{
        //alert("Youe Are the $(???) In queue");
        return (
          <div>
            <p>{QueuePosition}</p>
            {/* Optionally, add a timer component here */}
          </div>
        );
      }
      
  };

  return renderContent();
};



export const HoverRT = withAuthenticator(HoverRTcomponent);