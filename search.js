angular.module('angupoly').
directive('apSearch', function() {
  return {
    restrict: 'E',
    scope: {
      searching: '=',
      searchText: '=',
      onSearch: '&'
    },
    templateUrl: 'search.html',
    replace: true,
    link: function(scope, element, attrs) {
      scope.search = function() {
        if (scope.searchText && scope.searching) {
          scope.onSearch();
        } else {
          scope.searching = true;
        }
      };

      scope.cancelSearch = function() {
        scope.searching = false;
        scope.searchText = '';
      };

      scope.maybeCancelSearch = function() {
        !scope.searchText && scope.cancelSearch();
      };
    }
  };
});
