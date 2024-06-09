import React, { useState, useRef, useEffect } from "react";
import { useWindowWidth } from "../../breakpoints";
import { useLocation } from "react-router-dom";
import { Footer } from "../../components/Footer";
import { NavBar } from "../../components/NavBar";
import { NavBar_2 } from "../../components/NavBar_2";
import { TestimonialsWrapper } from "../../components/TestimonialsWrapper";
import { Welcome } from "../../components/Welcome";
import { IntroWrapper } from "../../components/IntroWrapper";
import { Amplify } from "aws-amplify";
import awsConfig from "../../aws-export";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "./style.css";

Amplify.configure(awsConfig);

export const Homepage = () => {
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
        <div
          className="welcome-and"
          style={{
            background: "linear-gradient(135deg, rgb(5, 5, 24) 60%, rgb(26.25, 26.25, 126) 100%)",
            width: { screenWidth }
          }}
        >
          {screenWidth < 834 && (
            <>
              <NavBar_2
                onclick={signOut}
                className="nav-bar-tab-instance"
                navbarclassName="nav-bar1"
                controltotal1="logo1"
                controlchef1="nav-bar2"
                controlchef2="nav-bar3"
                controlchef3="nav-bar4"
                navbardrop="nav-bar5"
                navbartext="nav-bar6"
                dropdowncontentexperiments="nav-bar71"
                dropdowncontenttheories="nav-bar81"
              />
              <IntroWrapper
                className="intro-4"
                divClassName="introwrap834"
                homeBannerClassName="homebanner834"
              />
              <Welcome
                abstractClassName="class-21"
                className="class-201"
                creatingAnIotLabClassName="class-15"
                ourVisionClassName="class-23"
                text="Abstract"
                text1="Our Vision"
                text2={<>Welcome To <br />control Chef</>}
                theAvailabilityOfClassName="class-17"
                welcomeToControlClassName="class-13"
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
              {/* Add an empty div to cut the height of the page */}
              <div style={{ height: 0 }}></div>
            </>
          )}
          {screenWidth >= 834 && screenWidth < 1300 && (
            <>
              <NavBar_2 
                onclick={signOut}
                className="nav-bar-tab" 
              />
              <IntroWrapper
                className="intro-instance"
                divClassName="instance-node"
                homeBannerClassName="intro-2"
              />
              <Welcome
                abstractClassName="class-22"
                className="class-20"
                creatingAnIotLabClassName="class-16"
                ourVisionClassName="class-24"
                text="Abstract"
                text1="Our Vision"
                text2="Welcome To Control Chef"
                theAvailabilityOfClassName="class-18"
                welcomeToControlClassName="class-14"
              />
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
              {/* Add an empty div to cut the height of the page */}
            <div style={{ height: 0 }}></div>
            </>
          )}

          {screenWidth >= 1300 && (
            <>
              <NavBar
                onclick={signOut}
                className="nav-bar-instance"
              />
              <IntroWrapper
              className="intro-3"
              />
              <Welcome
                className="welcome-instance"
                text="Abstract"
                text1="Our Vision"
                text2="Welcome To Control Chef"
              />
              <Footer className="footer-instance" />
              {/* Add an empty div to cut the height of the page */}
              <div style={{ height: 0 }}></div>
            </>
          )}
        </div>
      )}
    </Authenticator>
  );
};
