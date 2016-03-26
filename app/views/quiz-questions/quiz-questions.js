'use strict';

angular.module('app.quiz-questions', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/quiz-questions/:quizId', {
      templateUrl: 'views/quiz-questions/quiz-questions.html',
      controller: 'QuizQuestionsController'
    });
  }])

  .controller('QuizQuestionsController', [
    '$routeParams',
    '$location',
    '$scope',
    '$http',
    'authService',
    'envService',
    function ($routeParams, $location, $scope, $http, authService, envService) {
      var teacherId = authService.getTokenUser().username;
      var quizId = $routeParams.quizId;

      getQuiz();
      getQuestions();
      getAllQuestions();

      $scope.models = {
        selected: null,
        lists: {
          "currentQuestions": $scope.questions,
          "availableQuestions": $scope.allQuestions
        }
      };

      $scope.listHeadings = ["Questions In Quiz", "Available Questions"];



      function getQuiz() {
        $http
          .get('http:' + envService.read('apiUrl') + '/quizzes/' + quizId, {
            headers: authService.getAPITokenHeader()
          }).then(success, fail);

        function success(response) {
          $scope.quiz = response.data;
          console.log('retrieved successfully');
        }

        function fail(response) {
          console.log(response.data);
          console.log('retrieved fail');
        }
      }

      function getAllQuestions(){
        $http
          .get('http:' + envService.read('apiUrl') + '/questions/', {
            headers: authService.getAPITokenHeader()
          }).then(success, fail);

        function success(response) {
          $scope.allQuestions = response.data;
          console.log(response);
          console.log('retrieved successfully');
          $scope.models.lists.availableQuestions = $scope.allQuestions;
          console.log($scope.models.lists);
          console.log($scope.models.availableQuestions.length);
        }

        function fail(response) {
          if (response.status == 404) {
            $scope.allQuestions = {};
          }
          console.log(response.data);
          console.log('retrieved fail');
        }
      }

      function getQuestions() {
        $http
          .get('http:' + envService.read('apiUrl') + '/quizzes/' + quizId + '/questions', {
            headers: authService.getAPITokenHeader()
          }).then(success, fail);

        function success(response) {
          $scope.questions = response.data;
          console.log(response);
          console.log('retrieved successfully');
          $scope.models.lists.currentQuestions = $scope.questions;
        }

        function fail(response) {
          if (response.status == 404) {
            $scope.questions = {};
          }
          console.log(response.data);
          console.log('retrieved fail');
        }
      }

      /*
      $scope.addStudentBtnClick = function () {
        $scope.action = 'Add';
        $('#modifyStudentModal').modal('show');
        $scope.student = {};
      };

      $scope.editStudentBtnClick = function (toEdit) {
        //console.log('edit student ' + toEdit.username);
        // ensure editing a copy of the object so model in view behind modal doesn't update until save
        $scope.student = angular.copy(toEdit);
        //console.log($scope.student);
        $scope.action = "Edit";
        $('#modifyStudentModal').modal('show');
      };

      $scope.modifyStudentDoneBtnClick = function () {
        console.log($scope.action + ' done click');
        console.log($scope.student);
        // $scope.class.TeacherUsername = teacherId;
        if ($scope.action == 'Add') {
          //add
          $http
            .post('http:' + envService.read('apiUrl') + '/classes/' + classId + '/questions', $scope.student, {
              headers: authService.getAPITokenHeader()
            }).then(studentModifySuccess, studentModifyFailure);
        }
        else {
          //edit
          $http
            .put('http:' + envService.read('apiUrl') + '/classes/' + classId + '/questions/' + $scope.student.username, $scope.student, {
              headers: authService.getAPITokenHeader()
            }).then(studentModifySuccess, studentModifyFailure);
        }
      };

      function studentModifyFailure(response) {
        console.error(response);
        showFailMsg();
      }

      function studentModifySuccess(response) {
        // console.log('student ' + $scope.action + 'ed successfully');
        //console.log(response);
        //console.log($scope.student);

        getQuestions();
        $('#modifyStudentModal').modal('hide');
        showSuccessMsg();
      }

      $scope.deleteStudentBtnClick = function (idToDelete) {
        if (confirm("Are you sure you want to delete the student? This cannot be undone")) {
          $scope.action = "Delete";
          //   console.log('delete student ' + idToDelete);
          $http
            .delete('http:' + envService.read('apiUrl') + '/classes/' + classId + '/questions/' + idToDelete, {
              headers: authService.getAPITokenHeader()
            }).then(studentModifySuccess, studentModifyFailure);
        }
      };

      function showSuccessMsg() {
        $('#updateSuccessAlert').show();
        setTimeout(function () {
          $('#updateSuccessAlert').fadeOut();
        }, 7000);
      }

      function showFailMsg() {
        $('#updateFailAlert').show();
        setTimeout(function () {
          $('#updateFailAlert').fadeOut();
        }, 7000);
      }
      */
      $scope.backBtnClick = function () {
        $location.path('/quiz-list');
      }

    }]);