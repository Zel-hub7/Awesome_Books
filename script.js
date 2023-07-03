let booksCollection = [];

function addBook(title, author) {
  const book = { title, author };
  booksCollection.push(book);
  renderBooks();
  saveToLocalStorage();
}

function removeBook(title) {
  booksCollection = booksCollection.filter((book) => book.title !== title);
  renderBooks();
  saveToLocalStorage();
}

function renderBooks() {
  const booksContainer = document.getElementById('books-container');
  booksContainer.innerHTML = '';

  booksCollection.forEach((book) => {
    const bookElement = document.createElement('div');
    bookElement.classList.add('book-item');

    const titleElement = document.createElement('p');
    titleElement.textContent = `Title: ${book.title}`;

    const authorElement = document.createElement('p');
    authorElement.textContent = `Author: ${book.author}`;

    const hr = document.createElement("hr");
    


    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => {
      removeBook(book.title);
    });

    bookElement.appendChild(titleElement);
    bookElement.appendChild(authorElement);
    bookElement.appendChild(removeButton);
    bookElement.appendChild(hr);

    booksContainer.appendChild(bookElement);
  });
}

function saveToLocalStorage() {
  localStorage.setItem('booksCollection', JSON.stringify(booksCollection));
}

function loadFromLocalStorage() {
  const storedBooksCollection = localStorage.getItem('booksCollection');
  if (storedBooksCollection) {
    booksCollection = JSON.parse(storedBooksCollection);
    renderBooks();
  }
}

const addBookForm = document.getElementById('add-book-form');
addBookForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const titleInput = document.getElementById('title');
  const authorInput = document.getElementById('author');
  const title = titleInput.value;
  const author = authorInput.value;

  addBook(title, author);

  titleInput.value = '';
  authorInput.value = '';
});

loadFromLocalStorage();
