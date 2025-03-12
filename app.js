import Library from './classes/Library.js';
import Book from './classes/Book.js';
import Category from './classes/Category.js';
import Reader from './classes/Reader.js';
import Rating from './classes/Rating.js';

// ------------------------------

let globalPopulateCategoriesDropdown;
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
// if (!savedLibrary) {
//   const fictionCategory = new Category('Fiction');
//   const nonFictionCategory = new Category('Non-Fiction');
//   const uncategorizedCategory = new Category('Uncategorized'); // Default category
//   ourLibrary.addCategory(fictionCategory);
//   ourLibrary.addCategory(nonFictionCategory);
//   ourLibrary.addCategory(uncategorizedCategory); // Add default category
//   saveLibrary();  
// }

// console.log(ourLibrary.getCategories());

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
//Ensure that the filter category dropdown is populated when the page loads:
if (document.getElementById('library-display')) {
  populateCategoriesDropdown();
  populateFilterCategoryDropdown();
  displayLibrary();
  displayCategories(); // Calling displayCategories on page load


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

    // Sort categories alphabetically by category name
    const sortedCategories = ourLibrary.getCategories().sort((a, b) => a.categoryName.toLowerCase().localeCompare(b.categoryName.toLowerCase()));

    sortedCategories.forEach(category => {
      const option = document.createElement('option');
      option.value = category.id;
      option.textContent = category.categoryName;
      dropdown.appendChild(option);
    });
    globalPopulateCategoriesDropdown = populateCategoriesDropdown;
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
    displayCategories(); // Call displayCategories after adding a category
    event.target.reset();
    saveLibrary();
    displayLibrary();
    populateFilterCategoryDropdown();
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

  // Get filter values
  const filterAvailability = document.getElementById('filter-availability').value;
  const filterCategory = document.getElementById('filter-category').value;

  // Sort categories alphabetically by category name
  const sortedCategories = ourLibrary.getCategories().sort((a, b) => a.categoryName.toLowerCase().localeCompare(b.categoryName.toLowerCase()));

  sortedCategories.forEach(category => {
    // Filter by category if selected
    if (filterCategory !== 'all' && category.id !== Number(filterCategory)) {
      return;
    }

    category.books.forEach(book => {
      // Filter by availability
      if (filterAvailability === 'available' && book.borrowedBy) {
        return;
      }
      if (filterAvailability === 'on-loan' && !book.borrowedBy) {
        return;
      }

      const card = document.createElement('div');
      card.className = 'book-card';
      card.dataset.bookId = book.id;
      
      // Create "Borrow/Return Book" button
      const borrowBtn = document.createElement('button');
      borrowBtn.textContent = book.borrowedBy ? 'Return Book' : 'Borrow Book';
      borrowBtn.className = book.borrowedBy ? 'return-button-in-books' : 'borrow-button-in-books';
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
      statusEl.className = 'status-el';
      if (book.borrowedBy) {
        const borrower = ourLibrary.readers.find(r => r.id === book.borrowedBy);
        statusEl.textContent = `Status: On loan to ${borrower.name}`;
      } else {
        statusEl.textContent = 'Status: Available';
      }
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

// Display and delete category
function displayCategories() {
  const categoryContainer = document.getElementById('category-list');
  console.log(categoryContainer)
  if (!categoryContainer) return;
  categoryContainer.innerHTML = '';

  // Sort categories alphabetically
  const sortedCategories = ourLibrary.getCategories().sort((a, b) =>
    a.categoryName.toLowerCase().localeCompare(b.categoryName.toLowerCase())
  );

  sortedCategories.forEach(category => {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'category-item';
    categoryDiv.textContent = category.categoryName;

    // Create a Delete Button for the category
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-category-btn';
    deleteBtn.style.marginLeft = '10px';
    deleteBtn.addEventListener('click', () => {
      if (confirm(`Are you sure you want to delete the category "${category.categoryName}"?`)) {
        handleDeleteCategory(category.id);
      }
    });

    categoryDiv.appendChild(deleteBtn);
    categoryContainer.appendChild(categoryDiv);
  });
}


function handleDeleteCategory(categoryId) {
  // Find the index of the category to delete in ourLibrary
  const index = ourLibrary._categories.findIndex(cat => cat.id === categoryId);
  if (index !== -1) {
    // Get the category to delete
    const categoryToDelete = ourLibrary._categories[index];
    
    // Find the default category (Uncategorized)
    const defaultCategory = ourLibrary._categories.find(cat => cat.categoryName === 'Uncategorized');
    if (!defaultCategory) {
      alert('Default category "Uncategorized" not found!');
      return;
    }

    // Move books to the default category
    categoryToDelete.books.forEach(book => {
      defaultCategory.addBook(book);
    });

    // Remove the category from the library
    ourLibrary._categories.splice(index, 1);
    
    // Update dropdowns and displays (if these lists are used elsewhere)
    globalPopulateCategoriesDropdown();
    populateFilterCategoryDropdown();
    saveLibrary();
    displayLibrary();
    displayCategories(); // Refresh the category list display
  }
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

    // Sort readers alphabetically by name
    const sortedReaders = ourLibrary.readers.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

    const ol = document.createElement('ol');
    sortedReaders.forEach(reader => {
      const li = document.createElement('li');
      li.className = 'reader-details';
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
          returnBtn.className = 'return-button-in-reader';
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
      deleteReaderBtn.className = 'delete-reader-btn';
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

document.getElementById('filter-form').addEventListener('submit', (event) => {
  event.preventDefault();
  displayLibrary();
});

function populateFilterCategoryDropdown() {
  const dropdown = document.getElementById('filter-category');
  if (!dropdown) return;
  dropdown.innerHTML = '<option value="all">All</option>';

  // Sort categories alphabetically by category name
  const sortedCategories = ourLibrary.getCategories().sort((a, b) => a.categoryName.toLowerCase().localeCompare(b.categoryName.toLowerCase()));

  sortedCategories.forEach(category => {
    const option = document.createElement('option');
    option.value = category.id;
    option.textContent = category.categoryName;
    dropdown.appendChild(option);
  });
}

console.log(ourLibrary.getCategories());


// Export ourLibrary and saveLibrary if needed externally
export { ourLibrary, saveLibrary };
