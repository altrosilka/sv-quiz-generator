/*
директива перевода
<div lang="text"></div>
где text - объект {"en":"Eng text", "ru": "Рус текст"}
*/
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