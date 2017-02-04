var BaseRequestHandler = function() {

}

var _getRequestHandler = function() {};
var _postRequest = function() {};
var _deleteRequestHandler = function() {};
var _putRequestHandler = function() {};


BaseRequestHandler.prototype.get = _getRequestHandler;
BaseRequestHandler.prototype.post = _postRequest;
BaseRequestHandler.prototype.put = _deleteRequestHandler;
BaseRequestHandler.prototype.delete = _putRequestHandler;

module.exports = BaseRequestHandler;