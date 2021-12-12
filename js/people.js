var peopleResultsEl = $('#people-results');

/**
 * Event Listeners
 */

// No event listeners needed yet!

/**
 * API Requests
 */
var getPeople = function () {
  ghibliApi
    .endpoint( 'people' )
    .then(function (data) {

      displayPeople(data);

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

peopleResultsEl.on('click', '.card', function() {

  document.location = `./person.html?personId=${this.dataset.id}`

});