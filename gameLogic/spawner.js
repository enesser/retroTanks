'use strict';

/* global Meteor: true */
/* global Session: true */
/* global _: true */
/* global bootbox: true */
var gs = Meteor.gameSpace = Meteor.gameSpace || {};

// possible respawn colors using Atari's color pallete
var respawnColors = [{
	cssClass: 'color1',
	fillStyle: 'rgb(156, 32, 32);'
}, {
	cssClass: 'color2',
	fillStyle: 'rgb(28, 32, 156);'
}, {
	cssClass: 'color3',
	fillStyle: 'rgb(250, 253, 0);'
}, {
	cssClass: 'color4',
	fillStyle: 'rgb(72, 0, 120);'
}, ];

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
	 * Respawn counter
	 * @type {Number}
	 */
	respawnCount: 0,

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

					var allTanks = gs.tankService.getAll();
					var tankCount = allTanks.length;

					//find unused color
					_.every(respawnColors, function (color) {
						if (!_.findWhere(allTanks, {
							cssClass: color.cssClass
						})) {
							myTank.cssClass = color.cssClass;
							myTank.fillStyle = color.fillStyle;
							return false;
						} else {
							return true;
						}
					});

					//attempt a spawn
					attemptSpawn(myTank, tankCount - 1, function (spawnPoint) {
						myTank.x = spawnPoint.x;
						myTank.y = spawnPoint.y;
						myTank.angle = spawnPoint.angle;
						myTank._id = gs.tankService.add(myTank);
						self.attachControls();
					});
				} else {
					self.spawnTank();
				}
			});
		}
	},

	/**
	 * Attach controls
	 */
	attachControls: function () {
		Meteor.setTimeout(function () {
			window.addEventListener('keyup', gs.controls.keyUpHandler, false);
			window.addEventListener('keydown', gs.controls.keyPressHandler, false);
		}, 250);
	},

	/**
	 * Respawn a tank after it's been damaged
	 */
	respawnTank: function (tank) {
		var self = this;
		var spawnPoints = gs.scene.spawnPoints;
		++self.respawnCount;
		attemptSpawn(tank, Math.floor(Math.random() * spawnPoints.length),
			function (spawnPoint) {
				gs.tankService.update(tank, {
					x: spawnPoint.x,
					y: spawnPoint.y,
					angle: spawnPoint.angle,
					damageTime: null
				});
				--self.respawnCount;
			});
	}
};