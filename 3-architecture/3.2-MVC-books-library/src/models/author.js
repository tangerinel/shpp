import db from "../config/database.js";

class Author {
  constructor(name) {
    this.name = name;
  }
  readAllAuthors(callback) {
    const sql = "SELECT * FROM authors";
    db.query(sql, (err, result) => {
      if (err) throw err;
      callback(result);
    });
  }
  getAuthorById(id, callback) {
    const sql = "SELECT * FROM authors WHERE id = ?";
    db.query(sql, [id], (err, result) => {
      if (err) throw err;
      callback(result[0]);
    });
  }
  save() {
    const sql = "INSERT INTO author (name) VALUES (?)";
    db.query(sql, [this.name], (err, result) => {
      if (err) throw err;
      console.log(`Author ${this.author} saved to database`);
      return result;
    });
  }

  deleteAuthorById(id, callback) {}
}
