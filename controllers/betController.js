app.controller('betController', ['$rootScope', '$scope', '$http', function($rootScope, $scope, $http) {
	$scope.idBet = 0;
	$scope.bets = [];
	$scope.idMatch = null;
	$scope.idPlayer = null; 

	$scope.$on('bet-clicked', function(event, args) {
    	$scope.idMatch = args.id.idMatch;
	});

	function bet (idMatch, idPlayer, amount) {
    	console.log("request bet : POST");
    	var data = { "id_match": parseInt(idMatch), "id_player": idPlayer, "bet_amount": amount };
	    $http({
	        method : "POST",
	        url : "https://localhost:8000/parties/pari",		//127.0.0.1
	        params : data
	    }).then(function mySuccess(response) {
	        console.log("POST SUCCESSED");
	    }, function myError(response) {
			console.log(response.statusText);
	    })
	}

	function addBet (idMatch, idPlayer, amount) {
		var bet = { 'id': $scope.idBet, 'id_match': idMatch, 'id_player': idPlayer, 'bet_amount': amount };
		$scope.idBet=$scope.idBet + 1;
        $scope.bets.push(bet);
    }

    $scope.postBet = function (betInfos){
		if(betInfos.player1){
			$scope.idPlayer = 0;
		}else {
			$scope.idPlayer = 1;
		}
		addBet($scope.idMatch, $scope.idPlayer, betInfos.amount);
		console.log($scope.bets);
		bet($scope.idMatch, $scope.idPlayer, betInfos.amount);

		$rootScope.$broadcast('modal-bet');
	};

	$scope.cancelBet = function (){
		$rootScope.$broadcast('modal-bet');
	};
}]);