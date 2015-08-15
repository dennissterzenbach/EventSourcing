/**
 * implements an storage to persist the App events
 *
 *
 * @copyright (c) 2015 Dennis Sterzenbach.
 *
 * @author Dennis Sterzenbach <dennis.sterzenbach@gmail.com>
 */

function EventStorage() {
	this.events = [];
}

EventStorage.getCurrentTimestamp = function() {
	return new Date().getTime();
};

EventStorage.prototype.add = function(event) {
	this.events.push(event);
};

EventStorage.prototype.getAll = function() {
	return this.events;
};

/**
 * Get all events since given timestamp
 * @param	int	timestamp
 * @return	Array
 */
EventStorage.prototype.getAllSince = function(timestamp) {
	return _.filter(this.events, sinceTimestampFilter);

	function sinceTimestampFilter(value, key, collection) {
		return value.timestamp > timestamp;
	}
};

EventStorage.prototype.getEventAt = function(index) {
	if (!this.events || !this.events[index]) {
		return null;
	}
	// return unpack(this.events[index]);
	return this.events[index];
};

/**
 * Applies given function to all elements in source.
 * @param	Array source
 * @param	function(index, element)
 */
EventStorage.prototype.applyToAll = function(source, func) {
	if (typeof func === 'function') {
		for (var i in source) {
			func(i, source[i]);
		}
	}
	return this;
};


EventStorage.prototype.snapshot = function() {
	var snapshot = {
		timestamp: EventStorage.getCurrentTimestamp()
	};

	// TODO : do what is needed to snapshot current state
};
