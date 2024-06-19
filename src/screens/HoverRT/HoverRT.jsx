import React, { useState, useRef, useEffect } from "react";
import { useWindowWidth } from "../../breakpoints";
import { useLocation } from "react-router-dom";
import { Buttons } from "../../components/Buttons";
import { Footer } from "../../components/Footer";
import { Graphs } from "../../components/Graphs";
import { NavBar } from "../../components/NavBar";
import { NavBar_2 } from "../../components/NavBar_2";
import { Parameters } from "../../components/Parameters";
import { Parametersnew } from "../../components/Parametersnew";
import { SimulationStreaming } from "../../components/SimulationStreaming";
import { Next } from "../../components/Next";
import { URDFViewer } from "../../components/URDFViewer";
import { Amplify } from "aws-amplify";
import awsConfig from "../../aws-export";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "./style.css";

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
  const sendDataToLambda = () => {
    if (!parameterData) {
      console.error("No parameter data to send.");
      return;
    }
    fetch("https://rq0btgzijg.execute-api.eu-west-3.amazonaws.com/teststage", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // Specify content type as JSON ?data=${parameterData}
      },
      body: JSON.stringify(parameterData) // Stringify the parameterData object
    })
      .then(response => {
        if (response.ok) {
          console.log('Data sent to Lambda successfully');
          console.log("Parameter Data:", parameterData);
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
        'Content-Type': 'application/json' // Specify content type as JSON ?data=${parameterData}
      },
      body: "{\"work\": 1}" // Stringify the parameterData object
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
        'Content-Type': 'application/json' // Specify content type as JSON ?data=${parameterData}
      },
      body: "{\"work\": 0}" // Stringify the parameterData object
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
                  title="Real Time Simulation"
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
                  title="Real Time Simulation"
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
                  title="Real Time Simulation"
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
