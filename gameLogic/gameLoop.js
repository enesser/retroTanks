'use strict';

/* global Meteor: true */
var gs = Meteor.gameSpace = Meteor.gameSpace || {};
var context;

/*
Main game loop, runs at ~30 FPS.
 */
function gameLoop() {

	if (!context && Meteor.isClient) {
		var canvas = document.getElementById('canvas');

		if (canvas) {
			context = canvas.getContext('2d');
		}
	}

	if (gs.scene && gs.bulletService && gs.tankService && gs.pingTool) {

		var tanks = gs.tankService.getAll();
		var bullets = gs.bulletService.getAll();

		//draw scene on the clients
		if (context) {
			gs.scene.draw(context, tanks, bullets);
			Meteor.defer(gs.pingTool.updateMyTankPing);
		}

		//handle bullet movement and collisions
		if (Meteor.isServer) {
			gs.ballistics.update(gs.scene.walls, tanks, bullets);
		}
	}
}

Meteor.setInterval(gameLoop, 33);