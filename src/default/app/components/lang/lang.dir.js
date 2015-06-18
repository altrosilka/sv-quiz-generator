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
})();