import React from "react";
import Image from "next/image";

const page = () => {
  return (
    <div className="h-[100%] flex flex-col justify-center items-center text-liner">
      <div className="w-[60%] animate-bounce grid place-content-center">
        <Image src="404.svg" priority alt="404" width={200} height={200} />
      </div>

      <h1 className="text-[1.5rem] md:text-lg text-center px-10">
        Could not find the page you are looking for!
      </h1>
    </div>
  );
};

export default page;
