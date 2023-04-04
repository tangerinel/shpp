export default {
  initializeDB: [
    {
      filepath: "src/migrations/001_create_database.sql",
      messages: ["Database library created", "Database is in use"],
    },
    {
      filepath: "src/migrations/002_init_books_table.sql",
      messages: ["Books table is created", "Books table is initialized"],
    },
    {
      filepath: "src/migrations/003_init_authors_table.sql",
      messages: ["Authors table is created", " Books table is initialized"],
    },
  ],
};
