import React from "react";
import Image from "next/image";

const page = async () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="h-[50%] grid place-content-center">
        <Image
          src="logo.svg"
          priority
          alt="task tracker"
          width={100}
          height={100}
          className="animate-ping"
        />
      </div>
    </div>
  );
};

export default page;
