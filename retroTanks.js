/* global Meteor: true */
var gs = Meteor.gameSpace || {};

if (Meteor.isClient) {
	Template.playArea.greeting = function () {
		return "Welcome to retroTanks.";
	};

	Template.playArea.rendered = function () {
		gs.spawner.spawnTank();
	}
}

if (Meteor.isServer) {
	Meteor.startup(function () {
		// code to run on server at startup
	});
}