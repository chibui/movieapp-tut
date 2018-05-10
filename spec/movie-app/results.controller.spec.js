describe('Results Controller', function () {

    var results = {
        "Search": [{
            "Title": "Star Wars: Episode IV - A New Hope",
            "Year": "1977",
            "imdbID": "tt0076759",
            "Type": "movie",
            "Poster": "https://ia.media-imdb.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"
        }, {
            "Title": "Star Wars: Episode V - The Empire Strikes Back",
            "Year": "1980",
            "imdbID": "tt0080684",
            "Type": "movie",
            "Poster": "https://ia.media-imdb.com/images/M/MV5BYmU1NDRjNDgtMzhiMi00NjZmLTg5NGItZDNiZjU5NTU4OTE0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"
        }, {
            "Title": "Star Wars: Episode VI - Return of the Jedi",
            "Year": "1983",
            "imdbID": "tt0086190",
            "Type": "movie",
            "Poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BOWZlMjFiYzgtMTUzNC00Y2IzLTk1NTMtZmNhMTczNTk0ODk1XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"
        }]
    };

    var $controller,
        $location,
        $q,
        $rootScope,
        $scope,
        omdbApi,
        $exceptionHandler,
        $log;

    beforeEach(module('movieApp'));

    beforeEach(module(function($exceptionHandlerProvider) {
        $exceptionHandlerProvider.mode('log');
    }));

    beforeEach(module(function($logProvider) {
        $logProvider.debugEnabled(true);
    }));

    beforeEach(inject(function(_$controller_, _$exceptionHandler_, _$location_, _$q_, _$rootScope_, _$log_, _omdbApi_) {
        $controller = _$controller_;
        $scope = {};
        $exceptionHandler = _$exceptionHandler_;
        $location = _$location_;
        $q = _$q_;
        $rootScope = _$rootScope_;
        $log = _$log_;
        omdbApi = _omdbApi_;
    }));

    it('should load search results', function () {
        spyOn(omdbApi, 'search').and.callFake(function() {
            var deferred = $q.defer();
            deferred.resolve(results);
            return deferred.promise;
        });

        $location.search('q', 'star wars');
        $controller('ResultsController', { $scope: $scope });
        $rootScope.$apply();

        expect($scope.results[0].Title).toBe(results.Search[0].Title);
        expect($scope.results[1].Title).toBe(results.Search[1].Title);
        expect($scope.results[2].Title).toBe(results.Search[2].Title);
        expect(omdbApi.search).toHaveBeenCalledWith('star wars');
        expect($log.debug.logs[0]).toEqual(['Controller loaded with query: ', 'star wars']);
        expect($log.debug.logs[1]).toEqual(['Data returned for query: ', 'star wars', results]);
    });

    it('should set result status to error', function () {
        spyOn(omdbApi, 'search').and.callFake(function () {
            var deferred = $q.defer();
            deferred.reject('Something went wrong!');
            return deferred.promise;
        });

        $location.search('q', 'star wars');
        $controller('ResultsController', { $scope: $scope});
        $rootScope.$apply();
        // console.log($exceptionHandler.errors);
        expect($exceptionHandler.errors).toEqual(['Something went wrong!']);
    });
});