import Library from './classes/Library.js';
import Book from './classes/Book.js';
import Category from './classes/Category.js';
import Reader from './classes/Reader.js';
import Rating from './classes/Rating.js';

// ------------------------------
// Shared Library & Local Storage Functions

function saveLibrary() {
  localStorage.setItem('libraryData', JSON.stringify(ourLibrary));
}

function loadLibrary() {
  const data = localStorage.getItem('libraryData');
  if (data) {
    const parsedData = JSON.parse(data);
    let lib = new Library(parsedData._library);

    // Reconstruct categories and books
    if (parsedData._categories) {
      parsedData._categories.forEach(catData => {
        let category = new Category(catData._categoryName);
        category.id = catData.id;
        if (catData._books) {
          catData._books.forEach(bookData => {
            let book = new Book(
              bookData._title,
              bookData._author,
              bookData._isbn,
              bookData._price,
              bookData._description
            );
            book.id = bookData.id;
            book._is_checked_out = bookData._is_checked_out;
            book.borrowedBy = bookData.borrowedBy || null; // Restore borrowedBy property
            category.addBook(book);
          });
        }
        lib.addCategory(category);
      });
    }

    // Reconstruct readers – use readerData._name if available, otherwise readerData.name
    if (parsedData.readers) {
      lib.readers = parsedData.readers.map(readerData => {
        let name = readerData._name || readerData.name;
        let reader = new Reader(name);
        reader.id = readerData.id;
        // We don't persist _borrowedBooks because we compute borrowed books from categories.
        return reader;
      });
    } else {
      lib.readers = [];
    }
    return lib;
  }
  return null;
}

let savedLibrary = loadLibrary();
let ourLibrary = savedLibrary ? savedLibrary : new Library('A_R_A biblioteka');
console.log(`Biblioteka ${ourLibrary._library} sukurta`);

// If there was no saved library, create initial categories
if (!savedLibrary) {
  const fictionCategory = new Category('Fiction');
  const nonFictionCategory = new Category('Non-Fiction');
  ourLibrary.addCategory(fictionCategory);
  ourLibrary.addCategory(nonFictionCategory);
  saveLibrary();
}

// ------------------------------
// Global Borrow/Return Function
function handleBorrowOrReturnBook(book, action) {
  if (action === 'return') {
    // If the book is currently borrowed, return it.
    if (!book.checkAvailability()) {
      const reader = ourLibrary.readers.find(r => r.id === book.borrowedBy);
      if (reader) {
        reader.returnBook(book);   // Remove book from reader's borrowed list
        book.borrowedBy = null;    // Reset borrower ID
        book.checkIn();            // Mark as available
      }
    }
  } else if (action === 'borrow') {
    // If the book is available, borrow it.
    const readerName = prompt('Enter the name of the reader borrowing this book:');
    if (!readerName) return;
    let reader = ourLibrary.readers.find(r => r.name === readerName);
    if (!reader) {
      alert("Reader not found! Make sure the reader is registered.");
      return;
    }
    if (reader.borrowBook(book)) {
      book.borrowedBy = reader.id; // Save reader ID in the book
      book.checkOut();             // Mark as borrowed
    }
  }
  saveLibrary();
  displayLibrary();
  if (typeof displayReaders === "function") {
    displayReaders();
  }
}

// ------------------------------
// Books & Categories Code (for index.html)
if (document.getElementById('library-display')) {
  populateCategoriesDropdown();

  function handleAddBook(event) {
    event.preventDefault();
    const title = document.getElementById('add-book-title').value;
    const author = document.getElementById('add-book-author').value;
    const isbn = document.getElementById('add-book-isbn').value;
    const price = parseFloat(document.getElementById('add-book-price').value);
    const description = document.getElementById('add-book-description').value;
    const categoryId = document.getElementById('categories').value;
    const newBook = new Book(title, author, isbn, price, description);
    console.log(newBook);
    const selectedCategory = ourLibrary.getCategories().find(cat => cat.id === Number(categoryId));
    if (selectedCategory) {
      selectedCategory.addBook(newBook);
      console.log(`Book "${newBook.title}" added to category "${selectedCategory.categoryName}".`);
    } else {
      console.error('Selected category not found!');
    }
    event.target.reset();
    saveLibrary();
    displayLibrary();
  }

  const addBookForm = document.getElementById('add-book-form');
  if (addBookForm) {
    addBookForm.addEventListener('submit', handleAddBook);
  }

  function populateCategoriesDropdown() {
    const dropdown = document.getElementById('categories');
    if (!dropdown) return;
    dropdown.innerHTML = '';
    ourLibrary.getCategories().forEach(category => {
      const option = document.createElement('option');
      option.value = category.id;
      option.textContent = category.categoryName;
      dropdown.appendChild(option);
    });
  }

  function handleAddCategory(event) {
    event.preventDefault();
    const newCategoryName = document.getElementById('add-category-name').value.trim();
    if (!newCategoryName) {
      alert('Please enter a category name.');
      return;
    }
    const categoryExists = ourLibrary.getCategories().some(cat =>
      cat.categoryName.toLowerCase() === newCategoryName.toLowerCase()
    );
    if (categoryExists) {
      alert(`Category "${newCategoryName}" already exists!`);
      return;
    }
    const newCategory = new Category(newCategoryName);
    ourLibrary.addCategory(newCategory);
    alert(`Category "${newCategoryName}" added successfully!`);
    populateCategoriesDropdown();
    event.target.reset();
    saveLibrary();
    displayLibrary();
  }

  const addCategoryForm = document.getElementById('add-category-form');
  if (addCategoryForm) {
    addCategoryForm.addEventListener('submit', handleAddCategory);
  }

  // Function to generate HTML for the library display (books)
  
  displayLibrary();
}

function displayLibrary() {
  const displayContainer = document.getElementById('library-display');
  if (!displayContainer) return;
  displayContainer.innerHTML = '';

  ourLibrary.getCategories().forEach(category => {
    category.books.forEach(book => {
      const card = document.createElement('div');
      card.className = 'book-card';
      card.dataset.bookId = book.id;
      
      // Create "Borrow/Return Book" button
      const borrowBtn = document.createElement('button');
      borrowBtn.textContent = book.borrowedBy ? 'Return Book' : 'Borrow Book';
      borrowBtn.className = 'borrow-btn';
      borrowBtn.addEventListener('click', () => {
        handleBorrowOrReturnBook(book, book.borrowedBy ? 'return' : 'borrow');
      });
      card.appendChild(borrowBtn);
      
      const details = document.createElement('div');
      details.className = 'book-details';

      const titleEl = document.createElement('h3');
      titleEl.textContent = book.title;
      details.appendChild(titleEl);

      const authorEl = document.createElement('p');
      authorEl.textContent = `Author: ${book.author}`;
      details.appendChild(authorEl);

      const isbnEl = document.createElement('p');
      isbnEl.textContent = `ISBN: ${book.isbn}`;
      details.appendChild(isbnEl);

      const priceEl = document.createElement('p');
      priceEl.textContent = `Price: ${book.price} EUR`;
      details.appendChild(priceEl);

      const descriptionEl = document.createElement('p');
      descriptionEl.textContent = `Description: ${book.description}`;
      details.appendChild(descriptionEl);

      const statusEl = document.createElement('p');
      statusEl.textContent = book.borrowedBy ? 'Status: On loan' : 'Status: Available';
      details.appendChild(statusEl);

      card.appendChild(details);

      const catLabel = document.createElement('div');
      catLabel.className = 'book-category-label';
      catLabel.textContent = category.categoryName;
      card.appendChild(catLabel);

      // Create "Delete Book" button
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete Book';
      deleteBtn.className = 'delete-book-btn';
      deleteBtn.addEventListener('click', () => {
        if (confirm(`Are you sure you want to delete "${book.title}"?`)) {
          handleDeleteBook(category, book.id);
        }
      });
      card.appendChild(deleteBtn);

      displayContainer.appendChild(card);
    });
  });
}


// ------------------------------
// Global: Book Deletion Function
function handleDeleteBook(category, bookId) {
  console.log(`Deleting book with ID: ${bookId} from category: ${category.categoryName}`);
  category._books = category._books.filter(book => book.id !== bookId);
  ourLibrary._categories.forEach(cat => {
    if (cat.id === category.id) {
      cat._books = category._books;
    }
  });
  saveLibrary();
  displayLibrary();
}

// ------------------------------
// Readers Code (for readers.html)
if (document.getElementById('readers-display')) {
  
  function handleAddReader(event) {
    event.preventDefault();
    console.log('add reader is clicked');
    const readerName = document.getElementById('reader-name').value.trim();
    if (!readerName) {
      alert('Please enter a reader name.');
      return;
    }
    const newReader = new Reader(readerName);
    console.log(newReader);
    ourLibrary.readers = ourLibrary.readers || [];
    ourLibrary.readers.push(newReader);
    alert(`Reader "${readerName}" added successfully!`);
    event.target.reset();
    saveLibrary();
    displayReaders();
  }
  
  const addReaderForm = document.getElementById('add-reader-form');
  if (addReaderForm) {
    addReaderForm.addEventListener('submit', handleAddReader);
  }
  
  function handleDeleteReader(readerId) {
    const reader = ourLibrary.readers.find(r => r.id === readerId);
    if (!reader) return;
    
    // For all books borrowed by this reader, return them
    ourLibrary.getCategories().forEach(category => {
      category.books.forEach(book => {
        if (book.borrowedBy === reader.id) {
          reader.returnBook(book);
          book.borrowedBy = null;
          // No need to call book.checkIn() if we rely on borrowedBy.
        }
      });
    });
    
    ourLibrary.readers = ourLibrary.readers.filter(r => r.id !== readerId);
    saveLibrary();
    displayReaders();
    displayLibrary();
  }
    
  function displayReaders() {
    const readersContainer = document.getElementById('readers-display');
    if (!readersContainer) return;
    readersContainer.innerHTML = '';

    if (!ourLibrary.readers || ourLibrary.readers.length === 0) {
      readersContainer.innerHTML = '<p>No readers added yet.</p>';
      return;
    }

    const ol = document.createElement('ol');
    ourLibrary.readers.forEach(reader => {
      const li = document.createElement('li');
      li.textContent = reader.name;

      const borrowedBooks = ourLibrary.getCategories()
        .flatMap(category => category.books)
        .filter(book => book.borrowedBy === reader.id);

      if (borrowedBooks.length > 0) {
        const ul = document.createElement('ul');
        borrowedBooks.forEach(book => {
          const bookLi = document.createElement('li');
          bookLi.textContent = `${book.title} (ISBN: ${book.isbn})`;

          const returnBtn = document.createElement('button');
          returnBtn.textContent = 'Return Book';
          returnBtn.addEventListener('click', () => {
            handleBorrowOrReturnBook(book, 'return');
            displayLibrary(); // Update books display
            displayReaders(); // Update readers display
          });

          bookLi.appendChild(returnBtn);
          ul.appendChild(bookLi);
        });
        li.appendChild(ul);
      } else {
        const noBooksMsg = document.createElement('p');
        noBooksMsg.textContent = 'No books borrowed.';
        li.appendChild(noBooksMsg);
      }

      const deleteReaderBtn = document.createElement('button');
      deleteReaderBtn.textContent = 'Delete Reader';
      deleteReaderBtn.style.marginLeft = '10px';
      deleteReaderBtn.addEventListener('click', () => {
        if (confirm(`Delete reader "${reader.name}"?`)) {
          handleDeleteReader(reader.id);
        }
      });
      li.appendChild(deleteReaderBtn);

      ol.appendChild(li);
    });

    readersContainer.appendChild(ol);
  }
  
  displayReaders();
}

// Export ourLibrary and saveLibrary if needed externally
export { ourLibrary, saveLibrary };
