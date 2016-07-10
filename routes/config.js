/**
 * Database Configurations
 */
exports.database = {
		"host" : "localhost",
		"port" : 3400,
		"user" : "root",
		"password" : "pratik_04",
		"database" : "twitterdb",
		"connectionLimit" : 100,
		"dateStrings" : true
	};

/**
 * Encryption Configurations
 */
exports.encrypt = {
	"lengthOfKey" : 128,
	"numberOfIterations" : 500,
	"digest" : 'sha256'
};

/**
 * Database Pooling Configurations
 */
exports.databasePool = {
		"maxSize" : 50
}