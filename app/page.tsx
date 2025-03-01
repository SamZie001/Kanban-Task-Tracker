"use client";
import React from "react";
import { DndContext } from "@dnd-kit/core";
import { TaskCard, Draggable, Droppable } from "./components";
import { useStore } from "@/lib/store";
import { createColumns, HandleDragEnd } from "@/lib/kanbanConfig";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Task } from "./lib/interfaces";

const page = () => {
  const { tasks, moveTask, searchKey } = useStore();
  const columns = createColumns(tasks);

  return (
    <div className="p-5">
      <p className="text-center text-base">Change your task status by dragging it to another container</p>
      <DndContext>
        <div className="my-5 grid gap-2 sm:grid-cols-3">
          <Draggable />
          <Droppable />
          {/* <DragDropContext
          onDragEnd={(item) => {
            HandleDragEnd(item, columns);

            // update item in store
            console.log(item.draggableId, item.destination?.droppableId);
            // moveTask(item.draggableId, item.destination?.droppableId as Task["status"]);
          }}
        >
          {Object.entries(columns)?.map(([id, column]) => (
            <div key={id} className={`overflow-hidden border-l border-r`}>
              <Droppable droppableId={id}>
                {(provided) => (
                  <div
                    key={id}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="flex flex-col gap-2 p-1"
                  >
                    <h1 className={`text-${column.colorTone} mb-2 py-2 text-center font-semibold`}>{column.name}</h1>
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
        </DragDropContext> */}
        </div>
      </DndContext>
    </div>
  );
};

export default page;
