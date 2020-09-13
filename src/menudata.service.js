(function () {
	'use strict';

	angular.module('Data')
  .service("MenuDataService", MenuDataService)
	.constant("ApiBasePath", "https://davids-restaurant.herokuapp.com");

	MenuDataService.$inject = ['ApiBasePath', '$http'];

	function MenuDataService(ApiBasePath, $http) {
		var service = this;

		service.getAllCategories = function () {
			var response = $http({
				method: "GET",
				url: (ApiBasePath + "/categories.json")
			});
			return response;
		};

		service.getItemsForCategory = function (shortName) {
			var response = $http({
				method: "GET",
				url: (ApiBasePath + "/menu_items.json"),
				params: {
					category: shortName
				}
			});
			return response;
		};
	};

	// return service;

})();
