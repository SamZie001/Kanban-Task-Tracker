"use client";
import React, { useState } from "react";

const page = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // send request to endpoint

    // get reseult

    // redirect to login
    console.log(username, password);
  }
  
  return (
    <div className="h-[100%] w-[100%] text-white flex flex-col gap-2 justify-center items-center">
      <h1 className="text-lg text-accent-2 font-semibold">~ REGISTER ~</h1>
      <div className="flex flex-col items-center gap-5 border-[1px] border-accent-1 w-[80%] md:w-[60%] p-5 rounded-xl">
        <form onSubmit={(e) => handleRegister(e)} className="form">
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
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;
