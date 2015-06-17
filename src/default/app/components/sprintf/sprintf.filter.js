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