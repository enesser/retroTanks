'use strict';

/* global Meteor: true */
var gs = Meteor.gameSpace = Meteor.gameSpace || {};
var context;

/**
 * Main game loop, runs at ~30 FPS.
 */
function gameLoop() {
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

		if (Meteor.isServer) {
			//handle bullet movement and collisions
			gs.ballistics.update(gs.scene.walls, tanks, bullets);

			//respawn tanks
			if (gs.tankService && gs.spawner && gs.spawner.respawnCount === 0) {
				var tanks = gs.tankService.getAll();
				var tank, elapsedDamageTimeInSeconds;

				for (var i in tanks) {
					tank = tanks[i];
					if (tank.damageTime) {
						elapsedDamageTimeInSeconds = (new Date().getTime() - new Date(tank.damageTime).getTime()) / 1000;
						if (elapsedDamageTimeInSeconds >= 3) {
							tanks[i].damageTime = null;
							gs.spawner.respawnTank(tank);
						}
					}
				}
			}
		}
	}
}

Meteor.setInterval(gameLoop, 33);