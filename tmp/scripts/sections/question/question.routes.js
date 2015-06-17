'use strict';

angular.module('app.sections')
	.config(function ($stateProvider) {
		$stateProvider
			.state('question', {
				url: '/question/:id',
				templateUrl: "sections/question/question.html",
				controller: 'QuestionCtrl as ctrl',
				resolve: {
					question: function(dataService, $stateParams){
						return dataService.getQuestionById($stateParams.id);
					}
				}
			});
	});



