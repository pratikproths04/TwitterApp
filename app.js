/**
 * Module Dependencies.
 */
var express = require('express')
  , signUp = require('./routes/signUp')
  , logIn = require('./routes/logIn')
  , home = require('./routes/home')
  , profile = require('./routes/profile')
  , show = require('./routes/showDetails')
  , others = require('./routes/others')
  , http = require('http')
  , path = require('path')
  , favicon = require('static-favicon')
  , logger = require('morgan')
  , cookieParser = require('cookie-parser')
  , bodyParser = require('body-parser')
  , mysql = require('./routes/mysql')
  , ejs=require('ejs')
  , session=require('client-sessions');

var app = express();

/** Assigning Port **/
app.set('port', process.env.PORT || 3000);

/** View Engine Setup**/
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));

/** Parsing Url**/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

/** Initialing DB Connection Pool**/
//mysql.createConnectionPool();

/** Sessions**/
app.use(session({   	  
	cookieName: 'session',    
	secret: 'cmpe273_test_string',    
	duration: 30 * 60 * 1000,    //setting the time for active session
	activeDuration: 5 * 60 * 1000,  })); // setting time for the session to be active when the window is open // 5 minutes set currently

/**Handling Routing and Delegating Calls**/
app.get('/',logIn.goToLogInPage);
app.get('/signUp',signUp.goToSignUpPage);
app.post('/signUp',signUp.afterSignUpPage);
app.get('/logIn',logIn.goToLogInPage);
app.post('/logIn',logIn.afterLogInPage);
app.get('/logout',logIn.goToLogoutPage);

app.get('/home',home.goToHomePage);
app.get('/home/fetchUser',home.fetchUserData);
app.get('/home/tweetsFetch',home.fetchTweetsData);
app.get('/home/showDataPage',home.goToShowPage);
app.get('/home/tweetsCount',home.getTweetsCount);
app.get('/home/followersCount',home.getFollowersCount);
app.get('/home/followingCount',home.getFollowingCount);
app.post('/home/tweetInsert',home.insertTweetData);
//app.post('/home/retweetsCheck',home.checkRetweets);
app.post('/home/retweeted',home.retweeted);
app.post('/home/search',home.fetchSearch);
app.get('/home/showOtherProfile',home.goToOtherProfilePage);

app.get('/profile',profile.goToProfilePage);
app.get('/profile/fetchUser',profile.fetchUserData);
app.get('/profile/tweetsCount',profile.getTweetsCount);
app.get('/profile/followersCount',profile.getFollowersCount);
app.get('/profile/followingCount',profile.getFollowingCount);
app.get('/profile/followersList',profile.fetchFollowersList);
app.get('/profile/tweetsList',profile.fetchTweetsList);
app.get('/profile/followingList',profile.fetchFollowingList);

app.get('/show/search',show.fetchSearch);

app.get('/others/search',others.fetchSearch);
app.get('/others/insertFollowing',others.insertFollowingDetails);
app.get('/others/followersCount',others.getFollowersCount);
app.get('/others/followingCount',others.getFollowingCount);
app.get('/others/tweetsCount',others.getTweetsCount);

/** Error Handling **/
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});

/** Creating Server **/
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
