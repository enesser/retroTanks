'use strict';

/* global Meteor: true */
/* global Template: true */
var gs = Meteor.gameSpace || {};

if (Meteor.isClient) {
	Template.playArea.tanks = function () {
		if (gs.tankService) {
			return gs.tankService.getCursor({
				score: -1
			});
		}
	};

	Template.playArea.rendered = function () {
		gs.spawner.spawnTank();
	};
}

if (Meteor.isServer) {
	Meteor.startup(function () {
		// code to run on server at startup
	});
}