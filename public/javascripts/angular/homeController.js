var app=angular.module('homeApp', []);
app.controller('homeController',function($scope,$http) {
	console.log("Inside homeController");
	$scope.search = function() {
		console.log("Inside searchHash");
		$http({
	        method : "POST",
	        data :{
	            "searchText" : $scope.searchText
	        },
	        url : "/home/search"
	    }).success(function(data){
	    	console.log("data-->"+data);
	    	if(data.length > 0){
	    		if (data.statusCode === 401) {
	    			console.log("Error !!");
	            } else {
	                console.log("searchHash");
	                if($scope.searchText.indexOf('@') == -1)
	                {
	                	window.location.assign("/home/showDataPage");
	                }
	                else{
	                	window.location.assign("/home/showOtherProfile");
	                }
	            }
	    	}
	    });
	}
	$scope.insertTweet = function() {
		console.log("Inside insertTweet");
		$http({
	        method : "POST",
	        data :{
	            "tweetMessage" : $scope.tweetMessage
	        },
	        url : "/home/tweetInsert"
	    });
	}
	$scope.retweet = function(retweetMessage) {
		console.log("Inside reTweet");
		$http({
	        method : "POST",
	        data :{
	            "retweetMessage" : retweetMessage
	        },
	        url : "/home/retweeted"
	    });
	}
	$scope.init = function() {
		console.log("Inside init");
		$scope.fetchUserDetails();
		$scope.fetchTweets();
		$scope.countTweets();
		$scope.countFollowers();
		$scope.countFollowing();
	}
	$scope.fetchUserDetails = function() {
		console.log("Inside fetchUserDetails");
		$http({
	        method : "GET",
	        url : "/home/fetchUser"  
	    }).success(function(data){
	    	if(data.length > 0){
    			$scope.name = data[0].FirstName+" "+data[0].LastName;
    			$scope.userHandler = "@"+data[0].UserHandler;
	    	}
	    });
	}
	$scope.fetchTweets = function() {
		console.log("Inside fetchTweets");
		$http({
	        method : "GET",
	        url : "/home/tweetsFetch"  
	    }).success(function(data){
	    	if(data.length > 0){
    			$scope.allTweetsRelated=data;
	    	}
	    });
	}
	/*$scope.checkRetweets = function(retweetuser, retweetMessage) {
		console.log("Inside checkTweets");
		$http({
	        method : "POST",
	        data :{
	            "retweetMessage" : retweetMessage
	        },
	        url : "/home/retweetsCheck"
	    }).success(function(data){
	    	console.log("checkRetweets data-->"+data);
	    	if(data.length > 0){
	    		if (data.statusCode === 401) {
	    			console.log("Error !!");
	            } else {
	                console.log("retweetsCheck");
	                if((retweetuser==null || retweetuser=='' || retweetuser=='null') && (retweetuser=="'"+data[0].UserId+"'")) {
	        	        return true;
	        	    }else {
	        	        return false;
	        	    }
	            }
	    	}
	    });
	}*/
	$scope.countTweets = function() {
		console.log("Inside countTweets");
		$http({
	        method : "GET",
	        url : "/home/tweetsCount"
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
	        url : "/home/followersCount"
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
	        url : "/home/followingCount"
	    }).success(function(data){
	    	if(data.length > 0){
	    		$scope.totalFollowing=data[0].Following;
	    	}
	    });
	}
});