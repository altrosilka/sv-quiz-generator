(function() {
  'use strict';

  angular.module('app.services')
    .service('advService', AdvService);

  function AdvService($rootScope, $q, $ionicModal, Quiz, $log, utilsService) {
    var self = this;

    self.activate = activate;
    self.isActive = isActive;

    self.callWrongModal = function() {
      var deferred = $q.defer();
      var $modalScope = $rootScope.$new();
      
      $ionicModal.fromTemplateUrl('sections/adv/wrong-answer/wrong-answer.html', {
        scope: $modalScope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $modalScope.modal = modal;
        $modalScope.modal.show();

        $modalScope.hide = function(){
          deferred.resolve();
          $modalScope.modal.hide();
        }

        $modalScope.modalStyle = {
          color: Quiz.adv.wrong.color || '#fff',
          backgroundColor: Quiz.adv.wrong.backgroundColor || '#000',
          backgroundImage: 'url('+Quiz.adv.wrong.photo+')'
        };
        $modalScope.link = Quiz.adv.wrong.link;
      });

      return deferred.promise;
    }

    self.callCompleteModal = function() {
      var deferred = $q.defer();
      var $modalScope = $rootScope.$new();
      
      $ionicModal.fromTemplateUrl('sections/adv/quiz-complete/quiz-complete.html', {
        scope: $modalScope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $modalScope.modal = modal;
        $modalScope.modal.show();

        $modalScope.hide = function(){
          deferred.resolve();
          $modalScope.modal.hide();
        }

        $modalScope.modalStyle = {
          color: Quiz.adv.quizComplete.color || '#fff',
          backgroundColor: Quiz.adv.quizComplete.backgroundColor || '#000',
          backgroundImage: 'url('+Quiz.adv.quizComplete.photo+')'
        }; 
        $modalScope.link = Quiz.adv.quizComplete.link;
      });

      return deferred.promise;
    }

    function activate() {
      self._isActive = true;
      $log.info('Adz activated');
      utilsService.preloadImage(Quiz.adv.wrong.photo);
    }

    function isActive() {
      return self._isActive;
    }
  }
})();
