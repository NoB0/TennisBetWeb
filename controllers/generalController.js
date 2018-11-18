var app = angular.module('tennisBet',[]);

app.controller('generalController', ['$scope', '$http',function($scope, $http) {    
    $scope.runInterval = true;

    //Make the request every 5s
    setInterval(function () {
    	if($scope.runInterval){
		    $http({
		        method : "GET",
		        url : "http://127.0.0.1:3000/parties"
		    }).then(function mySuccess(response) {
		        $scope.matchs = response.data;
		    }, function myError(response) {
				console.log(response.statusText);
			})
	    }
	}, 5000);

	$scope.showElement = function (isShown){
		return !isShown;
	};

	$scope.$on('bet-clicked', function(event, args) {
    	$scope.runInterval = false;	
    });

    $scope.$on('modal-bet', function(event, args) {
    	$scope.runInterval = true;	
    });
}]);