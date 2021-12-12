var filmResultsEl = $('#films-results');

/**
 * Event Listeners
 */

// No event listeners needed yet!

/**
 * API Requests
 */
var getFilms = function () {
    var apiUrl = 'https://ghibliapi.herokuapp.com/films';

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {

                    displayFilms(data);

                });
            } else {
              throw new Error('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            console.log('Unable to fetch', error);
        });
};

/**
 * Display
 */

function displayFilms( films ) {

    // Generating and appending HTML

    var htmlTemplate = '';
    for( film of films ) {

        htmlTemplate += `
        <div class="column is-one-quarter">
          <div class="card" data-id="${film.id}" style="height:100%">
            <div class="card-image">
              <figure class="image is-4by3">
                <img src="${film.image}" alt="Placeholder image">
              </figure>
            </div>
            <div class="card-content">
              <div class="content">
                <p class="title is-4">${film.title}</p>
              </div>
            </div>
          </div>
        </div>`

    }

    filmResultsEl.empty().html( htmlTemplate );

}

getFilms();

filmResultsEl.on('click', '.card', function() {

  document.location = `./film.html?filmId=${this.dataset.id}`

});