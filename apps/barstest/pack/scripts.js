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
    langService.setLang(utilsService.getQueryParam('lang'));
    var quizFree = utilsService.getQueryParam('fromApp');

    if (!quizFree && (ionic.Platform.isAndroid() || ionic.Platform.isIOS())) {
      advService.activate();
    }

    if (typeof window.history.pushState == 'function') {
      window.history.pushState({}, "Hide");
    }

    //$state.go('question', {id: 0});
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
    .constant('Quiz', {"id":"barstest","langs":{"ru":"Русский","en":"English"},"share":{"title":{"ru":"Насколько хорошо вы знаете «Барселону»? Самый интересный футбольный тест о «Барселоне» в приложении Barca Live.","en":"How well do you know your Barcelona? The ultimate football quiz."},"description":{"ru":"Что вы знаете о «Барселоне»? Проверьте себя, пройдя тест в приложении Barca Live","en":"The ultimate Barcelona football quiz. How well do your know your favourite club?"},"photo":"http://www.sports.ru/storage/img/testapp/fbshare.png","config":{"fb_app_id":109556845805232,"url":"http://ya.ru","redirect_url":"http://sports.ru"},"shareFbBtnTxt":{"ru":"Поделиться","en":"Share"},"shareTwBtnTxt":{"ru":"Твитнуть","en":"Tweet"}},"adv":{"wrong":{"ios":{"photo":"http://www.sports.ru/storage/img/testapp/advbarcawrong.png","backgroundColor":"#000","color":"#4ff","link":"https://itunes.apple.com/us/app/barca-live-barcelona-football/id751678884"},"android":{"photo":"http://www.sports.ru/storage/img/testapp/advscoreswrong.png","backgroundColor":"#000","color":"#4ff","link":"https://itunes.apple.com/us/app/barca-live-barcelona-football/id751678884"}},"quizComplete":{"ios":{"photo":"http://www.sports.ru/storage/img/testapp/advbarcafinal.png","backgroundColor":"#eee","color":"#333","link":"https://itunes.apple.com/us/app/barca-live-barcelona-football/id751678884"},"android":{"photo":"http://www.sports.ru/storage/img/testapp/advscoresfinal.png","backgroundColor":"#eee","color":"#333","link":"https://play.google.com/store/apps/details?id=com.sports.scoresandvideo"}},"afterShare":{"ios":{"photo":"http://www.sports.ru/storage/img/testapp/advbarcaaftershare.png","backgroundColor":"#eee","color":"#333","link":"https://itunes.apple.com/us/app/barca-live-barcelona-football/id751678884"},"android":{"photo":"http://www.sports.ru/storage/img/testapp/advscoresaftershare.png","backgroundColor":"#eee","color":"#333","link":"https://play.google.com/store/apps/details?id=com.sports.scoresandvideo"}}},"results":{"photo":"http://www.sports.ru/storage/img/testapp/barcafin.png","shareTxt":{"ru":"Поделитесь результатом с друзьями","en":"Share result with your friends"},"rightAnswersTxt":{"ru":"Правильных ответов","en":"Right answers"},"texts":[{"answers":0,"value":{"title":{"ru":"Добро пожаловать в мир футбола!","en":"Welcome to the world of football!"},"description":{"ru":"Что вы знаете о «Барселоне»? Проверьте себя, пройдя тест в приложении Barca Live.","en":"How well do you know your Barcelona? Test your football knowledge with Barcelona Live App quiz."}}},{"answers":1,"value":{"title":{"ru":"Очень слабо, как первый соперник в Кубке Короля. ","en":"Poor, like the opponent in the first round of Copa del Rey."},"description":{"ru":"Что вы знаете о «Барселоне»? Проверьте себя, пройдя тест в приложении Barca Live.","en":"How well do you know your Barcelona? Test your football knowledge with Barcelona Live App quiz."}}},{"answers":3,"value":{"title":{"ru":"Можно и лучше. Уровень Сегунды.","en":"You can do better. That’s Segunda level."},"description":{"ru":"Что вы знаете о «Барселоне»? Проверьте себя, пройдя тест в приложении Barca Live.","en":"How well do you know your Barcelona? Test your football knowledge with Barcelona Live App quiz."}}},{"answers":5,"value":{"title":{"ru":"Уже кое-что. Отличаете синий от гранатового.","en":"That’s something. You can tell blau from grana."},"description":{"ru":"Что вы знаете о «Барселоне»? Проверьте себя, пройдя тест в приложении Barca Live.","en":"How well do you know your Barcelona? Test your football knowledge with Barcelona Live App quiz."}}},{"answers":7,"value":{"title":{"ru":"Вполне прилично. Вы болеете за «Барсу» не первый год.","en":"Not bad. You support Barca for more than a year."},"description":{"ru":"Что вы знаете о «Барселоне»? Проверьте себя, пройдя тест в приложении Barca Live.","en":"How well do you know your Barcelona? Test your football knowledge with Barcelona Live App quiz."}}},{"answers":9,"value":{"title":{"ru":"Очень хорошо. Вы точно знаете, кто такой Йохан Кройфф.","en":"Very good. You know who Johan Cruyff is."},"description":{"ru":"Что вы знаете о «Барселоне»? Проверьте себя, пройдя тест в приложении Barca Live.","en":"How well do you know your Barcelona? Test your football knowledge with Barcelona Live App quiz."}}},{"answers":11,"value":{"title":{"ru":"Впечатляюще. Говорите по-каталански?","en":"Impressive. Do you speak Catalan?"},"description":{"ru":"Что вы знаете о «Барселоне»? Проверьте себя, пройдя тест в приложении Barca Live.","en":"How well do you know your Barcelona? Test your football knowledge with Barcelona Live App quiz."}}},{"answers":13,"value":{"title":{"ru":"Блестяще. Месси мечтает пожать вам руку.","en":"Excellent. Messi will be delighted to meet you."},"description":{"ru":"Что вы знаете о «Барселоне»? Проверьте себя, пройдя тест в приложении Barca Live.","en":"How well do you know your Barcelona? Test your football knowledge with Barcelona Live App quiz."}}},{"answers":15,"value":{"title":{"ru":"Феноменально! Вы наверняка выпускник Ла Масии.","en":"Phenomenal! You must be a La Macia graduate."},"description":{"ru":"Что вы знаете о «Барселоне»? Проверьте себя, пройдя тест в приложении Barca Live.","en":"How well do you know your Barcelona? Test your football knowledge with Barcelona Live App quiz."}}}]},"questions":[{"photo":"http://www.sports.ru/storage/img/testapp/barca1.png","question":{"ru":"Кто выиграл самое первое «Эль Класико» в истории?","en":"Who won the very first El Clasico in 1902?"},"answers":[{"flag":true,"value":{"ru":"«Барселона»","en":"Barcelona"}},{"flag":false,"value":{"ru":"«Реал»","en":"Real Madrid"}},{"flag":false,"value":{"ru":"Ничья","en":"Draw"}},{"flag":false,"value":{"ru":"Матч не был доигран","en":"Game was postponed"}}]},{"photo":"http://www.sports.ru/storage/img/testapp/barca2.png","question":{"ru":"Под каким номером Лионель Месси провел первый официальный матч за «Барселону»?","en":"What was Lionel Messi’s shirt number on his official debut for Barcelona?"},"answers":[{"flag":false,"value":{"ru":"10","en":"10"}},{"flag":false,"value":{"ru":"18","en":"18"}},{"flag":false,"value":{"ru":"19","en":"19"}},{"flag":true,"value":{"ru":"30","en":"30"}}]},{"photo":"http://www.sports.ru/storage/img/testapp/barca3.png","question":{"ru":"Кто забил победный гол в финале Лиги чемпионов-2005/06?","en":"Who scored the winning goal in the Champions League final in 2005-06?"},"answers":[{"flag":false,"value":{"ru":"Макси Лопес","en":"Maxi Lopez"}},{"flag":true,"value":{"ru":"Жулиано Беллетти","en":"Juliano Belletti"}},{"flag":false,"value":{"ru":"Самюэль Это’О","en":"Samuel Eto’o"}},{"flag":false,"value":{"ru":"Хенрик Ларссон","en":"Henrik Larsson"}}]},{"photo":"http://www.sports.ru/storage/img/testapp/barca4.png","question":{"ru":"Какой из этих трофеев не выигрывала «Барселона»?","en":"Which of those trophies wasn’t won by Barcelona?"},"answers":[{"flag":true,"value":{"ru":"Межконтинентальный кубок","en":"Intercontinental Cup"}},{"flag":false,"value":{"ru":"Кубок ярмарок","en":"Fairs Cup"}},{"flag":false,"value":{"ru":"Клубный чемпионат мира","en":"Club World Cup"}},{"flag":false,"value":{"ru":"Кубок обладателей кубков","en":"Cup Winners’ Cup"}}]},{"photo":"http://www.sports.ru/storage/img/testapp/barca5.png","question":{"ru":"В каком году был сыгран первый матч на «Камп Ноу»?","en":"The very first game at Camp Nou took place in..."},"answers":[{"flag":false,"value":{"ru":"1899","en":"1899"}},{"flag":false,"value":{"ru":"1954","en":"1954"}},{"flag":true,"value":{"ru":"1957","en":"1957"}},{"flag":false,"value":{"ru":"1975","en":"1975"}}]},{"photo":"http://www.sports.ru/storage/img/testapp/barca6.png","question":{"ru":"Какой","en":"Which of Barca players goes by the nickname El Arquitecto (The Architect)?"},"answers":[{"flag":false,"value":{"ru":"Йохан Кройфф","en":"Johan Cruyff"}},{"flag":false,"value":{"ru":"Жозеп Гвардиола","en":"Josep Guardiola"}},{"flag":false,"value":{"ru":"Антонио Гауди","en":"Antonio Gaudi"}},{"flag":true,"value":{"ru":"Луис Суарес","en":"Luis Suarez"}}]},{"photo":"http://www.sports.ru/storage/img/testapp/barca7.png","question":{"ru":"Назовите второго бомбардира «Барселоны» в эпоху Месси (с 16.10.2004)?","en":"Who is Barcelona second-best goalscorer in the Messi era (since 16/10/2004)?"},"answers":[{"flag":false,"value":{"ru":"Роналдиньо","en":"Ronaldinho"}},{"flag":false,"value":{"ru":"Давид Вилья","en":"David Villa"}},{"flag":false,"value":{"ru":"Педро","en":"Pedro"}},{"flag":true,"value":{"ru":"Самюэль Это’О","en":"Samuel Eto’o"}}]},{"photo":"http://www.sports.ru/storage/img/testapp/barca8.png","question":{"ru":"В каком году «Барса» выиграла требл (Ла Лига, Кубок Испании, Лига чемпионов)?","en":"In which year Barcelona won the treble (La Liga, Copa del Rey, Champions League)?"},"answers":[{"flag":false,"value":{"ru":"2011","en":"2011"}},{"flag":false,"value":{"ru":"2006","en":"2006"}},{"flag":true,"value":{"ru":"2009","en":"2009"}},{"flag":false,"value":{"ru":"2010","en":"2010"}}]},{"photo":"http://www.sports.ru/storage/img/testapp/barca9.png","question":{"ru":"Кто из этих футболистов не играл в «Барселоне» и «Аяксе»?","en":"Who didn’t play for both Barcelona and Ajax?"},"answers":[{"flag":true,"value":{"ru":"Ибрагим Афеллай","en":"Ibrahim Afellay"}},{"flag":false,"value":{"ru":"Боян Кркич","en":"Bojan Krkic"}},{"flag":false,"value":{"ru":"Патрик Клюйверт","en":"Patrick Kluivert"}},{"flag":false,"value":{"ru":"Олегер","en":"Oleguer"}}]},{"photo":"http://www.sports.ru/storage/img/testapp/barca10.png","question":{"ru":"Какой","en":"A pre-season tournament is held at Camp Nou every year. How’s it called?"},"answers":[{"flag":true,"value":{"ru":"Кубок Гампера","en":"Gamper Trophy"}},{"flag":false,"value":{"ru":"Кубок Сампера","en":"Samper Trophy"}},{"flag":false,"value":{"ru":"Кубок Кройффа","en":"Cruyff Trophy"}},{"flag":false,"value":{"ru":"Кубок Каталонии","en":"Catalan Cup"}}]},{"photo":"http://www.sports.ru/storage/img/testapp/barca11.png","question":{"ru":"Кто из этих когда-либо выступавших за «Барселону» футболистов не становился чемпионом мира?","en":"They all played for Barca but one of them hasn’t won a World Cup. Who?"},"answers":[{"flag":false,"value":{"ru":"Джанлука Дзамбротта","en":"Gianluca Zambrotta"}},{"flag":false,"value":{"ru":"Тьерри Анри","en":"Thierry Henry"}},{"flag":false,"value":{"ru":"Давид Вилья","en":"David Villa"}},{"flag":true,"value":{"ru":"Жорди Альба","en":"Jordi Alba"}}]},{"photo":"http://www.sports.ru/storage/img/testapp/barca12.png","question":{"ru":"Сколько футболистов перешли из «Арсенала» в «Барселону» за последние 15 лет?","en":"How many players Arsenal sold to Barcelona over the last 15 years?"},"answers":[{"flag":false,"value":{"ru":"15","en":"15"}},{"flag":false,"value":{"ru":"10","en":"10"}},{"flag":true,"value":{"ru":"8","en":"8"}},{"flag":false,"value":{"ru":"5","en":"5"}}]},{"photo":"http://www.sports.ru/storage/img/testapp/barca13.png","question":{"ru":"Кто из этих футболистов играл в «Барсе» вместе с Жозепом Гвардиолой?","en":"Who was lucky to play alongside Josep Guardiola at Barca back in the days?"},"answers":[{"flag":true,"value":{"ru":"Пепе Рейна","en":"Pepe Reina"}},{"flag":false,"value":{"ru":"Хавьер Савиола","en":"Javier Saviola"}},{"flag":false,"value":{"ru":"Гаиска Мендьета","en":"Gaizka Mendieta"}},{"flag":false,"value":{"ru":"Хуан Роман Рикельме","en":"Juan Roman Riquelme"}}]},{"photo":"http://www.sports.ru/storage/img/testapp/barca14.png","question":{"ru":"Вы не поверите, но один из этих российских клубов «Барселона» никогда не побеждала в еврокубках. Какой?","en":"You won’t believe this, but Leo Messi is yet to score against one of these clubs in La Liga. Which one?"},"answers":[{"flag":false,"value":{"ru":"«Спартак»","en":"Sevilla"}},{"flag":true,"value":{"ru":"ЦСКА","en":"Xerez"}},{"flag":false,"value":{"ru":"«Локомотив»","en":"Alaves"}},{"flag":false,"value":{"ru":"«Рубин»","en":"Granada"}}]},{"photo":"http://www.sports.ru/storage/img/testapp/barca15.png","question":{"ru":"Укажите самую низкую позицию «Барсы» в итоговой таблице чемпионата Испании.","en":"What was Barcelona lowest finishing position ever in La Liga?"},"answers":[{"flag":false,"value":{"ru":"2-е место","en":"2nd"}},{"flag":false,"value":{"ru":"3-е место","en":"3rd"}},{"flag":false,"value":{"ru":"6-е место","en":"6th"}},{"flag":true,"value":{"ru":"12-е место","en":"12th"}}]}]}); 
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
