document.addEventListener("DOMContentLoaded", async function () {
    const books = await loadData();
    const cards = document.querySelector("#cards");
    const addBookEntry = document.querySelector("#addBookEntry");
    const form = document.querySelector("#bookEntry");
    const modalHeader = document.querySelector("#modalLabel");
    const modalBtn = document.querySelector("#modalBtn");
    const title = document.querySelector("#title");
    const author = document.querySelector("#author");
    const genre = document.querySelector("#genre");
    const status = document.querySelector("#status");
    const stars = document.querySelectorAll(".star");
    const ratingsField = document.querySelector("#ratings-field");


    renderList(books);

    //Interactive rating
    stars.forEach(function (star, index) {
        star.addEventListener("mouseover", function () {
            stars.forEach(function (s, i) {
                (i <= index) ? s.classList.add("hover") : s.classList.add("not-hover")
            })
        })

        star.addEventListener("mouseout", function () {
            stars.forEach(function (s) {
                if (s.classList.contains("hover")) {
                    s.classList.remove("hover")
                }
                if (s.classList.contains("not-hover")) {
                    s.classList.remove("not-hover")
                }
            })
        })

        star.addEventListener("click", function (event) {
            event.stopPropagation();

            stars.forEach(function (s, i) {

                if (s.classList.contains("selected")) {
                    s.classList.remove("selected")
                }
                if (s.classList.contains("not-selected")) {
                    s.classList.remove("not-selected")
                }
                (i <= index) ? s.classList.add("selected") : s.classList.add("not-selected")

            })
        })
    })

    //Display rating function if reading status is completed
    status.addEventListener("change", function () {
        ratingsField.style.display = (status.value == "Completed") ? "flex" : "none"
    })


    //Buttons
    //for adding new entry
    addBookEntry.addEventListener("click", function () {
        //reset form to default
        defaultForm(form, stars);
        //change text in modal header and button
        addModal(modalHeader, modalBtn, ratingsField);
    })

    //for edit and delete
    cards.addEventListener("click", function (event) {
        const index = parseInt(event.target.dataset.index);
        if (event.target.dataset.action == "edit") {
            const book = books[index];
            defaultForm(form, stars);
            editModal(modalHeader, modalBtn, book, title, author, genre, status, stars, ratingsField);
            editIndex = index
        }

        if (event.target.dataset.action == "delete") {
            deleteBook(books, index);
            renderList(books);
        }
    });

    //within modal: for add or save
    modalBtn.addEventListener("click", function (event) {
        const titleValue = title?.value;
        const authorValue = author?.value;
        const genreValue = genre?.value;
        const statusValue = status?.value;
        const ratingsValue = (statusValue == "Completed") ? document.querySelector("input[name='stars-radio']:checked")?.value : "";

        if (modalBtn.innerText == "Save") {
            editBook(books, editIndex, titleValue, authorValue, genreValue, statusValue, ratingsValue);
            renderList(books);
        }
        if (modalBtn.innerText == "Add") {
            if (title.value && status.value) {
                addBook(books, titleValue, authorValue, genreValue, statusValue, ratingsValue);
                renderList(books);
            } else {
                if (!title.value && !status.value ){
                    alert("Entry not added. Missing information for book title and reading status.")
                } else if (!title.value){
                    alert("Entry not added. Missing information for book title")
                } else{
                    alert("Entry not added. Missing information for reading status")
                }
                
            }
        }
    })

})