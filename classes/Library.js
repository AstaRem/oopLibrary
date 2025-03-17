import Category from './Category.js';

class Library {
    constructor(library) {
        this._library = library;
      // Array to store Category objects
      this._categories = [];
    // Array to store Reader objects
      this.readers =[];
    }
  
    // Method to add a new Category to the library
    addCategory(category) {
      this._categories.push(category);
    }

    // Method to add a new Reader to the library
    addReader(reader) {
      this._readers.push(reader);
    }

  
    // Method to retrieve all categories
    getCategories() {
      return this._categories;
    }

    getReaders(){
        return this._readers;
    }
  
    // Example method: Generate HTML to display the library's categories and books.
    generateHTML() {
      let htmlContent = '';
  
      this._categories.forEach(category => {
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
  

export default Library;

