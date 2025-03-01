"use client";
import React, { useState } from "react";
import format from "date-fns/format";
import { CardI } from "../lib/interfaces";
import { MdEdit, MdCheck, MdTimer, MdDragIndicator, MdDelete } from "react-icons/md";
import { useStore } from "@/lib/store";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const TaskCard = ({ task, provided, snapshot, colorTone }: CardI) => {
  const { deleteTask, editTask } = useStore();
  const [editMode, setEditMode] = useState(false);

  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const updatedTask = {
      ...task,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
    };
    editTask(updatedTask);
    setEditMode(false);
  };

  return (
    <form
      onSubmit={handleEdit}
      className={`flex h-auto min-h-[100px] flex-col space-y-1 rounded-lg border bg-white p-2 shadow-lg ${
        snapshot?.isDragging && `border-[2px] border-${colorTone} bg-secondary`
      }`}
      ref={provided.innerRef}
      {...provided.draggableProps}
      style={provided.draggableProps.style}
    >
      <div className="flex justify-between">
        <div {...provided.dragHandleProps}>
          <MdDragIndicator size={20} className={`text-${colorTone} border-none outline-none`} />
        </div>

        <div className="flex items-center gap-3">
          <MdDelete
            size={25}
            onClick={() => deleteTask(task._id)}
            className="hover:text-destructive cursor-pointer rounded-md border p-1"
          />

          {!editMode && (
            <MdEdit
              size={25}
              onClick={() => setEditMode(true)}
              className="cursor-pointer rounded-md border p-1 text-orange-950"
            />
          )}
          {editMode && (
            <button type="submit">
              <MdCheck size={25} className="cursor-pointer rounded-md border p-1 text-green-950" />
            </button>
          )}
        </div>
      </div>

      <Input
        name="title"
        className={`${!editMode && "border-transparent"} p-1 shadow-none`}
        defaultValue={task.title}
        disabled={!editMode}
      />
      <Textarea
        name="description"
        defaultValue={task.description}
        disabled={!editMode}
        className={`${!editMode && "border-transparent"} p-1 shadow-none`}
      />

      <p className="flex items-center justify-end gap-2 text-xs">
        <span className="text-muted-foreground">Last updated: </span>
        <span className="text-xs">{format(new Date(task.updatedAt), "dd MMM yyyy, hh:mm a")}</span>
      </p>
    </form>
  );
};

export default TaskCard;
