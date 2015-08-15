/**
 * @copyright (c) 2015 Dennis Sterzenbach.
 *
 * @author Dennis Sterzenbach <dennis.sterzenbach@gmail.com>
 */

// implements the Event Source logic:
function EventSourceEventBackend() { // a concrete EventDestination / EventBackend
	this.implementsInterfaces = ['EventReceiverBackendInterface', 'EventSourceBackendInterface'];

	this.eventStorage = new EventStorage();
	this.trackEvent = function trackEvent(event) {
		this.eventStorage.add(event);
	};
	JSInterfacer.enableFor(this);

	this.replay = function(sinceTimestamp) {
		var elems;

		if (sinceTimestamp > 0) {
			elems = this.eventStorage.getAllSince(sinceTimestamp);
		} else {
			elems = this.eventStorage.getAll();
		}

		console.group("replay");
		this.eventStorage.applyToAll(
			elems,
			function(i, elem) {
				console.log(i, elem);
			}
		);
		console.groupEnd();
	};

}

