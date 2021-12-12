var personResultsEl = $('#person-results');

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

    });
};

/**
 * Display
 */
function displayPerson( person ) {

    // Generating and appending HTML
    var htmlTemplate = "";

    htmlTemplate += `
    <h1 class="title">${person.name}</h1>
    <p>Age: ${person.age}</p>
    <p>Eye Color: ${person.eye_color}</p>`;

    personResultsEl.html( htmlTemplate );

}

detectPersonIdQuery();