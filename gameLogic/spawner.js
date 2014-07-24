'use strict';

/* global Meteor: true */
/* global Session: true */
/* global bootbox: true */
var gs = Meteor.gameSpace = Meteor.gameSpace || {};

/**
 * Attempt a spawn at preferred spawn index
 * @param  {object} myTank
 * @param  {number} preferredSpawnIndex
 * @param  {function} callback
 */
function attemptSpawn(myTank, preferredSpawnIndex, callback) {
	var spawnPoints = gs.scene.spawnPoints;
	var spawnIndex = preferredSpawnIndex;
	var spawnPoint = spawnPoints[preferredSpawnIndex];

	var spawnInterval = Meteor.setInterval(function () {
		var allTanks = gs.tankService.getAll();
		var goodSpawnPoint;

		if (!spawnPoint) {
			spawnIndex = 0;
			spawnPoint = spawnPoints[spawnIndex];
		}

		goodSpawnPoint = true;

		//make sure tank doesn't spawn on top of an existing tank in the scene
		for (var i = 0; i < allTanks.length; i++) {
			if (allTanks[i].isInHitBox(spawnPoint.x, spawnPoint.y, myTank.width, myTank.height)) {
				goodSpawnPoint = false;
				break;
			}
		}

		//we have a good spawn point, trigger callback
		if (goodSpawnPoint) {
			Meteor.clearInterval(spawnInterval);
			if (callback) {
				callback(spawnPoint);
			}
		} else {
			spawnPoint = spawnPoints[++spawnIndex];
		}
	}, 200);
}

gs.spawner = {

	/**
	 * Spawn tank into the scene
	 */
	spawnTank: function () {
		var self = this;
		var myTank = gs.tankService.getMyTank();
		if (!myTank) {
			bootbox.setDefaults({
				closeButton: false,
				animate: true
			});
			myTank = new gs.Tank();

			bootbox.prompt('What is your name?', function (result) {
				if (result) {
					if (result.length > 10) {
						result = result.substr(0, 10) + '...';
					}
					myTank.playerName = result;
					Session.set('sessionId', Meteor.uuid());
					myTank.userId = Session.get('sessionId');

					var tankCount = gs.tankService.getAll().length;

					if (tankCount === 1) {
						myTank.fillStyle = 'rgb(0,255,0);';
					} else if (tankCount === 2) {
						myTank.fillStyle = 'rgb(0,0,255);';
					} else if (tankCount === 3) {
						myTank.fillStyle = 'rgb(100,100,100);';
					}

					//attempt a spawn
					attemptSpawn(myTank, tankCount - 1, function (spawnPoint) {
						myTank.x = spawnPoint.x;
						myTank.y = spawnPoint.y;
						myTank.angle = spawnPoint.angle;
						myTank._id = gs.tankService.add(myTank);

						//attach controls
						Meteor.setTimeout(function () {
							window.addEventListener('keyup', gs.controls.keyUpHandler, false);
							window.addEventListener('keydown', gs.controls.keyPressHandler, false);
						}, 250);
					});
				} else {
					self.spawnTank();
				}
			});
		}
	}
};