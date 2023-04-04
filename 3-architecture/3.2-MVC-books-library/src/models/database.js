import fs from "fs";
import db from "../config/database.js";
import migrations from "../config/migrations.js";

export default async function initLibraryDatabase() {
  try {
    migrations.initializeDB.forEach(async (migration) => {
      await executeSqlFile(migration.filepath, migration.messages);
    });
  } catch (error) {
    console.log(error);
  }
}

function executeSqlFile(filepath, messages) {
  const script = fs.readFileSync(filepath, "utf-8");
  const queries = script.split(";");
  queries.forEach((query, index) => {
    if (query.trim()) {
      return db
        .query(query)
        .then(() =>
          console.log(
            index < messages.length ? messages[index] : "SQL script executed"
          )
        )
        .catch((error) => console.log(error));
    }
  });
}
