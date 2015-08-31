/*
	RetroTanks v1.0
	Eric J Nesser, March 2014
 */

'use strict';

/* global Meteor: true */
/* global _: true */
var gs = Meteor.gameSpace = Meteor.gameSpace || {};
var pingTimeoutInSeconds = 5;
var pingRefreshInSeconds = 2;
var myLastPing = new Date().getTime();

/**
 * Remove tanks if inactive
 * @param  {object} tank
 */
function removeIfInactive(tank) {
	var elapsedTimeInSeconds = (new Date().getTime() - new Date(tank.lastPing).getTime()) / 1000;
	if (elapsedTimeInSeconds > pingTimeoutInSeconds) {
		gs.tankService.remove({
			_id: tank._id
		});
	}
}

gs.pingTool = {

	/**
	 * Update ping time for current player's tank
	 */
	updateMyTankPing: function () {
		var myTank = gs.tankService.getMyTank();

		if (myTank) {
			var elapsedTimeInSeconds = (new Date().getTime() - myLastPing) / 1000;
			if (elapsedTimeInSeconds >= pingRefreshInSeconds) {
				gs.tankService.update(myTank, {
					lastPing: new Date().getTime()
				});
				myLastPing = new Date().getTime();
			}
		}
	},

	/**
	 * Remove inactive tanks
	 */
	removeInactiveTanks: function () {
		_.each(gs.tankService.getAll(), removeIfInactive);
	}
};

if (Meteor.isServer) {
	Meteor.setInterval(gs.pingTool.removeInactiveTanks, 1000 * pingRefreshInSeconds);
}