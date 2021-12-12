var personResultsEl = $('#film-results');
var personResultsEl;

var detectPersonIdQuery = function () {

  var queryParams = new URLSearchParams( document.location.search );

  // Send them back to the films page if we got here incorrectly
  if( !queryParams.has( 'filmId' ) ) document.location = "./films.html";

  getFilm( queryParams.get( 'filmId' ) );

}

/**
 * API Requests
 */
var getFilm = function ( id ) {
  var endpoint = `films/${id}`;
  var apiUrl = ghibliApi.getEndpointUrl(endpoint);
  ghibliApi
      .route( apiUrl )
      .then(function (data) {

        displayFilm(data, apiUrl);

      });
};

var getPeople = function ( personRoutes, filmApiUrl ) {
  for( apiRoute of personRoutes ) {
    ghibliApi
      .route( apiRoute )
      .then(function (data) {
  
        if( Array.isArray(data) ) {
          for( var person of data ) {
            if( person.films.includes( filmApiUrl ) ) displayPerson( person );
          }
        } else {
          displayPerson(data); 
        }

      });
  }
};

/**
 * Display
 */
function displayFilm( film, filmApiUrl ) {

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
    <div class="section has-background-primary-light">
      <h2 class="is-size-3 has-text-weight-bold">Characters</h2>
      <p>Click on a character to learn more!<p>
      <div class="columns is-multiline mt-5" id="persons-results"></div>
    </div>`;

    personResultsEl.html( htmlTemplate );

    personResultsEl = $('#persons-results');

    getPeople( film.people, filmApiUrl );

}

function displayPerson( person ) {

  personResultsEl.append(
    `
    <div class="column is-one-quarter">
      <a class="is-flex is-align-items-center card is-h-100 is-rounded" href="./person.html?personId=${person.id}">
        <div class="card-content">
          <div class="content">
            <p class="is-size-4">${person.name}</p>
          </div>
        </div>
      </a>
    </div>`
  );

}

detectPersonIdQuery();