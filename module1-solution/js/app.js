(function() {
  angular
    .module("MyApp",[])
    .controller("LunchCheckController", LunchCheckController);

    LunchCheckController.$inject = ["$scope"];

    function LunchCheckController($scope) {
      $scope.menuSize = 3;
      $scope.message = "";
      $scope.menu = "";
      $scope.messagetype = "default"

        $scope.checkLunch = function() {
          var menuList = $scope.menu.split(',');
          var counter = 0;
          for(var i = 0; i < menuList.length; i++) {
            if (menuList[i].trim().length > 0) {
              counter++;
            }
          }
          var message = "Please enter data first";
          if (counter > $scope.menuSize) {
            message = "Too much!";
            $scope.messagetype = "toomuch";
          } else if (counter > 0) {
            message = "Enjoy!";
            $scope.messagetype = "enjoy";
          } else {
            $scope.messagetype = "default";
          }
          $scope.message = message;
        }
    };
})();
