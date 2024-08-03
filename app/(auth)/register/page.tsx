"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ActivitySpinner } from "@/app/components";
import { AuthErrorsI } from "@/app/lib/interfaces";

const page = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errors, setErrors] = useState<AuthErrorsI>({
    username: null,
    password: null,
    confirmPassword: null,
  });
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const router = useRouter();

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (confirmPassword !== password) {
      setIsLoading(false);
      return setErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match",
      }));
    }

    axios
      .post("/api/register", { username, password })
      .then((response) => {
        if (response.statusText === "OK") {
          setIsLoading(false);
          alert("Register success 👍");
          router.push("/login");
        }
      })
      .catch((error) => {
        let { username, password } = error.response.data;
        setErrors({ username, password, confirmPassword: null });
        setIsLoading(false);
      });
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
      <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-secondary border-accent-1">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
            Register
          </h1>
          <form
            className="space-y-4 md:space-y-6"
            onSubmit={(e) => handleRegister(e)}
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
                required
                autoComplete="off"
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
            <div>
              <label className="block mb-2 text-sm font-medium text-white">
                Confirm Password
              </label>
              <input
                type={passwordVisible ? "text" : "password"}
                disabled={isLoading}
                placeholder="Confirm Password"
                className="border text-sm rounded-lg w-full p-2.5 bg-gray-700 border-gray-600 text-white outline-none"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="off"
              />
              <p className="text-red-500 text-xs py-1">
                {errors?.confirmPassword}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                className="accent-accent-1 cursor-pointer"
                checked={passwordVisible}
                disabled={isLoading}
                onChange={() => setPasswordVisible((prev) => !prev)}
              />
              <label className="text-gray-500">show password</label>
            </div>

            <button
              type="submit"
              disabled={isLoading || !username.length || !password.length}
              className="btn !w-full flex items-center justify-center"
            >
              {isLoading ? <ActivitySpinner /> : "Register"}
            </button>

            <p className="text-sm font-light text-gray-400">
              Already have an account? &nbsp;&nbsp;
              <a
                href="/login"
                className="font-medium text-accent-1 hover:underline"
              >
                Login here
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
