(function(){
  'use strict';
  
  angular.module('MenuApp')
  .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider

    .state('home', {
      url: '/',
      templateUrl: 'templates/home.template.html'
    })

    .state('categories', {
      url: '/categories',
      templateUrl: 'templates/categories-template.html',
      controller: 'CategoriesController as categoryList',
      resolve: {
        items: ['MenuDataService', function(MenuDataService) {
          return MenuDataService.getAllCategories();
        }]
      }
    })

    .state('items', {
      url: '/items/{shortName}',
      templateUrl: 'templates/items-template.html',
      controller: 'ItemListController as itemList',
      resolve: {
        items: ['MenuDataService', '$stateParams', function(MenuDataService, $stateParams) {
          return MenuDataService.getItemsForCategory($stateParams.shortName);
        }

        ]
      }
    })
    ;
  }

})();
