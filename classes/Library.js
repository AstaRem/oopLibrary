// Library Klasė
// Aprašymas: Klasė, kuri saugo visas kategorijas ir yra atsakinga už bibliotekos valdymą.
// Savybės:
// categories: masyvas, kuriame saugomos kategorijos objektai.
// Metodai:
// Geteriai, seteriai

import Category from './Category.js';
import Reader from './Reader.js';

class Library {
    constructor() {
      // Array to store Category objects
      this.categories = [];
      this.readers =[];
    }
  
    // Method to add a new Category to the library
    addCategory(category) {
      this.categories.push(category);
    }

    // Method to add a new Reader to the library
    addReader(reader) {
      this.readers.push(reader);
    }

  
    // Method to retrieve all categories
    getCategories() {
      return this.categories;
    }

    getReaders(){
        return this.readers;
    }
  
    // Example method: Generate HTML to display the library's categories and books.
    // This can be expanded as needed.
    generateHTML() {
      let htmlContent = '';
  
      this.categories.forEach(category => {
        htmlContent += `<div class="category">
                          <h2>${category.categoryName}</h2>
                          <ul>`;
        // Assume each category has a 'books' array
        category.books.forEach(book => {
          htmlContent += `<li>${book.title} by ${book.author}</li>`;
        });
        htmlContent += `</ul>
                        </div>`;
      });
  
      return htmlContent;
    }
  }
  
  // Example of instantiating the Library object (if you want this file to bootstrap your app)
  // const myLibrary = new Library();
  // window.myLibrary = myLibrary; // Making it global if needed for testing in the console
  

export default Library;

