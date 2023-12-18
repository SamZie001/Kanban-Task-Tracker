import React from "react";
import { PagePropsI } from "../lib/interfaces";

const TaskSummary = ({ tasks }: PagePropsI) => {
  return (
    <div className="summary ">
      <p className="border-accent-1">
        <span>Opened: </span>
        {tasks?.filter((task) => task.status == "open").length}
      </p>

      <p className="border-accent-2">
        <span>Pending: </span>
        {tasks?.filter((task) => task.status == "pending").length}
      </p>

      <p className=" border-orange-500">
        <span>In Progress: </span>
        {tasks?.filter((task) => task.status == "inProgress").length}
      </p>

      <p className="border-green-500">
        <span>Complete: </span>
        {tasks?.filter((task) => task.status == "complete").length}
      </p>
    </div>
  );
};

export default TaskSummary;
