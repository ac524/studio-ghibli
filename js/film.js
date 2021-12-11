var filmResultsEl = $('#films-results');

/**
 * Event Listeners
 */

// No event listeners needed yet!

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

/**
 * Display
 */

function displayFilm( film ) {

    // Generating and appending HTML
    console.log( film );

}

getFilm();