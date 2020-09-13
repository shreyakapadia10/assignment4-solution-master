(function () {
	'use strict';

	angular.module("NarrowDownChoice", [])
	.controller("NarrowItDownController", NarrowItDownController)
	.service("MenuSearchService", MenuSearchService)
	.directive("foundItems", FoundItems)
	.constant("ApiBasePath", "https://davids-restaurant.herokuapp.com");


	// *****DIRECTIVE*****

	function FoundItems() {
		var ddo = {
			templateUrl: 'foundItems.html',
			scope: {
				items: '<',
				onRemove: '&'
			},
			controller: FoundItemsDirectiveController,
			controllerAs: 'narrowItDown', 
			bindToController: true
		};

		return ddo;	
	};


	function FoundItemsDirectiveController() {
		var narrowItDown = this;

		narrowItDown.isEmpty = function () {
			
			if (narrowItDown.items !== undefined && narrowItDown.items.length === 0) {
				narrowItDown.total = false;
				return true;
			} 
		
			return false;		
		};

	};

	// *****CONTROLLER*****

	NarrowItDownController.$inject = ['MenuSearchService'];

	function NarrowItDownController(MenuSearchService) {
		var narrowItDown = this;		
		narrowItDown.searchTerm = "";

		narrowItDown.findItems = function () {
			var data = MenuSearchService.getMatchedMenuItems(narrowItDown.searchTerm);

			data.then(function (result) {
				narrowItDown.found = result;
				narrowItDown.total = true;
			})
			.catch(function (error) {
				console.log(error);
			});
		};

		narrowItDown.removeItem = function (itemIndex) {
			MenuSearchService.removeItem(itemIndex);
		}
	};


	// *****SERVICE*****

	MenuSearchService.inject = ['$http', 'ApiBasePath']

	function MenuSearchService($http, ApiBasePath) {
		var service = this;
		
		var found_items = [];

		service.getMatchedMenuItems = function (searchTerm) {
			return $http({
				method: "GET",
				url: (ApiBasePath + "/menu_items.json")
			})
			.then(function (response) {
				
				// var found_items = [];
				if (searchTerm !== undefined && searchTerm.length > 0) {
					searchTerm = searchTerm.toLowerCase();
					
					// console.log(searchTerm)
					for (var i = 0; i < response.data.menu_items.length; i++) {
						var menuItem = response.data.menu_items[i];

						var des = menuItem.description.toLowerCase();

						if (des.indexOf(searchTerm) !== -1) {
							found_items.push(menuItem)
						} 
					}
					// console.log(found_items);
					return found_items;
				}
				else{
					return [];	
				}
			})
			.catch(function (error) {
				console.log("Can't fetch data");
				console.log(error);
			});
		};

		service.removeItem = function (itemIndex) {
			found_items.splice(itemIndex, 1);	
		};
	};

})();