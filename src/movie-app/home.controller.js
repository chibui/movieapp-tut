(function () {
    'use strict';

    angular
        .module('movieApp')
        .controller('HomeController', function ($scope, $interval, $exceptionHandler, $log, omdbApi, PopularMovies) {

            var results = [],
                index = 0,
                findMovie = function(id) {
                    omdbApi.find(id)
                        .then(function (data) {
                            $scope.result = data;
                        })
                        .catch(function (error) {
                            $exceptionHandler(error);
                        })
                };

            PopularMovies.query(function (data) {
                results = data;
                findMovie(results[0]);

                $interval(function () {
                    ++index;
                    findMovie(results[index % results.length]);
                }, 5000);
            });
        });
})();