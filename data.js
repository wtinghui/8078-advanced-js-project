// create a reading list

const jsonBinRoot="https://api.jsonbin.io/v3";
const jsonBinID="68e0d616ae596e708f059c80";

const url=jsonBinRoot+"/b/"+jsonBinID+"/latest";
console.log(url);

async function loadData(){
    const response=await axios.get(url);
    return response.data.record;
}

function statusBadge(status){
    if (status=="Completed"){
        return "bg-success"
    }
    if (status =="Reading"){
        return "bg-primary"
    }
    if (status=="To read"){
        return "bg-secondary"
    }
}

function renderList(books){
    cards.innerHTML = "";
    books.forEach(function (book) {
        cards.innerHTML+=`
        <div class="card me-2" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${book.author}</h6>
                <p class="mb-2"> 
                    <span class="badge rounded-pill ${statusBadge(book.status)}">${book.status}</span>
                    <span> ${(book.status == "To read") ? '': `${book.ratings}/5`}</span>
                </p>
                <p class="card-text mb-2">Genre: ${book.genre} </p>
            </div>
            <div class="card-footer d-flex justify-content-around" >
                <button class="btn btn-primary">Edit</button>
                <button class = "btn btn-primary">Delete</button>
            </div>
        </div>
        `
    })
}
