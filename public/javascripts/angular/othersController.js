var app=angular.module('othersApp', []);
app.controller('othersController',function($scope,$http) {
	console.log("Inside othersController");
	$scope.showFlag=false;
	$scope.now = false;
	$scope.init = function() {
		console.log("Inside init");
		$scope.search();
	}
	$scope.follow = function() {
		console.log("Inside follow");
		$scope.now=true;
		$http({
	        method : "GET",
	        url : "/others/insertFollowing"
	    }).success(function(data){
	    });
	    $scope.countTweets();
		$scope.countFollowers();
		$scope.countFollowing();
	}
	$scope.following = function() {
		console.log("Inside following");
		$scope.now = false;
	}
	$scope.search = function() {
		console.log("Inside searchUser");
		$http({
	        method : "GET",
	        url : "/others/search"
		}).success(function(data){
	    	if(data.length > 0){
	    		console.log("search");
	    		$scope.searchText=data[0].searchText;
	    		$scope.fullName=data[0].followingId;
	    		$scope.fullName=data[0].fullName;
	    		$scope.userHandler=data[0].userHandler;
	    		$scope.birthDate=data[0].birthDate;
	    		$scope.location=data[0].location;
    			$scope.showFlag=true;
	    	}
	    });
	}
	$scope.countTweets = function() {
		console.log("Inside countTweets");
		$http({
	        method : "GET",
	        url : "/others/tweetsCount"
	    }).success(function(data){
	    	if(data.length > 0){
	    		$scope.totalTweets=data[0].Tweets;
	    	}
	    });
	}
	$scope.countFollowers = function() {
		console.log("Inside countFollowers");
		$http({
	        method : "GET",
	        url : "/others/followersCount"
	    }).success(function(data){
	    	if(data.length > 0){
	    		$scope.totalFollowers=data[0].Followers;
	    	}
	    });
	}
	$scope.countFollowing = function() {
		console.log("Inside countFollowing");
		$http({
	        method : "GET",
	        url : "/others/followingCount"
	    }).success(function(data){
	    	if(data.length > 0){
	    		$scope.totalFollowing=data[0].Following;
	    	}
	    });
	}
});