// create a reading list

const jsonBinRoot = "https://api.jsonbin.io/v3";
const jsonBinID = "68e0d616ae596e708f059c80";

const url = jsonBinRoot + "/b/" + jsonBinID;

async function loadData() {
    const response = await axios.get(url+"/latest");
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
    books.forEach(function (book,index) {
        cards.innerHTML += `
        <div class="card me-2" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${book.author}</h6>
                <p class="mb-2"> 
                    <span class="badge rounded-pill ${statusBadge(book.status)}">${book.status}</span>
                    <span> ${(book.status == "Completed") ? `${book.ratings}/5` : ''}</span>
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

function editBook(books,index,title,author,genre,status,ratings){
    books[index]={
        "title":title,
        "author":author,
        "genre":genre,
        "status":status,
        "ratings":ratings
    };
    saveBooks(books);
}

function deleteBook(books,index){
    books.splice(index,1);
    saveBooks(books);
}

async function saveBooks(books){
    await axios.put(url,books)
}
