(function () {
'use strict';

angular.module('MenuApp')
.component('items', {
  templateUrl: 'src/items.template.html',
  controller: ItemsComponentController,
  bindings: {
    items: '<',
    myTitle: '@title',
    onRemove: '&'
  }
});

function ItemsComponentController() {
  var directiveCtrl = this;

  directiveCtrl.isEmpty = function () {
    return directiveCtrl.foundItems.length == 0;
  };
}

})();
