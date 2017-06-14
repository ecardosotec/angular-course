(function () {
'use strict';

angular.module('MenuApp')
.component('categories', {
  templateUrl: 'src/categories.template.html',
  controller: CategoriesComponentController,
  bindings: {
    items: '<',
    myTitle: '@title',
    onRemove: '&'
  }
});

function CategoriesComponentController() {
  var directiveCtrl = this;

  directiveCtrl.isEmpty = function () {
    return directiveCtrl.foundItems.length == 0;
  };
}

})();
