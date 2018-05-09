(function () {
    'use strict';

    angular
        .module('movieCore', ['ngResource'])
        .factory('PopularMovies', function ($resource) {
            var token = 'teddyBear';

            return $resource('popular/:movieId/?apikey=bd925466', { movieId: '@id' }, {
                get: {
                    method: 'GET',
                    headers: {
                        'authToken': token
                    }
                },
                query: {
                    method: 'GET',
                    headers: {
                        'authToken': token
                    }
                },
                remove: {
                    method: 'DELETE',
                    headers: {
                        'authToken': token
                    }
                },
                save: {
                    method: 'POST',
                    headers: {
                        'authToken': token
                    }
                },
                update: {
                    method: 'PUT',
                    headers: {
                        'authToken': token
                    }
                }
            });
        });
})();
