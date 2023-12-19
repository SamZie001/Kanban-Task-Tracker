"use client";
import React, { useState } from "react";
import { useUserContext } from "../context/userContext";
import Image from "next/image";
import Link from "next/link";
import { BiMenuAltRight } from "react-icons/bi";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { user, logoutUser } = useUserContext();
  return (
    <div
      className={`w-[100%] md:w-[15%] h-20 md:h-[100%] bg-secondary 
        flex flex-row md:flex-col sm:items-center md:items-start
        sm:sticky md:relative z-10`}
    >
      <div>
        <Image
          src="logo.svg"
          priority
          alt="task tracker"
          width={60}
          height={60}
          className="md:w-[50%]"
        />
      </div>

      <ul
        className={`navbar-links | hidden md:flex flex-col gap-5 
          text-base font-semibold text-white w-[100%] px-4 mt-14`}
      >
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/tasks">Task Tracker</Link>
        </li>
        {!user && (
          <li>
            <Link href="/login">Login</Link>
          </li>
        )}
        {!user && (
          <li>
            <Link href="/register">Register</Link>
          </li>
        )}
        {user && (
          <li onClick={() => logoutUser()}>
            <Link href="/">Logout</Link>
          </li>
        )}
      </ul>

      {/* mobile navbar */}
      <div className="md:hidden flex w-[100%] items-center justify-end relative pr-3">
        <BiMenuAltRight
          fontSize={50}
          className="text-liner"
          onClick={() => setToggleMenu((prev) => !prev)}
        />

        {toggleMenu && (
          <ul className="navbar-links__mobile | absolute top-[100%] bg-liner  right-0 flex flex-col items-end pr-3 pl-7 text-base font-semibold text-white">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/tasks">Task Tracker</Link>
            </li>
            {!user && (
              <li>
                <Link href="/login">Login</Link>
              </li>
            )}
            {!user && (
              <li>
                <Link href="/register">Register</Link>
              </li>
            )}
            {user && (
              <li onClick={() => logoutUser()}>
                <Link href="/">Logout</Link>
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;
