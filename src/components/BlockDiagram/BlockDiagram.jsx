import React from "react";
import "./style.css";

export const BlockDiagram = ({
  className
}) => {
  return (
    <div className={`block-diagram ${className}`}>
      <img className="img" src="https://c.animaapp.com/QXwh4ZEY/img/block-diagram-1.svg" alt="Block Diagram" />
    </div>
  );
};
