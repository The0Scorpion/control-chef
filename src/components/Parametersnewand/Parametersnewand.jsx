import React, { useState } from "react";
import "./style.css";

export const Parametersnewand = ({
  setParameterData
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

  const [isPitchPopupOpen, setIsPitchPopupOpen] = useState(false);
  const [isRollPopupOpen, setIsRollPopupOpen] = useState(false);
  const [isPitchPidPosPopupOpen, setIsPitchPidPosPopupOpen] = useState(false);
  const [isRollPidPosPopupOpen, setIsRollPidPosPopupOpen] = useState(false);
  const [isPitchPidVelPopupOpen, setIsPitchPidVelPopupOpen] = useState(false);
  const [isRollPidVelPopupOpen, setIsRollPidVelPopupOpen] = useState(false);

  const openPitchPopup = () => setIsPitchPopupOpen(true);
  const closePitchPopup = () => setIsPitchPopupOpen(false);
  const openRollPopup = () => setIsRollPopupOpen(true);
  const closeRollPopup = () => setIsRollPopupOpen(false);
  const openPitchPidPosPopup = () => setIsPitchPidPosPopupOpen(true);
  const closePitchPidPosPopup = () => setIsPitchPidPosPopupOpen(false);
  const openRollPidPosPopup = () => setIsRollPidPosPopupOpen(true);
  const closeRollPidPosPopup = () => setIsRollPidPosPopupOpen(false);
  const openPitchPidVelPopup = () => setIsPitchPidVelPopupOpen(true);
  const closePitchPidVelPopup = () => setIsPitchPidVelPopupOpen(false);
  const openRollPidVelPopup = () => setIsRollPidVelPopupOpen(true);
  const closeRollPidVelPopup = () => setIsRollPidVelPopupOpen(false);

  const savePitchInput = () => { closePitchPopup(); };
  const saveRollInput = () => { closeRollPopup(); };
  const savePitchPidPosInput = () => { closePitchPidPosPopup(); };
  const saveRollPidPosInput = () => { closeRollPidPosPopup(); };
  const savePitchPidVelInput = () => { closePitchPidVelPopup(); };
  const saveRollPidVelInput = () => { closeRollPidVelPopup(); };

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
    <div className="parametersnewand">
      <div className="group">
        <button className="pitch-input-angle" onClick={openPitchPopup}>Pitch Input Angle</button>
        {isPitchPopupOpen && (
          <div className="popup">
            <input type="number" placeholder="Pitch Angle" value={xposSet} onChange={(e) => setXSetPoint(parseFloat(e.target.value))} onBlur={updateParameterData} />
            <button onClick={savePitchInput}>OK</button>
            <button onClick={closePitchPopup}>Cancel</button>
          </div>
        )}
        <div className="overlap">
          <div className="div">
            <img className="arrow" alt="Arrow" src="https://c.animaapp.com/EAIPLOME/img/arrow-11-1.svg" />
            <div className="ellipse" />
            <div className="flexcontainer">
              <p className="text">
                <span className="text-wrapper">
                  +<br />
                </span>
              </p>
              <p className="text">
                <span className="text-wrapper">&nbsp;&nbsp;-</span>
              </p>
            </div>
          </div>
          <div className="overlap-2">
            <div className="overlap-3">
              <img className="img" alt="Arrow" src="https://c.animaapp.com/EAIPLOME/img/arrow-11-1.svg" />
              <button className="PID" onClick={openPitchPidPosPopup}>Pid</button>
              {isPitchPidPosPopupOpen && (
                <div className="popup">
                  <div className="textk">kp</div>
                  <input type="number" placeholder="kp" value={xposkp} onChange={(e) => setXPosKp(parseFloat(e.target.value))} onBlur={updateParameterData} />
                  <div className="textk">ki</div>
                  <input type="number" placeholder="ki" value={xposki} onChange={(e) => setXPosKi(parseFloat(e.target.value))} onBlur={updateParameterData} />
                  <div className="textk">kd</div>
                  <input type="number" placeholder="kd" value={xposkd} onChange={(e) => setXPosKd(parseFloat(e.target.value))} onBlur={updateParameterData} />
                  <button onClick={savePitchPidPosInput}>OK</button>
                  <button onClick={closePitchPidPosPopup}>Cancel</button>
                </div>
              )}
            </div>
            <div className="overlap-4">
              <img className="arrow" alt="Arrow" src="https://c.animaapp.com/EAIPLOME/img/arrow-11-1.svg" />
              <div className="ellipse" />
              <div className="flexcontainer-2">
                <p className="text">
                  <span className="text-wrapper">
                    +<br />
                  </span>
                </p>
                <p className="text">
                  <span className="text-wrapper">&nbsp;&nbsp;-</span>
                </p>
              </div>
              <img className="arrow-2" alt="Arrow" src="https://c.animaapp.com/EAIPLOME/img/arrow-14-1.svg" />
            </div>
            <div className="overlap-5">
              <img className="img" alt="Arrow" src="https://c.animaapp.com/EAIPLOME/img/arrow-11-1.svg" />
              <button className="PID2" onClick={openPitchPidVelPopup}>Pid</button>
              {isPitchPidVelPopupOpen && (
                <div className="popup">
                  <div className="textk">kp</div>
                  <input type="number" placeholder="kp" value={xvelkp} onChange={(e) => setXVelKp(parseFloat(e.target.value))} onBlur={updateParameterData} />
                  <div className="textk">ki</div>
                  <input type="number" placeholder="ki" value={xvelki} onChange={(e) => setXVelKi(parseFloat(e.target.value))} onBlur={updateParameterData} />
                  <div className="textk">kd</div>
                  <input type="number" placeholder="kd" value={xvelkd} onChange={(e) => setXVelKd(parseFloat(e.target.value))} onBlur={updateParameterData} />
                  <button onClick={savePitchPidVelInput}>OK</button>
                  <button onClick={closePitchPidVelPopup}>Cancel</button>
                </div>
              )}
            </div>
            <div className="overlap-6">
              <img className="img" alt="Arrow" src="https://c.animaapp.com/EAIPLOME/img/arrow-11-1.svg" />
              <button className="plant">Plant</button>
            </div>
            <div className="overlap-7">
              <img className="line" alt="Line" src="https://c.animaapp.com/EAIPLOME/img/line-34-1.svg" />
              <img className="line-2" alt="Line" src="https://c.animaapp.com/EAIPLOME/img/line-35-1.svg" />
              <img className="arrow-3" alt="Arrow" src="https://c.animaapp.com/EAIPLOME/img/arrow-14-1.svg" />
            </div>
            <div className="sensed-angular">Pitch Angular Velocity</div>
            <div className="pitch-angle">Pitch Angle</div>
            <div className="overlap-8">
              <img className="arrow-4" alt="Arrow" src="https://c.animaapp.com/EAIPLOME/img/arrow-12-1.svg" />
              <img className="arrow-5" alt="Arrow" src="https://c.animaapp.com/EAIPLOME/img/arrow-15-1.svg" />
            </div>
          </div>
          <div className="overlap-9">
            <img className="arrow" alt="Arrow" src="https://c.animaapp.com/EAIPLOME/img/arrow-11-1.svg" />
            <div className="ellipse" />
            <div className="flexcontainer">
              <p className="text">
                <span className="text-wrapper">
                  +<br />
                </span>
              </p>
              <p className="text">
                <span className="text-wrapper">&nbsp;&nbsp;-</span>
              </p>
            </div>
          </div>
          <div className="overlap-10">
            <div className="overlap-3">
              <img className="img" alt="Arrow" src="https://c.animaapp.com/EAIPLOME/img/arrow-11-1.svg" />
              <button className="PID3" onClick={openRollPidPosPopup}>Pid</button>
              {isRollPidPosPopupOpen && (
                <div className="popup">
                  <div className="textk">kp</div>
                  <input type="number" placeholder="kp" value={yposkp} onChange={(e) => setYPosKp(parseFloat(e.target.value))} onBlur={updateParameterData} />
                  <div className="textk">ki</div>
                  <input type="number" placeholder="ki" value={yposki} onChange={(e) => setYPosKi(parseFloat(e.target.value))} onBlur={updateParameterData} />
                  <div className="textk">kd</div>
                  <input type="number" placeholder="kd" value={yposkd} onChange={(e) => setYPosKd(parseFloat(e.target.value))} onBlur={updateParameterData} />
                  <button onClick={saveRollPidPosInput}>OK</button>
                  <button onClick={closeRollPidPosPopup}>Cancel</button>
                </div>
              )}
            </div>
            <div className="overlap-4">
              <img className="arrow" alt="Arrow" src="https://c.animaapp.com/EAIPLOME/img/arrow-11-1.svg" />
              <div className="ellipse" />
              <div className="flexcontainer-2">
                <p className="text">
                  <span className="text-wrapper">
                    +<br />
                  </span>
                </p>
                <p className="text">
                  <span className="text-wrapper">&nbsp;&nbsp;-</span>
                </p>
              </div>
              <img className="arrow-2" alt="Arrow" src="https://c.animaapp.com/EAIPLOME/img/arrow-14-1.svg" />
            </div>
            <div className="overlap-5">
              <img className="img" alt="Arrow" src="https://c.animaapp.com/EAIPLOME/img/arrow-11-1.svg" />
              <button className="PID4" onClick={openRollPidVelPopup}>Pid</button>
              {isRollPidVelPopupOpen && (
                <div className="popup">
                  <div className="textk">kp</div>
                  <input type="number" placeholder="kp" value={yvelkp} onChange={(e) => setYVelKp(parseFloat(e.target.value))} onBlur={updateParameterData} />
                  <div className="textk">ki</div>
                  <input type="number" placeholder="ki" value={yvelki} onChange={(e) => setYVelKi(parseFloat(e.target.value))} onBlur={updateParameterData} />
                  <div className="textk">kd</div>
                  <input type="number" placeholder="kd" value={yvelkd} onChange={(e) => setYVelKd(parseFloat(e.target.value))} onBlur={updateParameterData} />
                  <button onClick={saveRollPidVelInput}>OK</button>
                  <button onClick={closeRollPidVelPopup}>Cancel</button>
                </div>
              )}
            </div>
            <div className="overlap-11">
              <img className="line-3" alt="Line" src="https://c.animaapp.com/EAIPLOME/img/line-37-1.svg" />
              <img className="arrow-3" alt="Arrow" src="https://c.animaapp.com/EAIPLOME/img/arrow-14-1.svg" />
            </div>
            <div className="roll-angle">Roll Angle</div>
            <div className="sensed-angular-2">Roll Angular Velocity</div>
          </div>
          <img className="line-4" alt="Line" src="https://c.animaapp.com/EAIPLOME/img/line-36-1.svg" />
        </div>
        <button className="roll-input-angle" onClick={openRollPopup}>Roll Input Angle</button>
        {isRollPopupOpen && (
          <div className="popup">
            <input type="number" placeholder="Roll Angle" value={yposSet} onChange={(e) => setYSetPoint(parseFloat(e.target.value))} onBlur={updateParameterData} />
            <button onClick={saveRollInput}>OK</button>
            <button onClick={closeRollPopup}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
};
