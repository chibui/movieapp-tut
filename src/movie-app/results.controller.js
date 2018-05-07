(function() {
    'use strict';

    angular
        .module('movieApp')
        .controller('ResultsController', function ($scope, $location, omdbApi) {

            $scope.query = $location.search().q;

            omdbApi.search($scope.query)
                .then(function (results) {
                    $scope.results = results.Search;
                })
                .catch(function (error) {
                    $scope.errorMessage = 'Something went wrong!';
                });
        }) ;
})();
