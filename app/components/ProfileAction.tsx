import React from "react";
import { CiUser } from "react-icons/ci";

const ProfileAction = () => {
  return (
    <button className="grid h-8 w-8 place-content-center rounded-lg border font-bold">
      <CiUser />

      {/* display dropdown settings here */}
    </button>
  );
};

export default ProfileAction;
