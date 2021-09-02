const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-btn');
const bookDetails = document.getElementById('book-details');
const foundNum = document.getElementById('found-num');
const errorDiv = document.getElementById("error");
searchButton.addEventListener('click', ()=>{
    let search = searchInput.value;
    if(search === ""){
        errorDiv.innerText = "Search Field Cannot Be Empty";
        return;       
    }
      //clear 
  foundNum.innerHTML = "";
  bookDetails.innerHTML = "";
    let url = `http://openlibrary.org/search.json?q=${search}`;
    fetch(url)
    .then(res => res.json())
    .then((data) => dataShow(data))
    .finally(() =>{
            searchInput.value === "";
            errorDiv.innerText === '';        
        })
});

function dataShow(books){
    foundNum.innerHTML = `
    <p class="mt-5">Found-Number: ${books.numFound}</p>
    `;
    books.docs.forEach((book)=>{
       const div = document.createElement('div');
       div.classList.add('col-3');
       div.innerHTML = `
       <div class="card" style="width: 18rem;">
       <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
       <div class="card-body">
         <h3 class="card-title">Book Title:${book.title}</h3>
         <p class="card-text">Author:${book.author_name}</p>
         <h4>First Publish Year:${book.first_publish_year}</h4>
       </div>
     </div>
       `;
       bookDetails.appendChild(div);
    })
}
