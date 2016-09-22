(function(){
  'use strict';
  angular
    .module("ShoppingListCheckOff", [])
    .controller("ToBuyShoppingController", ToBuyShoppingController)
    .controller("AlreadyBoughtShoppingController", AlreadyBoughtShoppingController)
    .service("ShoppingListCheckOffService", ShoppingListCheckOffService);

    ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
    AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];

    function isEmpty(arr) {
      return (typeof arr.items === undefined) || (arr.length == 0);
    }

    function ToBuyShoppingController(ShoppingListCheckOffService) {
        var buyListCtrl = this;

        buyListCtrl.items = function() {
          return ShoppingListCheckOffService.buyItems();
        }

        buyListCtrl.isEmpty = function() {
          return isEmpty(buyListCtrl.items());
        }

        buyListCtrl.bought = function(index) {
          ShoppingListCheckOffService.bought(index);
        }
    }

    function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
        var boughtListCtrl = this;

        boughtListCtrl.items = function() {
          return ShoppingListCheckOffService.boughtItems();
        }

        boughtListCtrl.isEmpty = function() {
          return isEmpty(boughtListCtrl.items());
        }
    }

    function ShoppingListCheckOffService() {
        var service = this;

        var buyList = [
          {
            "name": "cookies",
            "quantity": "10"
          },
          {
            "name": "Cola",
            "quantity": "2"
          },
          {
            "name": "Tomatoes",
            "quantity": "1kg"
          },
          {
            "name": "Banana",
            "quantity": "2kg"
          },
          {
            "name": "Bread",
            "quantity": "1"
          },
          {
            "name": "Candies",
            "quantity": "200gr"
          },
        ];
        var boughtList = [];

        service.bought = function(index) {
          var item = buyList[index];
          if (item !== 'undefinded') {
            boughtList.push(item);
            buyList.splice(index, 1);
          }
        }

        service.buyItems = function() {
          return buyList;
        }

        service.boughtItems = function() {
          return boughtList;
        }

        return service;
    }

})();
