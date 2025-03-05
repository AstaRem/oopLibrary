import Library from './classes/Library.js';
import Reader from './Reader.js';



let ourLibrary = new Library('A_R_A biblioteka');
console.log(`Biblioteka ${ourLibrary.library} sukurta`);

// Create a new Reader instance - will do that from the input, with a button click 
const reader1 = new Reader('Alicija');
// Add the reader to the Library's readers array (assuming you've added this property)
ourLibrary.readers.push(reader1);

window.ourLibrary = ourLibrary;

// create new book

// let id =  turi sukurti kategorija su static kintamuoju, automatiskai generuoti, kuriant knyga. o vartotojui jo juk nereikia matyti kuriant? tik kai rodau knyga gaiu irasyt juk
const titleInp = document.getElementById('add-book-title');
const authorInp = document.getElementById('add-book-author'); 
const isbnInp = document.getElementById('add-book-isbn'); 
const priceInp = document.getElementById('add-book-price'); 
const descriptionInp = document.getElementById('add-book-description'); 

const addToBtn = document.querySelector('[data-add-to-library]')

addToBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(titleInp.value);
    titleInp.value = '';
}
);

