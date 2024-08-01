"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/app/context/userContext";
import { ActivitySpinner } from "@/app/components";
import { AuthErrorsI } from "@/app/lib/interfaces";
import axios from "axios";

const page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<AuthErrorsI>({
    username: null,
    password: null,
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { loginUser } = useUserContext();
  const router = useRouter();

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsLoading(true);
    axios
      .post("/api/login", { username, password })
      .then((response) => {
        if (response.status === 200) {
          loginUser(response.data);
          router.push("/tasks");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        let { username, password } = error.response.data;
        setErrors({ username, password });
        setIsLoading(false);
      });
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
      <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-secondary border-accent-1">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
            Login
          </h1>
          <form
            className="space-y-4 md:space-y-6"
            onSubmit={(e) => handleLogin(e)}
          >
            <div>
              <label className="block mb-2 text-sm font-medium text-white">
                Your Username
              </label>
              <input
                type="text"
                className="border text-sm rounded-lg w-full p-2.5 bg-gray-700 border-gray-600 text-white outline-none"
                value={username}
                disabled={isLoading}
                onChange={(e) => setUsername(e.target.value.toLowerCase())}
                name="username"
                placeholder="Username"
                autoComplete="off"
                required
              />
              <p className="text-red-500 text-xs py-1">{errors?.username}</p>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-white">
                Password
              </label>
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                disabled={isLoading}
                className="border text-sm rounded-lg w-full p-2.5 bg-gray-700 border-gray-600 text-white outline-none"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="off"
              />
              <p className="text-red-500 text-xs py-1">{errors?.password}</p>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                className="accent-accent-1 cursor-pointer"
                checked={passwordVisible}
                onChange={() => setPasswordVisible((prev) => !prev)}
              />
              <label className="text-gray-500">show password</label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn !w-full flex items-center justify-center"
            >
              {isLoading ? <ActivitySpinner /> : "Login"}
            </button>

            <p className="text-sm font-light text-gray-400">
              Don't have an account? &nbsp;&nbsp;
              <a
                href="/register"
                className="font-medium text-accent-1 hover:underline"
              >
                Register here
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
