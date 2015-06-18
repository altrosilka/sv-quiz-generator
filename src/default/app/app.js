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

  function bootApp(Quiz, $state, utilsService, advService, dataService, langService) {
    langService.setLang(utilsService.getQueryParam('lang') || 'ru');
    var quizFree = utilsService.getQueryParam('fromApp');

    if (!quizFree && (ionic.Platform.isAndroid() || ionic.Platform.isIOS())) {
      advService.activate();
    }

    if (typeof window.history.pushState == 'function') {
      window.history.pushState({}, "Hide");
    }

    $state.go('question', {id: 0});
  }

  function configApp($ionicConfigProvider) {
    $ionicConfigProvider.views.maxCache(0);
  }
})();
