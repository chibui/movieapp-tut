angular
    .module('movieApp')
    .filter('fromNow', function fromNowFilter() {
        return function (value, baseDate) {
            if (!value) {
                return;
            }

            var date = value;

            if (typeof(value) === 'string') {
                date = new Date(date);
            }

            if (isNaN(date.getTime())) {
                return value;
            }

            var YEAR_IN_MS = 60 * 60 * 24 * 365,
                MONTH_IN_MS = 60 * 60 * 24 * 30,
                now = baseDate || new Date(),
                dateDiff = (now.getTime() - date.getTime()) / 1000,
                tzDiff = (now.getTimezoneOffset() - date.getTimezoneOffset()) * 60,
                diffInMs = dateDiff + tzDiff,
                yearsDiff = diffInMs / YEAR_IN_MS,
                monthDiff = diffInMs / MONTH_IN_MS;


            if (yearsDiff > 1) {
                yearsDiff = Math.floor(yearsDiff);
                return ( yearsDiff === 1) ? '1 year ago' : yearsDiff + ' years ago';
            } else {
                monthDiff = Math.floor(monthDiff);
                return ( monthDiff === 1) ? '1 month ago' : monthDiff + ' months ago';
            }
        }
    });