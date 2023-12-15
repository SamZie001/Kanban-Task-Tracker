import React from "react";
import { PagePropsI } from "../interfaces";
import { MdAdd } from "react-icons/md";
import { useUserContext } from "../context/userContext";

const TopBar = ({ searchKey, setSearchKey, setShowAddForm }: PagePropsI) => {
  const { user } = useUserContext();
  const parsedUser = JSON.parse(user);

  function isLetter(char: string) {
    const charCode = char.charCodeAt(0);
    return (
      (charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)
    );
  }

  return (
    <div className="text-white flex flex-col-reverse md:flex-row justify-between items-center gap-5">
      <div className="border-[1px] border-secondary w-[100%] md:w-[80%] rounded-lg flex justify-between overflow-hidden">
        <input
          className="w-[90%] bg-transparent px-4 py-2 outline-none"
          type="text"
          value={searchKey}
          placeholder="Find a Task"
          // @ts-ignore
          onChange={(e) => setSearchKey(e.target.value)}
        />
      </div>

      <div className="flex flex-row-reverse md:flex-row justify-between w-[100%] md:w-max gap-5">
        <div
          onClick={() => {
            // @ts-ignore
            setShowAddForm(true);
          }}
          className="cursor-pointer grid place-content-center w-10 h-10 bg-accent-1 border-[1px] border-accent-1 rounded-lg hover:bg-transparent hover:text-liner"
        >
          <MdAdd fontSize={30} />
        </div>
        <div className="rounded-full w-10 h-10 grid place-content-center font-bold bg-liner animate-pulse">
          {parsedUser &&
            (isLetter(parsedUser.username[0])
              ? parsedUser.username[0].toUpperCase()
              : "👀")}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
