import React from "react";
import { useWindowWidth } from "../../breakpoints";
import { LoginBar } from "../../components/LoginBar";
import { NavLogWrapper } from "../../components/NavLogWrapper";
import "./style.css";
import  "@aws-amplify/ui-react/styles.css" ;

export const LoginAnd = () => {
  const screenWidth = useWindowWidth();

  return (
    <div className="login-and">
      <div
        className="div-2"
        style={{
          background: "linear-gradient(180deg, rgb(5, 5, 24) 0%, rgb(26.25, 26.25, 126) 100%)",
          height:
            screenWidth < 834
              ? "720px"
              : screenWidth >= 834 && screenWidth < 1300
                ? "1300px"
                : screenWidth >= 1300
                  ? "1950px"
                  : undefined,
          width:
            screenWidth < 834
              ? "360px"
              : screenWidth >= 834 && screenWidth < 1300
                ? "834px"
                : screenWidth >= 1300
                  ? "1350px"
                  : undefined,
        }}
      >
        {screenWidth < 834 && (
          <>
          <LoginBar
              className="login-bar-instance-1"
              logInClassName="instance-node-1"
              overlapGroupClassName="login-bar-9-1"
              passwordClassName="login-bar-7-1"
              usernameEmailComClassName="login-bar-4-1"
              createClassNameOverride="createclassname-1"
          />
          <NavLogWrapper 
              className="navlog834"
              maskgroup="maskgroup"/>
          </>
        )}

        {(screenWidth >= 1300 || (screenWidth >= 834 && screenWidth < 1300)) && (
          <div
            className="overlap-4"
            style={{
              height: screenWidth >= 834 && screenWidth < 1300 ? "656px" : screenWidth >= 1300 ? "746px" : undefined,
              left: screenWidth >= 834 && screenWidth < 1300 ? "23px" : screenWidth >= 1300 ? "123px" : undefined,
              top: screenWidth >= 834 && screenWidth < 1300 ? "196px" : screenWidth >= 1300 ? "165px" : undefined,
              width: screenWidth >= 834 && screenWidth < 1300 ? "793px" : screenWidth >= 1300 ? "1217px" : undefined,
            }}
          >
            {screenWidth >= 834 && screenWidth < 1300 && (
              <>
                <LoginBar
                  className="login-bar-instance"
                  logInClassName="instance-node"
                  overlapGroupClassName="login-bar-9"
                  passwordClassName="login-bar-7"
                  usernameEmailComClassName="login-bar-4"
                  createClassNameOverride="createclassname"
                />
                <NavLogWrapper className="nav-log-1" />
              </>
            )}

            {screenWidth >= 1300 && (
              <>
                <AuthForm/>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
