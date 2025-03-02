"use client";
import React from "react";
import { TaskCard } from "./components";
import { useStore } from "@/lib/store";
import { createColumns } from "@/lib/kanbanConfig";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Task } from "./lib/interfaces";

const page = () => {
  const { tasks, moveTask, searchKey } = useStore();
  const columns = createColumns(tasks);

  return (
    <DragDropContext
      onDragEnd={(item) => {
        if (item.destination)
          moveTask(item.draggableId, item.destination.droppableId as Task["status"], item.destination.index);
      }}
    >
      <div className="space-y-5 p-5">
        <p className="text-center text-base">Change your task status by dragging it to another container</p>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {Object.entries(columns)?.map(([id, column]) => (
            <div key={id} className="space-y-2">
              <h1 className={`text-${column.colorTone} text-center font-semibold`}>{column.name}</h1>

              <Droppable droppableId={id}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-2 rounded-lg border p-2 shadow-lg"
                  >
                    {column.items
                      ?.filter(
                        (item) =>
                          !searchKey ||
                          item.title.toLowerCase().includes(searchKey.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchKey.toLowerCase()),
                      )
                      .map((item, ind) => (
                        <Draggable key={item._id} draggableId={item._id} index={ind}>
                          {(provided, snapshot) => (
                            <TaskCard
                              task={item}
                              provided={provided}
                              snapshot={snapshot}
                              colorTone={column.colorTone}
                            />
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </div>
    </DragDropContext>
  );
};

export default page;
