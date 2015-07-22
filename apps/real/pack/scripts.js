(function() {
  'use strict';

  angular
    .module('app', [
      'app.components', 'app.services', 'app.sections',
      'app.templates', 'app.config',
      'ionic'
    ])
    .config(configApp)
    .run(bootApp);

  function bootApp(Quiz, $state, utilsService, advService, dataService, langService) {
    langService.setLang(utilsService.getQueryParam('lang') || 'en');
    var quizFree = utilsService.getQueryParam('fromApp');

    if (!quizFree && (ionic.Platform.isAndroid() || ionic.Platform.isIOS())) {
      advService.activate();
    }

    if (typeof window.history.pushState == 'function') {
      window.history.pushState({}, "Hide");
    }

    $state.go('question', {id: 0});
  }
  bootApp.$inject = ["Quiz", "$state", "utilsService", "advService", "dataService", "langService"];

  function configApp($ionicConfigProvider) {
    $ionicConfigProvider.views.maxCache(0);
  }
  configApp.$inject = ["$ionicConfigProvider"];
})();

(function() {
  'use strict';

  angular
    .module('app.config', [])
    .constant('apiConstant', {
      baseQuizUrl: 'data/'
    }) 
    .constant('defaultTimeout', 1000)
    .constant('Quiz', {"id":"realwefwefewf","adv":{"wrong":{"photo":"http://s5o.ru/source/special/lawsonscup/img/WL_300_300_3_18.png","backgroundColor":"#000","color":"#4ff","link":"http://ya.ru"},"quizComplete":{"photo":"http://avatars-fast.yandex.net/get-direct/LQpE7mF96rQG2cHKd1u8VQ/y150","backgroundColor":"#eee","color":"#333","link":"http://ya.ru"},"afterShare":{"photo":"http://avatars-fast.yandex.net/get-direct/LQpE7mF96rQG2cHKd1u8VQ/y150","backgroundColor":"#eee","color":"#333","link":"http://ya.ru"}},"results":{"photo":"http://s5o.ru/storage/simple/ru/edt/50/31/28/85/rue708ddb2721.jpg","shareTxt":{"ru":"","en":""},"rightAnswersTxt":{"ru":"","en":""},"texts":[{"answers":0,"value":{"ru":"Парень, ты ни о чем","en":""}},{"answers":3,"value":{"ru":"Ну хотя бы так","en":""}}]},"questions":[{"photo":"http://img.spokeo.com/public/900-600/magic_johnson_1987_04_01.jpg","question":{"ru":"Вопрос на русском","en":"English text"},"answers":[{"flag":true,"value":{"ru":"Ответ на русском 1","en":"English answer 1"}},{"flag":false,"value":{"ru":"Ответ на русском 2","en":"English answer 2"}},{"flag":false,"value":{"ru":"Ответ на русском 3","en":"English answer 3"}},{"flag":false,"value":{"ru":"Ответ на русском 4","en":"English answer 4"}}]},{"photo":"http://thesportsfanjournal.com/wp-content/uploads/2012/04/reggie-miller-vs-michael-jordan.jpg","question":{"ru":"Вопрос на русском 2","en":"English text 2"},"answers":[{"flag":true,"value":{"ru":"Ответ на русском 2-1","en":"English answer 2-1"}},{"flag":false,"value":{"ru":"Ответ на русском 2-2","en":"English answer 2-2"}},{"flag":false,"value":{"ru":"Ответ на русском 2-3","en":"English answer 2-3"}},{"flag":false,"value":{"ru":"Ответ на русском 2-4","en":"English answer 2-4"}}]}]}); 
})();
   
(function() {
	'use strict';

	angular.module('app.components', []);
})();
  
(function() {
	'use strict';

	angular.module('app.sections', ['ionic']);
})();
  
(function() {
	'use strict';

	angular.module('app.services', []);
})();
    
(function() {
	'use strict';

	angular
		.module('app.components')
		.directive('lang', Lang);

	function Lang(langService) {
		return {
			scope:{
				lang: '='
			},
			link: function($scope, $element){
				$element.html(langService.getLangText($scope.lang));
			}
		};
	}
	Lang.$inject = ["langService"];
})();
angular.module('app.components').directive('resizable', function() {
  var resizableConfig = {
    aspectRatio: true
  };

  return {
    restrict: 'A',
    link: function postLink(scope, elem) {
      elem.resizable(resizableConfig);
      elem.on('resizestop', function() {
        if (scope.callback) scope.callback();
      });
    }
  };
});

(function() {
	'use strict';

	angular
		.module('app.components')
		.filter('sprintf', sprintfFilter);

	function sprintfFilter() {
		function parse(str) {
			var args = arguments, i = 1;
			return str.replace(/%s/g, function () {
				return args[i++] || '';
			});
		}

		return function () {
			return parse.apply(this, arguments);
		};
	}
})();
(function() {
  'use strict';

  angular
    .module('app.sections')
    .controller('MainCtrl', MainCtrl);

  function MainCtrl($scope, $timeout, $modal) {

    var ctrl = this;

    ctrl.backgrounds = [{
      src: 'img/1.jpg'
    }, {
      src: 'img/2.jpg'
    }, {
      src: 'img/3.jpg'
    }, {
      src: 'img/4.jpg'
    }, {
      src: 'img/5.jpg'
    }, {
      src: 'img/6.jpg'
    }];

    ctrl.options = {
      mod: 0,
      defaultMargin: 30,
      background: {
        size: 'cover',
        position: 'center'
      },
      size: {
        width: 600,
        height: 400
      },
      font: {
        family: "balance_cyrbold",
        weight: 'normal',
        color: '#fff'
      },
      texts: []
    };


    ctrl.selectBackground = function(background) {
      ctrl.options.background.src = background.src;
    }

    $scope.$watch(function() {
      return ctrl.newBackground;
    }, function(src) {
      if (!src) return;
      ctrl.backgrounds.unshift({
        src: 'data:image/png;base64,' + src
      });
      ctrl.selectBackground(ctrl.backgrounds[0]);
    });

    /* MASK */
    ctrl.removeMask = function() {
      ctrl.options.mask = undefined;
    }

    $scope.$watch(function() {
      return ctrl.newMask;
    }, function(src) {
      if (!src) return;
      ctrl.options.mask = {
        src: 'data:image/png;base64,' + src
      };
    });

    /* LOGO */
    ctrl.removeLogo = function() {
      ctrl.options.logo = undefined;
    }

    $scope.$watch(function() {
      return ctrl.newLogo;
    }, function(src) {
      if (!src) return;
      var image = new Image();
      image.src = 'data:image/png;base64,' + src;
      image.onload = function() {

        $scope.$apply(function() {
          ctrl.options.logo = {
            src: image.src,
            width: image.width,
            height: image.height,
            x: ctrl.options.defaultMargin,
            y: ctrl.options.size.height - image.height - ctrl.options.defaultMargin
          };
        });
      }
    });




    ctrl.openTemplateModal = function() {
      $modal.open({
        templateUrl: 'sections/templates-modal/templates-modal.html',
        controller: 'TemplatesModalCtrl as ctrl',
        size: 'md',
        windowClass: 'templatesModal',
        resolve: {
          options: function() {
            return ctrl.options;
          }
        }
      }).result.then(function(template) {
        angular.extend(ctrl.options, template);
      }, function() {
 
      });
    }

    ctrl.createImage = function() {
      html2canvas(document.getElementById('image'), {
        useCORS: true,
        onrendered: function(canvas) {
          $timeout(function() {
            canvas.toBlob(function(blob) {
              saveAs(blob, "social_" + Math.random().toString(36).substring(13) + ".png");
            });
          }, 500);
        }
      });
    }
  }
  MainCtrl.$inject = ["$scope", "$timeout", "$modal"];
})();

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
        if (advService.isActive() && !advService.adsIsBlocked()) {
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
          if (!answer.flag) {
            obj.disabled = true;
          } else {
            obj.right = true;
          }
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
  QuestionCtrl.$inject = ["$scope", "$timeout", "$state", "question", "advService", "dataService", "utilsService", "defaultTimeout"];
})();

'use strict';

angular.module('app.sections')
	.config(["$stateProvider", function ($stateProvider) {
		$stateProvider
			.state('question', {
				url: '/question/:id',
				templateUrl: "sections/question/question.html",
				controller: 'QuestionCtrl as ctrl',
				resolve: {
					question: ["dataService", "$stateParams", function(dataService, $stateParams){
						return dataService.getQuestionById($stateParams.id);
					}]
				}
			});
	}]);




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
  ResultCtrl.$inject = ["Quiz", "$scope", "advService", "dataService", "utilsService", "langService"];
})();

'use strict';

angular.module('app.sections')
	.config(["$stateProvider", function ($stateProvider) {
		$stateProvider
			.state('result', {
				url: '/result',
				templateUrl: "sections/result/result.html",
				controller: 'ResultCtrl as ctrl'
			});
	}]);




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
  AdvService.$inject = ["$rootScope", "$q", "$ionicModal", "Quiz", "$log", "utilsService"];
})();

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
  ApiService.$inject = ["$q", "requestService", "apiConstant"];
})();

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
  DataService.$inject = ["Quiz"];
})();


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
  LangService.$inject = ["Quiz"];
})();

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
  RequestService.$inject = ["$q", "$http", "$ionicPopup"];
})();

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
  UtilsService.$inject = ["$http"];
})();
