(function () {

  'use strict';

  angular.module("LunchCheck", [])
    .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope) {

    $scope.check = function () {
      var items = $scope.lunch_items;

      if (items) {
        //parse da entrada
        // var re = /\s*,\s*/; //versão simples (aceita itens vazios)
        var re = /\s*[,|\s]*,[,|\s]*\s*/; //opção que já ignora os itens vazios na hora do split (falha em alguns casos)
        var itemsList = items.split(re);
        console.log(itemsList);

        //descoberta dos itens vazios
        var emptyOnes = [];
        itemsList.forEach(function(item, index, array) {
          if (item.trim().length == 0) {
            emptyOnes.push(index);
          }
        });

        //remoção dos itens vazios
        emptyOnes = emptyOnes.reverse();
        console.log(emptyOnes);
        emptyOnes.forEach(function(item, index, array) {
          itemsList.splice(item, 1);
        });
        console.log(itemsList);

        //resultado
        if (itemsList.length > 3) {
          $scope.msg = "Too much!";
        }
        else {
          $scope.msg = "Enjoy!";
        };
      }
      else {
        $scope.msg = "Please enter data first";
      };
    };
  }

})();
