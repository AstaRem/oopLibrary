// Library Klasė
// Aprašymas: Klasė, kuri saugo visas kategorijas ir yra atsakinga už bibliotekos valdymą.
// Savybės:
// categories: masyvas, kuriame saugomos kategorijos objektai.
// Metodai:
// Geteriai, seteriai


// nauja kategorija kuria Library klase
class Library {
    #categories = [];
    #categoryId = 0;

    constructor (library){
        this.library = library;
    }

    setCategory(category){
        this.#categoryId += 1;
        this.id = this.#categoryId;
        let newCategory = new Category(this.id, category);
        this.#categories.push(newCategory);
    }

    getCategories(){
        return this.#categories;
    }

}



// testavimui:
class Category{
    constructor(id, categoryName){
        this.id = id;
        this.category = categoryName;
    }
}


let pietinioBiblioteka = new Library("pietinio biblioteka")
console.log(pietinioBiblioteka);
pietinioBiblioteka.setCategory("poezija");
pietinioBiblioteka.setCategory("grozine literatura");
pietinioBiblioteka.setCategory("keliones");


let kategorijos = pietinioBiblioteka.getCategories();
console.log(kategorijos);
