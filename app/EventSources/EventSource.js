/**
 * implements a common interface to send and create App events for EventReceiver
 * the application uses this EventSourcer to inform about new Events and does
 * not know about the Receivers.
 *
 *
 * @copyright (c) 2015 Dennis Sterzenbach.
 *
 * @author Dennis Sterzenbach <dennis.sterzenbach@gmail.com>
 */

function EventSource(defaultEventReceiver, appEventGenerator) {
	this.implementsInterfaces = ['EventSourceInterface'];
	JSInterfacer.enableFor(this);

	this.defaultEventReceiver = defaultEventReceiver;
	this.appEventGenerator = appEventGenerator;
}

EventSource.prototype.sendEvent = function(appEvent, destinationReceiver) {
	// use defaultEventReceiver if it is configured for this instance
	if (!destinationReceiver) {
		destinationReceiver = this.defaultEventReceiver;
	}
	// skip calling receiver, when it is invalid
	if (destinationReceiver || !destinationReceiver.doesImplement('EventReceiverInterface')) {
		destinationReceiver.receiveAppEvent(appEvent);
	}
	return this;
};

EventSource.prototype.publishAppEvent = function(eventType, payload) {
	var appEvent;

	if (this.appEventGenerator && this.appEventGenerator.doesImplement('AppEventGeneratorInterface')) {
		appEvent = this.appEventGenerator.createAppEvent(eventType, payload);
	}
	if (appEvent) {
		this.sendEvent(appEvent);
	}
	return this;
};