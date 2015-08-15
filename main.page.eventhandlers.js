/**
 * @copyright (c) 2015 Dennis Sterzenbach.
 *
 * @author Dennis Sterzenbach <dennis.sterzenbach@gmail.com>
 */

// TODO: Cleanup the approaches: only use 1 consistent way to configure instances with dependencies - either configure() or constructor-params!


/// UTILITY FUNCTIONS - these are only required to test the implementation interactively
window.Buttons = window.Buttons || {};
window.Buttons.sendButtonEvent = sendButtonEvent;
window.Buttons.replay = replayButtonEvent;
window.Buttons.replayAll = replayAllButtonEvent;
window.Buttons.marker = marker;
window.Buttons.changeEv = issueChangeEvent;

function issueChangeEvent() {
	var event = radds.appEventGenerator.createAppEvent('selection-changed', undefined);
	event.addPayload({
		value: 10,
		type: 'old'
	});
	event.addPayload({
		value: 500,
		type: 'new'
	});
	radds.eventReceiverValueChange.receiveAppEvent(event);
}

function sendButtonEvent(elem) {
	var eventType = elem.getAttribute('data-event-type');
	radds.eventSorcerer.publishAppEvent(eventType, elem);
}

// function sendEvent(eventType, payload) {
// 	var appEvent = radds.appEventGenerator.createAppEvent(eventType, payload);
// 	if (appEvent) {
// 		radds.eventSorcerer.sendEvent(appEvent);
// 	}
// }

function replayButtonEvent() {
	radds.defaultEventReceiver.replayHistory(radds.timestampMarker);
}

function replayAllButtonEvent() {
	radds.defaultEventReceiver.replayHistory(0);
}

function marker() {
	radds.timestampMarker = new Date().getTime();
}
