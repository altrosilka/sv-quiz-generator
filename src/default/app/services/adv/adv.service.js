(function() {
  'use strict';

  angular.module('app.services')
    .service('advService', AdvService);

  function AdvService($rootScope, $q, $ionicModal, Quiz, $log, utilsService) {
    var self = this;

    self.activate = activate;
    self.isActive = isActive;
    self.blockInQuizModal = blockInQuizModal;
    self.adsIsBlocked = adsIsBlocked;

    self.afterShare = function() {
      return callModal('sections/blocks/after-s/after-s.html', Quiz.adv.afterShare);
    }
    self.callWrongModal = function() {
      return callModal('sections/blocks/wrong-answer/wrong-answer.html', Quiz.adv.wrong, true);
    }

    self.callCompleteModal = function() {
      return callModal('sections/blocks/quiz-complete/quiz-complete.html', Quiz.adv.quizComplete, true);
    }

    function activate() {
      self._isActive = true;
      $log.info('Adz activated');
      utilsService.preloadImage(Quiz.adv.wrong.photo);
    }

    function isActive() {
      return self._isActive;
    }

    function blockInQuizModal() {
      self._blockInQuizModal = true;
    }

    function adsIsBlocked() {
      return self._blockInQuizModal;
    }

    function callModal(template, source, inQuizAdv) {
      var deferred = $q.defer();
      var $modalScope = $rootScope.$new();

      if (!inQuizAdv || !self._blockInQuizModal) {
        $ionicModal.fromTemplateUrl(template, {
          scope: $modalScope,
          animation: 'slide-in-up'
        }).then(function(modal) {
          $modalScope.modal = modal;
          $modalScope.modal.show();

          $modalScope.hide = function() {
            deferred.resolve();
            $modalScope.modal.hide();
          }

          $modalScope.blockAdvModals = function() {
            self.blockInQuizModal();
          }

          var advSource = (ionic.Platform.isAndroid()) ? source.android : source.ios;

          $modalScope.modalStyle = {
            color: advSource.color || '#fff',
            backgroundColor: advSource.backgroundColor || '#000',
            backgroundImage: 'url(' + advSource.photo + ')'
          };
          $modalScope.link = advSource.link;
        });
      } else {
        deferred.resolve();
      }

      return deferred.promise;
    }
  }
})();
