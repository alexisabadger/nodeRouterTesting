wikiApp.controller("registerController", function($scope, $http) {
  // Controller for registration view

  $scope.register = () => {
    // register object
    alert('register called');
    var regInfo = {
      fullName: $scope.fullName,
      userName: $scope.userName,
      email: $scope.email,
      password: $scope.password
    };

    console.log($scope.fullName);
    console.log($scope.userName);
    console.log($scope.password);
    // Ajax call

    $http.post("/api/register", regInfo)
      .then(function(result) {
        $scope.status = "Successfully Registered!"
      }).catch(function(result) {
        $scope.status = result.data;
      })
  }

});