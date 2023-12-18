const mongoose = require("mongoose");
import { User } from "../models/Users";
import { Task } from "../models/Tasks";

const DB_URI = process.env.NEXT_PUBLIC_DB_URI;

async function connect() {
  try {
    await mongoose.connect(DB_URI);
    console.log("DB Connected");
  } catch (error) {
    console.log("DB connection error: ", error);
  }
}

export { User, Task, connect };
