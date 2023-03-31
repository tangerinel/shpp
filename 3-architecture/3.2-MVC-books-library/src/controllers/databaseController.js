import fs from 'fs';

// create database if not exists and switch to it
export default function createAndUseDatabase(db) {  
  const createDatabase = fs.readFileSync('src/migrations/create_database.sql', 'utf-8');
  const useDatabase = fs.readFileSync('src/migrations/use_database.sql', 'utf-8');
  db.query(createDatabase)
    .then(() => {
      console.log("Database created")
      db.query(useDatabase)
        .then(() => {
          console.log('Database is in use');
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
}

