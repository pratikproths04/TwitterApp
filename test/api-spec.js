/*describe("funct()", function(){
	it("", function(done){
		expect.
		done();
	});
});*/

var request = require('request')
, express = require('express')
,assert = require("assert")
,http = require("http");

describe('http tests', function(){

	it('should return the login if the url is correct', function(done){
		http.get('http://localhost:3000/', function(res) {
			assert.equal(200, res.statusCode);
			done();
		})
	});
	
	it('should return the signup if the url is correct', function(done){
		http.get('http://localhost:3000/signUp', function(res) {
			assert.equal(200, res.statusCode);
			done();
		})
	});

	it('should not return the login page if the url is wrong', function(done){
		http.get('http://localhost:3000/login', function(res) {
			assert.equal(404, res.statusCode);
			done();
		})
	});

	it('should login', function(done) {
		request.post(
			    'http://localhost:3000/logIn',
			    { form: { username: 'rs@gmail.com',password:'123' } },
			    function (error, response, body) {
			    	assert.equal(200, response.statusCode);
			    	done();
			    }
			);
	  });
});