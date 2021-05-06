const setEditModal = (ISBN) => {
  // Get information about the book using isbn
  const xhttp = new XMLHttpRequest();

  xhttp.open("GET", `http://localhost:5050/book/${ISBN}`, false);
  xhttp.send();

  const book = JSON.parse(xhttp.responseText);

  const { title, author, publisher, publish_date, numOfPages } = book;

  // Filling information about the book in the form inside the modal
  document.getElementById("ISBN").value = isbn;
  document.getElementById("title").value = title;
  document.getElementById("author").value = author;
  document.getElementById("publisher").value = publisher;
  document.getElementById("date").value = publish_date;
  document.getElementById("numOfPages").value = numOfPages;

  // Setting up the action url for the book
  document.getElementById(
    "editForm"
  ).action = `http://localhost:5050/book/${ISBN}`;
};

const deleteBook = (ISBN) => {
  const xhttp = new XMLHttpRequest();
  console.log("clicked");
  xhttp.open("DELETE", `http://localhost:5050/book/${ISBN}`, false);
  xhttp.send();

  //Reloading Page
  location.reload();
};

const loadBooks = () => {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:5050/books", false);
  xhttp.send();

  const books = JSON.parse(xhttp.responseText);

  for (let book of books) {
    const x = `
            <div class="col-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${book.bookName}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${book.ISBN}</h6>

                        <div>Author: ${book.author}</div>
                        <div>Publisher: ${book.publisher}</div>
                        <div>Number Of Pages: ${book.numOfPages}</div>

                        <hr>

                        <button type="button" class="btn btn-danger" onClick="deleteBook(${book.ISBN})">Delete</button>
                        <button types="button" class="btn btn-primary" data-toggle="modal"
                            data-target="#editBookModal" onClick="setEditModal(${book.ISBN})">
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        `;

    document.getElementById("books").innerHTML =
      document.getElementById("books").innerHTML + x;
  }
};

loadBooks();
