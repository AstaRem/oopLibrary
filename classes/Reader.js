
class Reader {
    static counter = 0;
  
    constructor(name) {
      // Generate a unique reader id using a static counter
      this.id = ++Reader.counter;
      this.name = name;
      // Array to hold Book objects that the reader has borrowed
      this._borrowedBooks = [];
    }
  
  
    // Method to borrow a book if it is available
  
    borrowBook(book) {
      if (book.checkAvailability()) {
        this._borrowedBooks.push(book);
        return true;
      }
      return false;
    }
  
    returnBook(book) {
      this._borrowedBooks = this._borrowedBooks.filter(b => b.id !== book.id);
    }
  }
  
export default Reader;