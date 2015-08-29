/*
	RetroTanks v1.x
	Eric J Nesser, March 2014
 */

'use strict';

/* global Meteor: true */
/* global Session: true */
var gs = Meteor.gameSpace = Meteor.gameSpace || {};
var myTank;

gs.tankService = gs.entityService('tanks', gs.Tank);

/**
 * Get tank for current player by session ID
 * @return {object} tank entity
 */
gs.tankService.getMyTank = function () {
	if (!myTank) {	
		var mySessionId = Session.get('sessionId');
		if (mySessionId) {
			myTank = gs.tankService.find({
				userId: mySessionId
			});
		}
	}
	return myTank;
};