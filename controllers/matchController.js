app.controller('matchController', ['$rootScope', '$scope', '$http', function($rootScope, $scope, $http) {
	$scope.div_=[]; 

	$scope.$on('match-clicked', function(event, args) {
		if($scope.div_[args.id.idMatch] == undefined){
			$scope.div_[args.id.idMatch] = false;
		}
    	console.log("event received");
    	console.log("ID : ", args.id);
    	$scope.div_[args.id.idMatch] = $scope.showElement($scope.div_[args.id.idMatch]);
	});

	$scope.betClicked = function(evt) {
		var idMatch = evt.target.id;
    	$rootScope.$broadcast('bet-clicked', { id: {idMatch} });
	}

	$scope.score = function(points) {
		switch (points){
            case 0 :
                return 0;
            case 1 :
                return 15;
            case 2 :
                return 30;
            case 3 :
                return 40;
            default :
                return 0;
        }
	}

	$scope.time = function(t){
		var hours = Math.floor(t / 3600);
        var minutes = Math.floor((t % 3600) / 60);
        var seconds = t - minutes * 60 - hours * 3600;

        return hours + "h " + minutes + "min " + seconds + "s";
	}




}]);