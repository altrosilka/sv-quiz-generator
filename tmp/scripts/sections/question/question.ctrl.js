(function() {
  'use strict';

  angular
    .module('app.sections')
    .controller('QuestionCtrl', QuestionCtrl);

  function QuestionCtrl($scope, $timeout, $state, question, advService, dataService, utilsService, defaultTimeout) {
    var ctrl = this;

    var newId = parseInt($state.params.id) + 1;

    ctrl.question = question;
    ctrl.nextQuestion = dataService.getQuestionById(newId);

    if (ctrl.nextQuestion) {
      utilsService.preloadImage(ctrl.nextQuestion.photo);
    }

    ctrl.currentNum = newId;
    ctrl.totalCount = dataService.getQuiz().questions.length;

    ctrl.selectAnswer = selectAnswer;
    ctrl.getAnswerClass = getAnswerClass;

    function selectAnswer(answer) {
      if (ctrl.selectedAnswer) {
        return;
      }
      ctrl.selectedAnswer = answer;

      if (answer.flag) {
        dataService.trackRightAnswer();
        $timeout(goToNext, defaultTimeout);
      } else {
        if (advService.isActive()) {
          $timeout(function() {
            advService.callWrongModal().then(function() {
              $timeout(goToNext, defaultTimeout);
            });
          }, defaultTimeout);
        } else {
          $timeout(goToNext, defaultTimeout);
        }
      }
    }

    function getAnswerClass(answer) {
      var obj = {};
      if (ctrl.selectedAnswer) {
        if (angular.equals(answer, ctrl.selectedAnswer)) {
          if (answer.flag) {
            obj.correct = true
          } else {
            obj.incorrect = true
          }
        } else {
          obj.disabled = true;
        }
      }
      return obj;
    }

    function goToNext() {
      if (!ctrl.nextQuestion) {
        $state.go('result');
      } else {
        $state.go('question', {
          id: newId
        });
      }
    }
  }
})();
