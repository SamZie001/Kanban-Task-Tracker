import { Schema, model, models } from "mongoose";

const taskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },

  // unspecified necessities
  status: {
    type: String,
    enum: ["open", "pending", "inProgress", "complete"],
    default: "open",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

taskSchema.pre("save", function (next) {
  this.status = "open";
  next();
});

export const Task = models.tasks || model("tasks", taskSchema);
