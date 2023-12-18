import { TasksI } from "./interfaces";

export const createColumns = (tasks: TasksI[] | [] | undefined) => {
  return {
    open: {
      name: "Opened Tasks",
      items: tasks?.filter((task) => task.status === "open"),
      colorTone: "accent-1",
    },
    pending: {
      name: "Pending Tasks",
      items: tasks?.filter((task) => task.status === "pending"),
      colorTone: "accent-2",
    },
    inProgress: {
      name: "Tasks In Progress",
      items: tasks?.filter((task) => task.status === "inProgress"),
      colorTone: "orange-500",
    },
    complete: {
      name: "Completed Tasks",
      items: tasks?.filter((task) => task.status === "complete"),
      colorTone: "green-500",
    },
  };
};

export const HandleDragEnd = (result: any, columns: any, setColumns: any) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];

    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];

    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];

    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};
