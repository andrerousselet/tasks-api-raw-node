// import { randomUUID } from "node:crypto";
import { Database } from "./database.js";

const db = new Database();

export const routes = [
  {
    method: "GET",
    path: "/tasks",
    handler: (req, res) => {
      const tasks = db.select("tasks");
      return res.end(JSON.stringify(tasks));
    },
  },
];
