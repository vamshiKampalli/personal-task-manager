var actionResult = require('../../utils/actionResultHandler');
var utility = require('../../utils/utility');
var TaskManagerDAL = require('../DAL/taskManagerDALHandler')


var taskManagerBusinessHandler = function() {
    // body...
    var _taskManagerDAL = new TaskManagerDAL();

    function _getTaskLists(rplCallBack) {
        _taskManagerDAL.getTasksLists(function(err, doc) {
            var result = {};
            if (err) {
                result = new actionResult.failureResultHandler().setStatus(err);
            } else {
                result = new actionResult.successResultHandler().setStatus(doc);
            }
            rplCallBack(result);
        });
    };

    function _addCardToList(rplCallBack, reqBody) {
        _taskManagerDAL.addCardToList(function(err, doc) {
            var result = {};
            if (err) {
                result = new actionResult.failureResultHandler().setStatus(err);
            } else {
                result = new actionResult.successResultHandler().setStatus(doc);
            }
            rplCallBack(result);
        }, reqBody);
    };

    function _editCard(rplCallBack, reqBody){
        _taskManagerDAL.editCard(function(err, doc) {
            var result = {};
            if (err) {
                result = new actionResult.failureResultHandler().setStatus(err);
            } else {
                result = new actionResult.successResultHandler().setStatus(doc);
            }
            rplCallBack(result);
        }, reqBody);
    };

    function _deleteCard(rplCallBack, reqBody){
        _taskManagerDAL.deleteCard(function(err, doc) {
            var result = {};
            if (err) {
                result = new actionResult.failureResultHandler().setStatus(err);
            } else {
                result = new actionResult.successResultHandler().setStatus(doc);
            }
            rplCallBack(result);
        }, reqBody);

    };

    this.getTaskLists = _getTaskLists;
    this.addCardToList = _addCardToList;
    this.editCard=_editCard;
    this.deleteCard=_deleteCard;
};
module.exports = taskManagerBusinessHandler;
