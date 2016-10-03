(function(){
  'use strict';
  angular.module("MenuApp")
    .component("categories", {
      templateUrl: 'templates/category-template.html',
      bindings: {
        items: '<'
      }
    });

})();
