var _successResultHandler = function(data) {
    this.setStatus = function(data) {
        return {
            status: "success",
            data: data
        }
    }
};

var _failureResultHandler = function() {
    this.setStatus = function(err) {
        return {
            status: "failure",
            error: err
        }
    }

};

var _unAuthourisedHandler = function(err) {
    this.setStatus = function(err) {
        return {
            status: "unAuthourised",
            error: err 
        }
    }
};


module.exports = {
    successResultHandler: _successResultHandler,
    failureResultHandler: _failureResultHandler,
    unAuthourisedHandler: _unAuthourisedHandler
};
