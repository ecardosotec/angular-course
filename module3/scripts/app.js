(function () {
'use strict';

angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
;

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrowItDown = this;

  narrowItDown.foundItems = [];

  narrowItDown.search = function (searchTerm) {
    var result = MenuSearchService.getMatchedMenuItems(searchTerm);
    result.then(function (response) {
      narrowItDown.foundItems = response;
      console.log(narrowItDown.foundItems);
    });
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
      items: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController() {
  var list = this;

  list.isEmpty = function () {
    return false;
  };
}

})();
