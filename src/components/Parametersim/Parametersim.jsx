/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React, {useState} from "react";
import "./style.css";

export const Parametersim = ({ 
  className,
  setParameterData,
  rollgroup,
  pitchgroup,
  plantimg,
  imgbox,
  plantgroup,
  arrow3,
  arrow4
 }) => {
  const [xposkp, setXPosKp] = useState(0);
  const [yposkp, setYPosKp] = useState(0);
  const [xposki, setXPosKi] = useState(0);
  const [yposki, setYPosKi] = useState(0);
  const [xposkd, setXPosKd] = useState(0);
  const [yposkd, setYPosKd] = useState(0);
  const [xvelkp, setXVelKp] = useState(0);
  const [yvelkp, setYVelKp] = useState(0);
  const [xvelki, setXVelKi] = useState(0);
  const [yvelki, setYVelKi] = useState(0);
  const [xvelkd, setXVelKd] = useState(0);
  const [yvelkd, setYVelKd] = useState(0);
  const [xposSet, setXSetPoint] = useState(0);
  const [yposSet, setYSetPoint] = useState(0);
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
      //console.log("Data:", data);
      setParameterData(data);
     
    };
  return (
    <div className={`parametersnew ${className}`}>
      <div className={`overlap ${pitchgroup}`}>
        <div className="pitch-set-point">Pitch Set Point</div>
        <div className="pitch">Pitch</div>
        <input className="pitch-input" type="number" placeholder="Pitch Angle" value={xposSet} onChange={(e) => setXSetPoint(parseFloat(e.target.value))} onBlur={updateParameterData} />
      </div>
      <div className="overlap-group">
        <div className="div">
          <div className="summation-point" />
          <img className="arrow" alt="Arrow" src="https://c.animaapp.com/8sio1tS4/img/arrow-13-1.svg" />
          <div className="text-wrapper">
            +<br />
            &nbsp;&nbsp;-
          </div>
        </div>
        <div className="overlap-2">
          <div className="summation-point" />
          <img className="img" alt="Arrow" src="https://c.animaapp.com/8sio1tS4/img/arrow-13-1.svg" />
          <div className="text-wrapper-2">
            +<br />
            &nbsp;&nbsp;-
          </div>
        </div>
        <div className="overlap-3">
          <div className="overlap-4">
            <div className="div-2" />
            <div className="text-wrapper-3">Pid</div>
            <div className="text-wrapper-4">Kp</div>
            <div className="text-wrapper-5">Ki</div>
            <input className="div-3" type="number" placeholder="kp" value={xposkp} onChange={(e) => setXPosKp(parseFloat(e.target.value))} onBlur={updateParameterData}/>
            <input className="div-4" type="number" placeholder="ki" value={xposki} onChange={(e) => setXPosKi(parseFloat(e.target.value))} onBlur={updateParameterData}/>
            <div className="text-wrapper-6">Kd</div>
            <input className="div-5" type="number" placeholder="kd" value={xposkd} onChange={(e) => setXPosKd(parseFloat(e.target.value))} onBlur={updateParameterData}/>
            <img className="arrow-2" alt="Arrow" src="https://c.animaapp.com/8sio1tS4/img/arrow-13-1.svg" />
          </div>
          <div className="overlap-5">
            <div className="div-2" />
            <div className="text-wrapper-3">Pid</div>
            <div className="text-wrapper-4">Kp</div>
            <div className="text-wrapper-5">Ki</div>
            <input className="div-3" type="number" placeholder="kp" value={xvelkp} onChange={(e) => setXVelKp(parseFloat(e.target.value))} onBlur={updateParameterData}/>
            <input className="div-4" type="number" placeholder="ki" value={xvelki} onChange={(e) => setXVelKi(parseFloat(e.target.value))} onBlur={updateParameterData}/>
            <div className="text-wrapper-6">Kd</div>
            <input className="div-5" type="number" placeholder="kd" value={xvelkd} onChange={(e) => setXVelKd(parseFloat(e.target.value))} onBlur={updateParameterData}/>
            <img className="arrow-2" alt="Arrow" src="https://c.animaapp.com/8sio1tS4/img/arrow-13-1.svg" />
          </div>
          <div className={`overlap-6 ${plantgroup}`}>
            <div className={`img-box ${imgbox}`} />
            <img className={`plant-img ${plantimg}`} alt="Plant img" src="https://c.animaapp.com/8sio1tS4/img/plant-img-1@2x.png" />
            <div className="text-wrapper-7">Plant</div>
            <img className={`arrow-3 ${arrow3}`} alt="Arrow" src="https://c.animaapp.com/8sio1tS4/img/arrow-16-1.svg" />
            <img className={`arrow-4 ${arrow4}`} alt="Arrow" src="https://c.animaapp.com/8sio1tS4/img/arrow-16-1.svg" />
          </div>
          <div className="sensed-angular">Pitch Angular Velocity</div>
          <div className="pitch-angle">Pitch Angle</div>
          <div className="roll-angle">Roll Angle</div>
          <div className="overlap-7">
            <img className="arrow-5" alt="Arrow" src="https://c.animaapp.com/8sio1tS4/img/arrow-8-1.svg" />
            <img className="line" alt="Line" src="https://c.animaapp.com/8sio1tS4/img/line-8-1.svg" />
          </div>
          <div className="overlap-8">
            <img className="arrow-6" alt="Arrow" src="https://c.animaapp.com/8sio1tS4/img/arrow-9-1.svg" />
            <img className="line-2" alt="Line" src="https://c.animaapp.com/8sio1tS4/img/line-5-1.svg" />
          </div>
          <div className="overlap-group-2">
            <div className="div-2" />
            <div className="text-wrapper-3">Pid</div>
            <div className="text-wrapper-4">Kp</div>
            <div className="text-wrapper-5">Ki</div>
            <input className="div-3" type="number" placeholder="kp" value={yposkp} onChange={(e) => setYPosKp( parseFloat(e.target.value))} onBlur={updateParameterData}/>
            <input className="div-4" type="number" placeholder="ki" value={yposki} onChange={(e) => setYPosKi(parseFloat(e.target.value))} onBlur={updateParameterData}/>
            <div className="text-wrapper-6">Kd</div>
            <input className="div-5" type="number" placeholder="kd" value={yposkd} onChange={(e) => setYPosKd(parseFloat(e.target.value))} onBlur={updateParameterData}/>
            <img className="arrow-2" alt="Arrow" src="https://c.animaapp.com/8sio1tS4/img/arrow-13-1.svg" />
          </div>
          <div className="overlap-9">
            <div className="div-2" />
            <div className="text-wrapper-3">Pid</div>
            <div className="text-wrapper-4">Kp</div>
            <div className="text-wrapper-5">Ki</div>
            <input className="div-3" type="number" placeholder="kp" value={yvelkp} onChange={(e) => setYVelKp(parseFloat(e.target.value))} onBlur={updateParameterData}/>
            <input className="div-4" type="number" placeholder="ki" value={yvelki} onChange={(e) => setYVelKi(parseFloat(e.target.value))} onBlur={updateParameterData}/>
            <div className="text-wrapper-6">Kd</div>
            <input className="div-5" type="number" placeholder="kd" value={yvelkd} onChange={(e) => setYVelKd(parseFloat(e.target.value))} onBlur={updateParameterData}/>
            <img className="arrow-2" alt="Arrow" src="https://c.animaapp.com/8sio1tS4/img/arrow-13-1.svg" />
          </div>
          <div className="sensed-angular-2">Roll Angular Velocity</div>
          <div className="overlap-10">
            <img className="arrow-7" alt="Arrow" src="https://c.animaapp.com/8sio1tS4/img/arrow-14-1.svg" />
            <img className="line-3" alt="Line" src="https://c.animaapp.com/8sio1tS4/img/line-8-1.svg" />
          </div>
          <div className="overlap-11">
            <img className="arrow-8" alt="Arrow" src="https://c.animaapp.com/8sio1tS4/img/arrow-15-1.svg" />
            <img className="line-4" alt="Line" src="https://c.animaapp.com/8sio1tS4/img/line-5-1.svg" />
          </div>
        </div>
        <div className="overlap-12">
          <div className="summation-point" />
          <img className="arrow" alt="Arrow" src="https://c.animaapp.com/8sio1tS4/img/arrow-13-1.svg" />
          <div className="text-wrapper">
            +<br />
            &nbsp;&nbsp;-
          </div>
        </div>
        <div className="overlap-13">
          <div className="summation-point" />
          <img className="img" alt="Arrow" src="https://c.animaapp.com/8sio1tS4/img/arrow-13-1.svg" />
          <div className="text-wrapper-2">
            +<br />
            &nbsp;&nbsp;-
          </div>
        </div>
      </div>
      <div className={`overlap-14 ${rollgroup}`}>
        <div className="roll-set-point">Roll Set Point</div>
        <div className="roll">Roll</div>
        <input className="pitch-input" type="number" placeholder="Roll Angle" value={yposSet} onChange={(e) => setYSetPoint(parseFloat(e.target.value))} onBlur={updateParameterData}/>
      </div>
    </div>
  );
};
