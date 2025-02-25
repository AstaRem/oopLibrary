
// Rating Klasė (Klientų atsiliepimų sistema (Feedback))
// Aprašymas: Klasė, leidžianti skaitytojams palikti atsiliepimus apie knygas.
// Savybės:
// id: unikalus atsiliepimo numeris.
// bookId: nuoroda į knygos id.
// readerId: nuoroda į skaitytojo id.
// rating: įvertinimas (1-5).
// comment: atsiliepimo tekstas.
// Metodai:
// Geteriai, seteriai

class Rating {
    static COUNTER = 0; 
    static COMMENTS = []; 
    static LAST_ID = 0;

    constructor(bookId, readerId, rating, comment) {
        this.id = Rating.generateUniqueId(); 
        this.bookId = bookId;
        this.readerId = readerId;
        this.setRating(rating);
        this.comment = comment || "Komentaro nėra";  

        Rating.COUNTER++; 
        Rating.COMMENTS.push(this.comment);
    }

    // 📌 Get'eriai
    getId(){ 
        return this.id; 
    }
    getBookId(){ 
        return this.bookId;
     }
    getReaderId(){ 
        return this.readerId; 
    }
    getRating(){ 
        return this.rating;
    }
    getComment(){ 
        return this.comment; 
    }

    // 📌 Set'eriai
    setBookId(bookId){ 
        this.bookId = bookId; 
    }
    setReaderId(readerId) { 
        this.readerId = readerId;
     }
    setRating(rating) {
        if (rating >= 1 && rating <= 5) {
            this.rating = rating;
        } else {
            console.log("Įvertinimas turi būti tarp 1 ir 5.");
        }
    }
    setComment(comment) { 
        this.comment = comment || "Komentaro nėra"; 
    }

    static generateUniqueId() {
        return ++Rating.LAST_ID;
    }

    static getCounter() {
        return Rating.COUNTER;
    }


    static getAllComments() {
        return Rating.COMMENTS;
    }
}

// --- Testavimas ---
//const review1 = new Rating(202, 5, 4, "Labai gera knyga!");
//const review2 = new Rating(203, 8, 3, "Vidutiniška.");
//const review3 = new Rating(204, 10, 5); // Be komentaro

//console.log("Atsiliepimas 1 ID:", review1.getId());
//console.log("Atsiliepimas 2 ID:", review2.getId());
//console.log("Atsiliepimas 3 ID:", review3.getId());

//console.log("Viso sukurta atsiliepimų:", Rating.getCounter());
c//onsole.log("Visi komentarai:", Rating.getAllComments());

