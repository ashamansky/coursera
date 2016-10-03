(function(){
  'use strict';
  angular.module('data')
          .service("MenuDataService", MenuDataService)
          .constant("ServerURL", " https://davids-restaurant.herokuapp.com");

  MenuDataService.$inject = ["$http", "ServerURL", "$q"];

  function MenuDataService($http, ServerURL) {
    var service = this;

    service.getAllCategories = function(){
     return  $http({
          method: "GET",
          url: (ServerURL + "/categories.json")
        });
    };

    service.getItemsForCategory = function(categoryShortName) {
      return  $http({
          method: "GET",
          url: (ServerURL + "/menu_items.json?category=" + categoryShortName)
        });
    };
  }

})();
