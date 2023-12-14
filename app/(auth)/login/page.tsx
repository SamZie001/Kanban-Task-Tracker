"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/app/context/userContext";

const page = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser } = useUserContext();
  const router = useRouter();

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // send request to endpoint

    // get reseult

    // set global user state to user._id
    loginUser(username);
    router.push("/tasks");
  }

  return (
    <div className="h-[100%] w-[100%] text-white flex flex-col gap-2 justify-center items-center">
      <h1 className="text-lg text-accent-2 font-semibold">~ LOGIN ~</h1>
      <div className="flex flex-col items-center gap-5 border-[1px] border-accent-1 w-[80%] md:w-[60%] p-5 rounded-xl">
        <form onSubmit={(e) => handleLogin(e)} className="form">
          <input
            required
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value.toLowerCase())}
            name="username"
            placeholder="Username"
          />

          <input
            required
            type="password"
            name="passwword"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="btn my-0 mx-auto !w-[100%] hover:bg-accent-1 hover:text-white">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;
