"use client";
import React, { useState } from "react";
import { CardI } from "../interfaces";
import { MdEdit, MdCheck } from "react-icons/md";

const TaskCard = ({
  title,
  description,
  dueDate,
  provided,
  snapshot,
  colorTone,
}: CardI) => {
  const [editMode, setEditMode] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedDesc, setUpdatedDesc] = useState(description);

  const handleTaskEdit = () => {
    setEditMode(false);
  };

  return (
    <form
      className={`w-[100%] min-h-[100px] h-auto text-white rounded-lg bg-liner flex flex-col p-2 select-none ${
        snapshot?.isDragging && `border-[2px] border-${colorTone} bg-secondary`
      }`}
      ref={provided?.innerRef}
      {...provided?.draggableProps}
      {...provided?.dragHandleProps}
      style={provided?.draggableProps.style}
    >
      <div className="flex justify-end">
        {!editMode && (
          <button
            onClick={() => setEditMode(true)}
            className={`text-sm flex gap-2 items-center bg-${colorTone} p-1 rounded-md`}
          >
            <p>Edit</p>
            <MdEdit />
          </button>
        )}
        {editMode && (
          <button
            onClick={() => handleTaskEdit()}
            className={`text-sm flex gap-2 items-center bg-green-600 p-1 rounded-md`}
          >
            <p>Confirm</p>
            <MdCheck />
          </button>
        )}
      </div>

      <div className="h-[100%]">
        <input
          className={`font-semibold bg-transparent outline-none ${
            editMode && `border-b-[1px] border-dotted border-${colorTone}`
          }`}
          type="text"
          value={updatedTitle}
          disabled={!editMode}
          onChange={(e) => setUpdatedTitle(e.target.value)}
        />
        <textarea
          value={updatedDesc}
          disabled={!editMode}
          onChange={(e) => setUpdatedDesc(e.target.value)}
          className={`TEXTAREA | pr-1 w-[100%] text-sm mt-1 bg-transparent outline-none ${
            editMode && `border-b-[1px] border-dotted border-${colorTone}`
          }`}
        />
      </div>

      <p
        className={`text-[0.5rem] self-end pb-1 border-b-[2px] w-max border-${colorTone}`}
      >
        Due: &nbsp;{dueDate}
      </p>
    </form>
  );
};

export default TaskCard;
