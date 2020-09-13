(function () {
	'use strict';

	angular.module('Data')
  .component('itemsComponent', {
    templateUrl: 'src/templates/items.template.html',
    bindings: {
			items: '<'
		}
  });

})();
