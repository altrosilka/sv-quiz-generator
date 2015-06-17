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

  function bootApp($state, utilsService, apiService, dataService) {
    var quizName = utilsService.getQueryParam('quiz');
    if (quizName){
      apiService.getQuiz(quizName).then(function(){
        dataService.storeQuiz(resp.data);
        $state.go('question', {id: 0});
      }).catch(function(){
        alert('Sorry :(');
      });
    } else {
      alert('No quiz param :(');
    }
  }
  bootApp.$inject = ["$state", "utilsService", "apiService", "dataService"];

  function configApp($httpProvider) {
  }
  configApp.$inject = ["$httpProvider"];
})();

(function() {
  'use strict';

  angular
    .module('app.config', [])
    .constant('apiConstant', {
      baseQuizUrl: 'data/'
    });
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
 
  function QuestionCtrl($scope, $timeout, $modal) {
    var ctrl = this;


  }
  QuestionCtrl.$inject = ["$scope", "$timeout", "$modal"];
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
					family: ["dataService", "$stateParams", function(dataService, $stateParams){
						return dataService.getQuestionById($stateParams.id);
					}]
				}
			});
	}])
	.config(["$stateProvider", function ($stateProvider) {
		$stateProvider
			.state('start', {
				url: '/?quiz',
				controller: ["$state", function($state){
					debugger
				}]
			});
	}]);




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

  function DataService() {
    var self = this;

    self.storeQuiz = storeQuiz;
    self.getQuiz = getQuiz;
    self.getQuestionById = getQuestionById;

    function storeQuiz(data) {
      self._quiz = data
    }

    function getQuiz(data) {
      return self._quiz;
    }

    function getQuestionById(id) {
      return self.getQuiz().questions[id];
    }
  }
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

    self.getQueryParam = getParameterByName;

    function getParameterByName(name) {
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
      return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
  }
  UtilsService.$inject = ["$http"];
})();
