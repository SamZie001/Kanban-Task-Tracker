import { Task } from "./interfaces";

type Column = Record<
  Task["status"],
  {
    name: string;
    items: Task[];
    colorTone: string;
  }
>;

export const createColumns = (tasks: Task[]): Column => {
  return {
    new: {
      name: "New",
      items: tasks.filter((task) => task.status === "new"),
      colorTone: "primary",
    },
    inProgress: {
      name: "In Progress",
      items: tasks.filter((task) => task.status === "inProgress"),
      colorTone: "orange-500",
    },
    complete: {
      name: "Completed",
      items: tasks.filter((task) => task.status === "complete"),
      colorTone: "green-500",
    },
  };
};

export const HandleDragEnd = (result: any, columns: any) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];

    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];

    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    // setColumns({
    //   ...columns,
    //   [source.droppableId]: {
    //     ...sourceColumn,
    //     items: sourceItems,
    //   },
    //   [destination.droppableId]: {
    //     ...destColumn,
    //     items: destItems,
    //   },
    // });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];

    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    // setColumns({
    //   ...columns,
    //   [source.droppableId]: {
    //     ...column,
    //     items: copiedItems,
    //   },
    // });
  }
};
