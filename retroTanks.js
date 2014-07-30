/*
	RetroTanks v1.0
	Eric J Nesser, March 2014
 */

'use strict';

/* global Meteor: true */
/* global Template: true */
var gs = Meteor.gameSpace || {};

//scoreboard
if (Meteor.isClient) {

	//show score on template
	Template.playArea.tanks = function () {
		if (gs.tankService) {
			return gs.tankService.getCursor();
		}
	};

	//spawn tank
	Template.playArea.rendered = function () {
		Meteor.setTimeout(function () {
			gs.spawner.spawnTank();
		}, 250);
	};
}

if (Meteor.isServer) {
	Meteor.startup(function () {
		// code to run on server at startup
	});
}