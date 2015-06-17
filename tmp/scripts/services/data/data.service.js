(function() {
  'use strict';

  angular.module('app.services')
    .service('dataService', DataService);

  function DataService(Quiz) {
    var self = this;

    var rightAnswers = 0;

    self.getQuiz = getQuiz;
    self.getQuestionById = getQuestionById;
    self.trackRightAnswer = trackRightAnswer;
    self.getRightAnswersCount = getRightAnswersCount;

    function getQuiz(data) {
      return Quiz;
    }

    function getQuestionById(id) {
      return self.getQuiz().questions[id];
    }

    function trackRightAnswer() {
      rightAnswers += 1;
    }

    function getRightAnswersCount() {
      return rightAnswers;
    }
  }
})();
