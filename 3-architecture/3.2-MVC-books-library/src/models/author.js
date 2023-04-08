import connection from "../config/connection.js";

function readAllAuthors(callback) {
  const sql = "SELECT * FROM authors";
  connection.query(sql, (err, result) => {
    if (err) console.log(err);
    callback(result);
  });
}
function getAuthorById(id, callback) {
  const sql = "SELECT * FROM authors WHERE id = ?";
  connection.query(sql, [id], (err, result) => {
    if (err) console.log(err);
    callback(result[0]);
  });
}
function saveAuthor(name) {
  const sql = "INSERT INTO author (name) VALUES (?)";
  connection.query(sql, [name], (err, result) => {
    if (err) console.log(err);
    console.log(`Author ${name} saved to database`);
    return result;
  });
}
function deleteAuthorIfNoMapping(author_id, callback) {
  const sql = `
    DELETE FROM authors
    WHERE author_id = ? AND NOT EXISTS (
      SELECT 1 FROM mapping WHERE author_id = ?
    )
  `;
  connection.query(sql, [author_id, author_id], (err, result) => {
    if (err) console.log(err);
    callback(result);
  });
}
export { readAllAuthors, getAuthorById, saveAuthor, deleteAuthorIfNoMapping };
