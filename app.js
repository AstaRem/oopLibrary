import Library from './classes/Library.js';
import Book from './classes/Book.js';
import Category from './classes/Category.js';
import Reader from './classes/Reader.js';
import Rating from './classes/Rating.js';



let ourLibrary = new Library('A_R_A biblioteka');
console.log(`Biblioteka ${ourLibrary._library} sukurta`);



// create new book

// let id =  turi sukurti kategorija su static kintamuoju, automatiskai generuoti, kuriant knyga. o vartotojui jo juk nereikia matyti kuriant? tik kai rodau knyga gaiu irasyt juk
// const titleInp = document.getElementById('add-book-title');
// const authorInp = document.getElementById('add-book-author'); 
// const isbnInp = document.getElementById('add-book-isbn'); 
// const priceInp = document.getElementById('add-book-price'); 
// const descriptionInp = document.getElementById('add-book-description'); 

// const addToBtn = document.querySelector('[data-add-to-library]')

// addToBtn.addEventListener('click', (e) => {
//     e.preventDefault();
//     console.log(titleInp.value);
//     titleInp.value = '';
// }
// );
// Example: Create a new Category and add it to the Library
const fictionCategory = new Category('Fiction');
const nonFictionCategory = new Category('Non-Fiction');
ourLibrary.addCategory(fictionCategory);
ourLibrary.addCategory(nonFictionCategory);

  populateCategoriesDropdown();



function handleAddBook(event) {
    event.preventDefault();
  
    // Get form values
    const title = document.getElementById('add-book-title').value;
    const author = document.getElementById('add-book-author').value;
    const isbn = document.getElementById('add-book-isbn').value;
    const price = parseFloat(document.getElementById('add-book-price').value);
    const description = document.getElementById('add-book-description').value;
    const categoryId = document.getElementById('book-category').value; // Assume this returns the id of the selected category

    // Create a new Book instance
    const newBook = new Book(title, author, isbn, price, description);
    console.log(newBook)
    console.log(fictionCategory);
    console.log(nonFictionCategory);
    console.log(ourLibrary.getCategories());

  
    // Find the selected category from the library's categories
    const selectedCategory = ourLibrary.getCategories().find(cat => cat.id === Number(categoryId));

    if (selectedCategory) {
      // Add the new book to the selected category
      selectedCategory.addBook(newBook);
      console.log(`Book "${newBook.title}" added to category "${selectedCategory.categoryName}".`);
    } else {
      console.error('Selected category not found!');
    }
    // Clear the form 
    event.target.reset();
  }
  
  // Attach the event listener to your form
  const addBookForm = document.getElementById('add-book-form');
  if (addBookForm) {

    addBookForm.addEventListener('submit', handleAddBook);
  }



  function populateCategoriesDropdown() {
    const dropdown = document.getElementById('categories');
    // Clear any existing options
    dropdown.innerHTML = '';
  
    // Create an option for each category in ourLibrary
    ourLibrary.getCategories().forEach(category => {
      const option = document.createElement('option');
      option.setAttribute('id','book-category');
      option.value = category.id; // Use the category's id as the value
      option.textContent = category.categoryName;
      dropdown.appendChild(option);
    });
  }
  
  // Call this function after you add your categories to the library
  populateCategoriesDropdown();


//   addBookForm.addEventListener('submit', () => console.log('button is clicked'));


//   window.ourLibrary = ourLibrary;







// // Example: Add a Rating to the Book
// const rating1 = new Rating(newBook.id, 1, 5, 'An amazing read!');
// newBook.addRating(rating1);

// // Example: Create a new Reader and add it to the Library
// const reader1 = new Reader('Alicija');
// ourLibrary._readers.push(reader1);

// // Example: Let the reader borrow the book
// reader1.borrowBook(newBook);

// For testing in the browser console, you might attach your library object globally:

// Function to generate and display HTML content (you can expand this as needed)
// function displayLibrary() {
//   const libraryContainer = document.getElementById('library');
//   if (!libraryContainer) return;
//   libraryContainer.innerHTML = ourLibrary.generateHTML();
// }

// // Call displayLibrary initially and after any updates
// displayLibrary();


