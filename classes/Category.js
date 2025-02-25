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

class Category {
 
    #id;
    #categoryName;
    #books;
   
    constructor(idNumber, name) {
        this.#id = idNumber;
        this.#categoryName = name;
        this.#books = [];
    }
 
    getId() {
        return this.#id;
    }
 
    getCategoryName() {
        return this.#categoryName;
    }
 
    getBooks() {
        return this.#books
    }
 
    setId(newId) {
        this.#id = newId;
    }
 
    setCategoryName(newCategoryName) {
        this.#categoryName = newCategoryName;
    }
 
    setBooks(newBooks) {
        this.#books = newBooks;
    }
 
    addBook(book) {
        this.#books.push(book);
    }
 
    getBooksByAuthor(authorName) { //Veikia tik ivardijus kokioje kategorijoje ieskome(categoryName.getBooksByAuthor(authorName))
        return this.#books.filter(book => book.getAuthor() === authorName);
    }
 
    getBooksByPriceRange(minPrice, maxPrice) { //Veikia tik ivardijus kokioje kategorijoje ieskome
        return this.#books.filter(book => book.getPrice() >= minPrice && book.getPrice() <= maxPrice);
    }
  
}