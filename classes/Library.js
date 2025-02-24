// Library Klasė
// Aprašymas: Klasė, kuri saugo visas kategorijas ir yra atsakinga už bibliotekos valdymą.
// Savybės:
// categories: masyvas, kuriame saugomos kategorijos objektai.
// Metodai:
// Geteriai, seteriai


// nauja kategorija kuria Library klase
class Library {
    #categories = [];
    constructor (library){
        this.library = library;
    }

    setCategory(category){
        let newCategory = new Category(category);
        this.#categories.push(newCategory);
    }

    getCategories(categories){
        return this.#categories;
    }

}




class Category{
    constructor(categoryName){
        this.category = categoryName;
    }
}


let pietinioBiblioteka = new Library("pietinio biblioteka")
console.log(pietinioBiblioteka);
pietinioBiblioteka.setCategory("poezija");
pietinioBiblioteka.setCategory("grozine literatura");

let kategorijos = pietinioBiblioteka.getCategories();
console.log(kategorijos);
