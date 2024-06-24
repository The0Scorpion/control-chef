import React, { useState, useEffect } from "react";
import { useWindowWidth } from "../../breakpoints";
import { useLocation } from "react-router-dom";
import { Buttons } from "../../components/Buttons";
import { Footer } from "../../components/Footer";
import { Graphs } from "../../components/Graphs";
import { NavBar } from "../../components/NavBar";
import { NavBar_2 } from "../../components/NavBar_2";
import { Parametersnew } from "../../components/Parametersnew";
import { Parameters } from "../../components/Parameters";
import { SimulationStreaming } from "../../components/SimulationStreaming";
import { Next } from "../../components/Next";
import { URDFViewer } from "../../components/URDFViewer";
import { Amplify } from "aws-amplify";
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
  const [idToken, setIdToken] = useState(null);
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


  // Calculate overshoot
  const XovershootResult = calculateOvershoot(xPosArr, ParameterData.xposSet);
  const YovershootResult = calculateOvershoot(yPosArr, ParameterData.yposSet);
  setXovershoot(XovershootResult.overshoot);
  setYovershoot(YovershootResult.overshoot);

  setXError(Math.abs(ParameterData.xposSet - xPosArr[1999]));
  setYError(Math.abs(ParameterData.yposSet - yPosArr[1999]));

  // Calculate xtime and ytime
  setXtime(XovershootResult.indexOfFirstZeroCrossing * 0.05);
  setYtime(YovershootResult.indexOfFirstZeroCrossing * 0.05);

  // Check if overshoot is less than 0.1
  if (XError < 0.01 && YError < 0.01) {
    if (Math.abs(Xovershoot) < 0.03 && Math.abs(Yovershoot) < 0.03) {
      // Calculate variance
      const Xvariance = calculateVariance(xPosArr, ParameterData.xposSet);
      const Yvariance = calculateVariance(yPosArr, ParameterData.yposSet);

      // Check if variance is less than 0.1
      if (Xvariance < 0.1 && Yvariance < 0.1) {
        setIsCriteriaMet(true); // Set criteria met
      } else {
        setIsCriteriaMet(false); // Reset criteria met
        alert("Variance criterion not met. Adjust PID parameters.");
        console.log(Xvariance);
        console.log(Yvariance);
      }
    } else {
      setIsCriteriaMet(false); // Reset criteria met
      alert("Overshoot criterion not met. Adjust PID parameters.");
      console.log(Xovershoot);
      console.log(Yovershoot);
    }
  } else {
    setIsCriteriaMet(false); // Reset criteria met
    alert("Steady State Error Too Big criterion not met. Adjust PID parameters.");
    console.log(XError);
    console.log(YError);
  }

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

  // Fetch the current session to obtain tokens
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const session = await Auth.currentSession();
        const idToken = session.getIdToken().getJwtToken();
        const accessToken = session.getAccessToken().getJwtToken();
        setIdToken(idToken);
        setAccessToken(accessToken);
        console.log("ID Token:", idToken); // Log ID Token here
        console.log("Access Token:", accessToken);
      } catch (err) {
        console.log("Error fetching session:", err);
      }
    };

    fetchSession();
  }, []);

  const sendDataToLambda = () => {
    if (!parameterData) {
      console.error("No parameter data to send.");
      return;
    }

    fetch("https://rq0btgzijg.execute-api.eu-west-3.amazonaws.com/teststage", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': idToken // Use idToken in Authorization header
      },
      body: JSON.stringify(parameterData) // Stringify the parameterData object
    })
      .then(response => {
        if (response.ok) {
          console.log('Data sent to Lambda successfully');
          console.log("Parameter Data:", parameterData);
          console.log("ID Token:", idToken); // Log ID Token here
          console.log("Access Token:", accessToken);
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
        'Authorization': idToken // Use idToken in Authorization header
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
        'Authorization': idToken // Use idToken in Authorization header
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
  }, []); // Empty dependency array ensures this effect runs only once


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
};

export const HoverRT = withAuthenticator(HoverRTcomponent);