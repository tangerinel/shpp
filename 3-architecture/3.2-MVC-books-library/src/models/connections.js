async function createConnection(book_id, author_id) {
  const sql = "INSERT INTO mapping(book_id, author_id) VALUES (?, ?)";
  const values = [book_id, author_id];
  await connection.query(sql, values, (err, result) => {
    if (err) console.log(err);
    console.log(`Connection ${book_id} and ${author_id} saved to database`);
    return result;
  });
}

async function readAllConnections(callback) {
  const sql = "SELECT * FROM mapping";
  await connection.query(sql, (err, result) => {
    if (err) console.log(err);
    callback(result);
  });
}
async function getAuthorsByBookId(book_id, callback) {
  const sql = "SELECT author_id FROM mapping WHERE book_id = ?";
  await connection.query(sql, [book_id], (err, result) => {
    if (err) console.log(err);
    callback(result);
  });
}
async function getBooksByAuthorId(author_id, callback) {
  const sql = "SELECT book_id FROM mapping WHERE author_id = ?";
  await connection.query(sql, [author_id], (err, result) => {
    if (err) console.log(err);
    callback(result);
  });
}
async function deleteConnectionByBookId(book_id) {
  const sql = "DELETE FROM mapping WHERE book_id = ?";
  await connection.query(sql, [book_id], (err, result) => {
    if (err) console.log(err);
  });
}
