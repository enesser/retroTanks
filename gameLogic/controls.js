'use strict';

/* global Meteor: true */
var gs = Meteor.gameSpace = Meteor.gameSpace || {};

gs.controls = {
	keyUpHandler: function (event) {
		var myTank = gs.tankService.getMyTank();
		if (event.keyCode === 32 || event.keyCode === 13) { //space, enter
			if (myTank && !myTank.isDamaged()) {
				var bullet = new gs.Bullet();
				bullet.x = myTank.x + (myTank.width * 0.5);
				bullet.y = myTank.y + (myTank.height * 0.5);
				bullet.angle = myTank.angle;
				bullet.userId = myTank.userId;
				bullet.mod = myTank.mod;
				gs.bulletService.add(bullet);
			}
			event.preventDefault();
			event.stopPropagation();
			return false;
		}
	},
	keyPressHandler: function (event) {
		var myTank = gs.tankService.getMyTank();
		if (myTank && !myTank.isDamaged()) {
			if (event.keyCode === 87 || event.keyCode === 38) { //W, up
				myTank.moveForward(gs.scene.walls);
				gs.tankService.updateLocation(myTank);
				event.preventDefault();
				event.stopPropagation();
			}
			if (event.keyCode === 83 || event.keyCode === 40) { //S, down
				myTank.moveBack(gs.scene.walls);
				gs.tankService.updateLocation(myTank);
				event.preventDefault();
				event.stopPropagation();
			}
			if (event.keyCode === 65 || event.keyCode === 37) { //A, left
				myTank.rotateLeft();
				gs.tankService.updateLocation(myTank);
				event.preventDefault();
				event.stopPropagation();
			}
			if (event.keyCode === 68 || event.keyCode === 39) { //D, right
				myTank.rotateRight();
				gs.tankService.updateLocation(myTank);
				event.preventDefault();
				event.stopPropagation();
			}
		}
	}
};