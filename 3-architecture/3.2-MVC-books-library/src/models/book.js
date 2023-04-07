import connection from "../config/connection";

function readAllBooks(callback) {
  const sql = "SELECT * FROM books";
  connection.query(sql, (err, result) => {
    if (err) console.log(err);
    callback(result);
  });
}

function getBookById(id, callback) {
  const sql = "SELECT * FROM books WHERE id = ?";
  connection.query(sql, [id], (err, result) => {
    if (err) console.log(err);
    callback(result[0]);
  });
}

function getSoftDeletedBooks(callback) {
  const sql = "SELECT id FROM books WHERE deleted = 1";
  connection.query(sql, (err, result) => {
    if (err) console.log(err);
    callback(result);
  });
}
function saveBook(title, authors, description, year, clicks, image_url) {
  const sql =
    "INSERT INTO books (title, author, description, year, clicks, image_url) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [title, authors, description, year, clicks, image_url];
  connection.query(sql, values, (err, result) => {
    if (err) console.log(err);
    console.log(`Book ${this.title} saved to database`);
    return result;
  });
}

function updateBookById(id, callback) {
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
    if (err) console.log(err);
    callback(result.affectedRows);
  });
}

function softDeleteBookById(id) {
  const deleted = 1;
  const sql = "UPDATE books SET deleted = ? WHERE id = ?";
  connection.query(sql, [deleted, id], (err, result) => {
    if (err) console.log(err);
    console.log(`Book ${this.title} deleted from database`);
    return result;
  });
}
export {
  readAllBooks,
  getBookById,
  getSoftDeletedBooks,
  saveBook,
  softDeleteBookById,
  updateBookById,
};
