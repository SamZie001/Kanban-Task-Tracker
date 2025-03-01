"use client";
import React from "react";
import { useStore } from "@/lib/store";
import { Task } from "@/lib/interfaces";

import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const AddTask = () => {
  const { addTask } = useStore();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formDataEntries = Object.fromEntries(formData.entries());

    addTask(formDataEntries as Pick<Task, "title" | "description">);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Add new task</Button>
      </DialogTrigger>

      <DialogContent className="border-transparent bg-white" aria-describedby="add task form">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="title">Title</Label>
            <Input required type="text" name="title" placeholder="Title" />
          </div>

          <div>
            <Label htmlFor="description">Task notes/description</Label>
            <Textarea name="description" placeholder="Description" required />
          </div>

          <Button variant="default" type="submit" className="w-full">
            Add Task
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTask;
