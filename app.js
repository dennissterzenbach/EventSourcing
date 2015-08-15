/**
 * @copyright (c) 2015 Dennis Sterzenbach.
 *
 * @author Dennis Sterzenbach <dennis.sterzenbach@gmail.com>
 */

var radds = radds || {};

////////////////////////////////////////////////////////////////////////////////////////////////////
///// EVENT SOURCING BASE IMPLEMENTATION

/// SETUP CONFIGURATION
radds.eventReceiverConf = {
	eventBackends: [
		'EventSourceEventBackend'
	]
};


/// CREATE INSTANCES
radds.appEventGenerator = new AppEventGenerator();
// console.log(eventGenerator.createAppEvent);

radds.defaultEventReceiver = new EventReceiver();
radds.defaultEventReceiver.configure(radds.eventReceiverConf);
radds.eventSorcerer = new EventSource(radds.defaultEventReceiver, radds.appEventGenerator);

radds.eventReceiverValueChange = new EventReceiverValueChange(radds.defaultEventReceiver);
radds.eventReceiverConf.defaultEventSource = radds.eventSorcerer;
radds.eventReceiverConf.appEventGenerator = radds.appEventGenerator;
radds.eventReceiverValueChange.configure(radds.eventReceiverConf);

console.info("%cPlease use the Buttons on the page to create some events, \n\
or to set a replay marker \n\
and see what happens when you click the \"replay\" buttons...\n\
\n\
Feel free to mail me if you have any questions: dennis.sterzenbach@gmail.com",
'font-family:"Droid Sans"; font-size: 1.2em; font-weight: 400; color: #0A4A71; line-height: 1.4em;'
);



////////////////////////////////////////////////////////////////////////////////////////////////////
///// KEYBOARD SHORTCUTS

/**
 * http://www.openjs.com/scripts/events/keyboard_shortcuts/
 *
 * Example:
shortcut.add("Ctrl+Shift+X",function() {
	alert("Hi there!");
});
 */
radds = radds || {};
radds.KeyEventHandlers = radds.KeyEventHandlers || {};
radds.KeyEventHandlers.HelpKey = function HelpKeyEventHandler() {
	console.log("Hi there! Someone needs our help! Let's boot our superhero powers...");
};

shortcut.add("F1", radds.KeyEventHandlers.HelpKey);



////////////////////////////////////////////////////////////////////////////////////////////////////
// MAIN

var so = new ScrollObserver();
so.observe(document.scrollingElement || document.getElementsByTagName('body')[0] || window);









////////////////////////////////////////////////////////////////////////////////////////////////////
// StateService
function StateService() {
	var currentComponent,
		registeredComponents = {};

	var service = {};
	service.isCurrentComponent = isCurrentComponent;
	service.getCurrentComponent = getCurrentComponent;
	initialize();
	return service;

	function initialize() {

	}

	function getCurrentComponent() {
		return currentComponent;
	}

	function isCurrentComponent(componentRegistration) {
		if (currentComponent.name === componentRegistration.name) {
			return true;
		}
		return false;
	}

	function setCurrentComponent(componentRegistration) {
		var cshe,
			lastCurrentComponent = currentComponent;

		if (this.currentComponent) {
			unsetCurrentComponent();

			cshe = new ComponentStateChangedEvent();
			cshe.componentRegistration = lastCurrentComponent;
			cshe.eventType = ComponentStateEventType.didLeaveCurrent;
			notifyObservers(cshe);
		}

		currentComponent = componentRegistration;

		cshe = new ComponentStateChangedEvent();
		cshe.componentRegistration = componentRegistration;
		cshe.eventType = ComponentStateEventType.didBecomeCurrent;
		notifyObservers(cshe);
	}

	function hasPreviousComponent(componentName) {

		if (typeof componentName === 'object') {
			componentName = componentName.name;
		}


	}

	function isComponentRegistered(componentName) {
		if (typeof componentName === 'object') {
			componentName = componentName.name;
		}
		return (componentName in registeredComponents);
	}

	function registerComponent(componentRegistration) {
		if (!isComponentRegistered(componentRegistration)) {
			registeredComponents[componentRegistration.name] = componentRegistration;

			var cshe = new ComponentStateChangedEvent();
			cshe.componentRegistration = componentRegistration;
			cshe.eventType = ComponentStateEventType.didRegister;
			notifyObservers(cshe);
		}
	}

	function notifyObservers(componentStateChangedEvent) {
		// TODO: implement observer notification (using mixin?)
	}
}

var ComponentStateEventType = {
	willBecomeCurrent: 1,
	didBecomeCurrent: 2,
	willLeaveCurrent: 3,
	didLeaveCurrent: 4,
	didRegister: 5,
	didUnregister: 6
};

function ComponentStateChangedEvent() {
	this.componentRegistration = undefined;
	this.eventType = '';
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// Navigation
function NavigationService() {
	var service;

	service = {};

	initialize();
	return service;

	function initialize() {

	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// SCROLL / VIEWPORT

function ViewPortObserver() {
	var self = this,
		breakPointName = '';

	this.detect = detectCurrentViewPort;

	initialize();

	function detectCurrentViewPort() {
		// use https://www.lullabot.com/articles/importing-css-breakpoints-into-javascript?
		  self.breakPointName = window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content').replace(/\"/g, '');
	}

	function updateViewPort() {
		self.detectCurrentViewPort();
	}

	function initialize() {
		registerEventListeners();
	}

	function registerEventListeners() {
		window.onresize(self.updateViewPort);
	}

	// var registeredViewports = {};

 //    this.registerViewport = registerViewport;
 //    this.isViewportActive = isViewportActive;

 //    function registerViewport(viewportName, isInWidth) {
 //        if (!angular.isString(viewportName)) {
 //            throw new Error('baseViewportServiceProvider - viewport name missing');
 //        } else if (!angular.isFunction(isInWidth)) {
 //            throw new Error('baseViewportServiceProvider - function for width checking missing');
 //        }
 //        registeredViewports[viewportName] = isInWidth;
 //    }

 //    function isViewportActive(viewportName) {
 //        if (!angular.isString(viewportName)) {
 //            throw new Error('baseViewportServiceProvider - viewport name missing');
 //        }
 //        if (typeof registeredViewports[viewportName] === 'undefined') {
 //            throw new Error('baseViewportServiceProvider - viewport name unknown');
 //        }
 //        return registeredViewports[viewportName]($window.innerWidth) === true;
 //    }

}


function ScrollObserver() {
	var self = this;
	var elemObserved;

	this.observe = observeScrolling;

	function observeScrolling(elem) {
		self.elemObserved = elem;
		if (elem) {
			elem.onscroll = handleScrollEvent;
		}
	}

	function handleScrollEvent(event) {
		console.log(event, getScrollXY());
	}
	// TODO: gibt es jemand der uns hier eine Lösung liefern kann, die sauber und Cross-Browser kompatibel das Scrolling und Dokumentgrößen überwacht?

	function getScrollXY() {
	  var scrOfX = 0, scrOfY = 0;
	  if( typeof( window.pageYOffset ) == 'number' ) {
	    //Netscape compliant
	    scrOfY = window.pageYOffset;
	    scrOfX = window.pageXOffset;
	  } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
	    //DOM compliant
	    scrOfY = document.body.scrollTop;
	    scrOfX = document.body.scrollLeft;
	  } else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
	    //IE6 standards compliant mode
	    scrOfY = document.documentElement.scrollTop;
	    scrOfX = document.documentElement.scrollLeft;
	  }
	  return [ scrOfX, scrOfY ];
	}

	// function getDocumentHeight() {
	// 	return document.body.scrollHeight;
	// }

	function getScrollPercentage() {
		return getScrollOffsetTop() / getDocumentSizeHeight();
	}

	function getScrollOffset() {
		return {
			left: (document.documentElement.scrollLeft + document.body.scrollLeft),
			top: (document.documentElement.scrollTop + document.body.scrollTop)
		};
	}

	// function getDocumentContentSize() {

	// }

	function getScrollSize() {
		return {
			width: (document.documentElement.scrollWidth - document.documentElement.clientWidth),
			height: (document.documentElement.scrollHeight - document.documentElement.clientHeight)
		};
	}
}
