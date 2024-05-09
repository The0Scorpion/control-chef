import React from "react";
import { useWindowWidth } from "../../breakpoints";
import { Footer } from "../../components/Footer";
import { NavBar } from "../../components/NavBar";
import { NavBar_2 } from "../../components/NavBar_2";
import { TestimonialsWrapper } from "../../components/TestimonialsWrapper";
import { Welcome } from "../../components/Welcome";
import { IntroWrapper } from "../../components/IntroWrapper";
import "./style.css";

export const Homepage = () => {
  const screenWidth = useWindowWidth();
  return (
    <div
      className="welcome-and"
      style={{
        background: "linear-gradient(135deg, rgb(5, 5, 24) 60%, rgb(26.25, 26.25, 126) 100%)",
        height:
          screenWidth < 834
            ? "2465px"
            : screenWidth >= 834 && screenWidth < 1300
              ? "1920px"
              : screenWidth >= 1300
                ? "2100px"
                : undefined,
        width:"100%"
      }}
    >
      {screenWidth < 834 && (
        <>
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
          <TestimonialsWrapper
            className="testimonials-instance"
            divClassName="testimonials-91"
            divClassName1="testimonials-91"
            divClassName2="testimonials-101"
            divClassName3="testimonials-91"
            divClassName4="testimonials-101"
            divClassNameOverride="testimonials-10"
            ellipseClassName="testimonials-81"
            ellipseClassName1="testimonials-81"
            ellipseClassNameOverride="testimonials-81"
            imgClassName="testimonials-71"
            maskGroupClassName="testimonials-71"
            maskGroupClassNameOverride="testimonials-71"
            overlapClassName="testimonials-51"
            overlapClassNameOverride="testimonials-51"
            overlapGroupClassName="testimonials-51"
            overlapGroupClassNameOverride="testimonials-131"
            overlapWrapperClassName="testimonials-121"
            readWhatOthersClassName="testimonials-141"
            rectangleClassName="testimonials-61"
            rectangleClassName1="testimonials-61"
            rectangleClassNameOverride="testimonials-61"
            testimonialItemClassName="testimonials-41"
            testimonialItemClassNameOverride="testimonials-111"
            testimonialsClassName="testimonials-151"
          />
          <IntroWrapper
            className="intro-4"
            divClassName="introwrap834"
            homeBannerClassName="homebanner834"
          />
          <NavBar_2
            className="nav-bar-tab-instance"
            navbarclassName="nav-bar1"
            controltotal1="nav-bar9"
            controlchef1="nav-bar2"
            controlchef2="nav-bar3"
            controlchef3="nav-bar4"
            navbardrop="nav-bar5"
            navbartext="nav-bar6"
            dropdowncontentexperiments="nav-bar71"
            dropdowncontenttheories="nav-bar81"
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

      {screenWidth >= 834 && screenWidth < 1300 && (
        <>
          <NavBar_2 className="nav-bar-tab" />
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
          <TestimonialsWrapper
            className="testimonials-3"
            divClassName="testimonials-9"
            divClassName1="testimonials-9"
            divClassName2="testimonials-10"
            divClassName3="testimonials-9"
            divClassName4="testimonials-10"
            divClassNameOverride="testimonials-10"
            ellipseClassName="testimonials-8"
            ellipseClassName1="testimonials-8"
            ellipseClassNameOverride="testimonials-8"
            img="https://c.animaapp.com/8gKnAxyl/img/mask-group-26@2x.png"
            imgClassName="testimonials-7"
            maskGroup="https://c.animaapp.com/8gKnAxyl/img/mask-group-25@2x.png"
            maskGroup1="https://c.animaapp.com/8gKnAxyl/img/mask-group-27@2x.png"
            maskGroupClassName="testimonials-7"
            maskGroupClassNameOverride="testimonials-7"
            overlapClassName="testimonials-5"
            overlapClassNameOverride="testimonials-5"
            overlapGroupClassName="testimonials-5"
            overlapGroupClassNameOverride="testimonials-13"
            overlapWrapperClassName="testimonials-12"
            readWhatOthersClassName="testimonials-14"
            rectangleClassName="testimonials-6"
            rectangleClassName1="testimonials-6"
            rectangleClassNameOverride="testimonials-6"
            testimonialItemClassName="testimonials-4"
            testimonialItemClassNameOverride="testimonials-11"
            testimonialsClassName="testimonials-15" />
          <IntroWrapper
            className="intro-instance"
            divClassName="instance-node"
            homeBannerClassName="intro-2"
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
            overlab2="overlab2footer"
            overlapwrapper="overlapwrapperfooter1"
            rectangle="rectanglefooter1"
            copyright="copyrightfooter1"
          />
        </>
      )}

      {screenWidth >= 1300 && (
        <>
          <Footer className="footer-instance" />
          <TestimonialsWrapper
            className="testimonials-16"
            img="https://c.animaapp.com/8gKnAxyl/img/mask-group-33@2x.png"
            maskGroup="https://c.animaapp.com/8gKnAxyl/img/mask-group-33@2x.png"
            maskGroup1="https://c.animaapp.com/8gKnAxyl/img/mask-group-33@2x.png"
          />
          <Welcome
            className="welcome-instance"
            text="Abstract"
            text1="Our Vision"
            text2="Welcome To Control Chef"
          />
          <IntroWrapper
            className="intro-3"
          />
          <NavBar
            className="nav-bar-instance"
          />
        </>
      )}
    </div>
  );
};
