var mysql = require('./mysql');
var encryption = require('./encryption');

function goToLogInPage(req,res){
	console.log("In goToLogInPage");
    mysql.createConnectionpool();
    res.render('logInPage');
}

function afterLogInPage(req,res){
	console.log("In afterLogInPage");
    var email, password;
    email=req.body.email;
    password=req.body.password;
    var result;
    if(email!== '' && password!== '')
    {
        var sqlQuery = "Select * from userdetails where Email='"+email+"' and Pass='"+password+"'";
        console.log(sqlQuery);
        mysql.fetchOperation(function(err, results) {
            if (err) {
                throw err;
            } else {
                if (results.length > 0) {
    				var jsonString = JSON.stringify(results);
                	console.log("UserId"+results[0].UserId);
                    //Assigning the session
                    req.session.userId = results[0].UserId;
                    req.session.name = results[0].FirstName+" "+results[0].LastName;
                    req.session.userHandler = results[0].UserHandler;
                    console.log("Session initialized");
                    result = {"statusCode" : 200};
                    res.send(result);
                }
            }
        }, sqlQuery);
    }
    
}

//Logout the user - invalidate the session
function goToLogoutPage(req,res)
{
	console.log("In logout");
    req.session.destroy();
    res.redirect('/');
}

exports.goToLogInPage=goToLogInPage;
exports.afterLogInPage=afterLogInPage;
exports.goToLogoutPage=goToLogoutPage;