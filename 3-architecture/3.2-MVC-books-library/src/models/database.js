import fs from "fs";
import mysqldump from "mysqldump";
import connection from "../config/connection.js";
import migrations from "../config/migrations.js";
import { getSoftDeletedBooks, hardDeleteBookById } from "./book.js";
import { deleteConnectionByBookId, getAuthorsByBookId } from "./connections.js";
import { deleteAuthorIfNoMapping } from "./author.js";

function initLibraryDatabase() {
  try {
    migrations.initializeDB.forEach(async (migration) => {
      executeSqlFile(migration.filepath, migration.messages);
    });
  } catch (error) {
    console.log(error);
  }
}
function performBackup() {
  const backupFileName = `../path/to/backup/backup_${new Date()
    .toISOString()
    .replace(/:/g, "-")}.sql`;
  mysqldump({ connection, dumpToFile: backupFileName }, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Database backup created at: ${backupFilePath}`);
    }
  });
}
function deleteSoftDeletedRecords() {
  // 1 - get soft deleted books
  getSoftDeletedBooks((books_ids) => {
    for (const book_id of books_ids) {
      // 2 - get authors for each book
      getAuthorsByBookId(book_id, (authors_ids) => {
        //  3 - delete connections
        deleteConnectionByBookId(book_id);
        for (const author_id of authors_ids) {
          // 4 - delete authors if they are not used
          deleteAuthorIfNoMapping(author_id);
        }
      });
      // 5 - delete books
      hardDeleteBookById(book_id);
    }
  });
}

function executeQuery(query, values, message) {
  if (query.trim()) {
    try {
      let result = connection.query(query, values);
      if (message) console.log(message);
      return result;
    } catch (err) {
      console.log(err);
    }
  }
}

function executeSqlFile(filepath, messages) {
  const script = fs.readFileSync(filepath, "utf-8");
  const queries = script.split(";");
  queries.forEach((query, index) => {
    const message =
      index < messages.length ? messages[index] : "SQL script executed";
    executeQuery(query, undefined, message);
  });
}

export { initLibraryDatabase, performBackup, deleteSoftDeletedRecords };
