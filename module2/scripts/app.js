(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuy = this;

  toBuy.items = ShoppingListCheckOffService.getItems();

  toBuy.buy = function (itemIndex) {
    ShoppingListCheckOffService.buy(itemIndex);
  };

  toBuy.done = function (itemIndex) {
    return ShoppingListCheckOffService.done();
  };
}


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var alreadyBought = this;

  alreadyBought.items = ShoppingListCheckOffService.getBoughtItems();

  alreadyBought.empty = function (itemIndex) {
    return ShoppingListCheckOffService.empty();
  };
}


function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var items = [
    { name: "cookies", quantity: 10 },
    { name: "oranges", quantity: 2 },
    { name: "iced tea", quantity: 1 },
    { name: "Shadows of Mordor", quantity: 1 },
    { name: "batteries", quantity: 23 }
  ];

  // List of bought items
  var boughtItems = [];

  service.buy = function (itemIdex) {
    var bought = items.splice(itemIdex, 1)[0];
    boughtItems.push(bought);
  };

  service.done = function (itemIndex) {
    return items.length == 0;
  };

  service.empty = function (itemIndex) {
    return boughtItems.length == 0;
  };

  service.getItems = function () {
    return items;
  };

  service.getBoughtItems = function () {
    return boughtItems;
  };
}

})();
