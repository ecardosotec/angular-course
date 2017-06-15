(function () {
'use strict';

angular.module('MenuApp')
  .controller('ItemController', ItemController);

ItemController.$inject = ['item']
function ItemController(item) {
  var itemCtrl = this;
  console.log(item);

  var category = item.category;

  itemCtrl.categoryName = category.name;
  itemCtrl.specialInstructions = category.special_instructions;

  itemCtrl.menuItems = item.menu_items;
}

})();
