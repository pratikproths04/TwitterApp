var mysql = require('./mysql');

function fetchSearch(req,res){
	console.log("In fetchSearch");
    var searchText = req.session.searchText;
    console.log("searchText"+searchText);
    var sqlQuery;
	sqlQuery = "SELECT tweet.TweetMessage as Msg, concat(user.FirstName,' ',user.LastName) as fullName, user.UserHandler as userHandler " +
			"FROM tweetdetails tweet inner join userdetails user ON  tweet.UserId=user.UserId inner join hashtags hash ON  tweet.TweetId=hash.TweetId " +
			"where hash.HashTagValue='"+searchText+"'";
	console.log(sqlQuery);
    mysql.fetchOperation(function (err, results) {
        if (err) {
            throw err;
        } else {
            if (results.length > 0) {
            	results.push('"searchText": "'+req.session.searchText+'"');
                res.send(results);
            } else {
                results = {"statusCode": 401};
            }
        }
    }, sqlQuery);
}


/*
function fetchSearch(req,res){
	console.log("In fetchSearch");
    var searchText = req.session.searchText;
    var sqlQuery;
    if(searchText.indexOf('@') == -1)
    {
    	sqlQuery = searchedHashTweet(searchText);
    }
    else{
    	sqlQuery = searchedUser(searchText);
    }
    console.log(sqlQuery);
    mysql.fetchOperation(function (err, results) {
        if (err) {
            throw err;
        } else {
            if (results.length > 0) {
            	console.log("results-->"+results);
            	if(results.hasOwnProperty('Msg')){
            		results.push('"details": "hash"');
            		results.push('"searchText": "'+req.session.searchText+'"');
            	}
            	else{
            		results.push('"details": "user"');
            		results.push('"searchText": "'+req.session.searchText+'"');
            	}
                res.send(results);
            } else {
                results = {"statusCode": 401};
            }
        }
    }, sqlQuery);
}
 
function searchedHashTweet(searchText){
	console.log("In searchedHashTweet");
    var sqlQuery = "SELECT tweet.TweetMessage as Msg, tweet.UserId as Id FROM tweetdetails tweet inner join hashtags hash ON  tweet.TweetId=hash.TweetId " +
    "where HashTagValue='"+req.body.searchText+"'";
   return sqlQuery;
}

function searchedUser(searchText){
	console.log("In searchedUser");
    var sqlQuery = "SELECT concat(FirstName,' ',LastName) as fullName, UserId from userdetails where FirstName LIKE '"+req.body.searchText+"%' " +
    "or LastName LIKE '"+req.body.searchText+"%'";
    return sqlQuery;
}*/

exports.fetchSearch=fetchSearch;