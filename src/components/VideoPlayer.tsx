import React, { useEffect, useRef } from "react";

interface Props {
  source: string,
}

export const VideoPlayer = (props: Props) => {
  const videoRef = useRef(null) as any;

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
