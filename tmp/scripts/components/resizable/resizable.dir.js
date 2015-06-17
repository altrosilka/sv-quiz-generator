angular.module('app.components').directive('resizable', function() {
  var resizableConfig = {
    aspectRatio: true
  };

  return {
    restrict: 'A',
    link: function postLink(scope, elem) {
      elem.resizable(resizableConfig);
      elem.on('resizestop', function() {
        if (scope.callback) scope.callback();
      });
    }
  };
});
