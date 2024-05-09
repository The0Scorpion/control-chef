import React from "react";
import { useWindowWidth } from "../../breakpoints";
import {Link} from "react-router-dom"
import { URDFViewer } from "../../components/URDFViewer";
import "./style.css";

export const Servo = () => {
  const screenWidth = useWindowWidth();
  return (
    <>
    <div>Servo</div>
    <button><Link to="/">homepage</Link></button>
    <URDFViewer
      urdfUrl="/__parcel_source_root/src/2dofhover/urdf/2dofhover.urdf"/>
    </>
  );
};
