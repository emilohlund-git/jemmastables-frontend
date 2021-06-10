import React, { useEffect, useRef } from "react";

export const VideoPlayer = (props) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, [videoRef.current]);

  return (
    <video
      className="object-contain w-full"
      ref={videoRef}
      width="250"
      loop
      muted
    >
      <source src={props.source} />
    </video>
  );
};
