'use strict';

/* global Meteor: true */
var gs = Meteor.gameSpace = Meteor.gameSpace || {};

//moves bullets in a scene
gs.bulletMover = {

	//move bullets
	moveBullets: function (walls, tankCollection, bulletCollection, tanks, bullets) {

		//on move
		function moveCallback(sender) {
			bulletCollection.update({
				_id: sender._id
			}, {
				$set: {
					x: sender.x,
					y: sender.y,
					angle: sender.angle,
					mod: sender.mod
				}
			});
		}

		//on collide
		function collideCallback(sender, obstacle) {
			if (obstacle.damage !== undefined) {
				obstacle.damage();
				tankCollection.update({
					_id: obstacle._id
				}, {
					$set: {
						damageTime: new Date()
					}
				});
			}
			console.log(obstacle);
			bulletCollection.remove({
				_id: sender._id
			});
		}

		for (var i in bullets) {
			bullets[i].moveUp(walls.concat(tanks), moveCallback, collideCallback);
		}
	}
};