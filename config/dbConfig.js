var MongoClient = require('mongodb').MongoClient;
var connectedDB = {
    dB: ''
};



var _dbConfig = function() {
    // default to a 'localhost' configuration:
    var connection_string = 'localhost:27017/TaskManagerDB';
    // if OPENSHIFT env variables are present, use the available connection info:
    if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
        connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
            process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
            process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
            process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
            process.env.OPENSHIFT_APP_NAME;
    }

    MongoClient.connect('mongodb://'+connection_string, function(err, db) {
        if (err) {
            console.log("unable to connect")
        } else {
            connectedDB.dB = db;
            //console.log(connectedDB);
            console.log("connectted successfully")
        }
    });
}

var getDB = function() {
    return connectedDB
}

var dbConfig = _dbConfig;
module.exports = {
    dbConfig: dbConfig,
    getDB: getDB
}
