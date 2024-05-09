/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const IntroWrapper = ({
  className,
  divClassName,
  homeBannerClassName,
  homeBanner = "https://c.animaapp.com/8gKnAxyl/img/home-banner-1-1-4@2x.png",
}) => {
  return (
    <div className={`intro-wrapper ${className}`}>
      <p className={`text-wrapper-9 ${divClassName}`}>your gate to learn control</p>
      <img className={`home-banner-2 ${homeBannerClassName}`} alt="Home banner" src={homeBanner} />
    </div>
  );
};

IntroWrapper.propTypes = {
  homeBanner: PropTypes.string,
};
