/*
	RetroTanks v1.x
	Eric J Nesser, March 2014
 */

'use strict';

/* global Meteor: true */
var gs = Meteor.gameSpace = Meteor.gameSpace || {};
var context;

/**
 * Main game loop for client
 */
(function gameClientLoop() {

	if (Meteor.isClient) {
		var canvas, tanks, bullets;

		if (!context && Meteor.isClient) {
			canvas = document.getElementById('canvas');

			if (canvas) {
				context = canvas.getContext('2d');
			}
		}

		if (gs.scene && gs.bulletService && gs.tankService && gs.pingTool) {
			tanks = gs.tankService.getAll();
			bullets = gs.bulletService.getAll();

			//draw scene on the clients
			if (context) {
				gs.scene.draw(context, tanks, bullets);
				Meteor.defer(gs.pingTool.updateMyTankPing);
			}
		}
		window.requestAnimationFrame(gameClientLoop);
	}
})();