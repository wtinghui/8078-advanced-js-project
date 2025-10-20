// create a reading list

const jsonBinRoot = "https://api.jsonbin.io/v3";
const jsonBinID = "68e0d616ae596e708f059c80";

const url = jsonBinRoot + "/b/" + jsonBinID;

async function loadData() {
    const response = await axios.get(url + "/latest");
    return response.data.record;
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
    console.log(books[index])
    saveBooks(books);
    console.log(books);
}

function deleteBook(books, index) {
    books.splice(index, 1);
    saveBooks(books);
}

async function saveBooks(books) {
    await axios.put(url, books)
}
