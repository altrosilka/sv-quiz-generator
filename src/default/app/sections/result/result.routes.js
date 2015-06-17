'use strict';

angular.module('app.sections')
	.config(function ($stateProvider) {
		$stateProvider
			.state('result', {
				url: '/result',
				templateUrl: "sections/result/result.html",
				controller: 'ResultCtrl as ctrl'
			});
	});



