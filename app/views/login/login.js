'use strict';

angular.module('app.login', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/login', {
      templateUrl: 'views/login/login.html',
      controller: 'LoginController'
    });
  }])

  .controller('LoginController', ['$scope', '$http', '$location', 'authService', 'envService', function ($scope, $http, $location, authService, envService) {


    $scope.attemptLogin = function () {
      $scope.user.userType = "teacher";
      $http.post('http:' + envService.read('apiUrl') + '/authenticate', $scope.user).then(authSuccess, authFailed);
    };

    function authSuccess(response) {
      authService.login(response.data.token);
      $location.path('/class-list');

    }

    function authFailed(response) {
      if (response.status == 403) {
        $scope.isLoginAuthFail = true;
      }
      else {
        $scope.isLoginError = true
      }
    }

  }]);