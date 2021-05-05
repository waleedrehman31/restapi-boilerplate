const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
// Middlewares
app.use(cors());
app.use(express.json());

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

app.get("/books", (req, res) => {
  res.json(books);
});

// Running and specified PORT
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Listing on http://localhost:${PORT}`);
});
