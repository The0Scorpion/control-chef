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
  idToken="";
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
  const [QueueStatus, setQueueStatus] = useState("");
  const [timeoutId, setTimeoutId]=useState(null);
  first=true;
  // Function to calculate overshoot
  const calculateOvershoot = (simData, setp) => {
    // Find the direction of movement based on the sign of the first point
    const initialSign = Math.sign(simData[0] - setp);

    // Initialize variables to track the index of the first zero crossing and the extreme value after crossing
    let indexOfFirstZeroCrossing = -1;
    let extremeValueAfterCrossing = null;

    // Iterate through the data to find the first zero crossing
    for (let i = 1; i < simData.length; i++) {
      // Check if the current point crosses zero from the initial sign
      if (Math.sign(simData[i] - setp) !== initialSign) {
        indexOfFirstZeroCrossing = i;
        break;
      }
    }

    // If no zero crossing is found, there's no overshoot
    if (indexOfFirstZeroCrossing === -1) {
      return { overshoot: 0, indexOfFirstZeroCrossing };
    }

    // Determine whether to look for the maximum or minimum value after the zero crossing
    const lookForMaxValue = initialSign === 1; // If initial sign is positive, look for maximum value

    // Find the extreme value after the zero crossing
    for (let i = indexOfFirstZeroCrossing; i < simData.length; i++) {
      // If looking for maximum value, update extremeValueAfterCrossing if current value is greater
      if (lookForMaxValue && (extremeValueAfterCrossing === null || simData[i] > extremeValueAfterCrossing)) {
        extremeValueAfterCrossing = simData[i] - setp;
      }
      // If looking for minimum value, update extremeValueAfterCrossing if current value is lesser
      else if (!lookForMaxValue && (extremeValueAfterCrossing === null || simData[i] < extremeValueAfterCrossing)) {
        extremeValueAfterCrossing = simData[i] - setp;
      }
    }

    // Calculate the overshoot as the difference between the extreme value and the initial set point
    return { overshoot: Math.abs(extremeValueAfterCrossing), indexOfFirstZeroCrossing };
  };

  // Function to calculate variance
  const calculateVariance = (simData, setp) => {
    // Find the direction of movement based on the sign of the first point
    const initialSign = Math.sign(simData[0] - setp);

    // Initialize variables to track the index of the first sign flip and the data after the flip
    let indexOfFirstSignFlip = -1;
    let dataAfterSignFlip = [];

    // Iterate through the data to find the first sign flip
    for (let i = 1; i < simData.length; i++) {
      // Check if the current point changes sign from the initial sign
      if (Math.sign(simData[i] - setp) !== initialSign) {
        indexOfFirstSignFlip = i;
        dataAfterSignFlip = simData.slice(indexOfFirstSignFlip + 1);
        break;
      }
    }

    // If no sign flip is found, return 0 variance
    if (indexOfFirstSignFlip === -1) return 0;

    // Calculate the mean of the data after the sign flip
    const mean = dataAfterSignFlip.reduce((acc, val) => acc + val, 0) / dataAfterSignFlip.length;

    // Calculate the squared differences from the mean
    const squaredDifferences = dataAfterSignFlip.map((val) => (val - mean) ** 2);

    // Calculate the variance
    const variance = squaredDifferences.reduce((acc, val) => acc + val, 0) / dataAfterSignFlip.length;

    return variance;
  };

  useEffect(() => {
    if (xPosArr.length > 0 && yPosArr.length > 0 ) {

      console.log("Calculating overshoot and errors...");

      // Calculate overshoot
      const XovershootResult = calculateOvershoot(xPosArr, parameterData.xposSet);
      const YovershootResult = calculateOvershoot(yPosArr, parameterData.yposSet);
      console.log("XovershootResult:", XovershootResult);
      console.log("YovershootResult:", YovershootResult);

      // Calculate XError and YError
      const newXError = Math.abs(parameterData.xposSet - xPosArr[xPosArr.length - 1]);
      const newYError = Math.abs(parameterData.yposSet - yPosArr[yPosArr.length - 1]);
      console.log("New XError:", newXError);
      console.log("New YError:", newYError);

      // Calculate xtime and ytime
      setXtime(XovershootResult.indexOfFirstZeroCrossing * 0.005);
      setYtime(YovershootResult.indexOfFirstZeroCrossing * 0.005);

      // Update state variables
      setXovershoot(XovershootResult.overshoot);
      setYovershoot(YovershootResult.overshoot);
      setXError(newXError);
      setYError(newYError);
    }
    
  }, [parameterData, xPosArr, yPosArr]);

  // Fetch the current session to obtain tokens




  const sendDataToLambda = () => {
    if (!parameterData) {
      console.error("No parameter data to send.");
      return;
    }

    fetch("https://rq0btgzijg.execute-api.eu-west-3.amazonaws.com/teststage", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        //'Authorization': 'Bearer ${idToken}' // Use idToken in Authorization header
      },
      body: JSON.stringify(parameterData) // Stringify the parameterData object
    })
      .then(response => {
        if (response.ok) {
          console.log('Data sent to Lambda successfully');
          console.log("Parameter Data:", parameterData);
          //console.log("ID Token:", idToken); // Log ID Token here
          //console.log("Access Token:", accessToken);
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
        //'Authorization': 'Bearer ${idToken}' // Use idToken in Authorization header
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
  let userAddedToQueue = false;
  const deleteUser = async (userId1) => {
    return fetch(`https://cjedoxbspa.execute-api.eu-west-3.amazonaws.com/prod/queue/leave`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': idToken // Use idToken in Authorization header if needed
      },
      body: JSON.stringify({ userId: userId1 })
    }).then(response => {
      if (response.ok) {
        console.log(`User ${userId1} deleted successfully`);
      } else {
        console.error('Failed to delete user from queue');
      }
    })
    .catch(error => {
      console.error('Error deleting user from queue:', error);
    });
  };

  const checkQueueStatus = async () => {
    if(!first){
      return;
    }
    first=false;
    try {
      const session = await fetchAuthSession();
      const idTokenPayload = session.tokens.signInDetails.loginId;
      idToken=idTokenPayload;
      console.log("USER:", idTokenPayload);
    } catch (err) {
      console.log("Error fetching session:", err);
    }
    try {
        const response = await sendQueueRequest('status', 'POST');
        //console.log("idToken:",idToken);
        if (response.ok) {
            const data = await response.json();
            //console.log("Status", data);

            if(data.statusCode!=200){
              setAuthed(false);
              setQueuePosition("User Is not Authed To Control Hardware,\r\n contact Us for further Info.");
              return;
            }
           
            const queueStatus = JSON.parse(data.body);
            const queueItems = queueStatus.queueItems;
            const currentTime = new Date();
            const ActivePeriod = 5 * 60 * 1000; // 5 minutes in milliseconds
            
            //console.log("Current Time:", currentTime.getTime());
            
            // Identify users who have been inactive for over 2 minutes
            const expiredUsers = queueItems.filter(item => {
              const lastActiveTime = new Date(item.lastActiveTime);
              const lastActiveTimeMillis = lastActiveTime.getTime()+3*60*60*1000 ; // Convert to milliseconds since epoch
              const currentTimeMillis = currentTime.getTime(); // Convert to milliseconds since epoch
              //console.log("User Time:", lastActiveTimeMillis);
              console.log("delta Time:", (currentTimeMillis - lastActiveTimeMillis));
              return (currentTimeMillis - lastActiveTimeMillis) >= ActivePeriod;
          });
            
            console.log("Expired Users:", expiredUsers);
            
            // Send request to delete expired users
            for (const user of expiredUsers) {
                await deleteUser(user.userId);
            }
            
            // Remove expired users from activeUsers
            const activeUsers = queueItems.filter(item => {
              const lastActiveTime = new Date(item.lastActiveTime);
              const lastActiveTimeMillis = lastActiveTime.getTime()+3*60*60*1000 ; // Convert to milliseconds since epoch
              const currentTimeMillis = currentTime.getTime(); // Convert to milliseconds since epoch
              //console.log("User Time:", lastActiveTimeMillis);
              console.log("delta Time:", (currentTimeMillis - lastActiveTimeMillis));
              return (currentTimeMillis - lastActiveTimeMillis) < ActivePeriod;
            });
            
            console.log("Active Users:", activeUsers);
            
            const currentUserInQueue = queueItems.find(item => item.userId === idToken);
            
            // Only add user to queue if their ID isn't already present in queueItems
            if (!currentUserInQueue && !userAddedToQueue) {
                
                joinQueue();
                
            }
            
            // If no active users remain, set auth to true
            if (activeUsers.length === 0) {
                setAuthed(true);
                setQueueStatus(true);
                const id = setTimeout(() => {
                  alert('Session timed out');
                  leaveQueue();
                }, 300000); // 5 minutes
                userAddedToQueue = false; // Reset flag when no active users are present
            } else {
                // Check if it's the current user's turn
                const currentTurnUser = activeUsers[0]; // Assuming the first in the list is the current turn
                if (currentTurnUser && currentTurnUser.userId === idToken) {
                    setAuthed(true);
                    const id = setTimeout(() => {
                      alert('Session timed out');
                      leaveQueue();
                  }, 300000); // 5 minutes
                    setQueueStatus(true);
                    userAddedToQueue = false; // Reset flag
                    console.log("Table Busy but users is Up");
                } else {
                    setAuthed(false);
                    setQueueStatus(false);
                    const estimatedTime = 5 * activeUsers.length; // Approximate wait time
                    setQueuePosition(`Estimated wait time: ${estimatedTime} minutes`);
                    
                    // Rerun the checkQueueStatus function every minute
                    first=true;
                    setTimeout(checkQueueStatus, 60 * 1000); // 1 minute in milliseconds
                }
            }
        } else {
            console.error('Failed to retrieve queue status');
        }
    } catch (error) {
        console.error('Error in checkQueueStatus:', error);
    }
};

  
  
  
const joinQueue = async () => {
  try {
      const response = await sendQueueRequest('join', 'POST');
      if (response.ok) {
          //setQueuePosition('You are in the queue');

          // Read and log the response body as text
          //const responseBodyText = await response.text();
          //console.log("Response as text:", responseBodyText);

          // Parse the JSON string if needed
          //const data = await JSON.parse(response.text());

          // If you need to log the parsed JSON directly
          //console.log("Parsed JSON:", data);

          
          userAddedToQueue = true; // Set flag to true once user is added to queue
          setTimeoutId(id);
          startSessionTimeoutUpdate();
      }
  } catch (e) {
      console.error('Error in joinQueue:', e);
  }
};

  
const leaveQueue = async () => {
  clearTimeout(timeoutId);
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
        body: JSON.stringify({ userId: idToken }) // Sending userId for identification
      }).then(response => {
        if (response.ok) {
          //console.log("ID Token:", idToken); // Log ID Token here
          //console.log("response:", response); // Log ID Token here
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
      setScrollToTop(true);
    } else {
      setScrollToTop(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
    checkQueueStatus();
  }, []); // Empty dependency array ensures this effect runs only once


  const saveDataToDynamoDB = async () => {
    const apiUrl = 'https://yo6maila82.execute-api.eu-west-3.amazonaws.com/test/Data';

    const data = {
      xerror: XError,
      yerror: YError,
      xtime: xtime,
      ytime: ytime,
      xovershoot: Xovershoot,
      yovershoot: Yovershoot
    };

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
  };

  const sendDataTostart = () => {
    saveDataToDynamoDB();
    setWork(1);
    fetch("https://rq0btgzijg.execute-api.eu-west-3.amazonaws.com/teststage", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        //'Authorization': 'Bearer ${idToken}' // Use idToken in idToken header
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
  
if(Authed){
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
                  onXPosUpdate={setXPosArr}
                  onYPosUpdate={setYPosArr}
                  onXVelUpdate={setXVelArr}
                  onYVelUpdate={setYVelArr}
                />
                <Results
                  className="Resultsmid"
                  steadyStateErrorPitch={XError}
                  overshootPitch={Xovershoot}
                  settlingTimePitch={xtime}
                  steadyStateErrorRoll={YError}
                  overshootRoll={Yovershoot}
                  settlingTimeRoll={ytime}
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
                  onXPosUpdate={setXPosArr}
                  onYPosUpdate={setYPosArr}
                  onXVelUpdate={setXVelArr}
                  onYVelUpdate={setYVelArr}
                />
                <Results
                  className="Results834"
                  steadyStateErrorPitch={XError}
                  overshootPitch={Xovershoot}
                  settlingTimePitch={xtime}
                  steadyStateErrorRoll={YError}
                  overshootRoll={Yovershoot}
                  settlingTimeRoll={ytime}
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
}else {
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
                  />
                  <div style={{color: 'white', textAlign: 'center', fontSize: '1em', fontWeight: 'bold', marginTop: '50px' }}>
                  <div>Controls are Disabled <br/></div>
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
                    className="parameters-2" />
                <div style={{color: 'white', textAlign: 'center', fontSize: '1em', fontWeight: 'bold', marginTop: '50px' }}>
                <div>Controls are Disabled <br/></div>
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
                <div style={{color: 'white', textAlign: 'center', fontSize: '1em', fontWeight: 'bold', marginTop: '50px' }}>
                <div>Controls are Disabled <br/></div>
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