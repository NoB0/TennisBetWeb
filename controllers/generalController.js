var app = angular.module('tennisBet',[]);

app.controller('generalController', ['$scope', '$http',function($scope, $http) {    
    $scope.runInterval = true;

    // TO CHANGE

    $scope.previousMatchs = [];
    var flag = false;

    vm = this;

    vm.checkSets = function (manches, previousManches, joueur1, joueur2) {
    	if (manches[0] != previousManches[0]) {
    		var str = "MANCHE GAGNÉE PAR " + joueur1.prenom + " " + joueur1.nom + "\n"
    					+ "New score : " + manches[0] + " - " + manches[1] + "\n"
    						+ "Old score : " + previousManches[0] + " - " + previousManches[1]
    		
    		alert(str);
    		return true;
    	} else if (manches[1] != previousManches[1]) {
    		
    		var str = "MANCHE GAGNÉE PAR " + joueur2.prenom + " " + joueur2.nom + "\n"
    					+ "New score : " + manches[0] + " - " + manches[1] + "\n"
    						+ "Old score : " + previousManches[0] + " - " + previousManches[1]
    		
    		alert(str);

    		return true;
    	}
    	return false;
    }

    vm.checkContestations = function (constestation, previousconstestation, joueur1, joueur2) {
    	if (constestation[0] != previousconstestation[0]) {
    		var str = "CONTESTATION PAR " + joueur1.prenom + " " + joueur1.nom;
    		alert(str);
    		return true;
    	} else if (constestation[1] != previousconstestation[1]) {
    		
    		var str = "CONTESTATION PAR " + joueur2.prenom + " " + joueur2.nom;
    		alert(str);

    		return true;
    	}
    	return false;
    }

    vm.checkMatchs = function (matchs, previousMatchs) {

    	for (i = 0; i < matchs.length; i++) {
	    	vm.checkSets(matchs[i].points.manches, 
	    					previousMatchs[i].points.manches, 
	    						matchs[i].joueur1, 
	    							matchs[i].joueur2);
	    	vm.checkContestations(matchs[i].contests, 
	    								previousMatchs[i].contests, 
	    									matchs[i].joueur1, 
	    										matchs[i].joueur2);
		}
		
    }


    //END TO CHANGE

	vm.fetchParties = function() {

		console.log("Fetching Data from server...");
    	$http({
	        method : "GET",
	        url : "https://localhost:8000/parties"
	    }).then(function mySuccess(response) {
	    	//console.log(response.data);
	        $scope.matchs = createMatchs(response.data);

	       	console.log("$scope.matchs");
	        console.log($scope.matchs);
	        console.log("$scope.previousMatchs");
	        console.log($scope.previousMatchs);

	        try {
	        	vm.checkMatchs($scope.matchs, $scope.previousMatchs);
	        	console.log("normal assign");
	        	$scope.previousMatchs = $scope.matchs;
	        } catch(e) {
	        	console.log(e);
	        	console.log("1st assign");
	        	$scope.previousMatchs = $scope.matchs;
	        }
	    }, function myError(response) {
			console.log(response.statusText);
		})
    };

    vm.fetchParties();


    setInterval(function () {
    	if($scope.runInterval){
		    vm.fetchParties();
	    }
	}, 2500);


    $scope.refresh = function(){
    	vm.fetchParties();
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