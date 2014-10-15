/**
 * Example for a directive controller.
 */
angular.module('ngFormsApp.directives.ctlBoundDirective', [])

/**
 * This controller shall be tied to a directive, and shared with other directives
 * through the 'require' directive configuration.
 * @param $element Directive controllers can have the directive element injected.
 */
    .controller('directiveController', function ($log, $element) {
        this.name = 'I am a controller that shall be bound to one or more directives';
        this.msg = '';

        /**
         * Sets the message on the current state
         * @param msg {string} message to set
         */
        this.setMessage = function(msg){
            if (msg && angular.isString(msg)){
                this.msg = msg;
            }
        }
    })


/**
 * This directive declares the 'directiveController' to be bound to it through the controller configuration
 * attribute
 */
    .directive('ctlrBoundDirective', function ($log) {
        return {
            // bind this controller to this directive and make it available to child directives
            controller: 'directiveController',
            restrict: 'E',
            template: '<!--ctlBoundDirective template -->' +
                '<div>' +
                '   <p>controller name: {{boundCtl.name}}</p>' +
                '   <p>controller msg: {{boundCtl.msg}}</p>' +
                '</div>',

            link: function (scope, element, attr, boundCtl) {
                scope.boundCtl = boundCtl;
            }
        }
    })

    .directive('requireDirective', function ($log) {
        return {
            // No prefix tells the compiler to look for a the directive on the current element
            // (e.g ngModel on an <input> element)

            // use prefix '^' to indicate directive should be a parent
            // use prefix '?' to imply directive is optional
            require: ['ctlrBoundDirective'],  // this means find the sibling directive's controller
            restrict: 'A',
            /**
             * The controllers parameter is an array corresponding to the 'require' array above.
             * The controllers are passed in in the same order the 'require' array specified.
             */
            link: function (scope, element, attr, controllers) {
                var boundCtl = controllers[0];
                boundCtl.setMessage('Hello from requireDirective');
            }
        }
    });


