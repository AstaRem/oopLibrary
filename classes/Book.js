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


class Book {
    constructor(id, title, author, isbn, price, description) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.price = price;
        this.description = description;
        this.is_checked_out = false;  
    }

    // Get'eriai
    getId() {
        return this.id;
    }

    getTitle() {
        return this.title;
    }

    getAuthor() {
        return this.author;
    }

    getIsbn() {
        return this.isbn;
    }

    getPrice() {
        return this.price;
    }

    getDescription() {
        return this.description;
    }

    getIsCheckedOut() {
        return this.is_checked_out;
    }

    // Set'eriai
    setId(id) {
        this.id = id;
    }

    setTitle(title) {
        this.title = title;
    }

    setAuthor(author) {
        this.author = author;
    }

    setIsbn(isbn) {
        this.isbn = isbn;
    }

    setPrice(price) {
        this.price = price;
    }

    setDescription(description) {
        this.description = description;
    }

    setIsCheckedOut(isCheckedOut) {
        this.is_checked_out = isCheckedOut;
    }

    checkAvailability() {
        return this.is_checked_out ? 'Knyga yra pasiskolinta' : 'Knyga yra prieinama';
    }

    // Pazymi knyga kaip pasiskolinta
    checkOut() {
        if (this.is_checked_out) {
            return 'Knyga jau yra pasiskolinta';
        } else {
            this.is_checked_out = true;
            return 'Knyga buvo pasiskolinta';
        }
    }

    // Pazymi knyga kaip prieinama
    checkIn() {
        if (!this.is_checked_out) {
            return 'Knyga jau yra prieinama';
        } else {
            this.is_checked_out = false;
            return 'Knyga buvo grąžinta';
        }
    }

    // Pridėti atsiliepima apie knyga
    addRating(rating) {
        if (rating instanceof Rating && rating.getBookId() === this.id) {
            this.ratings.push(rating);
        } else {
            console.log('Atsiliepimas negali būti pridėtas: klaidingas knygos ID.');
        }
    }

    // Gauti atsiliepima apie knyga
    getRatings() {
        return this.ratings;
    }
}



