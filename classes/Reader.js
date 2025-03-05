// Reader (Skaitytojas) Klasė
// Aprašymas: Klasė, kuri reprezentuoja bibliotekos skaitytoją.
// Savybės:
// name: skaitytojo vardas.
// reader_id: unikalus skaitytojo identifikatorius.
// borrowed_books: masyvas, kuriame saugomos pasiskolintos knygos.
// Metodai:
// getName(): grąžina skaitytojo vardą.
// setName(name): nustato skaitytojo vardą.
// getReaderId(): grąžina skaitytojo ID.
// setReaderId(reader_id): nustato skaitytojo ID.
// borrowBook(book): prideda knygą į pasiskolintų knygų sąrašą, jei ji yra prieinama.
// returnBook(book): pašalina knygą iš pasiskolintų knygų sąrašo.
// getBorrowedBooks(): grąžina visų pasiskolintų knygų masyvą.


// class Reader {
 
//     #name;
//     #readerId;
//     #borrowed_books;
 
//     constructor(name, readerId) {
//         this.#name = name;
//         this.#readerId = readerId;
//         this.#borrowed_books = [];
//     }
 
//     getName() {
//         return this.#name;
//     }
 
//     getReaderId() {
//         return this.#readerId;
//     }
 
//     getBorrowedBooks() {
//         return this.#borrowed_books;
//     }
 
//     setName(newName) {
//         this.#name = newName;
//     }
 
//     setReaderId(newReaderId) {
//         this.#readerId = newReaderId;
//     }
 
//     borrowBook(book) {
//         if (book && !this.#borrowed_books.includes(book)) { // Tikrinam, ar knyga yra bibliotekoj ir ar nėra pasiskolinta
//             this.#borrowed_books.push(book);
//             console.log(`${this.#name} pasiskolino knygą: ${book.getTitle()}`);
//         } else {
//             console.log('Knyga yra jau pasiskolinta .');
//         }
//     }
 
 
//     returnBook(book) {
//         this.#borrowed_books = this.#borrowed_books.filter(a => a !== book); // Paliekame tik tas knygas, kurios nėra grąžinama
//         console.log(`${this.#name} grąžino knygą: ${book.getTitle()}`);
//     }
// }

// Reader.js

class Reader {
    static counter = 0;
  
    constructor(name) {
      // Generate a unique reader id using a static counter
      this.id = ++Reader.counter;
      this._name = name;
      // Array to hold Book objects that the reader has borrowed
      this._borrowedBooks = [];
    }
  
    // Getter and setter for the reader's name
    get name() {
      return this._name;
    }
  
    set name(newName) {
      this._name = newName;
    }
  
    // Getter for borrowedBooks
    get borrowedBooks() {
      return this._borrowedBooks;
    }
  
    // Method to borrow a book if it is available
    borrowBook(book) {
      if (book.checkAvailability()) {
        // Mark the book as checked out
        book.checkOut();
        // Add the book to the reader's borrowed list
        this._borrowedBooks.push(book);
        return true;
      }
      return false;
    }
  
    // Method to return a borrowed book
    returnBook(book) {
      const index = this._borrowedBooks.findIndex(b => b.id === book.id);
      if (index !== -1) {
        // Mark the book as available
        book.checkIn();
        // Remove the book from the borrowed list
        this._borrowedBooks.splice(index, 1);
        return true;
      }
      return false;
    }
  }
  
export default Reader;