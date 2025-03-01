"use client";
import React from "react";
import { Input } from "./ui/input";
import { useStore } from "@/lib/store";

const SearchTask = () => {
  const { searchKey, setSearchKey } = useStore();

  return (
    <Input type="text" placeholder="Find a Task" value={searchKey} onChange={(e) => setSearchKey(e.target.value)} />
  );
};

export default SearchTask;
