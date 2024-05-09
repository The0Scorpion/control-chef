/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const Welcome = ({
  className,
  theAvailabilityOfClassName,
  abstractClassName,
  text = "Abstract",
  creatingAnIotLabClassName,
  ourVisionClassName,
  text1 = "Our Vision",
  welcomeToControlClassName,
  text2 = "Welcome To Control Chef",
}) => {
  return (
    <div className={`welcome ${className}`}>
      <p className={`the-availability-of ${theAvailabilityOfClassName}`}>
        The availability of educational tools is a necessity for any educational
        facility, it is of our concern that these tools are accessible and available to as many people as possible, this
        target can’t be achieved by simple technical means, it needs lots of cooperation between many disciplines in the
        engineering field. We, mechatronics students, are combining multiple engineering disciplines to achieve our goal
        of improving the process of learning, this is able to affect the experiences of all students around the globe,
        to achieve the best understanding of scientific topic and give the students as much useful information as
        possible, we have to improve our demonstration skills, and this should be done in the engineering fields
        specifically as most of them are constantly changing and new technologies are appearing. In most countries,
        engineering students usually don’t have enough demonstration means to see the applicability of the various
        topics they get exposed to during courses especially for deep sciences that don’t appear at the application
        surface level, such as ‘control theory’ which we will be discussing shortly after.
      </p>
      <div className={`abstract ${abstractClassName}`}>{text}</div>
      <p className={`creating-an-IOT-lab ${creatingAnIotLabClassName}`}>
        Creating an IOT lab for control experiments, Students can
        explore different control theories through simulations. Subsequently, they will apply their Control parameters
        to real systems, observe actual results, and receive feedback An unforgettable learning experience...
      </p>
      <div className={`our-vision ${ourVisionClassName}`}>{text1}</div>
      <div className={`welcome-to-control ${welcomeToControlClassName}`}>{text2}</div>
    </div>
  );
};

Welcome.propTypes = {
  text: PropTypes.string,
  text1: PropTypes.string,
  text2: PropTypes.string,
};
