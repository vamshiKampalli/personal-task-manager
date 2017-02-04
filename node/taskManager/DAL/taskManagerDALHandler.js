var dB = require('../../../config/dbConfig').getDB().dB;
var _=require('lodash');
//console.log(require('../../../config/dbConfig').getDB())

var taskManagerDALHandler = function() {
    // body...
    function _getTasksLists(callBack) {
        // body...

        if (dB) {
            dB.collection('taskLists').aggregate([
                    { $unwind: "$lists" },
                    { $sort: { "lists.listID": 1 } },//{ $sort: { "lists.listID": -1 } },//for recently added lists
                    { $group: { _id: { _id: "$_id", boardTitle: "$boardTitle" }, lists: { $push: "$lists" } } },
                    { $project: { _id: "$_id._id", boardTitle: "$_id.boardTitle", lists: 1 } }
                ],
                function(err, doc) {
                    //console.log('get',doc);
                    callBack(err, doc);
                });
        } else {
            callBack({ errorData: 'Unable to Connect DB' }, '');
        }

    };

    function _addCardToList(callBack, reqBody) {
        //console.log('reqBody',reqBody);
        if (dB) {
            dB.collection('taskLists').update({ 'lists.listID': reqBody.listID }, { $addToSet: { "lists.$.cards": reqBody.cardDetail } },
                function(err, doc) {
                    //console.log(doc);
                    callBack(err, doc); //just to send success
                    //_getTasksLists(callBack); //to sent back whole taskLists data
                })
        } else {
            callBack({ errorData: 'Unable to Connect DB' }, '');
        }
    };

    function _updateCard(callBack, reqBody, index){
        var setData={};
        var path='lists.$.cards.'+index;
        setData[path]=reqBody.cardDetail;
        //console.log('setData',setData)
        if (dB) {
            dB.collection('taskLists').update({ 'lists.listID': reqBody.listID,'lists.cards.cardID':reqBody.cardDetail.cardID }, { $set: setData },
                function(err, doc) {
                    callBack(err, doc); //just to send success
                    //_getTasksLists(callBack); //to sent back whole taskLists data
                })
        } else {
            callBack({ errorData: 'Unable to Connect DB' }, '');
        }
    };

    function _editCard(callBack, reqBody) {
        if (dB) {
            dB.collection('taskLists').aggregate([
                     {$match: { 'lists.listID': reqBody.listID }},
                     {$unwind:"$lists"},
					 {$match:{'lists.listID': reqBody.listID}},
                     {$project:{'lists.cards':1}}
                ],
                function(err, doc) {
                    if(err){
                        callBack(err, doc);
                    }else{
                        var index = _.findIndex(doc[0].lists.cards, function(card) { return card.cardID == reqBody.cardDetail.cardID; });
                        if(index > -1){
                            _updateCard(callBack, reqBody, index);
                        }else{
                            callBack({ errorData: 'Unable to find card in DB' }, '');
                        }
                        
                    }
                });
        } else {
            callBack({ errorData: 'Unable to Connect DB' }, '');
        }
    };
    function _deleteCard(callBack, reqBody){
        if (dB) {
            dB.collection('taskLists').update({ 'lists.listID': reqBody.listID }, { $pull: {'lists.$.cards':{cardID:reqBody.cardID}} },
                function(err, doc) {
                    //console.log(doc);
                    callBack(err, doc); //just to send success
                    //_getTasksLists(callBack); //to sent back whole taskLists data
                })
        } else {
            callBack({ errorData: 'Unable to Connect DB' }, '');
        }
    };
    this.getTasksLists = _getTasksLists;
    this.addCardToList = _addCardToList;
    this.editCard=_editCard;
    this.deleteCard=_deleteCard;
};

module.exports = taskManagerDALHandler;
