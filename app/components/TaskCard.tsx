import React from "react";
import { CardI } from "../interfaces";

const TaskCard = ({
  title,
  description,
  dueDate,
  provided,
  snapshot,
  colorTone,
}: CardI) => {
  return (
    <div
      className={`w-[100%] min-h-[100px] text-white rounded-lg bg-liner flex flex-col p-2 select-none ${
        snapshot?.isDragging && `border-[2px] border-${colorTone} bg-secondary`
      }`}
      ref={provided?.innerRef}
      {...provided?.draggableProps}
      {...provided?.dragHandleProps}
      style={provided?.draggableProps.style}
    >
      <div className="h-[100%]">
        <p className="font-semibold">{title}</p>
        <p className="text-sm pt-2">{description}</p>
      </div>
      <p
        className={`text-[0.5rem] self-end pb-1 border-b-[2px] w-max border-${colorTone}`}
      >
        Due: &nbsp;{dueDate}
      </p>
    </div>
  );
};

export default TaskCard;
