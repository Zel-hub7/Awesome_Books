class BookCollection {
  constructor() {
    this.booksCollection = [];
  }

  addBook(title, author) {
    const book = { title, author };
    this.booksCollection.push(book);
    this.renderBooks();
    this.saveToLocalStorage();
  }

  removeBook(title) {
    this.booksCollection = this.booksCollection.filter((book) => book.title !== title);
    this.renderBooks();
    this.saveToLocalStorage();
  }

  renderBooks() {
    const booksContainer = document.getElementById('books-container');
    booksContainer.innerHTML = '';

    this.booksCollection.forEach((book) => {
      const bookElement = document.createElement('div');
      bookElement.classList.add('book-item');

      const titleElement = document.createElement('p');
      titleElement.textContent = `"${book.title}" by ${book.author}`;

      const authorElement = document.createElement('p');
      authorElement.textContent = `Author: ${book.author}`;

      const hr = document.createElement('hr');
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.addEventListener('click', () => {
        this.removeBook(book.title);
      });

      bookElement.appendChild(titleElement);
      // bookElement.appendChild(authorElement);
      bookElement.appendChild(removeButton);
      // bookElement.appendChild(hr);

      booksContainer.appendChild(bookElement);
    });
  }

  saveToLocalStorage() {
    localStorage.setItem('booksCollection', JSON.stringify(this.booksCollection));
  }

  loadFromLocalStorage() {
    const storedBooksCollection = localStorage.getItem('booksCollection');
    if (storedBooksCollection) {
      this.booksCollection = JSON.parse(storedBooksCollection);
      this.renderBooks();
    }
  }
}

const bookCollection = new BookCollection();

const addBookForm = document.getElementById('add-book-form');
addBookForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const titleInput = document.getElementById('title');
  const authorInput = document.getElementById('author');
  const title = titleInput.value;
  const author = authorInput.value;

  bookCollection.addBook(title, author);

  titleInput.value = '';
  authorInput.value = '';
});

bookCollection.loadFromLocalStorage();
