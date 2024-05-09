/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import "./style.css";

export const HowItWorks = ({
  className,
  HowItWorksbox,
  HowItWorkstext,
  thedegreeof }) => {
  return (
    <div className={`how-it-works ${className}`}>
      <p className={`the-degree-of ${thedegreeof}`}>
        The 2 Degree Of Freedom (dof) Hovercraft Features A Planar Round Frame With Four Propellers Mounted On It. The
        Frame Is Designed To Rotate About The Pitch And Roll Axes, Providing Two Degrees Of Freedom. Each Propeller Is
        Driven By A Dc Motor Mounted At The Vertices Of The Frame.
        <br />
        the Propellers Generate Lift Forces That Directly Control The Pitch And Roll Angles Of The Hovercraft. By
        Adjusting The Thrust Of The Propellers, The Pitch And Roll Motions Can Be Controlled Independently. However,
        Since There Are Only Two Dofs, There Is No Rotation About The Yaw Axis.
        <br />
        to Ensure Stability And Balance, Two Of The Propellers Are Configured To Counter-rotate. This Configuration
        Helps To Maintain Equilibrium When The Thrust Of All Four Propellers Is Approximately Equal.
        <br />
        control Signals For Adjusting The Voltage To The Motors And For Monitoring The Pitch And Roll Angles Are Sent
        Directly Through Wires. This Wiring Setup Allows For Precise Control And Monitoring Of The Hovercraft&#39;s
        Movements.
      </p>
      <div className={`overlap-group ${HowItWorksbox}`}>
        <div className={`HOW-IT-WORKS ${HowItWorkstext}`}>-how It Works-</div>
      </div>
    </div>
  );
};
