//Initializing
let formIn = document.querySelector(".inputtab");
let container = document.getElementById("container");

let submitBook = document.querySelector("#submit");
let newBtn = document.querySelector(".newBtn");
let cancelBtn = document.querySelector("#cancel")

let readBtn = document.querySelectorAll(".read");
//storage Array
var myLibrary = [];

////Locale storage
window.addEventListener("beforeunload", (e) => {
    let myLibrarySerialized = JSON.stringify(myLibrary);
    localStorage.setItem("storedLibrary", myLibrarySerialized);
})

window.addEventListener("load", (e) => {
    let myLibraryDeserialized = JSON.parse(localStorage.getItem("storedLibrary"));
    if(myLibraryDeserialized == null){
        return;
    }
    myLibrary = [...myLibraryDeserialized]; 
    displayBook();
    
})


//Toggle read or not
////////////////////////////////////////////////////////
container.addEventListener("click", (e) => {
    if(e.target.classList.contains("read")){
       if(e.target.textContent == "Read: yes"){
           myLibrary[e.target.parentNode.getAttribute("data-index")].read = "no";
           e.target.textContent = "Read: " + myLibrary[e.target.parentNode.getAttribute("data-index")].read;
           e.target.classList.add("readno");
           e.target.classList.remove("readyes");
       }else if(e.target.textContent == "Read: no"){
        myLibrary[e.target.parentNode.getAttribute("data-index")].read = "yes";
        e.target.textContent = "Read: " + myLibrary[e.target.parentNode.getAttribute("data-index")].read;
        e.target.classList.remove("readno");
        e.target.classList.add("readyes");
       }
    }
    
})




 //push input to array as object
submitBook.addEventListener("click", addBookToLibrary);

function addBookToLibrary(){
    
   
    let inputTitle = document.querySelector("#title").value;
    let inputAuthor = document.querySelector("#author").value;
    let inputPages = document.querySelector("#pages").value;
    if(inputAuthor == "" || inputPages == "" || inputTitle == ""){
        let ourErrorMsg = document.querySelector(".error");
        ourErrorMsg.classList.add("spawn");
        return;
    }
    let checked = check();
    myLibrary.push(new Book(inputTitle, inputAuthor, inputPages, checked));
        
    let card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-index", myLibrary.indexOf(myLibrary[myLibrary.length - 1]));
    let title = document.createElement("div");
    title.classList.add("title");
    let author = document.createElement("div");
    author.classList.add("author"); 
    let pages = document.createElement("div");
    pages.classList.add("pages");
    var read = document.createElement("button");
    read.classList.add("read");
    var deletebtn = document.createElement("button");
    deletebtn.classList.add("delete");
    
    
    title.textContent = "Tittle: " + inputTitle;
    author.textContent = "Author: " + inputAuthor;
    pages.textContent = "Pages: " + inputPages;
    read.textContent = "Read: " + checked;
    deletebtn.textContent = "Delete entry";

  

    

    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(read);
    card.appendChild(deletebtn);
    container.prepend(card);

    let inputTitle1 = document.querySelector("#title");
    let inputAuthor1 = document.querySelector("#author");
    let inputPages1 = document.querySelector("#pages");

    inputTitle1.value = '';
    inputAuthor1.value = '';
    inputPages1.value = '';
   
    
}

let hideErrorWindow = document.querySelector(".despawnbtn")
hideErrorWindow.addEventListener("click", (e)=> {
    let ourErrorMsg = document.querySelector(".error");
        ourErrorMsg.classList.remove("spawn");
})

//CHeck radio button
function check(){
    var readYesNo = Array.from(document.getElementsByName("yes-no"));
    for(let j = 0; j < readYesNo.length; j++){

        if(readYesNo[j].checked == true){
            return readYesNo[j].id;
        }else{
            continue;
        }
    }
    
}


//Delete Book
container.addEventListener("click", (e) => {
   if(e.target.classList.contains("delete")){
    let index = e.target.parentNode.getAttribute("data-index");
   myLibrary.splice(index, 1);
   e.target.parentNode.remove();
   }else{
       return;
   }
   
   
})

//Drop down Form
newBtn.addEventListener("click", () => {
    formIn.classList.remove("absolute");
})
//cancel input
cancelBtn.addEventListener("click", () => {
    formIn.classList.add("absolute");

    let inputTitle1 = document.querySelector("#title");
    let inputAuthor1 = document.querySelector("#author");
    let inputPages1 = document.querySelector("#pages");

    inputTitle1.value = '';
    inputAuthor1.value = '';
    inputPages1.value = '';
   
})


//display the books
displayBook();

function displayBook(){
    for(let i = 0; i < myLibrary.length; i++){
        let card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("data-index", i);
        let title = document.createElement("div");
        title.classList.add("title");
        let author = document.createElement("div");
        author.classList.add("author"); 
        let pages = document.createElement("div");
        pages.classList.add("pages");
        var read = document.createElement("button");
        read.classList.add("read");
        var deletebtn = document.createElement("button");
        deletebtn.classList.add("delete");
        
        
        title.textContent = "Tittle: " + myLibrary[i].title;
        author.textContent = "Author: " + myLibrary[i].author;
        pages.textContent = "Pages: " + myLibrary[i].pages;
        read.textContent = "Read: " + myLibrary[i].read
        deletebtn.textContent = "Delete entry";

        

        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(read);
        card.appendChild(deletebtn);
        container.appendChild(card);
       
    } 
}



//book constructor
class Book {
    constructor(title,author,pages,readIt){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = readIt;
    
    }

}

  
