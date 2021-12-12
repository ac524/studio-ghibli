var personResultsEl = $('#films-results');

/**
 * Event Listeners
 */

// No event listeners needed yet!

/**
 * API Requests
 */
var getFilms = function () {
  ghibliApi
    .endpoint( 'films' )
    .then(function (data) {

      displayFilms(data);

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

    personResultsEl.empty().html( htmlTemplate );

}

getFilms();

personResultsEl.on('click', '.card', function() {

  document.location = `./film.html?filmId=${this.dataset.id}`

});