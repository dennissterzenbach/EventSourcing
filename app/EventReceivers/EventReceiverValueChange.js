/**
 * @copyright (c) 2015 Dennis Sterzenbach.
 *
 * @author Dennis Sterzenbach <dennis.sterzenbach@gmail.com>
 */

function EventReceiverValueChange(baseEventReceiver) {
	this.implementsInterfaces = ['EventReceiverInterface'];
	JSInterfacer.enableFor(this);

	this.base = baseEventReceiver;

	this.defaultEventSource = undefined;
	this.appEventGenerator = undefined;

	this.receiveAppEvent = function(event) {
		var stateOld = event.payloads[0];
		var stateNew = event.payloads[1];

		var stateOldEvent = this.appEventGenerator.createAppEvent(event.type, stateOld);
		var stateNewEvent = this.appEventGenerator.createAppEvent(event.type, stateNew);

		// console.log(event, stateOld, stateNew, stateOldEvent, stateNewEvent);
		// TODO: do something fancy to the oldevent / newevent to mark them correctly

		baseEventReceiver.receiveAppEvent(stateOldEvent);
		baseEventReceiver.receiveAppEvent(stateNewEvent);
	};
}

EventReceiverValueChange.prototype = Object.create(EventReceiver);
EventReceiverValueChange.prototype.constructor = EventReceiverValueChange;

EventReceiverValueChange.prototype.configure = function(config) {
	this.defaultEventSource = config.defaultEventSource;
	this.appEventGenerator = config.appEventGenerator;
};
