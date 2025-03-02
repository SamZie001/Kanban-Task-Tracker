import React from "react";
import Image from "next/image";

const page = async () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="grid h-[50%] place-content-center">
        <Image src="logo.svg" priority alt="task tracker" width={100} height={100} className="animate-ping" />
      </div>
    </div>
  );
};

export default page;
