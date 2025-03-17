

class Book {
    static counter = 0;
  
    constructor(title, author, isbn, price, description) {
      this.id = ++Book.counter;
      this._title = title;
      this._author = author;
      this._isbn = isbn;
      this._price = price;
      this._description = description;
      this._is_checked_out = false;
      this._ratings = []; // Store Rating objects related to this book
      this.borrowedBy = null; // Stores the ID of the reader who borrowed it
    }
  
    // Getters and setters for title
    get title() {
      return this._title;
    }
    
    set title(newTitle) {
      this._title = newTitle;
    }
  
    // Getters and setters for author
    get author() {
      return this._author;
    }
    
    set author(newAuthor) {
      this._author = newAuthor;
    }
  
    // Getters and setters for isbn
    get isbn() {
      return this._isbn;
    }
    
    set isbn(newIsbn) {
      this._isbn = newIsbn;
    }
  
    // Getters and setters for price
    get price() {
      return this._price;
    }
    
    set price(newPrice) {
      this._price = newPrice;
    }
  
    // Getters and setters for description
    get description() {
      return this._description;
    }
    
    set description(newDescription) {
      this._description = newDescription;
    }
  
    // Getter for is_checked_out flag
    get isCheckedOut() {
      return this._is_checked_out;
    }
  
    // Methods for checking the book's availability
    checkAvailability() {
      return this.borrowedBy === null;
  }
  
    // Method to check out the book if available
    checkOut() {
      this._is_checked_out = true;
  }

    // Method to check in the book (make it available)
    checkIn() {
      this._is_checked_out = false;
  }


    get ratings() {
        return this._ratings;
      }
    
      addRating(rating) {
        this._ratings.push(rating);
      }
  }
    

export default Book;

