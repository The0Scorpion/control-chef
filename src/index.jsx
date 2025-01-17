import "../global.css";
import "../styleguide.css";
import React from "react";
import ReactDOMClient from "react-dom/client";
import { createBrowserRouter, RouterProvider, useLocation } from "react-router-dom";
import { HoverDocumentation } from "./screens/HoverDocumentation";
import { Homepage } from "./screens/Homepage";
import { BallBalance } from "./screens/BallBalance";
import { Pendulum } from "./screens/Pendulum";
import { Servo } from "./screens/Servo";
import { HoverRT } from "./screens/HoverRT";
import { HoverSim } from "./screens/HoverSim";
import { AboutUS } from "./screens/AboutUS";
import { ContactUS } from "./screens/ContactUS";
import { Amplify } from "aws-amplify";
import awsConfig from "./aws-export";
Amplify.configure(awsConfig);

const app = document.getElementById("app");
const root = ReactDOMClient.createRoot(app);

function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    console.log("ScrollToTop component triggered");
    console.log(pathname);
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/About-US",
    element: <AboutUS />,
  },
  {
    path: "/Contact-US",
    element: <ContactUS />,
  },
  {
    path: "/Hover-Documentation/",
    element: <HoverDocumentation />,
  },
  {
    path: "/hover-simulation/",
    element: <HoverSim />,
  },
  {
    path: "/hover-realtime",
    element: <HoverRT />,
  },
  {
    path: "/simulation-ballbalance/",
    element: <BallBalance />,
  },
  {
    path: "/simulation-servo/",
    element: <Servo />,
  },
  {
    path: "/simulation-pendulum/",
    element: <Pendulum />,
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <ScrollToTop />
    </RouterProvider>
  </React.StrictMode>
);
