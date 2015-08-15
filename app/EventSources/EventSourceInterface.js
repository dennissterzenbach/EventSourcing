/**
 * @copyright (c) 2015 Dennis Sterzenbach.
 *
 * @author Dennis Sterzenbach <dennis.sterzenbach@gmail.com>
 */

function EventSourceInterface() {
	this.implementsMethods = [
		'publishAppEvent',
		'sendEvent',
		'createAppEvent'
	];
}