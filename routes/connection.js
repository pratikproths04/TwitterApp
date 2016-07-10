var mysql=require("mysql");

function getConnection(){
	console.log("In getConnection");
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'pratik_04',
        database : 'twitterdb',
        dateStrings:true,
        port	 : 3400
    });
    return connection;
}

function Pool(connection_no)
{
	console.log("In Pool");
    this.pool = [];
    for(var i=0; i < connection_no; ++i)
    {
        this.pool.push(getConnection());
    }
    this.last = 0;
}

Pool.prototype.get = function()
{
    var connection = this.pool[this.last];
    this.last++;
    if (this.last == this.pool.length) // cyclic increment
    {  
    	this.last = 0;
    }
    return connection;
};

exports.initConnectionPool = function initConnectionPool(){
	console.log("In initConnectionPool");
	var jsPool = new Pool(45);
    return jsPool;
};