(function() {
    'use strict';

    angular
        .module('movieApp')
        .controller('ResultsController', function ($exceptionHandler, $scope, $location, $log, omdbApi) {

            $scope.query = $location.search().q;
            $log.debug('Controller loaded with query: ', $scope.query);

            omdbApi.search($scope.query)
                .then(function (results) {
                $log.debug('Data returned for query: ', $scope.query, results);
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
