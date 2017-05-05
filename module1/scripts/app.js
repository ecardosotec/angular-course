(function () {

  'use strict';

  angular.module("LunchCheck", [])
    .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope) {

    $scope.check = function () {
      var items = $scope.lunch_items;

      if (items) {
        var re = /\s*,\s*/;
        var itemsList = items.split(re);

        console.log(itemsList);

        if (itemsList.length > 3) {
          $scope.msg = "Too much!";
        }
        else {
          $scope.msg = "Enjoy!";
        }
      }
      else {
        $scope.msg = "Please enter data first";
      }
    };
  }

})();
