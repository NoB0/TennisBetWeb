var app = angular.module('tennisBet',[]);

app.controller('generalController', ['$scope', '$http',function($scope, $http) {    
    $scope.runInterval = true;

    //Make the request every 5s
    setInterval(function () {
    	if($scope.runInterval){
		    $http({
		        method : "GET",
		        url : "https://localhost:8000/parties"							//127.0.0.1
		    }).then(function mySuccess(response) {
		        $scope.matchs = createMatchs(response.data);
		    }, function myError(response) {
				console.log(response.statusText);
			})
	    }
	}, 5000);

    $scope.refresh = function(){
    	$http({
	        method : "GET",
	        url : "https://localhost:8000/parties"							//127.0.0.1
	    }).then(function mySuccess(response) {
	        $scope.matchs = createMatchs(response.data);
	    }, function myError(response) {
			console.log(response.statusText);
		})
    }

	$scope.showElement = function (isShown){
		return !isShown;
	};

	$scope.$on('bet-clicked', function(event, args) {
    	$scope.runInterval = false;	
    });

    $scope.$on('modal-bet', function(event, args) {
    	$scope.runInterval = true;	
    });

    function createMatchs (listMatchs) {
    	var i
    	var match = [];
		for (i = 0; i < listMatchs.length; i++) { 
		    m = new Match (listMatchs[i].joueur1, listMatchs[i].joueur2, listMatchs[i].terrain, 
		    	listMatchs[i].tournoi, listMatchs[i].heure_debut, listMatchs[i].pointage,
		    	listMatchs[i].temps_partie, listMatchs[i].serveur, listMatchs[i].vitesse_dernier_service,
		    	listMatchs[i].nombre_coup_dernier_echange, listMatchs[i].constestation);
		    match.push(m);
		}
		return match;
    }
}]);