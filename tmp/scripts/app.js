(function() {
  'use strict';

  angular
    .module('app', [ 
      'app.components', 'app.services', 'app.sections',
      'app.templates', 'app.config',
      'ionic'
    ])
    .config(configApp)
    .run(bootApp);

  function bootApp($state, utilsService, advService, dataService) {
    var quizName = utilsService.getQueryParam('quiz');
    if (quizName){
      advService.activate();
    }
    $state.go('question', {id: 0});
  }

  function configApp($ionicConfigProvider) {
    $ionicConfigProvider.views.maxCache(0);
  }
})();
