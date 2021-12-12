var ghibliApi = {
    getEndpointUrl: function(endpoint) {
        return `https://ghibliapi.herokuapp.com/${endpoint}`;
    },
    endpoint: function( endpoint ) {

        return this.route( this.getEndpointUrl( endpoint ) );
    
    },
    route: function( apiUrlRoute ) {

        return fetch( apiUrlRoute )
            .then( function(response) {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error: ' + response.statusText);
                }
            })
            .catch(function (error) {
                console.log('Unable to fetch', error);
            });
    
    }
}