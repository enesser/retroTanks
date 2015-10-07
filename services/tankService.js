/*
	RetroTanks v1.x
	Eric J Nesser, March 2014
 */

'use strict';

/* global Meteor: true */
/* global Session: true */
let gs = Meteor.gameSpace = Meteor.gameSpace || {};
let myTank;

gs.tankService = gs.entityService('tanks', gs.Tank);

/**
 * Get tank for current player by session ID
 * @return {object} tank entity
 */
gs.tankService.getMyTank = () => {
	if (!myTank) {	
		let mySessionId = Session.get('sessionId');
		if (mySessionId) {
			myTank = gs.tankService.find({
				userId: mySessionId
			});
		}
	}
	return myTank;
};