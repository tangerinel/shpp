import fs from "fs";
import db from "../config/database.js";

export default async function initLibraryDatabase() {
  try {
    await createAndUseDatabase();
    await createBooksTable();
    await createAuthorsTable();
  } catch (error) {
    console.log(error);
  }
}

function createAuthorsTable() {}

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
