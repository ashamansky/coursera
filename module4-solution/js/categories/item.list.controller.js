(function(){
  'use strict';

  angular.module('MenuApp')
  .controller('ItemListController', ItemListController);

  // ItemListController.$inject = ['$stateParams', 'MenuDataService'];
  ItemListController.$inject = ['items']

  function ItemListController(items) {
    var itemList = this;
    var data = items.data;

    itemList.items = data.menu_items;
    itemList.category = data.category;
  }


})();
