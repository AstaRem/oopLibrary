// Category Klasė
// Aprašymas: Klasė, kuri reprezentuoja knygų kategoriją.
// Savybės:
// id: unikalus kategorijos numeris
// categoryName: kategorijos pavadinimas.
// books: masyvas, kuriame saugomos knygos.
// Metodai:
// Geteriai, seteriai
// getBooksByAuthor(authorName): grąžina masyvą knygų, kurių autorius atitinka duotą vardą.
// getBooksByPriceRange(minPrice, maxPrice): grąžina knygas, kurių kaina yra nustatytame intervale.

// class Category {
 
//     #id;
//     #categoryName;
//     #books;
   
//     constructor(idNumber, name) {
//         this.#id = idNumber;
//         this.#categoryName = name;
//         this.#books = [];
//     }
 
//     getId() {
//         return this.#id;
//     }
 
//     getCategoryName() {
//         return this.#categoryName;
//     }
 
//     getBooks() {
//         return this.#books
//     }
 
//     setId(newId) {
//         this.#id = newId;
//     }
 
//     setCategoryName(newCategoryName) {
//         this.#categoryName = newCategoryName;
//     }
 
//     setBooks(newBooks) {
//         this.#books = newBooks;
//     }
 
//     addBook(book) {
//         this.#books.push(book);
//     }
 
//     getBooksByAuthor(authorName) { //Veikia tik ivardijus kokioje kategorijoje ieskome(categoryName.getBooksByAuthor(authorName))
//         return this.#books.filter(book => book.getAuthor() === authorName);
//     }
 
//     getBooksByPriceRange(minPrice, maxPrice) { //Veikia tik ivardijus kokioje kategorijoje ieskome
//         return this.#books.filter(book => book.getPrice() >= minPrice && book.getPrice() <= maxPrice);
//     }
  
// }

import Book from './Book.js';

class Category {
    static counter = 0;
  
    constructor(categoryName) {
      // Unique id using a static counter
      this.id = ++Category.counter;
      this._categoryName = categoryName;
      // Array to hold Book objects belonging to this category
      this._books = [];
    }
  
    // Getter and setter for categoryName
    get categoryName() {
      return this._categoryName;
    }
    
    set categoryName(newName) {
      this._categoryName = newName;
    }
  
    // Getter for books
    get books() {
      return this._books;
    }
  
    // Method to add a new Book to the category
    addBook(book) {
      this._books.push(book);
    }
  
    // Returns an array of books by a specific author
    getBooksByAuthor(authorName) {
      return this._books.filter(book => book.author === authorName);
    }
  
    // Returns an array of books within a specified price range
    getBooksByPriceRange(minPrice, maxPrice) {
      return this._books.filter(book => book.price >= minPrice && book.price <= maxPrice);
    }
  }
  

export default Category;