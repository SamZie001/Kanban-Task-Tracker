"use client";
import React, { useState } from "react";
import { useUserContext } from "../context/userContext";
import { NavLinkI } from "../lib/interfaces";
import Image from "next/image";
import Link from "next/link";
import {
  MdHome,
  MdLogin,
  MdLogout,
  MdOutlineMenu,
  MdOutlineClose,
} from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { AiOutlineUserAdd } from "react-icons/ai";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const { user, logoutUser } = useUserContext();
  const links: NavLinkI[] = [
    {
      title: "Home",
      href: "/",
      icon: <MdHome />,
      condition: true,
    },
    {
      title: "Tasks",
      href: "/tasks",
      icon: <FaTasks />,
      condition: user,
    },
    {
      title: "Login",
      href: "/login",
      icon: <MdLogin />,
      condition: !user,
    },
    {
      title: "Register",
      href: "/register",
      icon: <AiOutlineUserAdd />,
      condition: !user,
    },
    {
      title: "Logout",
      href: "/",
      icon: <MdLogout />,
      condition: user,
      onClick: () => logoutUser(),
    },
  ];

  return (
    <aside className="p-4 w-full md:w-[20%] gap-10 h-24 md:h-full bg-secondary flex flex-row md:flex-col sm:items-center md:items-start sm:sticky md:relative z-10">
      <Image src="logo.svg" priority alt="" width={120} height={120} />

      <div className="space-y-2 font-medium hidden md:block md:w-full">
        {links.map(
          (link, ind) =>
            link.condition && (
              <Link
                href={link.href}
                key={ind}
                onClick={link?.onClick}
                className="duration-300 ease-in-out flex gap-3 items-center p-2 rounded-lg text-white hover:bg-gray-700"
              >
                <span className="text-accent-1 text-lg">{link.icon}</span>
                <span className="ms-3 font-semibold">{link.title}</span>
              </Link>
            )
        )}
      </div>

      {/* mobile navbar */}
      <div className="md:hidden flex w-[100%] items-center justify-end relative pr-3">
        <button
          className="text-lg flex gap-2 items-center p-1 rounded-md bg-liner text-accent-1"
          onClick={() => setToggleMenu(true)}
        >
          <MdOutlineMenu />
        </button>

        <div
          className={`${
            toggleMenu ? "flex" : "hidden"
          } space-y-2 font-medium w-full fixed top-0 left-0 h-screen bg-secondary flex-col items-center justify-center`}
        >
          <button
            className="absolute top-5 right-5 text-lg flex gap-2 items-center p-1 rounded-md bg-liner text-red-400"
            onClick={() => setToggleMenu(false)}
          >
            <MdOutlineClose />
          </button>
          {links.map(
            (link, ind) =>
              link.condition && (
                <Link
                  href={link.href}
                  key={ind}
                  onClick={link?.onClick}
                  className="duration-300 ease-in-out flex gap-3 items-center p-2 rounded-lg text-white hover:bg-gray-700"
                >
                  <span className="font-semibold">{link.title}</span>
                </Link>
              )
          )}
        </div>
      </div>
    </aside>
  );
};

export default Navbar;
