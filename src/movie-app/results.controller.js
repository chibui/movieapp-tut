(function() {
    'use strict';

    angular
        .module('movieApp')
        .controller('ResultsController', function ($location, omdbApi) {
            var ctrl = this;

            ctrl.query = $location.search().q;

            omdbApi.search(ctrl.query)
                .then(function (results) {
                    ctrl.results = results.Search;
                })
                .catch(function (error) {
                    ctrl.errorMessage = 'Something went wrong!';
                });
        }) ;
})();
