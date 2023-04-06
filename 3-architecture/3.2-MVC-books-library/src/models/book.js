import connection from "../config/connection";

class Book {
  constructor(title, authors, description, year, clicks, image_url) {
    this.title = title;
    this.authors = authors;
    this.description = description;
    this.year = year;
    this.clicks = clicks;
    this.image_url = image_url;
  }

  readAllBooks(callback) {
    const sql = "SELECT * FROM books";
    connection.query(sql, (err, result) => {
      if (err) throw err;
      callback(result);
    });
  }

  getBookById(id, callback) {
    const sql = "SELECT * FROM books WHERE id = ?";
    connection.query(sql, [id], (err, result) => {
      if (err) throw err;
      callback(result[0]);
    });
  }

  save() {
    const sql =
      "INSERT INTO books (title, author, description, year, clicks, image_url) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [
      this.title,
      this.authors,
      this.description,
      this.year,
      this.clicks,
      this.image_url,
    ];
    connection.query(sql, values, (err, result) => {
      if (err) throw err;
      console.log(`Book ${this.title} saved to database`);
      return result;
    });
  }

  updateBookById(id, callback) {
    const sql =
      "UPDATE books SET title = ?, authors = ?, description = ?, year = ?, clicks = ?, image_url = ? WHERE id = ?";
    const values = [
      this.title,
      this.authors,
      this.description,
      this.year,
      this.clicks,
      this.image_url,
      id,
    ];
    connection.query(sql, values, (err, result) => {
      if (err) throw err;
      callback(result.affectedRows);
    });
  }

  deleteBookById(id, callback) {}
}
