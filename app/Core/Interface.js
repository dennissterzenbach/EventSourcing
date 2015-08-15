/**
 * @copyright (c) 2015 Dennis Sterzenbach.
 *
 * @author Dennis Sterzenbach <dennis.sterzenbach@gmail.com>
 */
(function(window) {
'use strict';

    /**
     * OOP implementation of implements / Interface approach
     *
     * @author Dennis Sterzenbach <dennis.sterzenbach@gmail.com>
     */
    window.JSInterfacer = {
        enableFor: enhanceClass
    };


    /**
     * @see http://jscriptpatterns.blogspot.de/2013/01/javascript-interfaces.html
     */

    // The implements function, which checks to see if an object declares that it
    // implements the required interfaces.
    function doesImplement(object, interfaceNames) {
        var interfaceName;
        // loop through all arguments (first one is the object, all others are interface names)
        // arguments.shift(); // this skips object parameter from arguments array
        for (var i = 1; i < arguments.length; i++) {
            interfaceName = arguments[i];

            if (typeof object.implementsInterfaces !== 'undefined') {
                // loop through implemented interface names and return as soon as we have a hit
                for (var j = 0; j < object.implementsInterfaces.length; j++) {
                    if (object.implementsInterfaces[j] === interfaceName) {
                        return true;
                    }
                }
                // return false;
            }
        }
        // in case no interfaces were implemented, we return false
        return false;
    }

    function enhanceClass(constructorFn) {
        // detect if we got an object instance or the constructor function (as expected).
        if (typeof constructorFn === 'object') {
            // got object instead of class, so use its constructor function as constructorFn
            constructorFn = constructorFn.constructor;
        }

        constructorFn.prototype.doesImplement = objectImplements;
    }

    function objectImplements(object) {
        var args = [];
        /* jslint ignore:start */
        args.push(this);
        /* jslint ignore:end */

        args.push(object);

        /* jslint ignore:start */
        return doesImplement.apply(this, args);
        /* jslint ignore:end */
    }

})(window);



// function EventReceiverBackendInterface() {
//     this.implementsMethods = ['trackEvent'];
// }

// function EventSourceBackendInterface() {
//     this.implementsMethods = ['replay'];
// }

// function EventReceiverBackendBase() {
//     this.implementsInterfaces = ['EventReceiverBackendInterface'];
// }

// function EventReceiverBackendEventSourcing() {
//     this.implementsInterfaces = ['EventReceiverBackendInterface', 'EventSourceBackendInterface'];
// }

// console.group('Interface implementation ==================================================');
// var be1 = new EventReceiverBackendBase();
// var be2 = new EventReceiverBackendEventSourcing();

// console.log('EventReceiverBackendBase implements EventReceiverBackendInterface?', implements(be1, 'EventReceiverBackendInterface'));
// console.log('EventReceiverBackendBase implements EventSourceBackendInterface?', implements(be1, 'EventSourceBackendInterface'));
// console.log('EventReceiverBackendEventSourcing implements EventReceiverBackendInterface?', implements(be2, 'EventReceiverBackendInterface'));
// console.log('EventReceiverBackendEventSourcing implements EventSourceBackendInterface?', implements(be2, 'EventSourceBackendInterface'));

// JSInterfacer.enableFor(be1);
// JSInterfacer.enableFor(be2);

// console.log('EventReceiverBackendBase implements EventReceiverBackendInterface?', be1.implements('EventReceiverBackendInterface'));
// console.log('EventReceiverBackendBase implements EventSourceBackendInterface?', be1.implements('EventSourceBackendInterface'));
// console.log('EventReceiverBackendEventSourcing implements EventReceiverBackendInterface?', be2.implements('EventReceiverBackendInterface'));
// console.log('EventReceiverBackendEventSourcing implements EventSourceBackendInterface?', be2.implements('EventSourceBackendInterface'));
// console.log('EventReceiverBackendEventSourcing implements both IFs?', be2.implements('EventReceiverBackendInterface', 'EventSourceBackendInterface'));

// console.groupEnd();