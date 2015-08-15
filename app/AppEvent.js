/**
 * AppEvent - Model - This is what an application event should look like
 *
 * @copyright (c) 2015 Dennis Sterzenbach.
 *
 * @author Dennis Sterzenbach <dennis.sterzenbach@gmail.com>
 */

function AppEvent() {
	this.type = '';
	this.name = '';
	this.id = '';
	this.payloads = [];
	this.timestamp = 0;

	this.addPayload = function addPayLoad(payload) {
		this.payloads.push(payload);
		return this;
	};

	this.stamptime = function() {
		this.timestamp = new Date().getTime();
		return this;
	};
}
