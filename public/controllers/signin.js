wikiApp.controller("signinController", function($scope, $http) {
  // Controller for signin view
  $scope.signin = () => {
    
    // login object
    var loginInfo = {
      email: $scope.email,
      password: $scope.password
    };

    console.log($scope.userName);
    console.log($scope.password);

    //Ajax call to our login endpoint
    $http.post("/api/signin", loginInfo).then(function(result) {
      localStorage.setItem("jwt", result.data.jwt);
      window.location = "#!/post";
    }).catch(function(result) {
      $scope.status = result.data;
    })

  }

});