angular.module('angupoly', ['ng-polymer-elements', 'ui.router']).
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

  this.onSearch = function() {
    $log.info('Searching...', this.searchText);
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
