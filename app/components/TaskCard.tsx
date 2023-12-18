"use client";
import React, { useEffect, useState } from "react";
import format from "date-fns/format";
import { CardI } from "../lib/interfaces";
import {
  MdEdit,
  MdCheck,
  MdTimer,
  MdDragIndicator,
  MdDelete,
} from "react-icons/md";
import { usePatchTask, useDeleteTask } from "@/app/lib/useTaskData";

const Spinner = () => {
  return (
    <div className="inline-block h-3 w-3 rounded-full border-2 border-r-transparent border-l-transparent animate-spin border-t-accent-1 border-b-accent-2" />
  );
};

const TaskCard = ({
  _id,
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
  const { mutate: editTask, isPending: isPendingEdit } = usePatchTask(
    _id,
    {
      title: updatedTitle,
      description: updatedDesc,
    },
    "textEdit"
  );
  const {
    mutate: deleteTask,
    isPending: isPendingDelete,
    isSuccess: isDeleteSuccess,
  } = useDeleteTask(_id);

  return (
    <div
      className={`${isDeleteSuccess && 'hidden'} w-[100%] min-h-[100px] h-auto text-white rounded-lg bg-secondary flex flex-col p-2 select-none ${
        snapshot?.isDragging && `border-[2px] border-${colorTone} bg-secondary`
      }`}
      ref={provided?.innerRef}
      {...provided?.draggableProps}
      style={provided?.draggableProps.style}
    >
      <div className="flex justify-between">
        <div
          {...provided?.dragHandleProps}
          className="hover:bg-liner rounded-full w-[22px] h-[22px] text-base p-2 grid place-content-center"
        >
          <MdDragIndicator />
        </div>
        <div className="flex items-center gap-2">
          <div
            onClick={() => {
              deleteTask();
            }}
            className="text-sm flex gap-2 items-center border-[1px] border-liner p-1 rounded-md hover:bg-liner hover:text-red-400/95"
          >
            {isPendingDelete ? <Spinner /> : <MdDelete />}
          </div>
          {!editMode && (
            <div
              onClick={() => setEditMode(true)}
              className="text-sm flex gap-2 items-center border-[1px] border-liner p-1 rounded-md hover:bg-liner"
            >
              <MdEdit />
            </div>
          )}
          {editMode && (
            <button
              onClick={() => {
                editTask();
                setEditMode(false);
              }}
              className="text-sm text-green-500 flex gap-2 items-center border-[1px] border-liner p-1 rounded-md"
            >
              {isPendingEdit ? <Spinner /> : <MdCheck />}
            </button>
          )}
        </div>
      </div>

      <div className="h-[100%]">
        <input type="text" name="taskId" value={_id} hidden />
        <input
          className={`font-semibold bg-transparent outline-none ${
            editMode && `border-b-[1px] border-dotted border-${colorTone}`
          }`}
          type="text"
          name="title"
          value={updatedTitle}
          disabled={!editMode}
          onChange={(e) => setUpdatedTitle(e.target.value)}
        />
        <textarea
          name="description"
          value={updatedDesc}
          disabled={!editMode}
          onChange={(e) => setUpdatedDesc(e.target.value)}
          className={`TEXTAREA | pr-1 w-[100%] text-sm mt-1 bg-transparent outline-none ${
            editMode && `border-b-[1px] border-dotted border-${colorTone}`
          }`}
        />
      </div>

      <p
        className={`flex gap-1 items-center text-[0.5rem] self-end pb-1 border-b-[2px] w-max border-${colorTone}`}
      >
        <span>
          <MdTimer />
        </span>
        <span>{format(new Date(dueDate), "dd MMM yyyy")}</span>
      </p>
    </div>
  );
};

export default TaskCard;
