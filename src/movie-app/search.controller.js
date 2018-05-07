(function() {
    'use strict';

    angular
        .module('movieApp')
        .controller('SearchController', function ($location) {
            var ctrl = this;
            ctrl.search = function () {
                if (ctrl.query) {
                    $location.path('/results').search('q', ctrl.query);
                }
            }
        }) ;
})();
