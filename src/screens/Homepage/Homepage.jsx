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
            background: "darkblue",
            width: { screenWidth }
          }}
        >
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
                theAvailabilityOfClassName="class-203"
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
              />
              <Welcome
                className="class-20"
              />
              <Footer
                className="footer1"
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
