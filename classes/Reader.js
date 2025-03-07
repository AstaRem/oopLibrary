
class Reader {
    static counter = 0;
  
    constructor(name) {
      // Generate a unique reader id using a static counter
      this.id = ++Reader.counter;
      this.name = name;
      // Array to hold Book objects that the reader has borrowed
      this._borrowedBooks = [];
    }
  
    // Getter and setter for the reader's name
    // get name() {
    //   return this.name;
    // }
  
    // set name(newName) {
    //   this.name = newName;
    // }
  
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