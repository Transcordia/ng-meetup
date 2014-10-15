/**
 * This directive validates the view value verifying that it is a factor of the factor attribute.
 *
 * Usage <input type='number' ng-model='user.age' factor-validator='2'>
 *
 * This case verifies that the number entered is a factor of 2.
 */
angular.module('ngFormsApp.directives.factorValidator', [])

    .directive('factorValidator', function ($log) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                ngModel.$parsers.push(parser);

                var factor = parseInt(attrs.factorValidator, 0);

                // set default to 3
                factor = angular.isNumber(factor) ? factor : 3;


                /**
                 * Reads that viewValue of the pipeline originating from the ui control.  If the value is a
                 * factor then just return the viewValue.
                 *
                 * If the value invalid, then ngModel.setValidity is called and undefined is returned.
                 * @param viewValue The value passed from the UI control pipeline
                 * @returns the viewValue if valid, otherwise undefined.
                 */
                function parser(viewValue) {
                    var result, value, remainder, valid=true;

                    value = parseInt(viewValue, 10);
                    if (angular.isNumber(value) && !isNaN(value)){
                        remainder = value % factor;
                        valid = remainder === 0;
                        result = valid ? viewValue : undefined;
                    }
                    ngModel.$setValidity('factorValidator', valid);
                    return result;
                }

            } //link
        }
    });