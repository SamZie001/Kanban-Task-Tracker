import React from "react";
import { DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";

export interface LogoI {
  size?: number;
  iconOnly?: boolean;
}
export type Task = {
  _id: string;
  title: string;
  description: string;
  updatedAt: Date;
  status: "new" | "inProgress" | "complete";
};

export interface CardI extends Partial<Task> {
  task: Task;
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
  colorTone: string;
}
