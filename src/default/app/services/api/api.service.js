(function() {
  'use strict';

  angular.module('app.services')
    .service('apiService', ApiService);

  function ApiService($q, requestService, apiConstant) {
    var self = this;

    self.get = function(url, params) {
      return requestService.get(url, params);
    };

    self.getQuiz = getQuiz;

    function getQuiz(id){
      return self.get(apiConstant.baseQuizUrl + id);
    }
  }
})();
