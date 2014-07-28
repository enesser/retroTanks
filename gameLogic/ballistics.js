'use strict';

/* global Meteor: true */
var gs = Meteor.gameSpace = Meteor.gameSpace || {};

/**
 * On bullet move
 * @param  {object} sender
 */
function onMove(sender) {
	gs.bulletService.updateLocation(sender);
}

/**
 * On bullet collision
 * @param  {object} sender
 * @param {object} obstacle
 */
function onCollide(sender, obstacle) {
	var awardedTank;
	gs.bulletService.remove(sender);

	if (obstacle && typeof obstacle.damage === 'function') {
		if (!obstacle.isDamaged()) {
			obstacle.damage();
			gs.tankService.update(obstacle, {
				damageTime: obstacle.damageTime
			});

			awardedTank = gs.tankService.find({
				userId: sender.userId
			});

			if (awardedTank) {
				gs.tankService.update(awardedTank, {
					score: ++awardedTank.score
				});
			}
		}
	}
}

gs.ballistics = {

	/**
	 * Update bullet movement
	 * @param  {Array} walls
	 * @param  {Array} tanks
	 * @param  {Array} bullets
	 */
	update: function (walls, tanks, bullets) {
		var bullet;
		var tank;

		for (var i in bullets) {
			bullet = bullets[i];

			if (bullet.x > 0 && bullet.y > 0 && bullet.x < 1000 && bullet.y < 1000) {
				bullet.moveForward(walls.concat(tanks), onMove, onCollide);
			} else {
				gs.bulletService.remove(bullet);
			}
		}

		for (var i in tanks) {
			tank = tanks[i];
			if (tank.isDamaged()) {
				for (var j = 0; j < 3; j++) {
					tank.rotateRight();
				}
				gs.tankService.updateLocation(tank);
			}
		}
	}
};