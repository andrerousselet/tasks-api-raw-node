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
}
