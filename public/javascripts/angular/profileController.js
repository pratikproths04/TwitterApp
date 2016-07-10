var app=angular.module('profileApp', []);
app.controller('profileController',function($scope,$http) {
	console.log("Inside profileController");
	$scope.show = false;
	$scope.showFlag=false;
	$scope.now = false;
	$scope.edit = function() {
		console.log("Inside edit");
		$scope.show=true;
		$scope.now=true;
	}
	$scope.save = function() {
		console.log("Inside save");
		$scope.show = false;
		$scope.now = false;
	}
	$scope.search = function() {
		console.log("Inside searchHash");
		$http({
	        method : "GET",
	        url : "/profile/search"
		}).success(function(data){
	    	if(data.length > 0){
	    		console.log("search");	    		
    			$scope.fullName=data[0].fullName;
    			$scope.UserId=data[0].userHandler;
    			$scope.searchTxt=data[0].searchText;
    			$scope.showFlag=true;
	    	}
	    });
	}
	$scope.following = function() {
		console.log("Inside following");
		$scope.show = false;
		$scope.now = false;
	}
	$scope.follow = function() {
		console.log("Inside follow");
		$scope.show=true;
		$scope.now=true;
	}
	$scope.init = function() {
		console.log("Inside init");
		$scope.fetchUserDetails();
		$scope.countTweets();
		$scope.countFollowers();
		$scope.countFollowing();
		$scope.search();
	}
	$scope.fetchUserDetails = function() {
		console.log("Inside fetchUserDetails");
		$http({
	        method : "GET",
	        url : "/profile/fetchUser"  
	    }).success(function(data){
	    	if(data.length > 0){
	    		console.log("");
    			$scope.name = data[0].FirstName+" "+data[0].LastName;
    			$scope.userHandler = "@"+data[0].UserHandler;
    			$scope.birthDate = data[0].BirthDate;
    			$scope.location = data[0].Location;
	    	}
	    });
	}
	$scope.countTweets = function() {
		console.log("Inside countTweets");
		$http({
	        method : "GET",
	        url : "/profile/tweetsCount"
	    }).success(function(data){
	    	if(data.length > 0){
	    		console.log("");
	    		$scope.totalTweets=data[0].Tweets;
	    	}
	    });
	}
	$scope.countFollowers = function() {
		console.log("Inside countFollowers");
		$http({
	        method : "GET",
	        url : "/profile/followersCount"
	    }).success(function(data){
	    	if(data.length > 0){
	    		console.log("");
	    		$scope.totalFollowers=data[0].Followers;
	    	}
	    });
	}
	$scope.countFollowing = function() {
		console.log("Inside countFollowing");
		$http({
	        method : "GET",
	        url : "/profile/followingCount"
	    }).success(function(data){
	    	if(data.length > 0){
	    		console.log("countFollowing");
	    		$scope.totalFollowing=data[0].Following;
	    	}
	    });
	}
	$scope.getTweetsList = function() {
		console.log("Inside getTweetsList");
		
		$http({
	        method : "GET",
	        url : "/profile/tweetsList"
		 }).success(function(data){
			 if(data.length > 0){
				 console.log("getTweetsList");
				 $scope.tweetList=data;
			 }
		 });
	}
	$scope.getFollowingList = function() {
		console.log("Inside getFollowingList");
		$scope.following=false;
        $scope.followers=true;
        $scope.tweets=true;
		$http({
	        method : "GET",
	        url : "/profile/followingList"
		 }).success(function(data){
			 if(data.length > 0){
				 console.log("getFollowingList");
				 $scope.followingList=data;
			 }
		 });
	}
	$scope.getFollowersList = function() {
		console.log("Inside getFollowersList");
		$scope.following=true;
        $scope.followers=false;
        $scope.tweets=true;
		$http({
	        method : "GET",
	        url : "/profile/followersList"
		 }).success(function(data){
			 if(data.length > 0){
				 console.log("getFollowersList");
				 $scope.followersList=data;
			 }
		 });
	}
});