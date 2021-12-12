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
          <a class="is-block card" href="./person.html?personId=${person.id}" style="height:100%">
            <div class="card-content">
              <div class="content">
                <p class="title is-size-4">${person.name}</p>
              </div>
            </div>
          </a>
        </div>`

    }

    peopleResultsEl.empty().html( htmlTemplate );

}

getPeople();