var app=angular.module('showApp', []);
app.controller('showController',function($scope,$http) {
	console.log("Inside showController");
	$scope.showFlag=false;
	$scope.init = function() {
		console.log("Inside init");
		$scope.search();
	}
	$scope.search = function() {
		console.log("Inside searchHash");
		$http({
	        method : "GET",
	        url : "/show/search"
		}).success(function(data){
	    	if(data.length > 0){
	    		console.log("search");
	    		$scope.searchText=data[data.length-2].searchText;
	    		console.log("data.searchText"+data[data.length-2].searchText);
	    		$scope.rows = data.slice(0, -1);	
    			$scope.showFlag=true;
	    	}
	    });
	}
});