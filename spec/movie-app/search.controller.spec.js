describe('Search Conroller', function () {
    var $ctrl = this,
        $location,
        $controller;

    beforeEach(module('movieApp'));

    beforeEach(inject(function (_$controller_, _$location_) {
        $controller = _$controller_;
        $location = _$location_;
    }));

    it('should redirect to the query results page for non-empty query', function () {
        $ctrl = $controller('SearchController', { $location: $location }, { query: 'star wars' });
        $ctrl.search();

        expect($location.url()).toBe('/results?q=star%20wars');
    });

    it('should not redirect to query results for empty query', function () {
        $ctrl = $controller('SearchController', { $location: $location }, { query: '' });
        $ctrl.search();

        expect($location.url()).toBe('');
    });
});