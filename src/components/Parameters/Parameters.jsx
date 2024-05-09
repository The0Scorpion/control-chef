/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React, {useState} from "react";
import "./style.css";

export const Parameters = ({
  className,
  textClassName,
  xPosKpClassName,
  xPosKpClassNameOverride,
  textClassNameOverride,
  yPosKpClassName,
  yPosKpClassNameOverride,
  divClassName,
  xPosKiClassName,
  xPosKiClassNameOverride,
  divClassNameOverride,
  yPosKiClassName,
  yPosKiClassNameOverride,
  textClassName1,
  xPosKdClassName,
  xPosKdClassNameOverride,
  textClassName2,
  yPosKdClassName,
  yPosKdClassNameOverride,
  textClassName3,
  xVelKpClassName,
  xVelKpClassNameOverride,
  textClassName4,
  yVelKpClassName,
  yVelKpClassNameOverride,
  textClassName5,
  xVelKiClassName,
  xVelKiClassNameOverride,
  textClassName6,
  yVelKiClassName,
  yVelKiClassNameOverride,
  textClassName7,
  xVelKdClassName,
  xVelKdClassNameOverride,
  textClassName8,
  yVelKdClassName,
  yVelKdClassNameOverride,
  textClassName9,
  xSetPointClassName,
  xSetPointClassNameOverride,
  textClassName10,
  ySetPointClassName,
  ySetPointClassNameOverride,
  pleaseEnterYourClassName,
  setParameterData,
}) => {
  const [xposkp, setXPosKp] = useState("");
  const [yposkp, setYPosKp] = useState("");
  const [xposki, setXPosKi] = useState("");
  const [yposki, setYPosKi] = useState("");
  const [xposkd, setXPosKd] = useState("");
  const [yposkd, setYPosKd] = useState("");
  const [xvelkp, setXVelKp] = useState("");
  const [yvelkp, setYVelKp] = useState("");
  const [xvelki, setXVelKi] = useState("");
  const [yvelki, setYVelKi] = useState("");
  const [xvelkd, setXVelKd] = useState("");
  const [yvelkd, setYVelKd] = useState("");
  const [xposSet, setXSetPoint] = useState("");
  const [yposSet, setYSetPoint] = useState("");

  // Function to update parameter data in the parent component
  const updateParameterData = () => {
    const data = {
      xposkp,
      yposkp,
      xposki,
      yposki,
      xposkd,
      yposkd,
      xvelkp,
      yvelkp,
      xvelki,
      yvelki,
      xvelkd,
      yvelkd,
      xposSet,
      yposSet,
    };
    setParameterData(data);
  };
  return (
    <div className={`parameters ${className}`}>
      <div className={`text ${textClassName}`}>
        <div className={`text-wrapper-7 ${xPosKpClassName}`}>X Pos Kp</div>
        <input type="number" className={`input ${xPosKpClassNameOverride}`} value={xposkp} onChange={(e) => setXPosKp(e.target.value)} onBlur={updateParameterData}/>
      </div>
      <div className={`text-2 ${textClassNameOverride}`}>
        <div className={`text-wrapper-7 ${yPosKpClassName}`}>Y Pos Kp</div>
        <input type="number" className={`input ${yPosKpClassNameOverride}`} value={yposkp} onChange={(e) => setYPosKp(e.target.value)} onBlur={updateParameterData}/>
      </div>
      <div className={`text-3 ${divClassName}`}>
        <div className={`text-wrapper-7 ${xPosKiClassName}`}>X Pos Ki</div>
        <input type="number" className={`input ${xPosKiClassNameOverride}`} value={xposki} onChange={(e) => setXPosKi(e.target.value)} onBlur={updateParameterData}/>
      </div>
      <div className={`text-4 ${divClassNameOverride}`}>
        <div className={`text-wrapper-7 ${yPosKiClassName}`}>Y Pos Ki</div>
        <input type="number" className={`input ${yPosKiClassNameOverride}`} value={yposki} onChange={(e) => setYPosKi(e.target.value)} onBlur={updateParameterData}/>
      </div>
      <div className={`text-5 ${textClassName1}`}>
        <div className={`text-wrapper-7 ${xPosKdClassName}`}>X Pos Kd</div>
        <input type="number" className={`input ${xPosKdClassNameOverride}`} value={xposkd} onChange={(e) => setXPosKd(e.target.value)} onBlur={updateParameterData}/>
      </div>
      <div className={`text-6 ${textClassName2}`}>
        <div className={`text-wrapper-7 ${yPosKdClassName}`}>Y Pos Kd</div>
        <input type="number" className={`input ${yPosKdClassNameOverride}`} value={yposkd} onChange={(e) => setYPosKd(e.target.value)} onBlur={updateParameterData}/>
      </div>
      <div className={`text-7 ${textClassName3}`}>
        <div className={`text-wrapper-7 ${xVelKpClassName}`}>X Vel Kp</div>
        <input type="number" className={`input ${xVelKpClassNameOverride}`} value={xvelkp} onChange={(e) => setXVelKp(e.target.value)} onBlur={updateParameterData}/>
      </div>
      <div className={`text-8 ${textClassName4}`}>
        <div className={`text-wrapper-7 ${yVelKpClassName}`}>Y Vel Kp</div>
        <input type="number" className={`input ${yVelKpClassNameOverride}`} value={yvelkp} onChange={(e) => setYVelKp(e.target.value)} onBlur={updateParameterData}/>
      </div>
      <div className={`text-9 ${textClassName5}`}>
        <div className={`text-wrapper-7 ${xVelKiClassName}`}>X Vel Ki</div>
        <input type="number" className={`input ${xVelKiClassNameOverride}`} value={xvelki} onChange={(e) => setXVelKi(e.target.value)} onBlur={updateParameterData}/>
      </div>
      <div className={`text-10 ${textClassName6}`}>
        <div className={`text-wrapper-7 ${yVelKiClassName}`}>Y Vel Ki</div>
        <input type="number" className={`input ${yVelKiClassNameOverride}`} value={yvelki} onChange={(e) => setYVelKi(e.target.value)} onBlur={updateParameterData}/>
      </div>
      <div className={`text-11 ${textClassName7}`}>
        <div className={`text-wrapper-7 ${xVelKdClassName}`}>X Vel Kd</div>
        <input type="number" className={`input ${xVelKdClassNameOverride}`} value={xvelkd} onChange={(e) => setXVelKd(e.target.value)} onBlur={updateParameterData} />
      </div>
      <div className={`text-12 ${textClassName8}`}>
        <div className={`text-wrapper-7 ${yVelKdClassName}`}>Y Vel Kd</div>
        <input type="number" className={`input ${yVelKdClassNameOverride}`} value={yvelkd} onChange={(e) => setYVelKd(e.target.value)} onBlur={updateParameterData}/>
      </div>
      <div className={`text-13 ${textClassName9}`}>
        <div className={`text-wrapper-7 ${xSetPointClassName}`}>X Set Point</div>
        <input type="number" className={`input ${xSetPointClassNameOverride}`} value={xposSet} onChange={(e) => setXSetPoint(e.target.value)} onBlur={updateParameterData}/>
      </div>
      <div className={`text-14 ${textClassName10}`}>
        <div className={`text-wrapper-7 ${ySetPointClassName}`}>Y Set Point</div>
        <input type="number" className={`input ${ySetPointClassNameOverride}`} value={yposSet} onChange={(e) => setYSetPoint(e.target.value)} onBlur={updateParameterData}/>
      </div>
      <p className={`please-enter-your ${pleaseEnterYourClassName}`}>Please Enter Your Parameters Below:</p>
    </div>
  );
};
