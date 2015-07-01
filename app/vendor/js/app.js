angular.module('FreeMobile', ['ngRoute'])
.config(['$routeProvider', function ($routeProvider) {
        $.material.init();
        $routeProvider
        .when('/', {
            templateUrl: 'vendor/views/send.html',
            controller: 'FreeMobileSendCtrl'
        })
        .when('/admin', {
            templateUrl: 'vendor/views/admin.html',
            controller: 'FreeMobileAdminCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}])
.directive('green', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            $(element).on('click', function() {
                $(element).addClass('green');
                $('.modal').modal('show');
                setTimeout(function () {
                    $(element).removeClass('green');
                }, 1000);
            });
        }
    };
})
.controller('FreeMobileSendCtrl', ['$scope', function ($scope) {
        $scope.items = filesystem.get();
        $scope.send = function (item) {
             angular.forEach($scope.items, function(value, key) {
                if (value.name == item.name) {
                    sms($scope.items[key], $scope.message);
                }
             });
        };
}])
.controller('FreeMobileAdminCtrl', ['$scope', function($scope) {
    $scope.items = filesystem.get();
    $scope.add = function () {
        if ($scope.new.id != '' && $scope.new.tocken != '' && $scope.new.name != '') {
            $scope.items.push($scope.new);
            filesystem.set($scope.items);
        }
    };
    $scope.remove = function (item) {
             angular.forEach($scope.items, function(value, key) {
                if (value.name == item.name) {
                    if (key > -1) {
                        $scope.items.splice(key, 1);
                    }
                    filesystem.set($scope.items);
                }
            });
    };
    $scope.removeFile = function () {
        filesystem.remove();
        $scope.items = [];
        $scope.new = '';
    };
}]);
