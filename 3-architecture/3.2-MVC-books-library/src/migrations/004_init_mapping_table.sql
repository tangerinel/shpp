CREATE TABLE IF NOT EXISTS mapping (
  book_id INTEGER,
  author_id INTEGER,
  PRIMARY KEY (book_id, author_id),
  FOREIGN KEY (book_id) REFERENCES books(id),
  FOREIGN KEY (author_id) REFERENCES authors(id)
);

INSERT IGNORE INTO mapping(book_id, author_id)
VALUES
(1,1),
(2,2),
(3,3),
(4,4),
(5,5),
(6,6),
(6,7),
(6,8),
(6,9),
(7,10),
(7,11);