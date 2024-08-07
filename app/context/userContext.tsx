"use client";
import { createContext, useContext, useState, useEffect } from "react";
export const UserContext = createContext<any>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{} | null>(null);

  useEffect(() => {
    const preUser = localStorage.getItem("user");
    if (preUser) loginUser(JSON.parse(preUser));
  }, []);

  const loginUser = (newUser: {}) => {
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.clear();
    location.href='/'
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
