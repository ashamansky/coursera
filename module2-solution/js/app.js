(function(){
  'use strict';
  angular
    .module("ShoppingListApp", [])
    .controller("BuyListController", BuyListController)
    .controller("BoughtListController", BoughtListController)
    .service("ShoppingListService", ShoppingListService);

    BuyListController.$inject = ['ShoppingListService'];
    BoughtListController.$inject = ['ShoppingListService'];

    function isEmpty(arr) {
      return (typeof arr.items === undefined) || (arr.length == 0);
    }

    function BuyListController(ShoppingListService) {
        var buyListCtrl = this;

        buyListCtrl.items = function() {
          return ShoppingListService.buyItems();
        }

        buyListCtrl.isEmpty = function() {
          return isEmpty(buyListCtrl.items());
        }

        buyListCtrl.bought = function(index) {
          ShoppingListService.bought(index);
        }
    }

    function BoughtListController(ShoppingListService) {
        var boughtListCtrl = this;

        boughtListCtrl.items = function() {
          return ShoppingListService.boughtItems();
        }

        boughtListCtrl.isEmpty = function() {
          return isEmpty(boughtListCtrl.items());
        }
    }

    function ShoppingListService() {
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
