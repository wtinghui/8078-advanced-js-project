document.addEventListener("DOMContentLoaded", async function () {
    const books = await loadData();
    console.log(books);

    const cards = document.querySelector("#cards");
    
    renderList(books);
});