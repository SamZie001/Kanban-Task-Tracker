"use client";
import React, { useState, useEffect } from "react";
import TaskCard from "./TaskCard";
import { createColumns, HandleDragEnd } from "@/app/lib/kanbanConfig";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TaskDataOps from "../lib/TaskDataOps";
import { PagePropsI } from "../lib/interfaces";

const Kanban = ({ tasks }: PagePropsI) => {
  const [columns, setColumns] = useState(createColumns(tasks));
  const [mutateData, setMutateData] = useState({ id: "", status: "" });
  const { PatchTask } = TaskDataOps();

  const { mutate } = PatchTask(
    mutateData.id,
    {
      status: mutateData.status,
    },
    "dragEdit"
  );

  useEffect(() => {
    if (mutateData.id.length && mutateData.status.length) {
      mutate();
    }
  }, [mutateData]);

  useEffect(() => {
    setColumns(createColumns(tasks));
  }, [tasks]);

  return (
    <>
      <p className="text-center">
        Change your task status by dragging it to another container
      </p>
      <div className="py-5 grid sm:grid-cols-2 md:grid-cols-4 gap-2">
        <DragDropContext
          onDragEnd={(result) => {
            const destination = result.destination?.droppableId;

            if (destination && destination !== undefined) {
              setMutateData((prev) => ({
                ...prev,
                id: result.draggableId,
                status: destination,
              }));
            }
            HandleDragEnd(result, columns, setColumns);
          }}
        >
          {Object.entries(columns)?.map(([id, column]) => (
            <div
              key={id}
              className={`border-[1px] border-${column.colorTone} rounded-lg overflow-hidden`}
            >
              <Droppable droppableId={id}>
                {(provided, snapshot) => (
                  <div
                    key={id}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="p-1 h-[100%] w-[100%] flex flex-col gap-1"
                  >
                    <h1 className="font-semibold text-center py-2 border-b-[1px] border-liner mb-2">
                      {column.name}
                    </h1>
                    {column.items &&
                      column.items.map((item, ind) => (
                        <Draggable
                          key={item._id}
                          draggableId={item._id}
                          index={ind}
                        >
                          {(provided, snapshot) => (
                            <TaskCard
                              _id={item._id}
                              title={item.title}
                              description={item.description}
                              dueDate={item.dueDate}
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
        </DragDropContext>
      </div>
    </>
  );
};

export default Kanban;
