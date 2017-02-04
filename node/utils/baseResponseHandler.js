"use strict"
var BaseResponseMethod = function() {

}

var _200 = function(req, res, data) {
    
    res.status(200).send(data)
};
var _404 = function(req, res, data) {
   
    res.status(404).send(data);
};
var _500 = function(req, res, data) {
   
    res.status(500).send(data);
};
var _401 = function(req, res, data) {
    
    res.status(401).send(data);
};
var _400 = function(req, res) {
	var result = {error:'Not Found'}
	res.status(400).send(result);
}


BaseResponseMethod.prototype.success = _200;
BaseResponseMethod.prototype.failure = _404;
BaseResponseMethod.prototype.error = _500;
BaseResponseMethod.prototype.unAuthourised = _401;
BaseResponseMethod.prototype.notFound = _400;

module.exports = BaseResponseMethod;
