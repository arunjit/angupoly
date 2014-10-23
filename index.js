angular.module('angupoly', []).
run(function(){
  document.getElementById('menubtn').addEventListener('click', function() {
    document.getElementById('drawerpnl').togglePanel();
  }, false);
}).
controller('Controller', function($log) {
  this.selected = 0;
  this.searchText = '';
  this.searching = false;

  this.next = function() {
    this.selected = (this.selected + 1) % 3;
    $log.info(this.selected);
  };

  this.search = function() {
    $log.info('search()');
    if (this.searchText && this.searching) {
      $log.info('Searching...');
      return;  // actually do the search
    }
    this.searching = true;
  };

  this.cancelSearch = function() {
    this.searching = false;
    this.searchText = '';
  };

  this.maybeCancelSearch = function() {
    !this.searchText && this.cancelSearch();
  };
}).
directive('apSelected', function() {
  return function(scope, element, attrs) {
    attrs.$observe('apSelected', function(value) {
      element[0].selected = value;
    });
  }
}).
directive('apEnter', makeKeyDownDirective('apEnter', 13)).
directive('apEsc', makeKeyDownDirective('apEsc', 27)).
directive('apFocuswhen', function() {
  return function(scope, element, attrs) {
    attrs.$observe('apFocuswhen', function(value) {
      value && element[0].focus();
    });
  };
});

function makeKeyDownDirective(name, keyCode) {
  return function(/*$parse*/) {
    return function(scope, element, attrs) {
      element.bind('keydown', function(event) {
        (event.keyCode == keyCode) && scope.$apply(attrs[name]);
      });
    };
  };
}
