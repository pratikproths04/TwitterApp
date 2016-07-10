var mysql = require("./mysql");

function goToSignUpPage(req,res){
	console.log("In goToSignUpPage");
    res.render('signUpPage');
}

function afterSignUpPage(req,res){
	console.log("In afterSignUpPage");
    var sqlQuery = "Insert into userdetails(`Email`,`Pass`,`FirstName`, `LastName`, `UserHandler`, `BirthDate`, `Location`) VALUES  " +
    "( '"+req.body.email+"' , '"+ req.body.password +"' ,'" + req.body.firstName +"' ,'" + req.body.lastName +"','"+ req.body.userHandler +"' ,'" + req.body.dateOfBirth +"' ,'" + req.body.location +"')";
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


exports.goToSignUpPage=goToSignUpPage;
exports.afterSignUpPage=afterSignUpPage;