(function() {
  'use strict';

  angular.module('app.services')
    .service('requestService', RequestService);

  function RequestService($q, $http, $ionicPopup) {
    var self = this;


    self.call = call;
    self.post = post;
    self.get = get;

    function post(url, data, params) {
      return self.call('POST', url, data, params);
    }

    function get(url, params) {
      return self.call('GET', url, null, params);
    }

    function call(method, url, data, params) {
      var deferred = $q.defer();
      var headers = {};

      $http({
        method: method,
        url: url,
        headers: headers,
        data: data,
        params: params
      }).then(deferred.resolve).catch(function(err) {
        $ionicPopup.alert({
          title: 'Ошибка получения данных',
          template: 'Запрос на <b>'+url+'</b> не выполнен<br>query: '+JSON.stringify(params)+'<br>body: '+JSON.stringify(data)
        });
      });

      return deferred.promise;
    }
  }
})();
