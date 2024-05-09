const B_l = 0.5;
const B_u = 0.5;
const FilterCoeffN = 10.0;
const J_l = 0.071440709;
const J_u = 0.049103;
let JointX_InitialPositionCondition = 0.27;
let JointY_InitialPositionCondition = -0.33;
const L_cg_l = 0.102366;
const L_cg_u = 0.066301;
const L_l = 0.223793;
const L_u = 0.227293;
const PitchLowerLimit = -0.37;
const PitchUpperLimit = 0.27;
const PitchXMotorSaturation = 50.0;
const PitchXStartThrust = 50.0;
const RollLowerLimit = -0.33;
const RollUpperLimit = 0.4;
const RollYMotorSaturation = 30.0;
const RollYStartThrust = 40.0;
const g = 9.81;
var ixposkd = 0.0;
var ixposki = 1.0;
var ixposkp = 12.0;
var ixvelkd = 0.0;
var ixvelki = 5.0;
var ixvelkp = 30.0;
var iyposkd = 0.0;
var iyposki = 1.0;
var iyposkp = 10.0;
var iyvelkd = 0.0;
var iyvelki = 5.0;
var iyvelkp = 20.0;
const mass_l = 2.495;
const mass_u = 2.024;

const Subsystem_DW = {
    Delay1_DSTATE: [0, 0, 0, 0],
    DiscreteTimeIntegrator1_DSTATE: 0,
    Integrator_DSTATE: 0,
    Filter_DSTATE: 0,
    Delay_DSTATE: [0, 0, 0, 0],
    DiscreteTransferFcn_states: 0,
    Integrator_DSTATE_h: 0,
    Filter_DSTATE_p: 0,
    Delay3_DSTATE: [0, 0, 0, 0],
    DiscreteTimeIntegrator_DSTATE: 0,
    Integrator_DSTATE_o: 0,
    Filter_DSTATE_m: 0,
    Delay2_DSTATE: [0, 0, 0, 0],
    DiscreteTransferFcn1_states: 0,
    Integrator_DSTATE_b: 0,
    Filter_DSTATE_h: 0,
    DiscreteTimeIntegrator4_DSTATE: 0,
    DiscreteTimeIntegrator3_DSTATE: 0,
    FrontMotor_states: 0,
    BackMotor_states: 0,
    LeftMotor_states: 0,
    RightMotor_states: 0,
    DiscreteTimeIntegrator5_DSTATE: 0,
    DiscreteTimeIntegrator2_DSTATE: 0
};

const Subsystem_U = { target: 0, In2: 0 };

const Subsystem_Y = {
    thetaY: 0,
    Y_posPID_ControlAction: 0,
    Y_velPID_ControlAction: 0,
    thetaY_h: 0,
    thetaX: 0,
    X_posPID_ControlAction: 0,
    X_velPID_ControlAction: 0,
    thetaX_j: 0,
};

function Subsystem_initialize() {
    Subsystem_DW.DiscreteTimeIntegrator3_DSTATE = JointY_InitialPositionCondition;
    Subsystem_DW.DiscreteTimeIntegrator2_DSTATE = JointX_InitialPositionCondition;
}

function Subsystem_terminate() {}

function rt_OneStep() {
    let OverrunFlag = false;
    if (OverrunFlag) {
        console.error("Overrun");
        return;
    }

    OverrunFlag = true;

    let Add17;
    let Add18;
    let Add21;
    let Add22;
    let Sum;
    let Sum1;
    let numAccum;
    let numAccum_0;
    let numAccum_1;
    let numAccum_2;
    let rtb_Cos;
    let rtb_Filter;
    let rtb_FilterCoefficient;
    let rtb_FilterCoefficient_b;
    let rtb_FilterCoefficient_d;
    let rtb_FilterCoefficient_h;
    let rtb_Filter_b;
    let rtb_Filter_m;
    let rtb_Switch_b;
    let tmp;
    let tmp_0;
    let tmp_1;
    let tmp_2;
    let rtb_AND3_p;
    let rtb_RelationalOperator;
    let rtb_RelationalOperator_m;

    Add17 = RollYStartThrust - Subsystem_Y.Y_velPID_ControlAction;
    Add18 = RollYStartThrust + Subsystem_Y.Y_velPID_ControlAction;
    rtb_Filter_m = Subsystem_DW.DiscreteTimeIntegrator1_DSTATE - Subsystem_DW.Delay1_DSTATE[0];
    rtb_Filter = iyposki * rtb_Filter_m;
    rtb_FilterCoefficient = (iyposkd * rtb_Filter_m - Subsystem_DW.Filter_DSTATE) * FilterCoeffN;
    Subsystem_Y.Y_posPID_ControlAction = (iyposkp * rtb_Filter_m + Subsystem_DW.Integrator_DSTATE) + rtb_FilterCoefficient;

    if (Subsystem_Y.Y_posPID_ControlAction > 1.0) {
        rtb_Filter_m = Subsystem_Y.Y_posPID_ControlAction - 1.0;
        tmp = 1;
    } else {
        if (Subsystem_Y.Y_posPID_ControlAction >= -1.0) {
            rtb_Filter_m = 0.0;
        } else {
            rtb_Filter_m = Subsystem_Y.Y_posPID_ControlAction - -1.0;
        }
        tmp = -1;
    }
    rtb_RelationalOperator = (rtb_Filter_m != 0.0);

    if (Subsystem_Y.Y_posPID_ControlAction > 1.0) {
        Subsystem_Y.Y_posPID_ControlAction = 1.0;
    } else if (Subsystem_Y.Y_posPID_ControlAction < -1.0) {
        Subsystem_Y.Y_posPID_ControlAction = -1.0;
    }

    numAccum = 0.0165 * Subsystem_DW.DiscreteTransferFcn_states;
    rtb_Filter_m = (numAccum + Subsystem_Y.Y_posPID_ControlAction) - Subsystem_DW.Delay_DSTATE[0];
    rtb_FilterCoefficient_d = (iyvelkd * rtb_Filter_m - Subsystem_DW.Filter_DSTATE_p) * FilterCoeffN;
    Subsystem_Y.Y_velPID_ControlAction = (iyvelkp * rtb_Filter_m + Subsystem_DW.Integrator_DSTATE_h) + rtb_FilterCoefficient_d;

    if (Subsystem_Y.Y_velPID_ControlAction > RollYMotorSaturation) {
        rtb_Filter_b = Subsystem_Y.Y_velPID_ControlAction - RollYMotorSaturation;
    } else if (Subsystem_Y.Y_velPID_ControlAction >= -RollYMotorSaturation) {
        rtb_Filter_b = 0.0;
    } else {
        rtb_Filter_b = Subsystem_Y.Y_velPID_ControlAction - (-RollYMotorSaturation);
    }

    rtb_Filter_m *= iyvelki;

    if (rtb_Filter_b > 0.0) {
        tmp_0 = 1;
    } else {
        tmp_0 = -1;
    }

    if (rtb_Filter_m > 0.0) {
        tmp_1 = 1;
    } else {
        tmp_1 = -1;
    }

    if ((rtb_Filter_b != 0.0) && (tmp_0 == tmp_1)) {
        rtb_Switch_b = 0.0;
    } else {
        rtb_Switch_b = rtb_Filter_m;
    }

    if (Subsystem_Y.Y_velPID_ControlAction > RollYMotorSaturation) {
        Subsystem_Y.Y_velPID_ControlAction = RollYMotorSaturation;
    } else if (Subsystem_Y.Y_velPID_ControlAction < -RollYMotorSaturation) {
        Subsystem_Y.Y_velPID_ControlAction = -RollYMotorSaturation;
    }

    Sum = Subsystem_U.target - Subsystem_DW.DiscreteTimeIntegrator1_DSTATE;
    Add21 = PitchXStartThrust - Subsystem_Y.X_velPID_ControlAction;
    Add22 = PitchXStartThrust + Subsystem_Y.X_velPID_ControlAction;
    rtb_Filter_b = Subsystem_DW.DiscreteTimeIntegrator_DSTATE - Subsystem_DW.Delay3_DSTATE[0];
    rtb_Filter_m = ixposki * rtb_Filter_b;
    rtb_FilterCoefficient_h = (ixposkd * rtb_Filter_b - Subsystem_DW.Filter_DSTATE_m) * FilterCoeffN;
    Subsystem_Y.X_posPID_ControlAction = (ixposkp * rtb_Filter_b + Subsystem_DW.Integrator_DSTATE_o) + rtb_FilterCoefficient_h;

    if (Subsystem_Y.X_posPID_ControlAction > 1.0) {
        rtb_Filter_b = Subsystem_Y.X_posPID_ControlAction - 1.0;
        tmp_0 = 1;
    } else {
        if (Subsystem_Y.X_posPID_ControlAction >= -1.0) {
            rtb_Filter_b = 0.0;
        } else {
            rtb_Filter_b = Subsystem_Y.X_posPID_ControlAction - -1.0;
        }
        tmp_0 = -1;
    }
    rtb_RelationalOperator_m = (rtb_Filter_b != 0.0);

    if (Subsystem_Y.X_posPID_ControlAction > 1.0) {
        Subsystem_Y.X_posPID_ControlAction = 1.0;
    } else if (Subsystem_Y.X_posPID_ControlAction < -1.0) {
        Subsystem_Y.X_posPID_ControlAction = -1.0;
    }

    numAccum_0 = 0.0165 * Subsystem_DW.DiscreteTransferFcn1_states;
    rtb_Filter_b = (numAccum_0 + Subsystem_Y.X_posPID_ControlAction) - Subsystem_DW.Delay2_DSTATE[0];
    rtb_FilterCoefficient_b = (ixvelkd * rtb_Filter_b - Subsystem_DW.Filter_DSTATE_h) * FilterCoeffN;
    Subsystem_Y.X_velPID_ControlAction = (ixvelkp * 0.4 * rtb_Filter_b + Subsystem_DW.Integrator_DSTATE_b) + rtb_FilterCoefficient_b;

    if (Subsystem_Y.X_velPID_ControlAction > PitchXMotorSaturation) {
        rtb_Cos = Subsystem_Y.X_velPID_ControlAction - PitchXMotorSaturation;
    } else if (Subsystem_Y.X_velPID_ControlAction >= -PitchXMotorSaturation) {
        rtb_Cos = 0.0;
    } else {
        rtb_Cos = Subsystem_Y.X_velPID_ControlAction - (-PitchXMotorSaturation);
    }
    Sum1 = Subsystem_U.In2 - Subsystem_DW.DiscreteTimeIntegrator_DSTATE;
    Subsystem_Y.thetaY = Subsystem_DW.DiscreteTimeIntegrator4_DSTATE;
    Subsystem_Y.thetaY_h = Subsystem_DW.DiscreteTimeIntegrator3_DSTATE;
    rtb_Cos = Math.cos(Subsystem_DW.DiscreteTimeIntegrator3_DSTATE);
    numAccum_1 = 0.00634 * Subsystem_DW.LeftMotor_states;
    numAccum_2 = 0.00634 * Subsystem_DW.RightMotor_states;
    Subsystem_Y.thetaX_j = Subsystem_DW.DiscreteTimeIntegrator5_DSTATE;
    Subsystem_Y.thetaX = Subsystem_DW.DiscreteTimeIntegrator2_DSTATE;
    Subsystem_DW.DiscreteTimeIntegrator1_DSTATE += 0.005 * numAccum;
    if (rtb_Filter > 0.0) {
        tmp_1 = 1;
    }
    else {
        tmp_1 = -1;
    }

    if (rtb_RelationalOperator && (tmp == tmp_1)) {
        rtb_Filter = 0.0;
    }

    Subsystem_DW.Integrator_DSTATE += 0.005 * rtb_Filter;
    Subsystem_DW.Filter_DSTATE += 0.005 * rtb_FilterCoefficient;
    Subsystem_DW.DiscreteTransferFcn_states = Sum - 0.9835 *
        Subsystem_DW.DiscreteTransferFcn_states;
    Subsystem_DW.Integrator_DSTATE_h += 0.005 * rtb_Switch_b;
    Subsystem_DW.Filter_DSTATE_p += 0.005 * rtb_FilterCoefficient_d;
    Subsystem_DW.DiscreteTimeIntegrator_DSTATE += 0.005 * numAccum_0;
    if (rtb_Filter_m > 0.0) {
        tmp = 1;
    }
    else {
        tmp = -1;
    }

    if (rtb_RelationalOperator_m && (tmp_0 == tmp)) {
        rtb_Filter_m = 0.0;
    }

    Subsystem_DW.Integrator_DSTATE_o += 0.005 * rtb_Filter_m;
    Subsystem_DW.Filter_DSTATE_m += 0.005 * rtb_FilterCoefficient_h;
    Subsystem_DW.Delay1_DSTATE[0] = Subsystem_DW.Delay1_DSTATE[1];
    Subsystem_DW.Delay_DSTATE[0] = Subsystem_DW.Delay_DSTATE[1];
    Subsystem_DW.Delay3_DSTATE[0] = Subsystem_DW.Delay3_DSTATE[1];
    Subsystem_DW.Delay2_DSTATE[0] = Subsystem_DW.Delay2_DSTATE[1];
    Subsystem_DW.Delay1_DSTATE[1] = Subsystem_DW.Delay1_DSTATE[2];
    Subsystem_DW.Delay_DSTATE[1] = Subsystem_DW.Delay_DSTATE[2];
    Subsystem_DW.Delay3_DSTATE[1] = Subsystem_DW.Delay3_DSTATE[2];
    Subsystem_DW.Delay2_DSTATE[1] = Subsystem_DW.Delay2_DSTATE[2];
    Subsystem_DW.Delay1_DSTATE[2] = Subsystem_DW.Delay1_DSTATE[3];
    Subsystem_DW.Delay_DSTATE[2] = Subsystem_DW.Delay_DSTATE[3];
    Subsystem_DW.Delay3_DSTATE[2] = Subsystem_DW.Delay3_DSTATE[3];
    Subsystem_DW.Delay2_DSTATE[2] = Subsystem_DW.Delay2_DSTATE[3];
    Subsystem_DW.Delay1_DSTATE[3] = Subsystem_DW.DiscreteTimeIntegrator3_DSTATE;
    Subsystem_DW.Delay_DSTATE[3] = Subsystem_DW.DiscreteTimeIntegrator4_DSTATE;
    Subsystem_DW.Delay3_DSTATE[3] = Subsystem_DW.DiscreteTimeIntegrator2_DSTATE;
    Subsystem_DW.Delay2_DSTATE[3] = Subsystem_DW.DiscreteTimeIntegrator5_DSTATE;
    Subsystem_DW.DiscreteTransferFcn1_states = Sum1 - 0.9835 *
        Subsystem_DW.DiscreteTransferFcn1_states;
    if (rtb_AND3_p) {
        rtb_Filter_b = 0.0;
    }

    Subsystem_DW.Integrator_DSTATE_b += 0.005 * rtb_Filter_b;
    Subsystem_DW.Filter_DSTATE_h += 0.005 * rtb_FilterCoefficient_b;
    Subsystem_DW.DiscreteTimeIntegrator4_DSTATE += ((mass_u * g * L_cg_u * Math.sin(Subsystem_DW.DiscreteTimeIntegrator3_DSTATE) - B_u *
        Subsystem_DW.DiscreteTimeIntegrator4_DSTATE) +
        (0.00634 *
            Subsystem_DW.BackMotor_states -
            0.00634 * Subsystem_DW.FrontMotor_states) *
        L_u) *
        (1.0 / J_u) * 0.005;
    Subsystem_DW.DiscreteTimeIntegrator3_DSTATE += 0.005 * Subsystem_Y.thetaY;
    if (Subsystem_DW.DiscreteTimeIntegrator3_DSTATE > RollUpperLimit) {
        Subsystem_DW.DiscreteTimeIntegrator3_DSTATE = RollUpperLimit;
    }
    else if (Subsystem_DW.DiscreteTimeIntegrator3_DSTATE < RollLowerLimit) {
        Subsystem_DW.DiscreteTimeIntegrator3_DSTATE = RollLowerLimit;
    }

    Subsystem_DW.FrontMotor_states = Add17 - -0.9512 *
        Subsystem_DW.FrontMotor_states;
    Subsystem_DW.BackMotor_states = Add18 - -0.9512 *
        Subsystem_DW.BackMotor_states;
    Subsystem_DW.LeftMotor_states = Add21 - -0.9512 *
        Subsystem_DW.LeftMotor_states;
    Subsystem_DW.RightMotor_states = Add22 - -0.9512 *
        Subsystem_DW.RightMotor_states;
    Subsystem_DW.DiscreteTimeIntegrator5_DSTATE += ((mass_l * g * L_cg_l * Math.sin(Subsystem_DW.DiscreteTimeIntegrator2_DSTATE) - B_l *
        Subsystem_DW.DiscreteTimeIntegrator5_DSTATE) +
        (numAccum_2 * rtb_Cos -
            numAccum_1 * rtb_Cos) *
        L_l) *
        (1.0 / J_l) * 0.005;
    Subsystem_DW.DiscreteTimeIntegrator2_DSTATE += 0.005 * Subsystem_Y.thetaX_j;
    if (Subsystem_DW.DiscreteTimeIntegrator2_DSTATE > PitchUpperLimit) {
        Subsystem_DW.DiscreteTimeIntegrator2_DSTATE = PitchUpperLimit;
    }
    else if (Subsystem_DW.DiscreteTimeIntegrator2_DSTATE < PitchLowerLimit) {
        Subsystem_DW.DiscreteTimeIntegrator2_DSTATE = PitchLowerLimit;
    }
    OverrunFlag = false;
}

function simulate(data) {
    // Assign the new parameter values
    ixposkp = data.xposkp;
    iyposkp = data.yposkp;
    ixposki = data.xposki;
    iyposki = data.yposki;
    ixposkd = data.xposkd;
    iyposkd = data.yposkd;
    ixvelkp = data.xvelkp;
    iyvelkp = data.yvelkp;
    ixvelki = data.xvelki;
    iyvelki = data.yvelki;
    ixvelkd = data.xvelkd;
    iyvelkd = data.yvelkd;

    Subsystem_initialize();
    let i = 0;
    const iterations = 1000;
    var SIO = {
        XPos: [],
        XVel: [],
        YPos: [],
        YVel: []
      };
    while (i < iterations) {
        rt_OneStep();
        //console.log(Subsystem_Y.thetaX, Subsystem_Y.thetaY);
        SIO.XPos.push(Subsystem_Y.thetaX);
        SIO.YPos.push(Subsystem_Y.thetaY_h);
        SIO.XVel.push(Subsystem_Y.thetaX_j);
        SIO.YVel.push(Subsystem_Y.thetaY);
        i++;
    }
    
    Subsystem_terminate();

    return SIO;
}

export { simulate };
