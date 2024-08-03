import React, { useState, useEffect, useRef } from "react";

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
  const [parameterData, setParameterData] = useState(null);
  const [JointAngle1, setJointAngle1] = useState(0);
  const [JointAngle2, setJointAngle2] = useState(0);
  const urdfUrl1 = '2dofhover/urdf/2dofhover.urdf';
  const [xPosArr, setXPosArr] = useState([]);
  const [yPosArr, setYPosArr] = useState([]);
  const [xVelArr, setXVelArr] = useState([]);
  const [yVelArr, setYVelArr] = useState([]);
  const [updateQueue, setUpdateQueue] = useState([]);
  const [xOvershoot, setXovershoot] = useState(0);
  const [yOvershoot, setYovershoot] = useState(0);
  const [xError, setXError] = useState(0);
  const [yError, setYError] = useState(0);
  const [xTime, setXtime] = useState(0);
  const [yTime, setYtime] = useState(0);
  const [xRiseTime, setXRiseTime] = useState(0);
  const [yRiseTime, setYRiseTime] = useState(0);
  const [xSettlingTime, setXSettlingTime] = useState(0);
  const [ySettlingTime, setYSettlingTime] = useState(0);
  const [Authed, setAuthed] = useState(false);
  const [QueuePosition, setQueuePosition] = useState("");
  const [ActiveTime, setActiveTime] = useState(Date.now() - 20000);
  const [ConnectionStatus, setConnectionStatus] = useState(1);
  const [IsUserActive, setIsUserActive] = useState(1);
  const [SaveData, setSaveData] = useState(0);
  const [AllowedTrials, setAllowedTrials]=useState(0);
  const userActivitytimeoutRef = useRef(null);
  const warningTimeoutRef = useRef(null);
  const warningTime = 10000; // 60 seconds for warning //Edit
  const inactivityTime = 600000; // 60 seconds to be considered inactive //edit
  const SessionTime = 120000;
  
  var idTokenPayload = "";
  first = true;

  //Metrics Functions
  // Function to calculate overshoot
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
  const calculateRiseTime = (simData, setp) => {
    const thresholdLow = setp * 0.1;
    const thresholdHigh = setp * 0.9;
    let startIndex = -1;
    let endIndex = -1;

    for (let i = 0; i < simData.length; i++) {
      if (startIndex === -1 && simData[i] >= thresholdLow) {
        startIndex = i;
      }
      if (simData[i] >= thresholdHigh) {
        endIndex = i;
        break;
      }
    }

    return (endIndex - startIndex) * 0.005; // Assuming time step of 0.005
  };

  const calculateSettlingTime = (simData, setp) => {
    const tolerance = setp * 0.02;
    let settlingIndex = -1;

    for (let i = simData.length - 1; i >= 0; i--) {
      if (Math.abs(simData[i] - setp) > tolerance) {
        settlingIndex = i;
        break;
      }
    }

    return (settlingIndex + 1) * 0.005; // Assuming time step of 0.005
  };


  useEffect(() => {
    if (xPosArr.length > 0 && yPosArr.length > 0 && parameterData != null) {
      const XovershootResult = calculateOvershoot(xPosArr, parameterData.xposSet);
      const YovershootResult = calculateOvershoot(yPosArr, parameterData.yposSet);
      const newXError = Math.abs(parameterData.xposSet - xPosArr[xPosArr.length - 1]);
      const newYError = Math.abs(parameterData.yposSet - yPosArr[yPosArr.length - 1]);
      setXtime(XovershootResult.indexOfFirstZeroCrossing * 0.005);
      setYtime(YovershootResult.indexOfFirstZeroCrossing * 0.005);
      const xRiseTime = calculateRiseTime(xPosArr, parameterData.xposSet);
      const yRiseTime = calculateRiseTime(yPosArr, parameterData.yposSet);
      const xSettlingTime = calculateSettlingTime(xPosArr, parameterData.xposSet);
      const ySettlingTime = calculateSettlingTime(yPosArr, parameterData.yposSet);
      setXovershoot(XovershootResult.overshoot);
      setYovershoot(YovershootResult.overshoot);
      setXError(newXError);
      setYError(newYError);
      setXRiseTime(xRiseTime);
      setYRiseTime(yRiseTime);
      setXSettlingTime(xSettlingTime);
      setYSettlingTime(ySettlingTime);
    }
  }, [xPosArr, yPosArr]);

  const sendDataToLambda = async () => {
    if(await checkQueueStatus()==0){
      return;
    }
    const session = await fetchAuthSession();
    idTokenPayload = session.tokens.signInDetails.loginId;
    //console.log("USER:", idTokenPayload);
    if (!parameterData) {
      console.error("No parameter data to send.");
      return;
    }
    const dataToSend = {
      ...parameterData,
      userId: idTokenPayload // Add userId1 to the parameterData object
    };
    fetch("https://rq0btgzijg.execute-api.eu-west-3.amazonaws.com/teststage", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend) // Stringify the combined object
    })
      .then(response => {
        if (response.ok) {
          console.log('Data sent to Lambda successfully');
          //console.log("Parameter Data:", dataToSend);
        } else {
          console.error('Failed to send data to Lambda');
        }
      })
      .catch(error => {
        console.error('Error sending data to Lambda:', error);
      });
  };

  const resetUserActivity = () => {


    // Function to handle user response
    const handleUserResponse = (response) => {
      if (response === true) {
        setActive(); // User responded "Yes", set active
      } else {
        // User did not respond or responded "No", handle inactivity
        alert("You have been kicked for inactivity");
        sendQueueRequest('leave', 'DELETE');
        setQueuePosition(null);
        setIsUserActive(0); // Set user activity status to inactive
        window.location.href = "/";// Redirect to home page
      }
    };

    // Show warning dialog
    const showWarningDialog = () => {
      const userResponse = window.confirm("Are you still there?");
      handleUserResponse(userResponse);
    };

    // Clear previous timeouts
    if (userActivitytimeoutRef.current) {
      clearTimeout(userActivitytimeoutRef.current);
    }
    if (warningTimeoutRef.current) {
      clearTimeout(warningTimeoutRef.current);
    }

    // Set warning dialog timeout
    warningTimeoutRef.current = setTimeout(showWarningDialog, warningTime);

    // Set inactivity timeout
    userActivitytimeoutRef.current = setTimeout(() => {
      // If no user response after warning, handle inactivity
      handleUserResponse(false);
    }, inactivityTime);
  };
  const setActive = () => {
    setIsUserActive(1); // Set user activity status to active
    // Clear any existing timeout
    if (userActivitytimeoutRef.current) {
      clearTimeout(userActivitytimeoutRef.current);
    }

    // Set a new timeout to reset user activity after 60 seconds
    userActivitytimeoutRef.current = setTimeout(resetUserActivity, inactivityTime);
  };

  // Effect to handle cleanup on unmount
  useEffect(() => {
    return () => {
      if (userActivitytimeoutRef.current) {
        clearTimeout(userActivitytimeoutRef.current);
      }
    };
  }, []);


  const checkQueueStatus = async () => {
    if (!first) {
      return;
    }
    first = false;

    try {
      const session = await fetchAuthSession();
      idTokenPayload = session.tokens.signInDetails.loginId;
      //console.log("USER:", idTokenPayload);
      //console.log("ID Token set:", idTokenPayload); // This confirms if the token is set correctly

    } catch (err) {
      console.log("Error fetching session:", err);
      return;
    }

    try {
      const response = await sendQueueRequest('status', 'POST');
      const data = await response.json();
      const body = JSON.parse(data.body);
      //console.log(data.statusCode);
      if (response.status === 200) {
        if (data.statusCode === 200) {
          // User's turn is up
          setAuthed(true);
          setQueuePosition("User's turn is up.");
          setAllowedTrials(body.trials_remaining);
          setTimeout(leaveQueue, SessionTime);
          return 1;
        } else if (data.statusCode === 201) {
          // User is already in the queue
          //console.log(data);
          if (body.queuePosition) {
            setAuthed(false);
            setQueuePosition(`You are number ${body.queuePosition} in the queue.`);
            setTimeout(checkQueueStatus, 60 * 1000); // 1 minute in milliseconds
            return 0;
          } else {
            // User is allowed but not in the queue
            setAuthed(false);
            setQueuePosition("You are not currently in the queue.");
            first = true;
            setTimeout(checkQueueStatus, 60 * 1000); // 1 minute in milliseconds
            return 0;
          }
        } else if (data.statusCode === 202) {
          // User has joined the queue
          if (body.queuePosition) {
            setAuthed(true);
            setQueuePosition(`You are number ${body.queuePosition} in the queue.`);
            setTimeout(leaveQueue, SessionTime);
            setAllowedTrials(body.trials_remaining);
            return 1;
          } else {
            // Unexpected case, handle accordingly
            setAuthed(false);
            setQueuePosition("Error: Unexpected status in the queue.");
            first = true;
            setTimeout(checkQueueStatus, 60 * 1000); // 1 minute in milliseconds
            return 0;
          }
        } else {
          // Handle unexpected statusCode
          setAuthed(false);
          //console.log(data);
          setQueuePosition(body.message || "An error occurred.");
          first = true;
          setTimeout(checkQueueStatus, 60 * 1000); // 1 minute in milliseconds
          return 0;
        }
      } else {
        console.error('Failed to retrieve queue status');
        first = true;
        setTimeout(checkQueueStatus, 60 * 1000); // 1 minute in milliseconds
      }
    } catch (error) {
      console.error('Error in checkQueueStatus:', error);
      setAuthed(false);
      setQueuePosition("Error checking queue status.");
      first = true;
      setTimeout(checkQueueStatus, 60 * 1000); // 1 minute in milliseconds
      return 0;
    }
  }
  const leaveQueue = async () => {
    await sendQueueRequest('leave', 'DELETE');
    setQueuePosition(null);

    // Show alert with options
    const userChoice = window.confirm("Please rejoin the queue or go back to the main page. Click 'OK' to reload the page, or 'Cancel' to go to the main page.");

    if (userChoice) {
      // Reload the page
      window.location.reload();
    } else {
      // Redirect to the main page
      window.location.href = "/";
    }
  };
  const sendQueueRequest = async (endpoint, method) => {
    return fetch(`https://cjedoxbspa.execute-api.eu-west-3.amazonaws.com/prod/queue/${endpoint}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: idTokenPayload }) // Sending userId for identification
    }).then(response => {
      if (response.ok) {
        return response;
      } else {
        console.error('Failed to send data to Lambda');
      }
    })
      .catch(error => {
        console.error('Error sending data to Lambda:', error);
      });;
  };
  useEffect(() => {
    if (location.pathname === "/") {
      // Scroll to the top of the page when the route changes to "/"
      window.scrollTo(0, 0);
    } else {
    }
  }, [location.pathname]);

  const ActiveTimeRef = useRef(ActiveTime);

  // Update ref value whenever ActiveTime changes
  useEffect(() => {
    ActiveTimeRef.current = ActiveTime;
  }, [ActiveTime]);

  useEffect(() => {
    const checkConnection = () => {
      const currentTime = Date.now();
      const elapsedTime = (currentTime - ActiveTimeRef.current) / 1000; // Convert to seconds

      if (elapsedTime > 10) { // Check if more than 10 seconds have passed
        setConnectionStatus(0); // Set to disconnected
        //console.log("Hardware Disconnected");
      } else {
        setConnectionStatus(1); // Set to connected
        //console.log("Hardware Online");
      }

      // Set up the next check
      setTimeout(checkConnection, 2000);
    };

    checkConnection(); // Start checking

    // Cleanup function to clear timeout if component unmounts
    return () => clearTimeout(checkConnection);
  }, []); // Empty dependency array to run only once on mount

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    document.addEventListener('click', setActive);
    document.addEventListener('keypress', setActive);
    document.addEventListener('mousemove', setActive);

    window.scrollTo(0, 0);
    checkQueueStatus();
  }, []); // Empty dependency array ensures this effect runs only once


  const saveDataToDynamoDB = async () => {
    if(await checkQueueStatus()==0){
      return;
    }
    if (xPosArr.length > 0 && yPosArr.length > 0 || 1) {
      try {
        const session = await fetchAuthSession();
        idTokenPayload = session.tokens.signInDetails.loginId;
        //console.log("USER:", idTokenPayload);
        //console.log("ID Token set:", idTokenPayload); // This confirms if the token is set correctly

      } catch (err) {
        console.log("Error fetching session:", err);
        return;
      }
      const apiUrl = 'https://yo6maila82.execute-api.eu-west-3.amazonaws.com/test/Data';
      const data = {
        xerror: xError,
        yerror: yError,
        xtime: xTime,
        ytime: yTime,
        xovershoot: xOvershoot,
        yovershoot: yOvershoot,
        xrise: xRiseTime,
        yrise: yRiseTime,
        xsettling: xSettlingTime,
        ysettling: ySettlingTime,
        Parameters: parameterData,
        userId: idTokenPayload
      };
      console.log(data);
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error('Failed to save data');
        }

        const result = await response.json();
        console.log('Data saved successfully:', result);
      } catch (error) {
        console.error('Error saving data:', error);
      }
    } else {
      return;
    }
  };
  useEffect(() => {
    if (SaveData === 1) {
      saveDataToDynamoDB();   // Call the callback function
      setSaveData(0); // Reset SaveData to 0
    }
  }, [SaveData, setSaveData, saveDataToDynamoDB]);
  const UpdateWork = async (work) => {
    if(await checkQueueStatus()==0){
      return;
    }
    try {
      const session = await fetchAuthSession();
      const idTokenPayload = session.tokens.signInDetails.loginId; // Get the user ID from the session

      const dataToSend = {
        work: work, // Use the provided work parameter
        userId: idTokenPayload // Add userId to the object
      };

      const response = await fetch("https://rq0btgzijg.execute-api.eu-west-3.amazonaws.com/teststage", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${idToken}` // Uncomment and use idToken in Authorization header if needed
        },
        body: JSON.stringify(dataToSend) // Stringify the combined object
      });

      if (response.ok) {
        //console.log('Data sent to Lambda successfully');
        //console.log("Work:", work);
        //console.log("User ID:", idTokenPayload);
      } else {
        console.error('Failed to send data to Lambda');
      }
    } catch (error) {
      console.error('Error sending data to Lambda:', error);
    }
  };


  const sendDataTostart = () => {
    UpdateWork(1);
  };

  const sendDataTostop = () => {
    saveDataToDynamoDB();
    UpdateWork(0);
  };

  if (Authed) {
    return (
      <Authenticator>
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
                      updateQueue1={updateQueue}
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
                      isOnline={ConnectionStatus}
                      trials={AllowedTrials}
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
                    onXPosUpdate={setXPosArr}
                    onYPosUpdate={setYPosArr}
                    onXVelUpdate={setXVelArr}
                    onYVelUpdate={setYVelArr}
                    updateQueue1={updateQueue}
                    setactive={setActiveTime}
                    setsaveData={setSaveData}
                  />
                  <Results
                    className="Resultsmid"
                    steadyStateErrorPitch={xError}
                    overshootPitch={xOvershoot}
                    riseTimePitch={xTime}
                    settlingTimePitch={xSettlingTime}
                    steadyStateErrorRoll={xError}
                    overshootRoll={yOvershoot}
                    riseTimeRoll={yTime}
                    settlingTimeRoll={ySettlingTime}
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
                      className="parameters-2"
                      updateQueue1={updateQueue} />
                    <Buttons
                      sendDataToLambda={sendDataToLambda}
                      sendDataTostart={sendDataTostart}
                      sendDataTostop={sendDataTostop}
                      parameterData={parameterData}
                      className="buttons-2"
                      isOnline={ConnectionStatus}
                      trials={AllowedTrials}
                      />
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
                    updateQueue1={updateQueue}
                    setactive={setActiveTime}
                    setsaveData={setSaveData}
                  />
                  <Results
                    className="Results1300"
                    ssteadyStateErrorPitch={xError}
                    overshootPitch={xOvershoot}
                    riseTimePitch={xTime}
                    settlingTimePitch={xSettlingTime}
                    steadyStateErrorRoll={xError}
                    overshootRoll={yOvershoot}
                    riseTimeRoll={yTime}
                    settlingTimeRoll={ySettlingTime}
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
                    isOnline={ConnectionStatus}
                    trials={AllowedTrials}
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
                    onXPosUpdate={setXPosArr}
                    onYPosUpdate={setYPosArr}
                    onXVelUpdate={setXVelArr}
                    onYVelUpdate={setYVelArr}
                    updateQueue1={updateQueue}
                    setactive={setActiveTime}
                    setsaveData={setSaveData}
                  />
                  <Results
                    className="Results834"
                    steadyStateErrorPitch={xError}
                    overshootPitch={xOvershoot}
                    riseTimePitch={xTime}
                    settlingTimePitch={xSettlingTime}
                    steadyStateErrorRoll={xError}
                    overshootRoll={yOvershoot}
                    riseTimeRoll={yTime}
                    settlingTimeRoll={ySettlingTime}
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
  } else {
    return (
      <Authenticator>
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
                      updateQueue1={updateQueue}
                    />
                    <div style={{ color: 'white', textAlign: 'center', fontSize: '1em', fontWeight: 'bold', marginTop: '50px' }}>
                      <div>Controls are Disabled <br /></div>
                      <div dangerouslySetInnerHTML={{ __html: QueuePosition.replace(/\n/g, '<br/>') }}></div>
                    </div>
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
                      className="parameters-2"
                    />
                    <div style={{ color: 'white', textAlign: 'center', fontSize: '1em', fontWeight: 'bold', marginTop: '50px' }}>
                      <div>Controls are Disabled <br /></div>
                      <div dangerouslySetInnerHTML={{ __html: QueuePosition.replace(/\n/g, '<br/>') }}></div>
                    </div>
                  </div>
                  <URDFViewer
                    urdfUrl={urdfUrl1}
                    className="video-stream-instance"
                    width="1000"
                    height="600"
                    joint1={JointAngle1}
                    joint2={JointAngle2}
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
                  <div style={{ color: 'white', textAlign: 'center', fontSize: '1em', fontWeight: 'bold', marginTop: '50px' }}>
                    <div>Controls are Disabled <br /></div>
                    <div dangerouslySetInnerHTML={{ __html: QueuePosition.replace(/\n/g, '<br/>') }}></div>
                  </div>
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
  }
};

export const HoverRT = withAuthenticator(HoverRTcomponent);