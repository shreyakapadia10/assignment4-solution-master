(function () {
  'use strict';

  angular.module('Data')
  .controller('ItemDetailController', ItemDetailController);

  ItemDetailController.$inject = ['$stateParams','MenuDataService'];

  function ItemDetailController($stateParams, MenuDataService) {
    var itemdetail = this;
    itemdetail.category = $stateParams.category;
    itemdetail.special_instructions = $stateParams.inst;
    var promise = MenuDataService.getItemsForCategory($stateParams.short_name);

    promise
    .then(function (response) {
      itemdetail.items = response.data;
      return itemdetail.items;
    })
    .catch(function (error) {
      console.log(error);
    });
  }
})();
