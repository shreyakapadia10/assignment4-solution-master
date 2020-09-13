(function () {
  'use strict';

  angular.module('MenuApp')
  .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function RoutesConfig($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'src/templates/home.template.html'
      })

      .state('categories',{
        url: '/categories',
        templateUrl: 'src/templates/menu.categories.template.html',
        controller: 'MenuCategoriesController as categories'
      })

      .state('categories.itemdetail',{
				url: '/{short_name}',
				templateUrl: 'src/templates/item-detail.template.html',
				controller: 'ItemDetailController as itemdetail',
        params: {
          short_name: null,
          name: null
        }
			});
  };
})();
