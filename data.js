// create a reading list

const jsonBinRoot = "https://api.jsonbin.io/v3";
const jsonBinID = "68e0d616ae596e708f059c80";

const url = jsonBinRoot + "/b/" + jsonBinID;

async function loadData() {
    const response = await axios.get(url + "/latest");
    return response.data.record;
}

function statusBadge(status) {
    if (status == "Completed") {
        return "bg-success"
    }
    if (status == "Reading") {
        return "bg-primary"
    }
    if (status == "To read") {
        return "bg-secondary"
    }
}

function renderList(books) {
    cards.innerHTML = "";
    books.forEach(function (book, index) {

        let starRatings="";        
        if (book.status == "Completed") {
            for (let i = 1; i < 6; i++) {
                starRatings += `
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="${(i <= book.ratings) ? "orange" : "lightGrey"}"
                            class="bi bi-star-fill" viewBox="0 0 16 16">
                            <path
                                d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                        </svg>
                `
            }

        }

        cards.innerHTML += `
        <div class="card me-2" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${book.author}</h6>
                <p class="mb-2"> 
                    <span class="badge rounded-pill ${statusBadge(book.status)} me-2">${book.status}</span>
                    <span> ${(book.status == "Completed") ? starRatings : ''} </span> 
                </p>
                <p class="card-text mb-2">Genre: ${book.genre} </p>
            </div>
            <div class="card-footer d-flex justify-content-around" >
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#bookEntryModal" data-action="edit" data-index="${index}">Edit</button>
                <button class = "btn btn-primary" data-action="delete" data-index="${index}">Delete</button>
            </div>
        </div>
        `
    })
}
function addBook(books, title, author, genre, status, ratings) {
    const newBookEntry = {
        "title": title,
        "author": author,
        "genre": genre,
        "status": status,
        "ratings": ratings
    };

    books.push(newBookEntry);
    saveBooks(books);
}

function editBook(books, index, title, author, genre, status, ratings) {
    books[index] = {
        "title": title,
        "author": author,
        "genre": genre,
        "status": status,
        "ratings": ratings
    };
    saveBooks(books);
}

function deleteBook(books, index) {
    books.splice(index, 1);
    saveBooks(books);
}

async function saveBooks(books) {
    await axios.put(url, books)
}
