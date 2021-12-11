var filmResultsEl = $('#film-results');
var personResultsEl;

var detectFilmIdQuery = function () {

  var queryParams = new URLSearchParams( document.location.search );

  // Send them back to the films page if we got here incorrectly
  if( !queryParams.has( 'filmId' ) ) document.location = "./films.html";

  getFilm( queryParams.get( 'filmId' ) );

}

/**
 * API Requests
 */
var getFilm = function ( id ) {
    var apiUrl = `https://ghibliapi.herokuapp.com/films/${id}`;

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {

                  displayFilm(data);

                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to GitHub');
        });
};

var getPeople = function ( personRoutes ) {
  for( apiRoute of personRoutes ) {
    fetch(apiRoute)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
  
                  displayPerson(data);
  
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to GitHub');
        });
  }
};

/**
 * Display
 */
function displayFilm( film ) {

    // Generating and appending HTML
    var htmlTemplate = "";

    htmlTemplate += `
    <div class="columns mb-5">
      <div class="column">
        <figure class="image is-3by2"><img src="${film.movie_banner}"></figure>
      </div>
      <div class="column">
        <h1 class="title">${film.title}</h1>
        <p class="subtitle">${film.original_title}</p>
        <p>${film.description}</p>
      </div>
    </div>`;

  
    htmlTemplate += `
    <h2 class="subtitle">Characters</h2>
    <div class="columns is-multiline mt-5" id="persons-results"></div>`;

    filmResultsEl.html( htmlTemplate );

    personResultsEl = $('#persons-results');

    getPeople( film.people );

}

function displayPerson( person ) {

  personResultsEl.append(
    `
    <div class="column is-one-quarter">
      <div class="card" data-id="${person.id}">
        <div class="card-content">
          <div class="content">
            <p class="title">${person.name}</p>
            <p>Age: ${person.age}</p>
            <p>Eye Color: ${person.eye_color}</p>
          </div>
        </div>
      </div>
    </div>`
  );

}

detectFilmIdQuery();