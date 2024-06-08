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
  const [JointAngle1,setJointAngle1]=useState(0);
  const [JointAngle2,setJointAngle2]=useState(0);
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
              background: "rgb(20, 20, 80)",
              height:
                screenWidth < 834
                  ? "1120px"
                  : screenWidth >= 834 && screenWidth < 1300
                    ? "2240px"
                    : screenWidth >= 1300
                      ? "2700px"
                      : undefined,
              width: { screenWidth }
            }}
          >
            {screenWidth >= 834 && screenWidth < 1300 && (
              <>
                <SimulationStreaming
                  title="Real Time Simulation"
                  className="simulation-streaming-instance"
                />
                <Parametersnew
                  setParameterData={setParameterData}
                  className="parameters-instance"
                  rollgroup="rollgroup1"
                  pitchgroup="pitchgroup1"
                  plantgroup="plantimg1"
                  arrow3="arrow1"
                  arrow4="arrow1"
                />
                <URDFViewer
                 urdfUrl={urdfUrl1}
                  className="video-stream-instance1"
                  width="800"
                  height="500"
                  joint1={JointAngle1}
                  joint2={JointAngle2}
                />
                <Buttons
                  sendDataToLambda={sendDataToLambda}
                  sendDataTostart={sendDataTostart}
                  sendDataTostop={sendDataTostop}
                  parameterData={parameterData}
                  className="buttons-instance"
                  startClassName="start1"
                  stopClassName="stop1"
                  setClassName="set1"
                  resetClassName="reset1"
                />
                <Graphs
                  className="graphs-instance"
                  divClassName1="graphs-16"
                  groupClassName="instance-node"
                  divClassName="graphs-5"
                  groupClassName2="graphs-9"
                  groupClassName4="graphs-12"
                  rectangleClassName="graphs-2"
                  divClassNameOverride="graphs-2"
                  rectangleClassName1="graphs-2"
                  rectangleClassNameOverride="graphs-2"
                  xPosClassName="graphs-3"
                  xVelClassName="graphs-3"
                  yPosClassName="graphs-3"
                  yVelClassName="graphs-3"
                  setj1={setJointAngle1}
                  setj2={setJointAngle2}
                />
                <Next navigate="nav1"
                  next="next1"
                  back="back1"
                  linkTo2="/hover-simulation" />
                <NavBar_2
                  onclick={signOut}
                  className="nav-bar-tab" />
                <Footer
                  className="footer1"
                  group="groupfooter1"
                  group2="group2footer1"
                  controlchefhigh="controlcheifhighfooter1"
                  maskgroup="maskgroupfooter1"
                  group7="group7footer1"
                  textwrapper="textwrapperfooter1"
                  textwrapper2="textwrapper2footer1"
                  textwrapper3="textwrapper3footer1"
                  textwrapper4="textwrapper4footer1"
                  textwrapper5="textwrapper5footer1"
                  group8="group8footer1"
                  group9="group9footer1"
                  group10="group10footer1"
                  copyright="copyrightfooter1"
                />
              </>
            )}

            {screenWidth >= 1300 && (
              <>
                <Footer className="footer-instance" />
                <Graphs className="graphs-17" 
                setj1={setJointAngle1}
                setj2={setJointAngle2}
                />
                <URDFViewer
                  urdfUrl={urdfUrl1}
                  className="video-stream-instance"
                  width="1000"
                  height="600"
                  joint1={JointAngle1}
                  joint2={JointAngle2}
                />
                <Parametersnew
                  setParameterData={setParameterData}
                  className="parameters-2" />
                <SimulationStreaming
                  title="Real Time Simulation"
                  className="simulation-streaming-2" />
                <Buttons
                  sendDataToLambda={sendDataToLambda}
                  sendDataTostart={sendDataTostart}
                  sendDataTostop={sendDataTostop}
                  parameterData={parameterData}
                  className="buttons-2" />
                <NavBar
                  onclick={signOut}
                  className="nav-bar-instance2"
                />
                <Next navigate="nav"
                  next="next"
                  linkTo2="/hover-simulation" />
              </>
            )}

            {screenWidth < 834 && (
              <>
                <Parameters
                  setParameterData={setParameterData}
                  className="parameters-3"
                />
                <URDFViewer
                  urdfUrl={urdfUrl1}
                  className="video-stream-instance2"
                  width="300"
                  height="200"
                  joint1={JointAngle1}
                  joint2={JointAngle2}
                />
                <SimulationStreaming
                  className="simulation-streaming-3"
                  title="Real Time Simulation"
                  simulationStreamingClassName="simulation-streaming-4"
                />
                <Buttons
                  sendDataToLambda={sendDataToLambda}
                  sendDataTostart={sendDataTostart}
                  sendDataTostop={sendDataTostop}
                  parameterData={parameterData}
                  className="buttons-3"
                  resetClassName="buttons-9"
                  setClassName="buttons-11"
                  startClassName="buttons-90"
                  stopClassName="buttons-6"
                />
                <Graphs
                  className="graphs-18"
                  divClassName1="graphs-35"
                  groupClassName="graphs-19"
                  divClassName="graphs-24"
                  groupClassName2="graphs-28"
                  groupClassName4="graphs-31"
                  rectangleClassName="graphs-20"
                  divClassNameOverride="graphs-20"
                  rectangleClassName1="graphs-20"
                  rectangleClassNameOverride="graphs-20"
                  xPosClassName="graphs-21"
                  xVelClassName="graphs-21"
                  yPosClassName="graphs-21"
                  yVelClassName="graphs-21"
                  setj1={setJointAngle1}
                  setj2={setJointAngle2}
                />
                <NavBar_2
                  onclick={signOut}
                  className="nav-bar-tab-instance"
                  controltotal1="logo1"
                  navbarclassName="nav-bar1"
                  controlchef1="nav-bar2"
                  controlchef2="nav-bar3"
                  controlchef3="nav-bar4"
                  navbardrop="nav-bar5"
                  navbartext="nav-bar6"
                  dropdowncontentexperiments="nav-bar7"
                  dropdowncontenttheories="nav-bar8"
                />
                <Footer
                  className="footer5"
                  group="groupfooter"
                  group2="group2footer"
                  controlchefhigh="controlcheifhighfooter"
                  maskgroup="maskgroupfooter"
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
                <Next navigate="nav2"
                  next="next2"
                  back="back2"
                  linkTo2="/hover-simulation"
                />
              </>
            )}
          </div>
        </>
      )}
    </Authenticator>
  );
};

export const HoverRT = withAuthenticator(HoverRTcomponent);
