var mysql = require('./mysql');

function fetchSearch(req,res){
	console.log("In fetchSearch");
	var searchText = req.session.searchText;
	searchText = searchText.substr(1);
	console.log("searchText"+searchText);
    var sqlQuery = "SELECT UserId as followingId, concat(FirstName,' ',LastName) as fullName, UserHandler as userHandler, BirthDate as birthDate, Location as location from userdetails where FirstName LIKE '"+searchText+"%' " +
    	    "or LastName LIKE '"+searchText+"%'";
	console.log(sqlQuery);
    mysql.fetchOperation(function (err, results) {
        if (err) {
            throw err;
        } else {
            if (results.length > 0) {
            	console.log("results"+results);
            	req.session.followingId = results[0].followingId;
            	results.push('"searchText": "'+req.session.searchText+'"');
                res.send(results);
            } else {
                results = {"statusCode": 401};
            }
        }
    }, sqlQuery);
}

function insertFollowingDetails(req,res){
	console.log("In insertFollowingDetails");
    var sqlQuery = "Insert into usermapping(`UserId`,`FollowingId`) VALUES ("+parseInt(req.session.userId)+", "+parseInt(req.session.followingId)+")";
    console.log(sqlQuery);
    mysql.insertOperation(function(err){
        var result;
        if(err){
            result = {"statusCode" : 401};
            console.log("Error while inserting data");
            res.send(result);
        }else{
            result = {"statusCode" : 200};
            console.log("Data inserted successfully");
            res.send(result);
        }
    },sqlQuery);
}

function getTweetsCount(req,res){
	console.log("In getTweetsCount");
	var sqlQuery="select count(TweetMessage) as Tweets from tweetdetails where UserId="+req.session.followingId;
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

function getFollowingCount(req,res){
	console.log("In getFollowingCount");
    var sqlQuery="select count(*) as Following from usermapping where UserId="+req.session.followingId;
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
    var sqlQuery="select count(*) as Followers from usermapping where FollowingId="+req.session.followingId;
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


exports.getTweetsCount=getTweetsCount;
exports.getFollowingCount=getFollowingCount;
exports.getFollowersCount=getFollowersCount;
exports.insertFollowingDetails=insertFollowingDetails;
exports.fetchSearch=fetchSearch;