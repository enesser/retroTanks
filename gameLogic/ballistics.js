'use strict';

/* global Meteor: true */
var gs = Meteor.gameSpace = Meteor.gameSpace || {};

//move callback
function onMove(sender) {
	gs.bulletService.updateLocation(sender);
}

//collide callback
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

	//move bullets
	update: function (walls, tanks, bullets) {
		var tank;

		for (var i in bullets) {
			bullets[i].moveForward(walls.concat(tanks), onMove, onCollide);
		}

		for (var i in tanks) {
			tank = tanks[i];
			if (tank.isDamaged()) {
				for (var j = 0; j < 5; j++) {
					tank.rotateRight();
				}
				gs.tankService.updateLocation(tank);
			}
		}
	}
};