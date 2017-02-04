    // var app = angular.module('myApp', ['ngRoute']);
    var app = angular.module('myApp', ['ui.router']);

            // app.config(['$routeProvider', function($routeProvider) {
        //     $routeProvider
        //         .when("/", {
        //             templateUrl: "partials/lists.html"
        //         })
        //         .when("/listDetails/:id", {
        //             templateUrl: "partials/listdetails.html",
        //             controller: "listDetailCtrl",
        //             controllerAs: "newCtrl"
        //         })
        // }])

    app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
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
    }])

    app.service('mySrvc', ['$http', '$q', function($http, $q) {
            var mySrvcRef = this;
            var data;
            mySrvcRef.getData = function() {
                if (data) {
                    return $q.when(data);
                } else {
                    return $http.get('/data/data.json').then(function(response) {
                        console.log(response);
                        data = response.data
                        return data;
                    });
                }

                //console.log($http.get('/data/data.json'))
            };

        }])


    app.controller('myCtrl', ['$scope', '$http', '$location', 'mySrvc', 'myFact', function($scope, $http, $location, mySrvc, myFact) {
        $scope.dataJson = {};
        /* $http.get('/data/data.json').then(function(response) {
             console.log(response);
             $scope.dataJson = response.data;
         });*/
        mySrvc.getData().then(function(res) {
            $scope.dataJson = res;
        });
        $scope.gotoList = function(list) {
            $location.path('/listDetails/' + list.listID);
        };

        // var a = [1, 2, 4, 5, 6, 8, 10];
        // var dupa = a;
        // var c = a[0];
        // var l = a[a.length - 1];
        // var arr = [];
        // for (i = 0; i < l; i++) {
        //     if (c == a[i]) { c++; } else {
        //         arr.push(c);
        //         a.splice(i, 0, c);
        //         c++;
        //     }
        // }
        // console.log(arr);
        /*var a = [1, 2, 4, 5, 6, 8, 10];*/

        /*for (var i = a[0]; i < a[a.length - 1]; i++) {

            if ((a[i + 1] - a[i]) != 1) {

                for (var j = a[i] + 1; j < a[i + 1]; j++) {
                    console.log(j)

                }

            }

        }*/
        /*for (var i = a[0]; i < a[a.length - 1]; i++) {

            if (a.indexOf(i) == -1) {  console.log(i) }

        }*/


    }])
    app.controller('listDetailCtrl', ['$http', '$stateParams', 'mySrvc', 'myFact', function($http, $stateParams, mySrvc, myFact) {
        var ctrlRef = this;
        var getList = function(dataJson) {
            for (i = 0; i < dataJson.lists.length; i++) {
                if (dataJson.lists[i].listID == $stateParams.id) {
                    return dataJson.lists[i];
                }
            }
        };
        // $http.get('/data/data.json').then(function(response) {
        //     //console.log($stateParams.id);
        //     var dataJson = response.data;
        //     ctrlRef.list = getList(dataJson);
        // });
        mySrvc.getData().then(function(res) {

            ctrlRef.list = getList(res);
        });
    }])
    app.factory('myFact', ['$http', '$q', function($http, $q) {
        var factoryObj = {};
        var data;
        factoryObj.getData = function() {
            if (data) {
                return $q.when(data);
            } else {
                return $http.get('/data/data.json').then(function(response) {
                    console.log(response);
                    data = response.data
                    return data;
                });
            }

            //console.log($http.get('/data/data.json'))
        };
        return factoryObj;

    }])
