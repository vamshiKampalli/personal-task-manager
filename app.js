var env = process.env,
    express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser');

var app = express(),
    routeConfig = require('./config/routeConfig'),
    dbConnection = require('./config/dbConfig');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('./static'));
app.use(cookieParser());
// SetUp Ports

var serverPort = process.env.OPENSHIFT_NODEJS_PORT || 7979;
var serverIPAddress = process.env.OPENSHIFT_NODEJS_IP || 'localhost';

// app.get('/', function(req, res) {
//     res.end('Personal Task Manager');
// })

app.listen(serverPort, serverIPAddress, function() {
    console.log(`Application port ${serverPort} started...`);
    dbConnection.dbConfig();
    routeConfig(app);
});
