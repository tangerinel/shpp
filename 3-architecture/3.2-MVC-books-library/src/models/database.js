import fs from "fs";
import mysqldump from "mysqldump";
import connection from "../config/connection.js";
import migrations from "../config/migrations.js";

async function initLibraryDatabase() {
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
  queries = [
    `DELETE FROM books WHERE is_deleted = 1`,
    `DELETE FROM mapping WHERE is_deleted = 1`,
    `DELETE FROM authors WHERE is_deleted = 1`,
  ];
  queries.forEach((query) => {
    connection
      .query(query)
      .then((result) => {
        console.log(`Deleted ${result.affectedRows} soft deleted records`);
      })
      .catch((err) => console.log(err));
  });
}

function executeSqlFile(filepath, messages) {
  const script = fs.readFileSync(filepath, "utf-8");
  const queries = script.split(";");
  queries.forEach((query, index) => {
    if (query.trim()) {
      connection
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
export { initLibraryDatabase, performBackup, deleteSoftDeletedRecords };
