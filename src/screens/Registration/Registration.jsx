import React from "react";
import { useWindowWidth } from "../../breakpoints";
import { NavLogWrapper } from "../../components/NavLogWrapper";
import { Registerationbar } from "../../components/Registerationbar";
import "./style.css";

export const Registration = () => {
  const screenWidth = useWindowWidth();

  return (
    <div className="registration">
      <div
        className="div-3"
        style={{
          background: "linear-gradient(180deg, rgb(5, 5, 24) 0%, rgb(28.9, 26.25, 126) 100%)",
          height:
            screenWidth < 834
              ? "1100px"
              : screenWidth >= 834 && screenWidth < 1300
                ? "1000px"
                : screenWidth >= 1300
                  ? "650px"
                  : undefined,
          width:
            screenWidth < 834
              ? "834px"
              : screenWidth >= 834 && screenWidth < 1300
                ? "834px"
                : screenWidth >= 1300
                  ? "1350px"
                  : undefined,
        }}
      >
        {screenWidth < 834 && (
          <>
            <NavLogWrapper
              className="navlog834"
              maskgroup="maskgroup" />
            <Registerationbar
              className="register11"
              overlapClassName="registration31"
              registrationClassName="registration32"
              overlapClassNameOverride="registration33"
              passwordClassName="passwordinput2"
              universityClassName="universityinput2"
              collegeClassName="collegeinput2"
              countryClassName="countryinput2"
              birthdayClassName="birthdayinput2"
              lastNameClassName="lastnameinput2"
              confirmPasswordClassName="confirmpasswordinput2"
              usernameEmailComClassName="usernameinput2"
              loginButtonClassName="logininput2"
              signInClassName="signinput2"
              alreadyHaveAnClassName="alreadyinput2"
              firstname="firstname3"
              lastname="lastname3"
              password="password3"
              college="college3"
              country="country3"
              confirmpassword="confirmpassword3"
              university="university3"
              username="username3"
              birthday="birthday3"
            />
          </>
        )}

        {screenWidth >= 834 && screenWidth < 1300 && (
          <>
            <NavLogWrapper className="nav-log-1" />
            <Registerationbar
              className="registerationbar-instance"
              overlapClassName="registration1"
              registrationClassName="registration2"
              overlapClassNameOverride="registration3"
              passwordClassName="passwordinput1"
              universityClassName="universityinput1"
              collegeClassName="collegeinput1"
              countryClassName="countryinput1"
              birthdayClassName="birthdayinput1"
              lastNameClassName="lastnameinput1"
              confirmPasswordClassName="confirmpasswordinput1"
              usernameEmailComClassName="usernameinput1"
              loginButtonClassName="logininput1"
              signInClassName="signinput1"
              alreadyHaveAnClassName="alreadyinput1"
              firstname="firstname2"
              lastname="lastname2"
              password="password2"
              college="college2"
              country="country2"
              confirmpassword="confirmpassword2"
              university="university2"
              username="username2"
              birthday="birthday2"
            />
          </>
        )}

        {screenWidth >= 1300 && (
          <>
            <NavLogWrapper className="nav-log-instance" />
            <Registerationbar
              className="registerationbar-21"
            />
          </>
        )}
      </div>
    </div>
  );
};
