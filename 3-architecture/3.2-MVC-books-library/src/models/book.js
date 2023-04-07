import connection from "../config/connection";

async function readAllBooks(callback) {
  const sql = "SELECT * FROM books";
  await connection.query(sql, (err, result) => {
    if (err) console.log(err);
    callback(result);
  });
}

async function getBookById(id, callback) {
  const sql = "SELECT * FROM books WHERE id = ?";
  await connection.query(sql, [id], (err, result) => {
    if (err) console.log(err);
    callback(result[0]);
  });
}

async function getSoftDeletedBooks(callback) {
  const sql = "SELECT id FROM books WHERE deleted = 1";
  await connection.query(sql, (err, result) => {
    if (err) console.log(err);
    callback(result);
  });
}
async function saveBook(title, authors, description, year, clicks, image_url) {
  const sql =
    "INSERT INTO books (title, author, description, year, clicks, image_url) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [title, authors, description, year, clicks, image_url];
  await connection.query(sql, values, (err, result) => {
    if (err) console.log(err);
    console.log(`Book ${title} saved to database`);
    return result;
  });
}

async function updateBookById(id, callback) {
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
  await connection.query(sql, values, (err, result) => {
    if (err) console.log(err);
    callback(result.affectedRows);
  });
}

async function softDeleteBookById(id) {
  const deleted = 1;
  const sql = "UPDATE books SET deleted = ? WHERE id = ?";
  await connection.query(sql, [deleted, id], (err, result) => {
    if (err) console.log(err);
    console.log(`Book ${title} deleted from database`);
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
