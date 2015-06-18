(function() {
  'use strict';

  angular.module('app.services')
    .service('utilsService', UtilsService);

  function UtilsService($http) {
    var self = this;

    self.preloadImage = preloadImage;
    self.getQueryParam = getParameterByName;
    self.getFinalText = getFinalText;

    function preloadImage(src, cb) {
      var image = new Image();
      image.src = src;
      image.onload = function() {
        if (typeof cb === 'function') cb(image);
      }
    }

    function getParameterByName(name) {
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
      return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    function getFinalText(texts, rightAnswers) {
      var old, finalText, text;

      for(var i = 0; i<texts.length; i++){
        text = texts[i];
        
        if (text.answers > rightAnswers){
          finalText = old;
          break;
        }

        if (text.answers === rightAnswers){
          finalText = text;
          break;
        } else {
          old = text;
        }
      };

      return finalText;
    }
  }
})();
