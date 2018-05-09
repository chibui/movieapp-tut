(function() {
    'use strict';

    angular
        .module('movieApp')
        .controller('ResultsController', function ($exceptionHandler, $scope, $location, omdbApi) {

            $scope.query = $location.search().q;

            omdbApi.search($scope.query)
                .then(function (results) {
                    $scope.results = results.Search;
                })
                .catch(function (error) {
                    $exceptionHandler(error);
                });

            $scope.expand = function expand(index, id) {
                omdbApi.find(id)
                    .then(function (data) {
                        $scope.results[index].data = data;
                        $scope.results[index].open = true;
                    });
            }
        }) ;
})();
