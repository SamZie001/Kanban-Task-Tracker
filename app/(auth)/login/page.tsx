"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/app/context/userContext";
import axios from "axios";

const page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: null, password: null });
  const { loginUser } = useUserContext();
  const { push } = useRouter();

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post("/api/login", { username, password })
      .then((response) => {
        if (response.statusText === "OK") {
          loginUser(response.data);
          setIsLoading(false);
          push("/");
        }
      })
      .catch((error) => {
        let { username, password } = error.response.data;
        setErrors({ username, password });
        setIsLoading(false);
      });
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
          <p className="text-red-500">{errors?.username}</p>
          <input
            required
            type="password"
            name="passwword"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-red-500">{errors?.password}</p>
          <button
            disabled={isLoading}
            className="btn my-0 mx-auto !w-[100%] hover:bg-accent-1 hover:text-white"
          >
            {isLoading ? "Hold on..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;
