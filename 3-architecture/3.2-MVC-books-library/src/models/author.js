import connection from "../config/connection";

async function readAllAuthors(callback) {
  const sql = "SELECT * FROM authors";
  await connection.query(sql, (err, result) => {
    if (err) throw err;
    callback(result);
  });
}
async function getAuthorById(id, callback) {
  const sql = "SELECT * FROM authors WHERE id = ?";
  await connection.query(sql, [id], (err, result) => {
    if (err) throw err;
    callback(result[0]);
  });
}
async function saveAuthor(name) {
  const sql = "INSERT INTO author (name) VALUES (?)";
  await connection.query(sql, [name], (err, result) => {
    if (err) throw err;
    console.log(`Author ${name} saved to database`);
    return result;
  });
}

export { readAllAuthors, getAuthorById, saveAuthor };
