var app = angular.module('tennisBet',[]);

app.controller('generalController', ['$scope', '$http',function($scope, $http) {    
    $scope.runInterval = true;
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

    vm.checkMatchs = function (matchs, previousMatchs) {

    	for (i = 0; i < matchs.length; i++) {
	    	vm.checkSets(matchs[i].pointage.manches, 
	    					previousMatchs[i].pointage.manches, 
	    						matchs[i].joueur1, 
	    							matchs[i].joueur2);
		}
		
    }


    vm.fetchParties = function() {
		console.log("Fetching Data from server...");
    	$http({
	        method : "GET",
	        url : "https://localhost:8000/parties"
	    }).then(function mySuccess(response) {
	    	//console.log(response.data);
	        $scope.matchs = response.data;

	       	/*console.log("$scope.matchs");
	        console.log($scope.matchs);
	        console.log("$scope.previousMatchs");
	        console.log($scope.previousMatchs);*/

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

	$scope.showElement = function (isShown){
		return !isShown;
	};

	$scope.$on('bet-clicked', function(event, args) {
    	$scope.runInterval = false;	
    });

    $scope.$on('modal-bet', function(event, args) {
    	$scope.runInterval = true;	
    });

    $scope.refresh = function(){
    	$http({
	        method : "GET",
	        url : "https://localhost:8000/parties"							//127.0.0.1
	    }).then(function mySuccess(response) {
	        $scope.matchs = response.data;

	        console.log("$scope.matchs");
	        console.log($scope.matchs);
	        console.log("$scope.previousMatchs");
	        console.log($scope.previousMatchs);

	        $scope.previousMatchs = $scope.matchs;
	    }, function myError(response) {
			console.log(response.statusText);
		})
    }

}]);