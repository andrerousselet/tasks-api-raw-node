import fs from "node:fs/promises";

const dbPath = new URL("../db.json", import.meta.url);

export class Database {
  #database = {};

  constructor() {
    fs.readFile(dbPath, "utf8")
      .then((data) => (this.#database = JSON.parse(data)))
      .catch(() => {
        this.#persist();
      });
  }

  #persist() {
    fs.writeFile(dbPath, JSON.stringify(this.#database));
  }

  select(table) {
    let data = this.#database[table] ?? [];
    return data;
  }

  findOne(table, id) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);
    const task = this.#database[table][rowIndex];
    return task;
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }
    this.#persist();
    return data;
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);
    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1);
      this.#persist();
    }
  }
}
