var url = require('url');
// var jwt = require('jwt-simple');
var _initRequest = function(req, res, uri) {
    var _url = req.path,
        BaseUri = "../node/";
    var _fileUri = _url.split('/')[1];
    var _requireURI = BaseUri + _fileUri + '/RPL/' + _fileUri + 'RequestHandler';
    console.log(_requireURI);
    /*try{*/
    var ProcessRequest = require(_requireURI);
    var _processRequestHandler = new ProcessRequest()
        // if (_fileUri !== 'auth') {
        //     var payload;
        //     if (req.cookies.auth_token) {
        //         payload = jwt.decode(req.cookies.auth_token, 'SIVA');
        //     }

    //     if (!payload || new Date(payload.expires) <= new Date()) {
    //         res.status(401).send({ status: 'failure', error: 'Session expired.' });
    //         return;
    //     }
    // }
    //console.log('authorised');
    _processRequestHandler.handleRequest(req, res, uri);
    /*}catch (e){
        res.status(404).send({error:'Not Found'});
    }*/

};


var routeConfig = function(app) {
    app.use('/api', function(req, res) {
        var uri = url.parse(req.url, true);
        _initRequest(req, res, uri);
    });
};

module.exports = routeConfig;
