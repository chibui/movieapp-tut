describe('Home Controller', function () {
    var results = [
        {
            "Title":"Star Wars: Episode IV - A New Hope",
            "imdbID":"tt0076759"
        },
        {
            "Title":"Star Wars: Episode V - The Empire Strikes Back",
            "imdbID":"tt0080684"
        },
        {
            "Title":"Star Wars: Episode VI - Return of the Jedi",
            "imdbID":"tt0086190"
        }
    ];

    var $scope,
        $interval,
        $q,
        $controller,
        $rootScope,
        omdbApi,
        PopularMovies,
        $exceptionHandler;

    beforeEach(module('movieApp'));

    beforeEach(module(function ($exceptionHandlerProvider) {
        $exceptionHandlerProvider.mode('log');
    }));

    beforeEach(inject(function (_$q_, _omdbApi_) {
        spyOn(_omdbApi_, 'find').and.callFake(function () {
            var deferred = _$q_.defer(),
                args = _omdbApi_.find.calls.mostRecent().args[0];

            if (args === 'tt0076759') {
                deferred.resolve(results[0]);
            } else if (args === 'tt0080684') {
                deferred.resolve(results[1]);
            } else if (args === 'tt0086190') {
                deferred.resolve(results[2])
            } else if (args === 'ttError') {
                deferred.reject('error finding movie')
            } else {
                deferred.reject();
            }

            return deferred.promise;
        })
    }));

    beforeEach(inject(function (_$controller_, _$q_, _$exceptionHandler_, _$interval_, _$rootScope_, _omdbApi_, _PopularMovies_) {
        $scope = {};
        $exceptionHandler = _$exceptionHandler_;
        $interval = _$interval_;
        $q = _$q_;
        omdbApi = _omdbApi_;
        $controller = _$controller_;
        PopularMovies = _PopularMovies_;
        $rootScope = _$rootScope_;
    }));

    it('should rotate movies every 5 seconds', function () {
        spyOn(PopularMovies, 'get').and.callFake(function () {
            var deferred = $q.defer();
            deferred.resolve(["tt0076759", "tt0080684", "tt0086190"]);
            return deferred.promise;
        });

        $controller('HomeController',{
            $scope: $scope,
            $interval: $interval,
            omdbapi: omdbApi,
            PopularMovies: PopularMovies
        });
        $rootScope.$apply();

        expect($scope.result.Title).toBe(results[0].Title);
        $interval.flush(5000);
        expect($scope.result.Title).toBe(results[1].Title);
        $interval.flush(5000);
        expect($scope.result.Title).toBe(results[2].Title);
        $interval.flush(5000);
        expect($scope.result.Title).toBe(results[0].Title);
    });

    it('should handle errors', function () {
        spyOn(PopularMovies, 'get').and.callFake(function () {
            var deferred = $q.defer();
            deferred.resolve(["tt0076759", "tt0080684", "tt0086190", "ttError"]);
            return deferred.promise;
        });

        $controller('HomeController',{
            $scope: $scope,
            $interval: $interval,
            omdbapi: omdbApi,
            PopularMovies: PopularMovies
        });
        $rootScope.$apply();

        expect($scope.result.Title).toBe(results[0].Title);
        $interval.flush(5000);
        expect($scope.result.Title).toBe(results[1].Title);
        $interval.flush(5000);
        expect($scope.result.Title).toBe(results[2].Title);
        $interval.flush(5000);
        expect($exceptionHandler.errors).toEqual(['error finding movie']);
    });
});