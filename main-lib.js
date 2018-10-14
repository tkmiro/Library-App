let bTitle, bAuthor, bPages, bRead;
let apTitle, apAuthor, apPages, apRead;
let bookView;
let books = [];
let bookID = 1;
let currentBook;
let target, targetParent;



$(document).ready(function(){


    $(".add-btn").click(getFormData);
    $(document).on("click", ".delete-btn", deleteBook);
    $(document).on("click", ".read-var", statusChange);
    showLocalStorage();
    
    //BOOK OBJECT CONSTRUCTOR

    function Book(title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.id = bookID++;
    }

    //GETTING FORM DATA FUNCTION

    function getFormData(){
        bTitle = $("#title").val();
        bAuthor = $("#author").val();
        bPages = $("#pages").val();
        bRead;
        if(!bTitle || !bAuthor || !bPages) {
            alert("Please fill in all fields!");
        } else {
        if($("#checkbox").is(":checked")){
             bRead = true;
        } else {bRead = false}
        currentBook = new Book(bTitle, bAuthor, bPages, bRead);
        books.push(currentBook);
        $("#addbook")[0].reset();
        bookView = $('<div class="book-container"></div>')
        bookView.attr("id", currentBook.id)
        
        $(".book-list").append(bookView)
        appendText(bTitle, bAuthor, bPages, bRead);
   
        }
        localStorage.setItem("books", JSON.stringify(books));
    }

    // DISPLAYING FUNCTION

    function appendText(title, author, pages, read) {
        apTitle = `<span class="title-var">${title}</span>`
        apAuthor = `<span class="author-var">${author}</span>`
        apPages = `<span class="pages-var">${pages}</span>`
        if(read === true){
            apRead = `<span class="read-var true">Read</span>`
        } else {
            apRead = `<span class="read-var false">Not read</span>`
        }
        
        $(".book-container:last-child").append(apTitle, "<hr></hr>", apAuthor, "<hr></hr>", apPages, apRead);
        $(".book-container:last-child").append("<button class='delete-btn'>Delete</button>")
    }

    // DELETE BOOK FUNCTION

    function deleteBook(e){
        target = e.target;
        targetParent = target.parentElement;
        books.forEach(function(book, index){
            if(targetParent.id == book.id){
                books.splice(index, 1);
            }
        })
        $(`#${targetParent.id}`).remove();
        localStorage.setItem("books", JSON.stringify(books));
    }

    // READ STATUS CHANGE

    function statusChange(e) {
        target = e.target;
        targetParent = target.parentElement;
        books.forEach(function(book, index){
            if(targetParent.id == book.id && book.read === true){
                target.textContent = "Not read";
                book.read = false;
                target.className = "read-var false"
            } else if(targetParent.id == book.id && book.read === false){
                target.textContent = "Read";
                book.read = true;
                target.className = "read-var true"
            }
        })
        localStorage.setItem("books", JSON.stringify(books));
    }
        
    // LOCAL STORAGE FUNCTION

    function showLocalStorage(){
        if(localStorage.books == null){
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem("books"))
        }
        books.forEach(function(book){
        bTitle = book.title;
        bAuthor = book.author;
        bPages = book.pages;
        bRead = book.read;
        bookView = $('<div class="book-container"></div>')
        bookView.attr("id", book.id)
        $(".book-list").append(bookView)
        appendText(bTitle, bAuthor, bPages, bRead);
        })
        bookID = books.length + 1;
    }
    
    
    
})

