var peopleResultsEl = $('#people-results');

/**
 * Event Listeners
 */

// No event listeners needed yet!

/**
 * API Requests
 */
var getPeople = function () {
    var apiUrl = 'https://ghibliapi.herokuapp.com/people';

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {

                  displayPeople(data);

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

function displayPeople( people ) {

    // Generating and appending HTML

    var htmlTemplate = '';
    for( person of people ) {

        htmlTemplate += `
        <div class="column is-one-quarter">
          <div class="card" data-id="${person.id}" style="height:100%">
            <div class="card-content">
              <div class="content">
                <p class="title is-size-4">${person.name}</p>
              </div>
            </div>
          </div>
        </div>`

    }

    peopleResultsEl.empty().html( htmlTemplate );

}

getPeople();

// filmResultsEl.on('click', '.card', function() {

//   document.location = `./film.html?filmId=${this.dataset.id}`

// });