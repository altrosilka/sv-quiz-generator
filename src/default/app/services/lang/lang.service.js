(function() {
  'use strict';

  angular.module('app.services')
    .service('langService', LangService);

  function LangService(Quiz) {
    var self = this;

    self.setLang = setLang;
    self.getLang = getLang;
    self.getLangText = getLangText;

    self.setLang(navigator.language || navigator.browserLanguage || navigator.userLanguage);

    function setLang(lang) {
      if (Quiz.langs[lang]) {
        self._currentLang = lang;
      }
    }

    function getLang() {
      return self._currentLang;
    }
    function getLangText(text) {
      if (text[self._currentLang]){
        return text[self._currentLang];
      } else {
        return '--NO TEXT--';
      }
    }
  }
})();
