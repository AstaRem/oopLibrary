// Book Klasė
// Aprašymas: Klasė, kuri reprezentuoja knygą.
// Savybės:
// id: unikalus knygos numeris
// title: knygos pavadinimas.
// author: knygos autorius.
// isbn: knygos ISBN numeris.
// price: knygos kaina.
// description: trumpas knygos aprašymas.
// is_checked_out: rodoma, ar knyga yra pasiskolinta.
// Metodai:
// Geteriai, seteriai
// checkAvailability(): patikrina, ar knyga yra pasiskolinta.
// checkOut(): pažymi knygą kaip pasiskolintą.
// checkIn(): pažymi knygą kaip prieinamą



//is vartotojo input paimti visus duomenis apie knyga, isskyrus id-jis turi automatiskai atsirasti kuriant objekta nauja


// class Book {
//     constructor(id, title, author, isbn, price, description) {
//         this.id = id;
//         this.title = title;
//         this.author = author;
//         this.isbn = isbn;
//         this.price = price;
//         this.description = description;
//         this.is_checked_out = false;  
//     }

//     // Get'eriai
//     getId() {
//         return this.id;
//     }

//     getTitle() {
//         return this.title;
//     }

//     getAuthor() {
//         return this.author;
//     }

//     getIsbn() {
//         return this.isbn;
//     }

//     getPrice() {
//         return this.price;
//     }

//     getDescription() {
//         return this.description;
//     }

//     getIsCheckedOut() {
//         return this.is_checked_out;
//     }

//     // Set'eriai
//     setId(id) {
//         this.id = id;
//     }

//     setTitle(title) {
//         this.title = title;
//     }

//     setAuthor(author) {
//         this.author = author;
//     }

//     setIsbn(isbn) {
//         this.isbn = isbn;
//     }

//     setPrice(price) {
//         this.price = price;
//     }

//     setDescription(description) {
//         this.description = description;
//     }

//     setIsCheckedOut(isCheckedOut) {
//         this.is_checked_out = isCheckedOut;
//     }

//     checkAvailability() {
//         return this.is_checked_out ? 'Knyga yra pasiskolinta' : 'Knyga yra prieinama';
//     }

//     // Pazymi knyga kaip pasiskolinta
//     checkOut() {
//         if (this.is_checked_out) {
//             return 'Knyga jau yra pasiskolinta';
//         } else {
//             this.is_checked_out = true;
//             return 'Knyga buvo pasiskolinta';
//         }
//     }

//     // Pazymi knyga kaip prieinama
//     checkIn() {
//         if (!this.is_checked_out) {
//             return 'Knyga jau yra prieinama';
//         } else {
//             this.is_checked_out = false;
//             return 'Knyga buvo grąžinta';
//         }
//     }

//     // Pridėti atsiliepima apie knyga
//     addRating(rating) {
//         if (rating instanceof Rating && rating.getBookId() === this.id) {
//             this.ratings.push(rating);
//         } else {
//             console.log('Atsiliepimas negali būti pridėtas: klaidingas knygos ID.');
//         }
//     }

//     // Gauti atsiliepima apie knyga
//     getRatings() {
//         return this.ratings;
//     }
// }



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
      return !this._is_checked_out;
    }
  
    // Method to check out the book if available
    checkOut() {
      if (this.checkAvailability()) {
        this._is_checked_out = true;
        return true;
      }
      return false;
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

