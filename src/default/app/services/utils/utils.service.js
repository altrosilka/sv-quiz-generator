(function() {
  'use strict';

  angular.module('app.services')
    .service('utilsService', UtilsService);

  function UtilsService($http) {
    var self = this;

    self.preloadImage = preloadImage;
    self.getQueryParam = getParameterByName;

    function preloadImage(src, cb){
      var image = new Image();
      image.src = src;
      image.onload = function(){
        if (typeof cb ==='function') cb(image);
      }
    }

    function getParameterByName(name) {
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
      return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
  }
})();
