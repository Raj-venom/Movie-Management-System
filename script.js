const movieList = document.querySelector(".movieList");
const url = `http://localhost:3000/movies`;

// To fetch data form the api;
async function fetchData() {
  let responce = await fetch(url);
  let data = await responce.json();
  // console.log(data)

  movieList.innerHTML = "";

  data.forEach((movie) => {
    console.log(movie);

    let item = document.createElement("li");
    item.innerHTML = `
    <span>
        Title: ${movie.title},
        <br>
        Direcotr: ${movie.director},
        <br>
        Rating: ${movie.rating}
    </span>
    <button class="btn" onclick="editMovie(${movie.id})">Edit</button>
    <button class="btn" onclick="deleteMovie(${movie.id})">Delete</button>`;

    movieList.appendChild(item);
  });
}

// To add movie on the server Using POST Method
function addMovie() {
  const title = document.querySelector("#title").value;
  const director = document.querySelector("#director").value;
  const rating = parseFloat(document.querySelector("#rating").value);

  console.log(title, director, rating);

   // condition to check if user have enterd all field or not
  if (title && director && rating  ) {

    // POST request using fetch()
    fetch(url, {
      // Adding method type
      method: "POST",
  
      headers: {
        "Content-Type": "application/json",
      },
  
      body: JSON.stringify({
        title,
        director,
        rating,
      }),
    });
  }
}

// to edit movie lists
function editMovie(id) {
  const newTitle = prompt("Enter New Title: ");
  const newDirector = prompt("Enter New Director Name: ");
  const newRating = parseFloat(prompt("Enter New rating:"));

  // condition to check if user have enterd all field or not
  if (newTitle && newDirector && newRating  ) {
    
    fetch(`${url}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        title: newTitle,
        director: newDirector,
        rating: newRating,
      }),
    });
  } else {
    alert("enter all field Correctly!");
  }
}

// to deleter movie list
function deleteMovie(id){

  let val = "delete";
  if( val == prompt("Type 'delete' to Confirm")){

    fetch(`${url}/${id}`, 
    {
      method : "DELETE",
    })
  }else{
    alert("Type 'delete' correctly!")
  }
}

// initial call
fetchData();
