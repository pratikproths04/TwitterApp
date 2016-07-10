var mysql = require('./mysql');

function goToShowPage(req,res){
    //Checks before redirecting whether the session is valid
    if(req.session.userId)
    {
        //Set these headers to notify the browser not to maintain any cache for the page being loaded
        res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        res.render("showPage",{userId:req.session.userId});
    }
}

function goToOtherProfilePage(req,res){
    //Checks before redirecting whether the session is valid
    if(req.session.userId)
    {
        //Set these headers to notify the browser not to maintain any cache for the page being loaded
        res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        res.render("othersPage",{userId:req.session.userId});
    }
    else
    {
        res.redirect('/logout');
    }
}

function goToHomePage(req,res){
    //Checks before redirecting whether the session is valid
    if(req.session.userId)
    {
        //Set these headers to notify the browser not to maintain any cache for the page being loaded
        res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        res.render("homePage",{userId:req.session.userId});
    }
    else
    {
        res.redirect('/logout');
    }
}

function insertTweetData(req,res){
	console.log("In insertTweetData");
	var words = req.body.tweetMessage;
	var tagslistarr;
	var hashList;
	if(!(words.indexOf("#") == -1))
	{
		tagslistarr = words.match(/#\S+/g);
		hashList = tagslistarr.toString().split(',');
	}
    var sqlQuery = "Insert into tweetdetails(`UserId`,`TweetMessage`, `TweetDate`) VALUES ("+parseInt(req.session.userId)+", '"+ req.body.tweetMessage +"' , NOW())";
    console.log(sqlQuery);
    if(words.indexOf("#") == -1){
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
    }else{
    mysql.insertOperation(function(err, result){
        var result;
        if(err){
            result = {"statusCode" : 401};
            console.log("Error while inserting data");
            res.send(result);
        }else{
        	var sqlQuery1 = "Select max(TweetId) as TweetId from tweetdetails where UserId ="+parseInt(req.session.userId)+" and TweetMessage = '"+req.body.tweetMessage+"' order by TweetDate desc";
            console.log(sqlQuery1);
            mysql.fetchOperation(function(err, result){
            if(err){
                result = {"statusCode" : 401};
                console.log("Error while inserting data");
                res.send(result);
            }else{
            	for(var i in hashList){
            		console.log("hashList-->"+hashList[i]);
            		var item = hashList[i];
            		var New = result;
            		console.log("New-->"+New);
            		var tweetId = result[0].TweetId;
            		console.log("tweetId-->"+tweetId);
                    var sqlQuery2 = "Insert into hashtags(`HashTagValue`, `TweetId`) VALUES ('"+item+"', "+tweetId+" )";
                    console.log(sqlQuery2);
                    mysql.insertOperation(function(err, result){
                        if(err){
                            result = {"statusCode" : 401};
                            console.log("Error while inserting data");
                            res.send(result);
                        }else{
                            result = {"statusCode" : 200};                        
                        }
                    },sqlQuery2);
                    console.log("Data inserted successfully");
                    res.send(result);
            	}
            }
        },sqlQuery1);
      }
    },sqlQuery);
   }
}

function fetchSearch(req,res){
	console.log("In fetchSearch");
	var searchText = req.body.searchText;
	//Assigning the session
    req.session.searchText = searchText;
	var results = {"statusCode": 200};
	results.push('"searchText": "'+req.session.searchText+'"');
	res.send(results);
}

function retweeted(req,res){
	console.log("In reTweeted");
    var sqlQuery = "Insert into tweetdetails(`UserId`,`TweetMessage`, `ReTweetUserId`, `TweetDate`) VALUES ("+parseInt(req.session.userId)+", '"+req.body.retweetMessage+"', "+parseInt(req.session.userId)+", NOW())";
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

/*function checkRetweets(req,res){
	console.log("In checkRetweets");
	var sqlQuery="SELECT UserId from tweetdetails where ReTweetUserId IS NULL and TweetMessage = '"+req.body.retweetMessage+"'"; 
    mysql.fetchOperation(function(err,results){
    if(err){
        throw err;
    }else{
        if(results.length>0){
        	console.log("results before send--->"+JSON.stringify(results));
            res.send(results);
        }else{
            results={"statusCode":401};
            }
        }
    },sqlQuery);
}*/

function fetchTweetsData(req,res) {
	console.log("In fetchTweetsData");
    var sqlQuery = "SELECT t.TweetMessage as TweetMessage, concat(u.FirstName,' ',u.LastName) as fullName, u.UserHandler as UserHandler, t.ReTweetUserId as ReTweetUserId FROM tweetdetails t inner join userdetails u ON  t.UserId=u.UserId where t.UserId IN (select FollowingId from usermapping where UserId= "+req.session.userId+") or t.UserId= "+req.session.userId;
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

function getTweetsCount(req,res){
	console.log("In getTweetsCount");
	var sqlQuery="select count(TweetMessage) as Tweets from tweetdetails where UserId="+req.session.userId;
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

//exports.checkRetweets=checkRetweets;
exports.goToOtherProfilePage=goToOtherProfilePage;
exports.goToShowPage=goToShowPage;
exports.fetchSearch=fetchSearch;
exports.fetchUserData=fetchUserData;
exports.retweeted=retweeted;
exports.getTweetsCount=getTweetsCount;
exports.getFollowingCount=getFollowingCount;
exports.getFollowersCount=getFollowersCount;
exports.insertTweetData=insertTweetData;
exports.fetchTweetsData=fetchTweetsData;
exports.goToHomePage=goToHomePage;