var ejs= require('ejs');
var mysql = require('mysql');

var connectionpooling=require('./connection');

var connect;

exports.createConnectionpool = function createConnectionpool(){
	console.log("In createConnectionpool");
    connect=connectionpooling.initConnectionPool();
    console.log("connection created");
};

exports.insertOperation = function(callback,query){
	console.log("In insertOperation");
    var dbconnection=connect.get();
    dbconnection.query(query, function(err, rows, fields){
        if(err){
            console.log(err);
        }else{
            callback(err,rows);
        }
    });
};

exports.fetchOperation = function(callback,query){
	console.log("In fetchOperation");
    var dbconnection=connect.get();
    dbconnection.query(query, function(err, rows, fields){
        if(err){
            console.log(err);
        }else{
            callback(err,rows);
            //console.log('Pool Length:'+connect.pool.length);
        }
    });
};
