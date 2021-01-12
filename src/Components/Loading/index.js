import React from "react";
import "./Loading.scss";

const Loading = () => {
  return (
    <div data-testid="loading-animation" className="loading-wrapper">
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </div>
  );
};

export default Loading;
