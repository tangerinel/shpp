import db from '../config/database';

class Book {

    constructor (title, authors,
         description, year, clicks){
            this.title = title;
            this.authors = authors;
            this.description = description;
            this.year = year;
            this.clicks = clicks;
    }

    readAllBooks(callback){
        const sql ='SELECT * FROM books';
        db.query(sql, (err, result) => {
            if (err) throw err;
            callback(result);
          });
    }

    findBookById (id, callback){
        const sql = 'SELECT * FROM books WHERE id = ?';
        db.query(sql, [id], (err, result)=>{
            if (err) throw err;
            callback(result[0]);
        });
    }

    save() {
        const sql = 'INSERT INTO books (title, author, description, year, clicks) VALUES (?, ?, ?, ?, ?)';
        const values = [this.title, this.authors, this.description, this.year, this.clicks];
        db.query(sql, values, (err, result) => {
          if (err) throw err;
          console.log(`Book ${this.title} saved to database`);
          return result;
        });
    }

    updateBookById(id, callback){
        const sql =   'UPDATE books SET title = ?, authors = ?, description = ?, year = ?, clicks = ? WHERE id = ?';
        const values =  [this.title, this.authors, this.description,this.year, this.clicks, id];
        db.query(sql, values, (err, result) => {
              if (err) throw err;
              callback(result.affectedRows);
            }
          );
    }

    deleteBookById (id, callback){

    }
}