'use strict';

/* global Meteor: true */
var gs = Meteor.gameSpace = Meteor.gameSpace || {};

gs.spawner = {

	spawnTank: function () {
		var self = this;
		var myTank = gs.tankService.getMyTank();
		if (!myTank) {
			bootbox.setDefaults({
				closeButton: false,
				animate: true
			});
			myTank = new gs.Tank();

			bootbox.prompt("What is your name?", function (result) {
				if (result) {
					myTank.playerName = result;
					Session.set("sessionId", Meteor.uuid());
					myTank.userId = Session.get("sessionId");
					myTank.x = 25;
					myTank.y = 200;

					var tankCount = gs.tankService.getAll().length;

					if (tankCount == 1) {
						myTank.fillStyle = 'rgb(0,255,0);'
					} else if (tankCount == 2) {
						myTank.fillStyle = 'rgb(0,0,255);'
					} else if (tankCount == 3) {
						myTank.fillStyle = 'rgb(100,100,100);'
					}

					myTank._id = gs.tankService.add(myTank);

					window.addEventListener("keyup", gs.controls.keyUpHandler, false);
					window.addEventListener("keydown", gs.controls.keyPressHandler, false);
				} else {
					self.spawnTank();
				}
			});
		}
	}
};