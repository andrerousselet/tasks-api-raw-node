import { randomUUID } from "node:crypto";
import { Database } from "./database.js";
import { buildRoutePath } from "./utils/build-route-path.js";

const db = new Database();

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { search } = req.query;
      const tasks = db.select(
        "tasks",
        search
          ? {
              title: search,
              description: search,
            }
          : null
      );
      return res.end(JSON.stringify(tasks));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { title, description } = req.body;
      if (!title || !description) {
        return res.writeHead(400).end("Title and description are required");
      }
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
      return res.writeHead(201).end("New task created!");
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;
      const { title, description } = req.body;
      if (!title && !description) {
        return res.writeHead(400).end("Title or description are required");
      }
      const foundTask = db.selectOne("tasks", id);
      if (!foundTask) {
        return res.writeHead(404).end("Task does not exist.");
      }
      if (title && !description) {
        db.update("tasks", id, {
          title,
          updated_at: new Date(),
        });
      }
      if (!title && description) {
        db.update("tasks", id, {
          description,
          updated_at: new Date(),
        });
      }
      if (title && description) {
        db.update("tasks", id, {
          title,
          description,
          updated_at: new Date(),
        });
      }
      return res.writeHead(204).end();
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;
      const foundTask = db.selectOne("tasks", id);
      if (!foundTask) {
        return res.writeHead(404).end("Task does not exist.");
      }
      db.delete("tasks", id);
      return res.writeHead(204).end();
    },
  },
];
