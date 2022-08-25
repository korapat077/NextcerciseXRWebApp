import React from "react";
import { useState, useEffect } from "react";
export default function Scan() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  function getWindowDimensions() {
    if (typeof window !== "undefined") {
      const { innerWidth: width, innerHeight: height } = window;
      return {
        width,
        height,
      };
    }
  }

  useEffect(() => {
    setHeight(getWindowDimensions().height);
    setWidth(getWindowDimensions().width);
  }, []);

  return (
    <div id="targetFrame" >
      <iframe
        id="targetFrame"
        src="/scan.html"
        width={width}
        height={height}
      ></iframe>
    </div>
  );
}
