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
            category.addBook(book);
          });
        }
        lib.addCategory(category);
      });
    }

    // Reconstruct readers and correctly map name to name
    if (parsedData.readers) {
      lib.readers = parsedData.readers.map(readerData => {
        let reader = new Reader(readerData.name); // Use name here
        reader.id = readerData.id; // Ensure the id is set correctly
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
// Books & Categories Code (for index.html)
// This block runs only if the element with id "library-display" exists
if (document.getElementById('library-display')) {
  populateCategoriesDropdown();

  function handleAddBook(event) {
    event.preventDefault();
    
    // Get form values
    const title = document.getElementById('add-book-title').value;
    const author = document.getElementById('add-book-author').value;
    const isbn = document.getElementById('add-book-isbn').value;
    const price = parseFloat(document.getElementById('add-book-price').value);
    const description = document.getElementById('add-book-description').value;
    const categoryId = document.getElementById('categories').value; // assumes the select element has id "categories"
  
    // Create a new Book instance
    const newBook = new Book(title, author, isbn, price, description);
    console.log(newBook);
    console.log(ourLibrary.getCategories());
  
    // Find the selected category
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
    const dropdown = document.getElementById('categories'); // select element with id "categories"
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
  function displayLibrary() {
    const displayContainer = document.getElementById('library-display');
    if (!displayContainer) return;
    displayContainer.innerHTML = '';
  
    ourLibrary.getCategories().forEach(category => {
      category.books.forEach(book => {
        const card = document.createElement('div');
        card.className = 'book-card';
  
        // const img = document.createElement('img');
        // img.src = './assets/img/book-cover-mock.png';
        // img.alt = `${book.title} cover`;
        // card.appendChild(img);
  
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
        statusEl.textContent = book.checkAvailability() ? 'Status: Available' : 'Status: On loan';
        details.appendChild(statusEl);
  
        card.appendChild(details);
  
        const catLabel = document.createElement('div');
        catLabel.className = 'book-category-label';
        catLabel.textContent = category.categoryName;
        card.appendChild(catLabel);
  
        displayContainer.appendChild(card);
      });
    });
  }
  
  displayLibrary();
}

// ------------------------------
// Readers Code (for readers.html)
// This block runs only if the element with id "readers-display" exists
if (document.getElementById('readers-display')) {
  
  function handleAddReader(event) {
    event.preventDefault();
    console.log('add reader is clicked')

    const readerName = document.getElementById('reader-name').value.trim();
    if (!readerName) {
      alert('Please enter a reader name.');
      return;
    }
    const newReader = new Reader(readerName);
    console.log(newReader)
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
  
  // Delete reader functionality
  function handleDeleteReader(readerId) {
    ourLibrary.readers = ourLibrary.readers.filter(reader => reader.id !== readerId);
    saveLibrary();
    displayReaders();
  }
  
  // Function to display the list of readers in an ordered list (<ol>)
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
  
      // Create a delete button
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.style.marginLeft = '10px';
      deleteBtn.addEventListener('click', () => {
        if (confirm(`Delete reader "${reader.name}"?`)) {
          handleDeleteReader(reader.id);
        }
      });
      li.appendChild(deleteBtn);
      ol.appendChild(li);
    });
    readersContainer.appendChild(ol);
  }
  
  displayReaders();
}

// Export ourLibrary and saveLibrary if needed externally
export { ourLibrary, saveLibrary };
