var personResultsEl = $('#person-results');
var filmResultsContainerEl = $('#film-results-container');
var filmResultsEl = $('#film-results');
var nameEls = $('.person-name');

var detectPersonIdQuery = function () {

  var queryParams = new URLSearchParams( document.location.search );

  // Send them back to the films page if we got here incorrectly
  if( !queryParams.has( 'personId' ) ) document.location = "./people.html";

  getPerson( queryParams.get( 'personId' ) );

}

/**
 * API Requests
 */
var getPerson = function ( id ) {
  ghibliApi
    .endpoint( `people/${id}` )
    .then(function (data) {

      displayPerson(data);

      console.log( data.films );

      for( filmApiUrl of data.films ) getFilm( filmApiUrl );

    });
};

var getFilm = function ( apiUrl ) {
  console.log( apiUrl );
  ghibliApi
    .route( apiUrl )
    .then(function (data) {

      displayFilm(data);

    });
};

/**
 * Display
 */
function displayPerson( person ) {

    nameEls.text(person.name);

    // Generating and appending HTML
    var htmlTemplate = "";

    htmlTemplate += `
    <h1 class="title">${person.name}</h1>
    <p>Age: ${person.age}</p>
    <p>Eye Color: ${person.eye_color}</p>`;

    personResultsEl.html( htmlTemplate );

}

/**
 * Display
 */
function displayFilm( film ) {

  if( !filmResultsContainerEl.is(":visible") ) filmResultsContainerEl.removeClass('is-hidden');

  // Generating and appending HTML
  var htmlTemplate = "";

  htmlTemplate += `
  <div class="column is-half">
    <a href="./film.html?filmId=${film.id}" class="box">
      <figure class="image">
        <img src="${film.image}" alt="Image">
      </figure>
    </a>
  </div>`

  filmResultsEl.append( htmlTemplate );

}

detectPersonIdQuery();