class BookCollection {
  constructor() {
    this.books = [];
  }

  addBook(title, author) {
    const book = { title, author };
    this.books.push(book);
    this.renderBooks();
    this.saveToLocalStorage();
  }

  removeBook(title) {
    this.books = this.books.filter((book) => book.title !== title);
    this.renderBooks();
    this.saveToLocalStorage();
  }

  renderBooks() {
    const booksContainer = document.getElementById('books-container');
    booksContainer.innerHTML = '';
    this.books.forEach((book, index) => {
      const bookElement = document.createElement('div');
      bookElement.classList.add('book-item');
      if (index % 2 === 0) {
        bookElement.classList.add('even');
      } else {
        bookElement.classList.add('odd');
      }
      const titleElement = document.createElement('p');
      titleElement.textContent = `"${book.title}" by ${book.author}`;

      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.addEventListener('click', () => {
        this.removeBook(book.title);
      });

      bookElement.appendChild(titleElement);
      bookElement.appendChild(removeButton);

      booksContainer.appendChild(bookElement);
    });

    // Check if there are any book items
    const bookItems = document.querySelectorAll('.book-item');
    const bookCollectionTitle = document.getElementById('book-collection-title');
    if (bookItems.length > 0) {
      bookCollectionTitle.textContent = 'All Awesome Books';
      booksContainer.style.border = 'solid black'; // Apply black border
    } else {
      bookCollectionTitle.textContent = 'No book available!';
      booksContainer.style.border = 'none'; // Remove border
    }
  }

  saveToLocalStorage() {
    localStorage.setItem('booksCollection', JSON.stringify(this.books));
  }

  loadFromLocalStorage() {
    const storedBooksCollection = localStorage.getItem('booksCollection');
    if (storedBooksCollection) {
      this.books = JSON.parse(storedBooksCollection);
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

// Add event listeners to the links
const allBooksLink = document.getElementById('all-books-link');
const addBookLink = document.getElementById('add-book-link');
const contactLink = document.getElementById('contact');
const allBooksContainer = document.getElementById('all-books-container');
const addBookContainer = document.getElementById('add-book-container');
const about = document.getElementById('about');

about.style.display = 'none';
addBookContainer.style.display = 'none';
allBooksLink.addEventListener('click', () => {
  allBooksContainer.style.display = 'block'; // Show all books container
  addBookContainer.style.display = 'none'; // Hide add book container
  about.style.display = 'none';
});

addBookLink.addEventListener('click', () => {
  allBooksContainer.style.display = 'none'; // Hide all books container
  addBookContainer.style.display = 'block'; // Show add book container
  about.style.display = 'none';
});
contactLink.addEventListener('click', () => {
  about.style.display = 'block';
  allBooksContainer.style.display = 'none';
  addBookContainer.style.display = 'none';
});
