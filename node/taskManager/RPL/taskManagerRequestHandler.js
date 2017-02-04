var BaseRequestMethod = require('../../utils/baseRequestHandler');
var BaseResponseMethod = require('../../utils/baseResponseHandler');
var TaskManagerRequestBIL = require('../BIL/taskManagerBusinessHandler');

var taskManagerRequestHandler = function() {
    // body...
    var taskmanagerRef = this;

    var _requestHandler = new BaseRequestMethod();
    var _responseHandler = new BaseResponseMethod();
    var _taskManagerRequestBIL = new TaskManagerRequestBIL();

    var taskResponseHandler = function(req, res) {
        return function(result) {
            _responseHandler[result.status](req, res, result);
        }
    };

    _requestHandler.get = function(req, res, uri) {
        //console.log(uri);
        if (uri.pathname === '/taskManager/getTaskLists') {
            _taskManagerRequestBIL.getTaskLists(taskResponseHandler(req, res));
        }
        //res.end();
    };

    _requestHandler.post = function(req, res, uri) {
        if (uri.pathname === '/taskManager/addCard') {
            _taskManagerRequestBIL.addCardToList(taskResponseHandler(req, res), req.body);
        }
    };

     _requestHandler.put = function(req, res, uri) {
        if (uri.pathname === '/taskManager/editCard') {
            _taskManagerRequestBIL.editCard(taskResponseHandler(req, res), req.body);
        }
    };
    _requestHandler.delete = function(req, res, uri) {
        if (uri.pathname.indexOf('/taskManager/deleteCard')>-1) {
            var paths=uri.pathname.split('/');
            var deleteParams={
                listID:paths[paths.length-2],
                cardID:paths[paths.length-1]
            };
            _taskManagerRequestBIL.deleteCard(taskResponseHandler(req, res), deleteParams);
        }
    };

    taskmanagerRef.handleRequest = function(req, res, uri) {
        var reqType = req.method.toLowerCase();
        _requestHandler[reqType](req, res, uri);
    };
};

module.exports = taskManagerRequestHandler;
