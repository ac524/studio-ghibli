$( document.body )
    .on( 'click', '[data-target]', function() {

        $(`#${this.dataset.target}`).toggleClass('is-active');

    });