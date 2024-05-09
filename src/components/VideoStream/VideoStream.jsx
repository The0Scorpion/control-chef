/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";
import "./style.css";

export const VideoStream = ({
  className,
  videoStreamClassNameOverride,
}) => {
  const streamUrl = 'rtmp://live.mux.com/app';
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.src = streamUrl;
    video.play().catch(error => {
      console.error('Error auto-playing the video:', error);
    });
  }, [streamUrl]);

  return (
    <div className={`video-stream ${className}`}>
      <p className={`text-wrapper-6 ${videoStreamClassNameOverride}`}>Video Stream</p>
      <video ref={videoRef} id="liveStream" controls=""></video>
    </div>
  );
};

VideoStream.propTypes = {
  videoStream: PropTypes.string,
};

