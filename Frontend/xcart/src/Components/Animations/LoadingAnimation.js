import React from "react";
// import { animated, useSpring } from "@react-spring/web";
// import "./Animation.css";
import { Waveform } from "@uiball/loaders";

const LoadingAnimation = () => {
  // Define the spring animation
  // const springProps = useSpring({
  //   to: async (next) => {
  //     while (true) {
  //       await next({ opacity: 1, blur: 0, y: 0 });
  //       await next({ opacity: 0.3, blur: 10, y: 20 });
  //     }
  //   },
  //   from: { opacity: 0.3, blur: 10, y: 20 },
  // });

  return (
    <div className="flex items-center justify-center h-screen">
      {/* <animated.div
        className="text-4xl text-staleGray font-bold"
        style={{
          opacity: springProps.opacity,
          filter: `blur(${springProps.blur}px)`,
          transform: `translateY(${springProps.y}px)`,
        }}
      >
        Loading....
      </animated.div> */}
      <Waveform size={40} lineWeight={3.5} speed={1} color="black" />
      <div className="waveform">
        <div className="waveform__bar"></div>
        <div className="waveform__bar"></div>
        <div className="waveform__bar"></div>
        <div className="waveform__bar"></div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
