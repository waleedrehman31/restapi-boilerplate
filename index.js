const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
// Middlewares
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Default Page
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Book API ENDPOINT and using POST method
let books = [];

app.post("/book", (req, res) => {
  const book = req.body;

  // Output the book to console
  console.log(book);
  books.push(book);
  res.send("Success Added to Data Base");
});

// Get Books
app.get("/books", (req, res) => {
  res.json(books);
});

// Search For Book
app.get("/book/:ISBN", (req, res) => {
  // Reading ISBN from URL
  const ISBN = req.params.ISBN;

  // Searching Books for the ISBN
  books.forEach(book, () => {
    if (book.isbn === ISBN) {
      res.json(book);
      return;
    }
  });
  res.status(404).send("Book Not Found");
});

// Delete Book
app.delete("/book/:ISBN", (req, res, next) => {
  // Reading ISBN from URL
  const ISBN = req.params.ISBN;

  books = books.filter(ISBN !== ISBN && true);
  next();

  res.send("Book is deleted");
});

// Edit Book
app.post("/book/:ISBN", (req, res) => {
  // Reading isbn from the URL
  const ISBN = req.params.ISBN;
  const newBook = req.body;

  // Remove item from the books array
  for (let i = 0; i < books.length; i++) {
    let book = books[i];
    if (book.ISBN === ISBN) {
      books[i] = newBook;
    }
  }

  res.send("Book is edited");
});

// Running and specified PORT
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Listing on http://localhost:${PORT}`);
});
