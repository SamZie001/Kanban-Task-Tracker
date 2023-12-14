export const ITEMS = [
  {
    _id: "t1-y-t-h8-9",
    title: "Task 1",
    description: "This is task 1",
    dueDate: "03 Jan 2024",
    status: "open",
  },
  {
    _id: "t2-y-t-h8-9",
    title: "Task 2",
    description: "This is task 1",
    dueDate: "03 Jan 2024",
    status: "open",
  },
  {
    _id: "t3-y-t-h8-9",
    title: "Task 3",
    description: "This is task 1",
    dueDate: "03 Jan 2024",
    status: "complete",
  },
  {
    _id: "t4-y-t-h8-9",
    title: "Task 4",
    description: "This is task 1",
    dueDate: "03 Jan 2024",
    status: "complete",
  },
  {
    _id: "t5-y-t-h8-9",
    title: "Task 5",
    description: "This is task 1",
    dueDate: "03 Jan 2024",
    status: "inProgress",
  },
  {
    _id: "t6-y-t-h8-9",
    title: "Task 6",
    description: "This is task 1",
    dueDate: "03 Jan 2024",
    status: "inProgress",
  },
  {
    _id: "t7-y-t-h8-9",
    title: "Task 7",
    description: "This is task 1",
    dueDate: "03 Jan 2024",
    status: "inProgress",
  },
  {
    _id: "t8-y-t-h8-9",
    title: "Task 8",
    description: "This is task 1",
    dueDate: "03 Jan 2024",
    status: "open",
  },
];

export const COLUMNS = {
  open: {
    name: "Opened Tasks",
    items: ITEMS,
    colorTone: "accent-1",
  },
  pending: {
    name: "Pending Tasks",
    items: [],
    colorTone: "accent-2",
  },
  inProgress: {
    name: "Tasks In Progress",
    items: [],
    colorTone: "orange-500",
  },
  complete: {
    name: "Completed Tasks",
    items: [],
    colorTone: "green-500",
  },
};

export const onDragEnd = (result: any, columns: any, setColumns: any) => {
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
