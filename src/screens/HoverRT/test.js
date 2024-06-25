import React, { useState, useEffect } from "react";
import { useWindowWidth } from "../../breakpoints";
import { useLocation } from "react-router-dom";
import { Buttons } from "../../components/Buttons";
import { Footer } from "../../components/Footer";
import { Graphs } from "../../components/Graphs";
import { Results } from "../../components/Results";
import { NavBar } from "../../components/NavBar";
import { NavBar_2 } from "../../components/NavBar_2";
import { Parametersnew } from "../../components/Parametersnew";
import { Parameters } from "../../components/Parameters";
import { SimulationStreaming } from "../../components/SimulationStreaming";
import { Next } from "../../components/Next";
import { URDFViewer } from "../../components/URDFViewer";
import { Amplify } from "aws-amplify";
import { fetchAuthSession } from "@aws-amplify/auth"; // Import Auth from @
import awsConfig from "../../aws-export"; // Ensure the file path is correct
import { withAuthenticator, Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "./style.css";

// Configure AWS Amplify with your aws-export.js configuration
Amplify.configure(awsConfig);

export const HoverRTcomponent = () => {
  const location = useLocation();
  const screenWidth = useWindowWidth();
  const [scrollToTop, setScrollToTop] = useState(false);
  const [parameterData, setParameterData] = useState(null);
  const [Work, setWork] = useState(0);
  const [JointAngle1, setJointAngle1] = useState(0);
  const [JointAngle2, setJointAngle2] = useState(0);
  const urdfUrl1 = '2dofhover/urdf/2dofhover.urdf';
  const [idToken, setIdToken] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const [xPosArr, setXPosArr] = useState([]);
  const [yPosArr, setYPosArr] = useState([]);
  const [xVelArr, setXVelArr] = useState([]);
  const [yVelArr, setYVelArr] = useState([]);

  const [Xovershoot, setXovershoot] = useState(0);
  const [Yovershoot, setYovershoot] = useState(0);
  const [XError, setXError] = useState(0);
  const [YError, setYError] = useState(0);
  const [xtime, setXtime] = useState(0);
  const [ytime, setYtime] = useState(0);

  // Function to calculate overshoot
  const calculateOvershoot = (simData, setp) => {
    // Find the direction of movement based on the sign of the first point
    const initialSign = Math.sign(simData[0] - setp);

    // Initialize variables to track the index of the first zero crossing and the extreme value after crossing
    let indexOfFirstZeroCrossing = -1;
    let extremeValueAfterCrossing = null;

    // Iterate through the data to find the first zero crossing
    for (let i = 1; i < simData.length; i++) {
      // Check if the current point crosses zero from the initial sign
      if (Math.sign(simData[i] - setp) !== initialSign) {
        indexOfFirstZeroCrossing = i;
        break;
      }
    }

    // If no zero crossing is found, there's no overshoot
    if (indexOfFirstZeroCrossing === -1) {
      return { overshoot: 0, indexOfFirstZeroCrossing };
    }

    // Determine whether to look for the maximum or minimum value after the zero crossing
    const lookForMaxValue = initialSign === 1; // If initial sign is positive, look for maximum value

    // Find the extreme value after the zero crossing
    for (let i = indexOfFirstZeroCrossing; i < simData.length; i++) {
      // If looking for maximum value, update extremeValueAfterCrossing if current value is greater
      if (lookForMaxValue && (extremeValueAfterCrossing === null || simData[i] > extremeValueAfterCrossing)) {
        extremeValueAfterCrossing = simData[i] - setp;
      }
      // If looking for minimum value, update extremeValueAfterCrossing if current value is lesser
      else if (!lookForMaxValue && (extremeValueAfterCrossing === null || simData[i] < extremeValueAfterCrossing)) {
        extremeValueAfterCrossing = simData[i] - setp;
      }
    }

    // Calculate the overshoot as the difference between the extreme value and the initial set point
    return { overshoot: Math.abs(extremeValueAfterCrossing), indexOfFirstZeroCrossing };
  };

  // Function to calculate variance
  const calculateVariance = (simData, setp) => {
    // Find the direction of movement based on the sign of the first point
    const initialSign = Math.sign(simData[0] - setp);

    // Initialize variables to track the index of the first sign flip and the data after the flip
    let indexOfFirstSignFlip = -1;
    let dataAfterSignFlip = [];

    // Iterate through the data to find the first sign flip
    for (let i = 1; i < simData.length; i++) {
      // Check if the current point changes sign from the initial sign
      if (Math.sign(simData[i] - setp) !== initialSign) {
        indexOfFirstSignFlip = i;
        dataAfterSignFlip = simData.slice(indexOfFirstSignFlip + 1);
        break;
      }
    }

    // If no sign flip is found, return 0 variance
    if (indexOfFirstSignFlip === -1) return 0;

    // Calculate the mean of the data after the sign flip
    const mean = dataAfterSignFlip.reduce((acc, val) => acc + val, 0) / dataAfterSignFlip.length;

    // Calculate the squared differences from the mean
    const squaredDifferences = dataAfterSignFlip.map((val) => (val - mean) ** 2);

    // Calculate the variance
    const variance = squaredDifferences.reduce((acc, val) => acc + val, 0) / dataAfterSignFlip.length;

    return variance;
  };

  useEffect(() => {
    if (xPosArr.length > 0 && yPosArr.length > 0 ) {
      console.log("Calculating overshoot and errors...");
      
      // Calculate overshoot
      const XovershootResult = calculateOvershoot(xPosArr, parameterData.xposSet);
      const YovershootResult = calculateOvershoot(yPosArr, parameterData.yposSet);
      console.log("XovershootResult:", XovershootResult);
      console.log("YovershootResult:", YovershootResult);
      
      // Calculate XError and YError
      const newXError = Math.abs(parameterData.xposSet - xPosArr[xPosArr.length - 1]);
      const newYError = Math.abs(parameterData.yposSet - yPosArr[yPosArr.length - 1]);
      console.log("New XError:", newXError);
      console.log("New YError:", newYError);
      
      // Calculate xtime and ytime
      setXtime(XovershootResult.indexOfFirstZeroCrossing * 0.05);
      setYtime(YovershootResult.indexOfFirstZeroCrossing * 0.05);
      
      // Update state variables
      setXovershoot(XovershootResult.overshoot);
      setYovershoot(YovershootResult.overshoot);
      setXError(newXError);
      setYError(newYError);
    }
  }, [parameterData, xPosArr, yPosArr]);

  // Fetch the current session to obtain tokens
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const session = await fetchAuthSession(); // Assuming fetchAuthSession() retrieves the session object

        console.log("session:", session);

        const idTokenPayload = session.tokens.idToken.payload;
        const accessTokenPayload = session.tokens.accessToken.payload;

        console.log("idTokenPayload:", idTokenPayload);
        console.log("accessTokenPayload:", accessTokenPayload);

        setIdToken(idTokenPayload); // Assuming setIdToken is a state setter function
        setAccessToken(accessTokenPayload); // Assuming setAccessToken is a state setter function

        console.log("idToken:", idTokenPayload); // Ensure idTokenPayload is not null here
        console.log("Access Token:", accessTokenPayload); // Ensure accessTokenPayload is not null here

      } catch (err) {
        console.log("Error fetching session:", err);
      }
    };

    fetchSession();
  }, []);

  const sendDataToLambda = () => {
    if (!parameterData) {
      console.error("No parameter data to send.");
      return;
    }

    fetch("https://rq0btgzijg.execute-api.eu-west-3.amazonaws.com/teststage", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': idToken // Ensure Auth is used correctly here
      },
      body: JSON.stringify(parameterData)
    })
    .then(response => response.json())
    .then(data => {
      console.log("Response from Lambda:", data);
    })
    .catch(error => {
      console.error("Error sending data to Lambda:", error);
    });
  };

  return (
    <div className="hover-rt">
      {/* Your component JSX goes here */}
    </div>
  );
};

export const HoverRT = withAuthenticator(HoverRTcomponent);
