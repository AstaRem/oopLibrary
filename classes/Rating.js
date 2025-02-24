class Rating {
    constructor(id, bookId, readerId, rating, comment) {
        this.id = id;
        this.bookId = bookId;
        this.readerId = readerId;
        this.rating = rating; 
        this.comment = comment;  

    }

    // Get'eriai

    getid() {
        return this.id;
    }
    
    getBookId() {
        return this.bookId;
    }
    
    getReaderId() {
        return this.readerId;
    }
    
    getRating() {
        return this.rating;
    }
    
    getComment() {
        return this.comment;
    }
    
    // Set'eriai
    
    setId(id) {
        this.id = id;
    }
    
    setBookId(bookId) {
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
        this.comment = comment;
    }
}

