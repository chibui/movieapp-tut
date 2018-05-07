describe('Results Controller', function () {
    var $ctrl = this,
        $controller,
        $q,
        $rootScope,
        omdbApi,
        $location;

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


    beforeEach(module('omdb'));
    beforeEach(module('movieApp'));

    beforeEach(inject(function (_$controller_, _$q_, _$rootScope_, _$location_, _omdbApi_) {
        $controller = _$controller_;
        $q = _$q_;
        $rootScope = _$rootScope_;
        $location = _$location_;
        omdbApi = _omdbApi_;
    }));

    it('should load search results', function () {
        spyOn(omdbApi, 'search').and.callFake(function () {
            var deferred = $q.defer();
            deferred.resolve(results);
            return deferred.promise;
        });

        $location.search('q', 'star wars');

        $ctrl = $controller('ResultsController', {});
        $rootScope.$apply();

        expect($ctrl.results[0].Title).toBe(results.Search[0].Title);
        expect($ctrl.results[1].Title).toBe(results.Search[1].Title);
        expect($ctrl.results[2].Title).toBe(results.Search[2].Title);
        expect(omdbApi.search).toHaveBeenCalledWith('star wars');
    });

    it('should set result status to erro', function () {
        spyOn(omdbApi, 'search').and.callFake(function () {
            var deferred = $q.defer();
            deferred.reject();
            return deferred.promise;
        });

        $location.search('q', 'star wars');
        $ctrl = $controller('ResultsController', {});
        $rootScope.$apply();

        expect($ctrl.errorMessage).toBe('Something went wrong!');
    });
});