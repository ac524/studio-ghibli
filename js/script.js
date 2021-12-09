/**
 * Event Listeners
 */

// No event listeners needed yet!

/**
 * API Requests
 */
var getFilms = function (user) {
    var apiUrl = 'https://ghibliapi.herokuapp.com/films';

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {

                    displayFilms(data);

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

function displayFilms( films ) {

    // Generating and appending HTML

}

// Make the call to fetch films on page load.
getFilms();