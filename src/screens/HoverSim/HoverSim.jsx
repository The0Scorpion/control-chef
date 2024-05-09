import React, { useState,useRef } from "react";
import { useWindowWidth } from "../../breakpoints";
import { ButtonsSim } from "../../components/ButtonsSim";
import { Footer } from "../../components/Footer";
import { Graphsim } from "../../components/Graphsim";
import { NavBar } from "../../components/NavBar";
import { NavBar_2 } from "../../components/NavBar_2";
import { Next } from "../../components/Next/Next";
import { Parametersim } from "../../components/Parametersim";
import { BlockDiagramand } from "../../components/BlockDiagramand";
import { SimulationStreaming } from "../../components/SimulationStreaming";
import { Amplify } from "aws-amplify";
import awsConfig from "../../aws-export";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "./style.css";
import { simulate } from "../../components/2DOF_Model";

Amplify.configure(awsConfig);

export const HoverSimcomponent = () => {
  
  const screenWidth = useWindowWidth(); 
  const [SimulationPoints,setSimulationPoints] = useState(null)
  const [ParameterData,setParameterData] = useState(null)
  const GraphAndSimulate = () => {
    const Sim=simulate(ParameterData);
    console.log("Points:", SimulationPoints);

    setSimulationPoints(Sim);
  };
  return (
    <div className="hoversim"
      style={{
        background: "linear-gradient(180deg, rgb(5, 5, 24) 0%, rgb(28.9, 26.25, 126) 100%)",
        height:
          screenWidth < 834
            ? "2565px"
            : screenWidth >= 834 && screenWidth < 1300
              ? "2730px"
              : screenWidth >= 1300
                ? "2850px"
                : undefined,
        width:"100%"
      }}
    >
      {screenWidth >= 834 && screenWidth < 1300 && (
        <>
          <Parametersim
            className="parameters-instance"
            rollgroup="rollgroup1"
            pitchgroup="pitchgroup1"
            plantgroup="plantimg1"
            arrow3="arrow1"
            arrow4="arrow1" />
          <SimulationStreaming className="simulation-streaming-instance" />
          <ButtonsSim 
            className="buttons-instance"
            startClassName="start1"
            stopClassName="stop1"
            setClassName="set1"
            resetClassName="reset1" />
          <Graphsim
            className="graphs-instance"
            divClassName="graphs-5"
            divClassName1="graphs-16"
            divClassNameOverride="graphs-6"
            groupClassName="instance-node"
            groupClassName1="graphs-8"
            groupClassName2="graphs-9"
            groupClassName3="graphs-11"
            groupClassName4="graphs-12"
            groupClassName5="graphs-14"
            groupClassNameOverride="graphs-4"
            rectangleClassName="graphs-2"
            rectangleClassName1="graphs-2"
            rectangleClassName2="graphs-6"
            rectangleClassName3="graphs-6"
            rectangleClassName4="graphs-6"
            rectangleClassName5="graphs-6"
            rectangleClassNameOverride="graphs-2"
            xPosClassName="graphs-3"
            xPosPidClassName="graphs-10"
            xVelClassName="graphs-7"
            xVelPidClassName="graphs-13"
            yPosClassName="graphs-3"
            yPosPidClassName="graphs-10"
            yVelClassName="graphs-3"
            yVelPidClassName="graphs-15"
          />
          <NavBar_2 className="nav-bar-tab" />
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
            linkTo1="/hover-realtime"
            linkTo2="/Hover-Documentation"/>
        </>
      )}
     
      {screenWidth >= 1300 && (
        
        <>
          <Footer className="footer-instance" />
          <Graphsim
            SimulationPoints={SimulationPoints}
            className="graphs-17" />
          <Parametersim
            setParameterData={setParameterData}
            className="parameters-2" />
          <SimulationStreaming className="simulation-streaming-2" />
          <ButtonsSim className="SimulationPoints-2" 
          GraphAndSimulate={GraphAndSimulate} />
          <NavBar
            className="nav-bar-instance2"
          />
          <Next navigate="nav"
            linkTo1="/hover-realtime"
            linkTo2="/Hover-Documentation"/>
        </>
      )}

      {screenWidth < 834 && (
        <>
          <BlockDiagramand/>
          <SimulationStreaming
            className="simulation-streaming-3"
            simulationStreamingClassName="simulation-streaming-4"
          />
          <ButtonsSim
            className="buttons-3"
            resetClassName="buttons-9"
            setClassName="buttons-11"
            startClassName="buttons-90"
            stopClassName="buttons-6"
          />
          <Graphsim
            className="graphs-18"
            divClassName="graphs-24"
            divClassName1="graphs-35"
            divClassNameOverride="graphs-20"
            groupClassName="graphs-19"
            groupClassName1="graphs-26"
            groupClassName2="graphs-28"
            groupClassName3="graphs-30"
            groupClassName4="graphs-31"
            groupClassName5="graphs-33"
            groupClassNameOverride="graphs-22"
            rectangleClassName="graphs-20"
            rectangleClassName1="graphs-20"
            rectangleClassName2="graphs-20"
            rectangleClassName3="graphs-20"
            rectangleClassName4="graphs-20"
            rectangleClassName5="graphs-20"
            rectangleClassNameOverride="graphs-20"
            xPosClassName="graphs-21"
            xPosPidClassName="graphs-29"
            xVelClassName="graphs-25"
            xVelPidClassName="graphs-32"
            yPosClassName="graphs-23"
            yPosPidClassName="graphs-29"
            yVelClassName="graphs-27"
            yVelPidClassName="graphs-34"
          />
          <NavBar_2
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
          
        </>
      )}
    </div>
  );
};

export const HoverSim = withAuthenticator(HoverSimcomponent);
