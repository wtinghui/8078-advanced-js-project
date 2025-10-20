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
    const ratingsBar=document.querySelector("#ratingsBar");
    const stars=document.querySelectorAll(".star");

    console.log(stars);

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

    // ratingsBar.addEventListener("mouseenter",function(event){
    //     event.stopPropagation();
    //     console.log("mouseover")
    //     event.target.firstElementChild.classList.add("hover")
    // })

    // ratingsBar.addEventListener("mouseout",function(event){
    //     event.stopPropagation();
    //     console.log("mouseleave");
    //     event.target.firstElementChild.classList.remove("hover")
    // })

    stars.forEach(function(star,index){
        star.addEventListener("mouseover",function(){
            stars.forEach(function(s,i){
                (i<=index)?s.classList.add("hover"):s.classList.add("not-hover")
                console.log(s.id, s.classList)
            })
        })

        star.addEventListener("mouseout",function(){
            stars.forEach(function(s){
               if (s.classList.contains("hover")){
                    s.classList.remove("hover")
                    }
                if (s.classList.contains("not-hover")){
                    s.classList.remove("not-hover")
                    }
                console.log(s.id, s.classList)
            })
        })

        star.addEventListener("click",function(event){
            stars.forEach(function(s,i){
                if (s.classList.contains("selected")){
                    s.classList.remove("selected")
                    }
                if (s.classList.contains("not-selected")){
                    s.classList.remove("not-selected")
                    }
                (i<=index)?s.classList.add("selected"):s.classList.add("not-selected")
                console.log(s.id, s.classList)
            })
        })
    })

    // stars.forEach(function(star,index){
    //     // star.addEventListener("mouseout",function(event){
    //     //     stars.forEach(function(s,i){
    //     //         s.style.fill(i<=index)?"grey":"lightGrey"
    //     //         (i<=index)?s.classList.remove("hover"):""
    //     //     })
    //     // })

    //     star.addEventListener("mouseover",function(){
    //         console.log(`mouse enter ${star.id}`)
    //         stars.forEach(function(s,i){
    //             console.log(s);
    //             console.log(i, index, `${(i<=index)}`);
    //             s.style.fill=(i<=index)?"grey":"lightGrey"
    //         })
    //     })
    //     // s
    //     star.addEventListener("click",function(event){
    //         stars.forEach(function(s,i){
    //             s.style.fill=(i<=index)?"orange":"lightGrey"
    //         })
    //     })
    // })
    
    
    cards.addEventListener("mouseover", function (event) {
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