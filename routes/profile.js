var mysql = require('./mysql');

function goToProfilePage(req,res){
    //Checks before redirecting whether the session is valid
    if(req.session.userId)
    {
        //Set these headers to notify the browser not to maintain any cache for the page being loaded
        res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        res.render("profilePage",{userId:req.session.userId});
    }
    else
    {
        res.redirect('/');
    }
}

function fetchUserData(req,res) {
	console.log("In fetchUserData");
    var sqlQuery = "select * from userdetails where UserId =" + req.session.userId;
    mysql.fetchOperation(function (err, results) {
        if (err) {
            throw err;
        } else {
            if (results.length > 0) {
                res.send(results);
            } else {
                results = {"statusCode": 401};
            }
        }
    }, sqlQuery);
}

function fetchTweetsList(req,res) {
	console.log("In fetchTweetsList");
	 var sqlQuery = "SELECT t.TweetMessage as tMsg, concat(u.FirstName,' ',u.LastName) as fullName, u.UserHandler as uHandler " +
	 		"FROM tweetdetails t inner join userdetails u ON  t.UserId=u.UserId where t.UserId= "+req.session.userId;
	 mysql.fetchOperation(function (err, results) {
        if (err) {
            throw err;
        } else {
            if (results.length > 0) {
                res.send(results);
            } else {
                results = {"statusCode": 401};
            }
        }
    }, sqlQuery);
}

function fetchFollowingList(req,res) {
	console.log("In fetchFollowingList");
    var sqlQuery = "SELECT concat(FirstName,' ',LastName) as fullName, UserHandler as uHandler FROM userdetails" +
    		" where UserId IN (select FollowingId from usermapping where UserId= "+req.session.userId+")";
    mysql.fetchOperation(function (err, results) {
        if (err) {
            throw err;
        } else {
            if (results.length > 0) {
                res.send(results);
            } else {
                results = {"statusCode": 401};
            }
        }
    }, sqlQuery);
}

function fetchFollowersList(req,res) {
	console.log("In fetchFollowersList");
	var sqlQuery = "SELECT concat(FirstName,' ',LastName) as fullName, UserHandler as uHandler FROM userdetails" +
	" where UserId IN (select UserId from usermapping where FollowingId= "+req.session.userId+")";
    mysql.fetchOperation(function (err, results) {
        if (err) {
            throw err;
        } else {
            if (results.length > 0) {
                res.send(results);
            } else {
                results = {"statusCode": 401};
            }
        }
    }, sqlQuery);
}

function getFollowingCount(req,res){
	console.log("In getFollowingCount");
    var sqlQuery="select count(*) as Following from usermapping where UserId="+req.session.userId;
    mysql.fetchOperation(function(err,results){
        if(err){
            throw err;
        }else{
            if(results.length>0){
                res.send(results);
            }else{
                results={"statusCode":401};
                }
            }
        },sqlQuery);
}


function getFollowersCount(req,res){
	console.log("In getFollowersCount");
    var sqlQuery="select count(*) as Followers from usermapping where FollowingId="+req.session.userId;
    mysql.fetchOperation(function(err,results){
        if(err){
            throw err;
        }else{
            if(results.length>0){
                res.send(results);
            }else{
                results={"statusCode":401};
            }
        }
    },sqlQuery);
}

function getTweetsCount(req,res){
	console.log("In getTweetsCount");
	var sqlQuery="select count(*) as Tweets from tweetdetails where UserId="+req.session.userId;
    mysql.fetchOperation(function(err,results){
    if(err){
        throw err;
    }else{
        if(results.length>0){
            res.send(results);
        }else{
            results={"statusCode":401};
            }
        }
    },sqlQuery);
}

exports.fetchUserData=fetchUserData;
exports.goToProfilePage=goToProfilePage;
exports.getTweetsCount=getTweetsCount;
exports.getFollowingCount=getFollowingCount;
exports.getFollowersCount=getFollowersCount;
exports.fetchTweetsList=fetchTweetsList;
exports.fetchFollowersList=fetchFollowersList;
exports.fetchFollowingList=fetchFollowingList;