(function () {
  'use strict';

  angular.module('MenuApp')
  .controller('MenuCategoriesController', MenuCategoriesController);

  MenuCategoriesController.$inject = ['MenuDataService'];

  function MenuCategoriesController(MenuDataService) {
    var categories = this;

    var promise = MenuDataService.getAllCategories();

    promise
    .then(function (response) {
      categories.items = response.data;
      // console.log(categories.items);
      return categories.items;
    })
    .catch(function (error) {
      console.log(error);
    });
  };

})();
