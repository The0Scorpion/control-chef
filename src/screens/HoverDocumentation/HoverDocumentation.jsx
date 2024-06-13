import React, { useState, useRef, useEffect } from "react";
import { useWindowWidth } from "../../breakpoints";
import { useLocation } from "react-router-dom";
import { useWindowWidth } from "../../breakpoints";
import { Footer } from "../../components/Footer";
import { NavBar } from "../../components/NavBar";
import { NavBar_2 } from "../../components/NavBar_2";
import { About } from "../../components/About/About";
import { HowItWorks } from "../../components/HowItWorks/HowItWorks";
import { Modeling } from "../../components/Modeling/Modeling";
import { Next } from "../../components/Next/Next";
import { BlockDiagram } from "../../components/BlockDiagram";
import { Amplify } from "aws-amplify";
import awsConfig from "../../aws-export";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "./style.css";

Amplify.configure(awsConfig);

export const HoverDoccomponent = () => {
  const location = useLocation();
  const screenWidth = useWindowWidth();
  const [scrollToTop, setScrollToTop] = useState(false);

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
          <div className="hoverdoc"
            style={{
              width: { screenWidth }
            }}
          >
            {screenWidth >= 834 && screenWidth < 1300 && (
              <>
                <NavBar_2
                  onclick={signOut}
                  className="nav-bar-tab" />
                <About 
                  className="about1"
                  theDOFhover="textdof"
                  abouttheDOF="titleabout"
                />
                <HowItWorks
                  className="howitwork1"
                  thedegreeof="textsize"
               />
                <Modeling
                  className="modeling1"
               />
                <BlockDiagram
                  className="blockdiagram1"
               />
                <Next navigate="navi1"
                  back="back1"
                  linkTo1="/hover-simulation" />
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
                <About className="about" />
                <HowItWorks className="howitwork" />
                <Modeling className="modeling" />
                <BlockDiagram className="blockdiagram" />
                <Next navigate="navigate"
                  linkTo1="/hover-simulation"
                  back="backop"
                />
                <Footer className="footerdoc" />
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
                <About
                  className="about20"
                  theDOFhoverwrapper="about21"
                  theDOFhover="about22"
                />
                <HowItWorks
                  className="howitwork20"
                  thedegreeof="howitwork21"
                  HowItWorkstext="howitwork23"
                />
                <Modeling
                  className="modeling20"
               />
                <BlockDiagram
                  className="blockdiagram21" 
                />
                <Next navigate="navigate2"
                  linkTo1="/hover-simulation"
                  back="backop2"
                  next="next2" />
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

export const HoverDocumentation = withAuthenticator(HoverDoccomponent);
