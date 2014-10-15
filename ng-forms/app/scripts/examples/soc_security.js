angular.module('ngFormsApp.directives', [])

    .directive('socSecurity', function () {
        var parseRegex = /^\d{3}-\d{2}-\d{4}$/;
        var formatRegex = /^\d+$/;
        return {
            restrict: 'A',
            priority: 1,
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {

                ngModel.$formatters.push(formatter);
                ngModel.$parsers.push(parser);

                element.on('blur keyup change', function (e) {
                    scope.$apply(updateViewValue);
                });

                function updateViewValue(){
                    var viewValue = element.val();
                    ngModel.$setViewValue(viewValue);
                }

                ngModel.$render = function(){
                    console.log("$rendering: ");
                    console.log("viewValue: " + ngModel.$viewValue);
                    console.log("modelValue: " + ngModel.$modelValue);
                    element.val(ngModel.$viewValue);
                };

                /**
                 * Reads that value of the pipeline originating from the ui control.  If the value is valid, e.g.
                 * ddd-dd-dddd then the '-' are removed and just the number is removed.
                 *
                 * If the value invalid, then ngModel.setValidity is called and undefined is returned.
                 * @param viewValue The value passed from the UI control pipeline
                 * @returns the soc security number with '-' removed which is the $modelValue.
                 */
                function parser(viewValue) {
                    console.log("parsing viewValue: " + viewValue);
                    var result;
                    var valid = parseRegex.test(viewValue);
                    ngModel.$setValidity('socSecurity', valid);
                    if (valid) {
                        result = viewValue.replace(/-/g, '');
                    }
                    return result;
                }

                /**
                 * Formats the model value for the control.
                 * @param modelValue - A soc-security nbr without '-'
                 * @returns  {string} The formatted ssn with '-' added.
                 */
                function formatter(modelValue) {
                    console.log("formatting modelValue: " + modelValue);
                    var valid = formatRegex.test(modelValue);
                    // we know its all numbers
                    if (valid) {
                        var part1 = modelValue.substr(0, 3);
                        var part2 = modelValue.substr(3, 2);
                        var part3 = modelValue.substr(5, 4);
                        return  [part1, part2, part3].join('-');
                    }
                    else return modelValue;
                }

            } //link
        }
    });