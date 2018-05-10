(function () {
    'use strict';

    angular
        .module('movieApp')
        .controller('HomeController', function ($scope, $interval, $exceptionHandler, $log, omdbApi, PopularMovies) {

            $log.log('standard log');
            $log.info('info log');
            $log.error('error log');
            $log.warn('warn log');
            $log.debug('some debug info');

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

            // PopularMovies.get()
            //     .then(function (data) {
                    var data = ["tt0076759", "tt0080684", "tt0086190"];
                    results = data;
                    findMovie(results[0]);

                    $interval(function () {
                        ++index;
                        findMovie(results[index % results.length]);
                    }, 5000);

                // });
        });
})();