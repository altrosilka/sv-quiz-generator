(function() {
  'use strict';

  angular
    .module('app.config', [])
    .constant('apiConstant', {
      baseQuizUrl: 'data/'
    }) 
    .constant('defaultTimeout', 1000)
    .constant('Quiz', @@quiz); 
})();
   