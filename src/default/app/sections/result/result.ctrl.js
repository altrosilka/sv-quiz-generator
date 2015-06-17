(function() {
  'use strict';

  angular
    .module('app.sections')
    .controller('ResultCtrl', ResultCtrl);

  function ResultCtrl($scope, advService, dataService) {
    var ctrl = this;

    if (advService.isActive()){
      advService.callCompleteModal();
    }

    ctrl.rightCount = dataService.getRightAnswersCount();
    ctrl.totalCount = dataService.getQuiz().questions.length;

    var url = 'http://test.ru';
    ctrl.twShareLink = 'https://twitter.com/intent/tweet?text=привет&url='+url;
    ctrl.fbShareLink = 'https://www.facebook.com/sharer/sharer.php?u='+url+'&ref=plugin&src=share_button';
  }
})();
