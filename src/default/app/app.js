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

  function bootApp(Quiz, $window, $state, utilsService, advService, dataService, langService) {
    langService.setLang(utilsService.getQueryParam('lang') || 'en');
    
    // юзер пришел из приложения, с параметром fromApp
    var quizFree = utilsService.getQueryParam('fromApp');

    // для эмуляции и проверки рекламы под плаформами
    var platform = utilsService.getQueryParam('platform');


    if (!platform){
      $window.platform = {
        ios: ionic.Platform.isIOS(),
        android: ionic.Platform.isAndroid()
      }
    } else {
      $window.platform = {
        ios: platform === 'ios',
        android: platform === 'android'
      }
    }

    //активируем рекламу
    if (!quizFree && ($window.platform.android || $window.platform.ios)) {
      advService.activate();
    }

    // очищаем урл
    if (typeof window.history.pushState == 'function') {
      window.history.pushState({}, "Hide");
    }

    // переходим на первый вопрос
    $state.go('question', {id: 0});
  }

  function configApp($ionicConfigProvider) {
    $ionicConfigProvider.views.maxCache(0);

    //запрещаем возврат назад свайпом
    $ionicConfigProvider.views.swipeBackEnabled(false);
  }
})();
