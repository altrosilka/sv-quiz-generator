(function() {
  'use strict';

  angular
    .module('app.sections')
    .controller('ResultCtrl', ResultCtrl);

  function ResultCtrl(Quiz, $scope, advService, dataService, utilsService, langService) {
    var ctrl = this;

    var shareConfig = Quiz.share.config;

    if (advService.isActive()) {
      advService.callCompleteModal();
    }

    ctrl.rightCount = dataService.getRightAnswersCount();
    ctrl.totalCount = dataService.getQuiz().questions.length;

    ctrl.resultInfo = Quiz.results;
    ctrl.shareInfo = Quiz.share;
    ctrl.finalText = utilsService.getFinalText(Quiz.results.texts, ctrl.rightCount);

    var title = langService.getLangText(ctrl.finalText.value.title);
    var description = langService.getLangText(ctrl.finalText.value.description);
    var pic = ctrl.shareInfo.photo;
    var url = shareConfig.url;
    var redirect = shareConfig.redirect_url;
    ctrl.twShareLink = 'https://twitter.com/intent/tweet?text=' + title + ' &url=' + url;
    ctrl.fbShareLink = 'https://www.facebook.com/dialog/feed?app_id=' + shareConfig.fb_app_id + '&display=popup&name=' + encodeURIComponent(title) + '&picture=' + pic + '&description=' + encodeURIComponent(description) + '&link=' + encodeURIComponent(url) + '&redirect_uri=' + encodeURIComponent(redirect) + '';

    ctrl.onShareComplete = function() {
      advService.afterShare();
    }
  }
})();
