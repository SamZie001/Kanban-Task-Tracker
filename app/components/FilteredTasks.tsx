import React from "react";
import { PagePropsI, TasksI } from "../lib/interfaces";
import { TaskCard } from ".";

enum StatusType {
  open = "open",
  pending = "pending",
  inProgress = "inProgress",
  complete = "complete",
}

const FilteredTasks = ({ tasks, searchKey }: PagePropsI) => {
  const colorMap: Record<StatusType, string> = {
    [StatusType.open]: "accent-1",
    [StatusType.pending]: "accent-2",
    [StatusType.inProgress]: "orange-500",
    [StatusType.complete]: "green-500",
  };

  const tasksToRender = searchKey
    ? tasks?.filter((task: TasksI) => {
        return (
          task.title.toLowerCase().includes(searchKey.toLowerCase()) ||
          task.description.toLowerCase().includes(searchKey.toLowerCase())
        );
      })
    : [];

  return (
    <div className="flex flex-col">
      <p>Search :&nbsp; "{searchKey}"</p>
      <div className="my-5 grid sm:grid-cols-1 md:grid-cols-2 gap-3">
        {tasksToRender?.map((task) => (
          <TaskCard
            _id={task._id}
            key={task._id}
            title={task.title}
            description={task.description}
            dueDate={task.dueDate}
            colorTone={colorMap[task.status as StatusType]}
          />
        ))}
      </div>
    </div>
  );
};

export default FilteredTasks;
