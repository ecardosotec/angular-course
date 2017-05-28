(function () {
'use strict';

angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
  .directive('foundItemsList', FoundItemsDirective)
;

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrowItDown = this;

  narrowItDown.foundItems = [];

  narrowItDown.search = function (searchTerm) {
    if (searchTerm) {
      var result = MenuSearchService.getMatchedMenuItems(searchTerm);
      result.then(function (response) {
        narrowItDown.foundItems = response;
        console.log(narrowItDown.foundItems);
      });
    }
    else {
      narrowItDown.foundItems = [];
    }
  };

  narrowItDown.removeItem = function (itemIndex) {
    narrowItDown.foundItems.splice(itemIndex, 1);
  };

}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  var getMenuItems = function () {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    });

    return response;
  };

  service.getMatchedMenuItems = function(searchTerm) {
    var promise = getMenuItems();

    return promise.then(function (response) {
      var items = response.data.menu_items;
      console.log(items);

      var foundItems = [];
      items.forEach(function(item, index, array) {
        if (item.description.includes(searchTerm)) {
          foundItems.push(item);
        }
      });

      return foundItems;
    })
    .catch(function (error) {
      console.log(error);
    })
  }
}

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      foundItems: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'directiveCtrl',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController() {
  var directiveCtrl = this;

  directiveCtrl.isEmpty = function () {
    return directiveCtrl.foundItems.length == 0;
  };
}

})();
