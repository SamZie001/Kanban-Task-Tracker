import { Schema } from "mongoose";
import { DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";

export interface UserI {
  username: string;
  password: string;
}

export interface TasksI {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  status: string;
  user?: Schema.Types.ObjectId;
}

export interface CardI extends Partial<TasksI> {
  title: TasksI["title"];
  description: TasksI["description"];
  dueDate: TasksI["dueDate"];
  provided?: DraggableProvided;
  snapshot?: DraggableStateSnapshot;
  colorTone?: string;
}

export interface PagePropsI {
  tasks?: TasksI[] | [];
  setTasks?: React.Dispatch<React.SetStateAction<[] | TasksI[]>>;
  searchKey?: string;
  setSearchKey?: React.Dispatch<React.SetStateAction<string>>;
}
