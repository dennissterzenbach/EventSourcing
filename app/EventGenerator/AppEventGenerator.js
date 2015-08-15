/**
 * @copyright (c) 2015 Dennis Sterzenbach.
 *
 * @author Dennis Sterzenbach <dennis.sterzenbach@gmail.com>
 */

function AppEventGenerator() {
	this.implementsInterfaces = ['AppEventGeneratorInterface'];
	JSInterfacer.enableFor(this);
}

AppEventGenerator.prototype.createAppEvent = function(type, payload) {
	var appEvent = new AppEvent();
	appEvent.type = type;
	if (payload) {
		appEvent.addPayload(payload);
	}

	return appEvent;
};