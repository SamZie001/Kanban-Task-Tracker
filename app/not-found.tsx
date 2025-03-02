import React from "react";
import Image from "next/image";

const page = () => {
  return (
    <div className="flex h-[100%] flex-col items-center justify-center text-liner">
      <div className="grid w-[60%] animate-bounce place-content-center">
        <Image src="404.svg" priority alt="404" width={200} height={200} />
      </div>

      <h1 className="px-10 text-center text-[1.5rem] md:text-lg">Could not find the page you are looking for!</h1>
    </div>
  );
};

export default page;
