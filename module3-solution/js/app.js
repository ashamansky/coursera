(function() {
  'use strict';
  angular.module('NarrowItDownApp',[])
  .controller('NarrowItDownController', NarrowItDownController)
  .directive('foundItems', FoundItemsDirective)
  .service('MenuSearchService', MenuSearchService)
  .constant('ApiServerUrl', 'https://davids-restaurant.herokuapp.com/');

  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'templates/foundItemsTemplate.html',
      scope: {
        items: '<',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'list',
      bindToController: true,
      link: FoundItemsDirectiveLink
    };
    return ddo;
  }

  function FoundItemsDirectiveController() {
    var list = this;

    list.isEmpty = function() {
      return (list.items == 'undefinded' || list.items.length === 0);
    }
  }

  function FoundItemsDirectiveLink(scope, element, attrs, controller) {
      scope.$watch('list.isEmpty()', function(newValue, oldValue){
          if(newValue === true) {
            displayNoResultsMessage();
          } else {
            hideNoResultsMessage();
          }
      });

      function displayNoResultsMessage() {
        var messageElement = element.find("span.error");
        messageElement.slideDown(900);
      }

      function hideNoResultsMessage() {
        var messageElement = element.find("span.error");
        messageElement.slideUp(900);
      }


  }


  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var searchCtrl = this;

    searchCtrl.itemName = "";
    searchCtrl.items = [];
    searchCtrl.getMatchedItems = function() {
      MenuSearchService.getMatchedMenuItems(searchCtrl.itemName)
      .then(function(response) {
        searchCtrl.items = response.items;
      } )
      .catch(function(error) {
        console.log(error);
      })
    };

    searchCtrl.removeItem = function(itemIndex) {
      searchCtrl.items.splice(itemIndex, 1);
    }
  };


  MenuSearchService.$inject = ['$http', '$q', 'ApiServerUrl'];
  function MenuSearchService($http, $q, ApiServerUrl) {
    var service = this;

    service.items = [];

    service.getMatchedMenuItems = function(searchTerm) {
      var deferred = $q.defer();
      $http({
        method: "GET",
        url: (ApiServerUrl + "/menu_items.json")
      })
      .success(function (data) {
        var fetchedItems = data.menu_items;
        var result = [];
            for(var i = 0; i < fetchedItems.length; i++) {
              var description = fetchedItems[i].description;
              var position = description.toLowerCase().indexOf(searchTerm.toLowerCase());
              if ( position !== -1) {
                result.push(fetchedItems[i]);
              }
            }
        deferred.resolve({
          "items" : result
        })
      })
      .error(function(msg, code) {
        deferred.reject(msg);
      });

      return deferred.promise;
    };
  }

})();
