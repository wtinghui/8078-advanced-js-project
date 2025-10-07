document.addEventListener("DOMContentLoaded", async function () {
    const books = await loadData();
    console.log(books);

    const output = document.querySelector("#output");
    cards.innerHTML = "";
    books.forEach(function (book) {
        cards.innerHTML+=`
        <div class="card me-2" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${book.author}</h6>
                <p class="card-text">Genre: ${book.genre} <span class="d-block">${book.status}</span><span class="d-block"> Ratings: ${book.ratings}</span> </p>
            </div>
            <div class="card-footer d-flex justify-content-around" >
                <button class="btn btn-primary">Edit</button>
                <button class = "btn btn-primary">Delete</buttin>
            </div>
        </div>`
    })
});