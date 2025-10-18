document.addEventListener("DOMContentLoaded", async function () {
    const books = await loadData();
    const cards = document.querySelector("#cards");
    const addBookEntry = document.querySelector("#addBookEntry");
    const addBtn = document.querySelector("#addBtn");
    const form = document.querySelector("#bookEntry");
    const modalHeader = document.querySelector("#modalLabel");
    const modalBtn = document.querySelector("#modalBtn");
    const title = document.querySelector("#title");
    const author = document.querySelector("#author");
    const genre = document.querySelector("#genre");
    const status = document.querySelector("#status");
    const ratings = document.querySelector("#ratings");


    console.log(books);
    renderList(books);

    addBookEntry.addEventListener("click", function () {
        modalHeader.innerText = "Add new book";
        modalBtn.innerText = "Add";
        form.reset();

        modalBtn.addEventListener("click",function(){
            const titleValue = title?.value;
            const authorValue = author?.value;
            const genreValue = genre?.value;
            const statusValue = status?.value;
            const ratingsValue = (statusValue == "Completed") ? ratings?.value : "";

            addBook(books, titleValue, authorValue, genreValue, statusValue, ratingsValue);
            renderList(books);

        })

    })

    cards.addEventListener("click", function (event) {
        const index = parseInt(event.target.dataset.index);
        if (event.target.dataset.action == "edit") {
            const book = books[index];

            form.reset();
            modalHeader.innerText = "Edit book entry";
            modalBtn.innerText = "Save";

            title.value = book.title;
            author.value = book.author;
            genre.value = book.genre;
            status.value = book.status;
            ratings.value = book.ratings;

            modalBtn.addEventListener("click",function(){
                editBook(books,index,title.value,author.value,genre.value,status.value,ratings.value);
                renderList(books);

            })
        }
        if (event.target.dataset.action=="delete"){
            deleteBook(books,index);
            renderList(books);
        }
    });


});