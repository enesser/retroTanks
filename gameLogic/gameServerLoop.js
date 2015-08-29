/*
	RetroTanks v1.x
	Eric J Nesser, March 2014
 */

'use strict';

/* global Meteor: true */
var gs = Meteor.gameSpace = Meteor.gameSpace || {};

/**
 * Main game loop for server
 */
function gameServerLoop() {
	var tanks, bullets;

	if (gs.scene && gs.bulletService && gs.tankService) {
		tanks = gs.tankService.getAll();
		bullets = gs.bulletService.getAll();

		//handle bullet movement and collisions
		gs.ballistics.update(gs.scene.walls, tanks, bullets);

		//respawn tanks
		if (gs.tankService && gs.spawner && gs.spawner.respawnCount === 0) {
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

if (Meteor.isServer) {
	Meteor.setInterval(gameServerLoop, 30);
}