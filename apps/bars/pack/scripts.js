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

  function bootApp($state, utilsService, advService, dataService) {
    var quizName = utilsService.getQueryParam('quiz');
    if (quizName){
      advService.activate();
    }
    $state.go('question', {id: 0});
  }
  bootApp.$inject = ["$state", "utilsService", "advService", "dataService"];

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
    .constant('Quiz', {"id":"realwefwefewf","adv":{"wrong":{"photo":"http://s5o.ru/source/special/lawsonscup/img/WL_300_300_3_18.png","backgroundColor":"#000","color":"#4ff","link":"http://ya.ru"},"quizComplete":{"photo":"http://avatars-fast.yandex.net/get-direct/LQpE7mF96rQG2cHKd1u8VQ/y150","backgroundColor":"#eee","color":"#333","link":"http://ya.ru"}},"results":{"photo":"http://s5o.ru/storage/simple/ru/edt/50/31/28/85/rue708ddb2721.jpg","texts":{}},"test":123234234,"questions":[{"photo":"http://img.spokeo.com/public/900-600/magic_johnson_1987_04_01.jpg","question":"Как дела, барс?","answers":[{"flag":true,"value":"Ответ № 1"},{"flag":false,"value":"Ответ № 2"}]},{"photo":"http://thesportsfanjournal.com/wp-content/uploads/2012/04/reggie-miller-vs-michael-jordan.jpg","question":"Как дела барс 2?","answers":[{"flag":false,"value":"Ответ № 1"},{"flag":true,"value":"Ответ № 2"}]}]}); 
})();
   
(function() {
	'use strict';

	angular.module('app.services', []);
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
  UtilsService.$inject = ["$http"];
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

  function ResultCtrl($scope, advService, dataService) {
    var ctrl = this;

    if (advService.isActive()){
      advService.callCompleteModal();
    }

    ctrl.rightCount = dataService.getRightAnswersCount();
    ctrl.totalCount = dataService.getQuiz().questions.length;

    var url = 'http://test.ru';
    ctrl.twShareLink = 'https://twitter.com/intent/tweet?text=привет&url='+url;
    ctrl.fbShareLink = 'https://www.facebook.com/sharer/sharer.php?u='+url+'&ref=plugin&src=share_button';
  }
  ResultCtrl.$inject = ["$scope", "advService", "dataService"];
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



