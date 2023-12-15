import React, { useState } from "react";

const Overlay = ({ children }: { children: React.ReactNode }) => {
  const [showOverlay, setShowOverlay] = useState(true);
  return (
    <div
      className={`z-20 fixed top-0 left-0 w-[100vw] h-[100vh] bg-black/95 ${
        !showOverlay && "hidden"
      }`}
      onClick={() => {
        setShowOverlay((prev) => !prev);
      }}
    >
      {children}
    </div>
  );
};

export default Overlay;
