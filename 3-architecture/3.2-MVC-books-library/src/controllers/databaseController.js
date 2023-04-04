import fs from "fs";
import db from "../config/database.js";

export default async function initLibraryDatabase() {
  try {
    executeSqlFile("src/migrations/create_database.sql", [
      "Database library created",
      "Database is in use",
    ]);

    // await createAndUseDatabase();
    // await createBooksTable();
    // await createAuthorsTable();
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
        .then(() => console.log(messages[index]))
        .catch((error) => console.log(error));
    }
  });
  // return db
  //   .query(script)
  //   .then(() => console.log(message))
  //   .catch((error) => console.log(error));
}

function createBooksTable() {
  const table = fs.readFileSync(
    "src/migrations/create_book_table.sql",
    "utf-8"
  );
  const insertValues = fs.readFileSync(
    "src/migrations/insert_into_book_table.sql",
    "utf-8"
  );
  return db
    .query(table)
    .then(() => {
      console.log("Books table created");
      db.query(insertValues)
        .then(() => console.log("Books table initialized"))
        .catch((err) => console.log(err));
    })
    .catch((error) => console.log(error));
}
// create database if not exists and switch to it
function createAndUseDatabase() {
  const createDatabase = fs.readFileSync(
    "src/migrations/create_database.sql",
    "utf-8"
  );
  const useDatabase = fs.readFileSync(
    "src/migrations/use_database.sql",
    "utf-8"
  );
  return db
    .query(createDatabase)
    .then(() => {
      console.log("Database created");
      db.query(useDatabase)
        .then(() => {
          console.log("Database is in use");
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
}
