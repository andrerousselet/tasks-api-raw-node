import { randomUUID } from "node:crypto";
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
  {
    method: "POST",
    path: "/tasks",
    handler: (req, res) => {
      const { title, description } = req.body;
      const now = new Date();
      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: now,
        updated_at: now,
      };
      db.insert("tasks", task);
      return res.writeHead(201).end("News task created!");
    },
  },
];
