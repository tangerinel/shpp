import connection from "../config/connection";

class Author {
  constructor(name) {
    this.name = name;
  }
  readAllAuthors(callback) {
    const sql = "SELECT * FROM authors";
    connection.query(sql, (err, result) => {
      if (err) throw err;
      callback(result);
    });
  }
  getAuthorById(id, callback) {
    const sql = "SELECT * FROM authors WHERE id = ?";
    connection.query(sql, [id], (err, result) => {
      if (err) throw err;
      callback(result[0]);
    });
  }
  save() {
    const sql = "INSERT INTO author (name) VALUES (?)";
    connection.query(sql, [this.name], (err, result) => {
      if (err) throw err;
      console.log(`Author ${this.author} saved to database`);
      return result;
    });
  }

  deleteAuthorById(id, callback) {}
}
