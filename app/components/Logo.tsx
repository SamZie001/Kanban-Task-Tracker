import React from "react";
import Image from "next/image";
import { LogoI } from "../lib/interfaces";

const Logo = ({ size = 60, iconOnly = false }: LogoI) => {
  return (
    <div className="flex items-center gap-1">
      <Image src="logo.svg" priority alt="" width={size} height={size} />
      {!iconOnly && <span className="text-base font-semibold md:text-lg">MaiBoard</span>}
    </div>
  );
};

export default Logo;
