/**
 * implements an Event Store which receives the App events to eventually persist
 *
 *
 * @copyright (c) 2015 Dennis Sterzenbach.
 *
 * @author Dennis Sterzenbach <dennis.sterzenbach@gmail.com>
 */

function EventReceiver() {
	this.implementsInterfaces = ['EventReceiverInterface'];
	JSInterfacer.enableFor(this);

	this.eventServices = [];
	// this.eventServices.push(new EventSourceEventBackend());
}
EventReceiver.prototype.configure = function(config) {
	if (!config) {
		return;
	}

	if (!config.eventBackends) {
		return;
	}

	var eventBackend;

	for (var i in config.eventBackends) {
		eventBackend = null;
		var constructor = config.eventBackends[i];
		if (constructor === 'EventSourceEventBackend') {
			eventBackend = new EventSourceEventBackend();
		}
		if (eventBackend) {
			this.eventServices.push(eventBackend);
		}
	}
};

EventReceiver.prototype.receiveAppEvent = function(event) {
	// console.log('received app event', event);
	var loggableEvent = event;
	loggableEvent.stamptime();
	// publish.call(this, loggableEvent);

	// function publish(loggableEvent) {
	for (var i in this.eventServices) {
		if (this.eventServices[i].doesImplement('EventReceiverBackendInterface')) {
			this.eventServices[i].trackEvent(loggableEvent);
		}
	}
	// }
};

// part of EventSourceEventReceiverInterface
EventReceiver.prototype.replayHistory = function(sinceTimestamp) {
	if (this.eventServices.length > 0) {
		this.eventServices[0].replay(sinceTimestamp);
	}
};

/*
// to check for an common interface
function EventSourceServiceInterface() {

}
EventSourceServiceInterface.appliesTo = function(object) {
	if (typeof object.trackEvent === 'function') {
		return true;
	}

	return false;
};

*/