'use strict';

/**
 * Controllers of the ngFormsApp
 */
angular.module('ngFormsApp')
    .controller('NavCtl', function ($scope, $state) {
        $scope.isActive = function (targetState) {
            return $state.is(targetState);
        }
    })

    .controller('HomeCtl', function () {

    })

    .controller('Form1Ctl', function ($scope, $log) {
        $scope.user = {};

        $scope.formData = {
            locations: [
                {city: "Bowling Green", state: "OH"},
                {city: "Columbus", state: "OH"},
                {city: "Seattle", state: "WA"},
                {city: "Tiffin", state: "OH"},
                {city: "Toledo", state: "OH"}
            ]
        };

        $scope.infoElement = {};

        $scope.doSubmitForm = function (userFormCtl) {
            $log.debug('Form Submitted: ' + userFormCtl.$name);
        };

        $scope.doReset = function (userFormCtl) {
            userFormCtl.$setPristine();
            $scope.user = {};
        };

        $scope.showDetails = function (elName) {
            $scope.infoElement = $scope.userForm[elName];
        };
    })

    .controller('OptionsCtl', function ($scope) {
        $scope.user = {};

        // uncomment to initialize favFood property and get it selected in dropdown
        $scope.user.favFood = {name: 'Hamburger', group: 'Meats', id: '4'};
        $scope.user.favFood2 = '3';

        // init form dropdown
        $scope.formData = {
            foods: [
                {name: 'Spaghetti', foodGroup: 'Grains', id: '1'},
                {name: 'Cereal', foodGroup: 'Grains', id: '2'},
                {name: 'Steak', foodGroup: 'Meats', id: '3'},
                {name: 'Hamburger', foodGroup: 'Meats', id: '4'},
                {name: 'Apple', foodGroup: 'Fruits', id: '5'},
                {name: 'Lemon', foodGroup: 'Fruits', id: '6'},
                {name: 'Tomato', foodGroup: 'Vegetables', id: '7'},
                {name: 'Cucumber', foodGroup: 'Vegetables', id: '8'}
            ]
        };

        $scope.showDetails = function (elName) {
            $scope.infoElement = $scope.userForm[elName];
        };
    });
