import React, { useState, useRef, useEffect } from "react";
import { useWindowWidth } from "../../breakpoints";
import { useLocation } from "react-router-dom";
import { ButtonsSim } from "../../components/ButtonsSim";
import { Footer } from "../../components/Footer";
import { Graphsim } from "../../components/Graphsim";
import { NavBar } from "../../components/NavBar";
import { NavBar_2 } from "../../components/NavBar_2";
import { Next } from "../../components/Next/Next";
import { Parametersim } from "../../components/Parametersim";
import { Parametersnewand } from "../../components/Parametersnewand";
import { SimulationStreaming } from "../../components/SimulationStreaming";
import { Amplify } from "aws-amplify";
import awsConfig from "../../aws-export";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "./style.css";
import { simulate } from "../../components/2DOF_Model";
import { Authenticator } from "@aws-amplify/ui-react";

Amplify.configure(awsConfig);

export const HoverSimcomponent = () => {

  const location = useLocation();
  const screenWidth = useWindowWidth();
  const [scrollToTop, setScrollToTop] = useState(false);
  // Function to calculate the height of the last component
  const calculateLastComponentHeight = () => {
    // You can customize this function to calculate the height of the last component in each condition block
    if (screenWidth < 834) {
      return 870; // Adjust this value based on the height of the last component
    } else if (screenWidth >= 834 && screenWidth < 1300) {
      return 1690; // Adjust this value based on the height of the last component
    } else if (screenWidth >= 1300) {
      return 2050; // Adjust this value based on the height of the last component
    }
    // Return a default value if none of the conditions match
    return 0;
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

  const [SimulationPoints, setSimulationPoints] = useState(null)
  const [Simulation, setSimulation] = useState(null)
  const [ParameterData, setParameterData] = useState(null)
  const GraphAndSimulate = () => {
    const Sim = simulate(ParameterData);
    console.log("Points:", SimulationPoints);
    setSimulationPoints(Sim);
  };
  const destroygraph = () => {
    console.log(1);
    const destroy = 5;
    setSimulation(destroy);
  };
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <>
    <div className="hoversim"
      style={{
        background: "linear-gradient(180deg, rgb(5, 5, 24) 0%, rgb(28.9, 26.25, 126) 100%)",
        height: calculateLastComponentHeight(),
        width: "100%"
      }}
    >
      {screenWidth >= 834 && screenWidth < 1300 && (
        <>
          <Parametersim
            setParameterData={setParameterData}
            className="parameters-instance"
            rollgroup="rollgroup1"
            pitchgroup="pitchgroup1"
            plantgroup="plantimg1"
            arrow3="arrow1"
            arrow4="arrow1" />
          <SimulationStreaming
            title="Simulation of Hover"
            className="simulation-streaming-instance" />
          <ButtonsSim
            GraphAndSimulate={GraphAndSimulate}
            destroygraph={destroygraph}
            className="buttons-instance"
            startClassName="start1"
            stopClassName="stop1"
            setClassName="set1"
            resetClassName="reset1" />
          <Graphsim
            SimulationPoints={SimulationPoints}
            Simulation={Simulation}
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
          />
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
            overlab2="overlab2footer"
            overlapwrapper="overlapwrapperfooter1"
            rectangle="rectanglefooter1"
            copyright="copyrightfooter1"
          />
          <Next navigate="nav1"
            next="next1"
            back="back1"
            linkTo1="/hover-realtime/"
            linkTo2="/Hover-Documentation/" />
        </>
      )}

      {screenWidth >= 1300 && (
        <>
          <Footer className="footer-instance" />
          <Graphsim
            SimulationPoints={SimulationPoints}
            Simulation={Simulation}
            className="graphs-17" />
          <Parametersim
            setParameterData={setParameterData}
            className="parameters-2" />
          <SimulationStreaming
            title="Simulation of Hover"
            className="simulation-streaming-2" />
          <ButtonsSim
            className="SimulationPoints-2"
            GraphAndSimulate={GraphAndSimulate}
            destroygraph={destroygraph} />
          <NavBar
            onclick={signOut}
            className="nav-bar-instance2"
          />
          <Next navigate="nav"
            linkTo1="/hover-realtime/"
            linkTo2="/Hover-Documentation/" />
        </>
      )}

      {screenWidth < 834 && (
        <>
          <Parametersnewand
            setParameterData={setParameterData}
            className="BlockDiagrams5"
          />
          <SimulationStreaming
            title="Simulation of Hover"
            className="simulation-streaming-3"
            simulationStreamingClassName="simulation-streaming-4"
          />
          <ButtonsSim
            GraphAndSimulate={GraphAndSimulate}
            destroygraph={destroygraph}
            className="buttons-3"
            resetClassName="buttons-9"
            setClassName="buttons-11"
            startClassName="buttons-90"
            stopClassName="buttons-6"
          />
          <Graphsim
            SimulationPoints={SimulationPoints}
            Simulation={Simulation}
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
            overlab2="overlab2footer"
            overlapwrapper="overlapwrapperfooter"
            rectangle="rectanglefooter"
            copyright="copyrightfooter"
          />
          <Next navigate="nav2"
            next="next2"
            back="back2"
            linkTo1="/hover-realtime/"
            linkTo2="/Hover-Documentation/"
          />
        </>
      )}
    </div>
    </>
      )}
    </Authenticator>
  );
};

export const HoverSim = withAuthenticator(HoverSimcomponent);
