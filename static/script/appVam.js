angular.module('myApp', ['ui.router', 'ui.bootstrap']);

angular.module('myApp')
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state("home", {
                url: '/home',
                templateUrl: "partials/lists.html"
            })
            .state("listDetails", {
                url: "/listDetails/:id",
                templateUrl: "partials/listdetails.html",
                controller: "listDetailCtrl",
                controllerAs: "newCtrl"
            })
        $urlRouterProvider.otherwise('/home');
    }]);

angular.module('myApp')
    .service('taskDetailService', ['$http', '$q', function($http, $q) {
        var serviceRef = this;
        var data;
        function generateUUID() {
            var d = new Date().getTime();
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = (d + Math.random()*16)%16 | 0;
                d = Math.floor(d/16);
                return (c=='x' ? r : (r&0x3|0x8)).toString(16);
            });
            return uuid;
        };
        serviceRef.getData = function() {
            if (data) {
                return $q.when(data);
            } else {
                return $http.get('api/taskManager/getTaskLists').then(function(response) {
                    //console.log(response);
                    if (response.data.status === 'success') {
                        return response.data.data[0];
                    }

                })
            }
        };

        serviceRef.addCard = function(list, card) {
            card.cardID=generateUUID();
            var newObj = {
                listID: list.listID,
                cardDetail: card
            };
            return $http.post('api/taskManager/addCard', newObj).then(function(response) {
                if (response.data.status === 'success') {
                    return response.data.data[0];
                }
            });
        };

        serviceRef.editCard=function(listID,card){
            var newObj = {
                listID: listID,
                cardDetail: card
            };
            return $http.put('api/taskManager/editCard', newObj).then(function(response) {
                if (response.data.status === 'success') {
                    return response.data.data[0];
                }
            });
        };

        serviceRef.removeCard=function(listID,card){
            var newObj = {
                listID: listID,
                cardID: card.cardID
            };
            return $http.delete('api/taskManager/deleteCard/'+listID+'/'+card.cardID, newObj).then(function(response) {
                if (response.data.status === 'success') {
                    return response.data.data[0];
                }
            });
        };
    }]);

angular.module('myApp')
    .controller('myCtrl', ['$scope', 'taskDetailService', '$location', '$uibModal', function($scope, taskDetailService, $location, $uibModal) {
        function init() {
            taskDetailService.getData().then(function(res) {
                $scope.dataJson = res;
            });
        };
        $scope.gotoList = function(list) {
            $location.path('/listDetails/' + list.listID);
        };

        $scope.addCard = function(list) {
            /*var dataModel = {
                "cardID": "",
                "cardTitle": "",
                "description": "",
                "comments": [""]
            };*/
            $uibModal.open({
                templateUrl: 'partials/modalPopup.html',
                controller: ['$scope', '$uibModalInstance', function($scope, $uibModalInstance) {
                    console.log("pop up controller");
                    $scope.tempCard = {
                        "cardID": "",
                        "cardTitle": "",
                        "description": "",
                        "comments": ['']
                    };
                    $scope.ok = function(add_list_form) {
                        if (!add_list_form.$invalid) {
                            $uibModalInstance.close($scope.tempCard);
                        }
                    };
                    $scope.cancel = function() {
                        $uibModalInstance.dismiss("From Cancel");
                    };
                    $scope.addComment = function(comments) {
                        // body...
                        comments.push('');
                    };
                }],
                size: 'md',
                /*  resolve: {
                      data: function() {
                          return dataModel;
                      }
                  }*/

            }).result.then(function(result) {
                //for close on OK
                //console.log(result);
                taskDetailService.addCard(list, result).then(function(res) {
                    list.cards.unshift(result);
                });
            }, function(result) {
                //for dismiss
                console.log(result);
            })
        };
        $scope.editCard=function(listID,card){
             $uibModal.open({
                templateUrl: 'partials/modalPopup.html',
                controller: ['$scope', '$uibModalInstance', 'data','taskDetailService',function($scope, $uibModalInstance,data,taskDetailService) {
                    $scope.tempCard=data.cardDetail;
                    $scope.ok = function(add_list_form) {
                        if (!add_list_form.$invalid) {
                            $uibModalInstance.close($scope.tempCard);
                        }
                    };
                    $scope.cancel = function() {
                        $uibModalInstance.dismiss("From Cancel");
                    };
                    $scope.addComment = function(comments) {
                        // body...
                        comments.push('');
                    };
                    $scope.removeCard=function(card){
                        taskDetailService.removeCard(data.listID,card).then(function(res){
                            console.log(res);
                        });
                    };
                }],
                size: 'md',
                resolve: {
                      data: function() {
                          return {
                              cardDetail:card,
                              listID:listID
                            };
                      }
                  }

            }).result.then(function(cardEdited) {
                //for close on OK
                //console.log(result);
                taskDetailService.editCard(listID, cardEdited).then(function(res) {
                    console.log(cardEdited);
                });
            }, function(result) {
                //for dismiss
                console.log(result);
            })
        };
        $scope.removeList = function(list) {
        };
        $scope.addList = function(lists) {
            /*var dataModel = {
                "cardID": "",
                "cardTitle": "",
                "description": "",
                "comments": [""]
            };*/
            $uibModal.open({
                templateUrl: 'partials/modalList.html',
                controller: ['$scope', '$uibModalInstance', function($scope, $uibModalInstance) {
                    console.log("pop up controller");
                    $scope.tempList = {
                        "listID": "",
                        "listTitle": "",
                        "cards": []
                    };
                    $scope.ok = function(add_list_form) {
                        if (!add_list_form.$invalid) {
                            $uibModalInstance.close($scope.tempList);
                        }

                    };
                    $scope.cancel = function() {
                        $uibModalInstance.dismiss("From Cancel");
                    };

                }],
                size: 'md',
                /*  resolve: {
                      data: function() {
                          return dataModel;
                      }
                  }*/

            }).result.then(function(result) {
                //for close
                console.log(result);
                lists.push(result);

            }, function(result) {
                //for dismiss
                console.log(result);
            })
        };

        init();
    }]);

angular.module('myApp')
    .controller('listDetailCtrl', ['taskDetailService', '$stateParams', function(taskDetailService, $stateParams) {
        var ctrlRef = this;

        function getList(dataJson) {
            for (i = 0; i < dataJson.lists.length; i++) {
                if (dataJson.lists[i].listID == $stateParams.id) {
                    return dataJson.lists[i];
                }
            }
        };

        function init() {
            taskDetailService.getData().then(function(res) {
                ctrlRef.list = getList(res);
            });
        };


        init();
    }])
