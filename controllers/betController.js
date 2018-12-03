app.controller('betController', ['$rootScope', '$scope', '$http', function($rootScope, $scope, $http) {
	$scope.bets = [];
	$scope.idMatch = null;
	$scope.idPlayer = null; 

	$scope.$on('bet-clicked', function(event, args) {
    	$scope.idMatch = args.id.idMatch;
	});

	function betRequest (bet) {
    	console.log("request bet : POST");
	    $http({
	        method: "POST",
	        url: "https://localhost:8000/parties/pari",		//127.0.0.1
	        headers: {
			    'Accept': 'application/json',
			    'Content-Type': 'application/json',
			},
	        params: bet
	    }).then(function mySuccess(response) {
	        document.getElementById("bet-alert").innerHTML = "You bet $" + bet.bet_amount;

	    }, function myError(response) {
			console.log(response.statusText);
	    })
	}

    $scope.postBet = function (betInfos){
		if(betInfos.player1){
			$scope.idPlayer = 0;
		}else {
			$scope.idPlayer = 1;
		}
		var bet = new Bet(parseInt($scope.idMatch), $scope.idPlayer, betInfos.amount);
		$scope.bets.push(bet);
		console.log($scope.bets);

		betRequest(bet);

		$rootScope.$broadcast('modal-bet');
	};

	$scope.cancelBet = function (){
		$rootScope.$broadcast('modal-bet');
	};
	
}]);