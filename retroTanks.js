/* global Meteor: true */
var gs = Meteor.gameSpace || {};

var Tanks = new Meteor.Collection('tanks');
var Bullets = new Meteor.Collection('bullets');

var context = null;

if (Meteor.isClient) {
	var canvas = document.getElementById('canvas');
	context = canvas.getContext("2d");
}

var scene = new gs.Scene();

function runThis() {
	gs.frame.sync(scene, context, Tanks, Bullets);
}

setInterval(runThis, 33);

if (Meteor.isClient) {
	Template.hello.greeting = function () {
		return "Welcome to retroTanks.";
	};

	Template.hello.rendered = function () {

		Session.set("sessionId", gs.guid());

		tank = new gs.Tank();
		tank.userId = Session.get("sessionId");
		gs.myTank = tank;
		gs.myTank.x = 25;
		gs.myTank.y = 200;

		var tankCount = Tanks.find({}).fetch().length;

		if (tankCount == 1) {
			tank.fillStyle = 'rgb(0,255,0);'
		} else if (tankCount == 2) {
			tank.fillStyle = 'rgb(0,0,255);'
		} else if (tankCount == 3) {
			tank.fillStyle = 'rgb(100,100,100);'
		}

		console.log(tankCount);
		console.log(tank.fillStyle);

		gs.myDoc = Tanks.insert(tank,
			function (err) {});

		//run game loop at ~30 FPS
		var gameLoop =
			setInterval(function () {
				gs.frame.sync(scene, context, Tanks, Bullets);
			}, 33);

		function keyup_handler(event) {
			if (event.keyCode == 87 || event.keyCode == 83) {
				gs.myTank.stop();
				Tanks.update({
					_id: gs.myDoc
				}, {
					$set: {
						x: gs.myTank.x,
						y: gs.myTank.y,
						angle: gs.myTank.angle,
						mod: gs.myTank.mod
					}
				});
			}

			if (event.keyCode == 32) {
				//gs.myTank.fire();

				var bullet = new gs.Bullet();

				bullet.x = gs.myTank.x + (gs.myTank.width * 0.5);
				bullet.y = gs.myTank.y + (gs.myTank.height * 0.5);
				bullet.angle = gs.myTank.angle;
				bullet.userId = Session.get("sessionId");
				bullet.mod = gs.myTank.mod;

				var doc = Bullets.insert(bullet);

				// console.log('bullet!');
				// var bullet = new gs.Bullet();
				// var bulletOrigin = gs.myTank.bulletOrigin;

				// console.dir(bulletOrigin);

				// bullet.x = bulletOrigin.x;
				// bullet.y = bulletOrigin.y;
				// bullet.fillStyle = 'rgb(255,255,255)';
				// bullet.angle = bulletOrigin.angle;

				// bullet.userId = 'TEST BULLET';
				// console.dir(Bullets.insert(bullet, function (err) {}));
			}
		}

		function keypress_handler(event) {

			if (event.keyCode == 87) { //W
				gs.myTank.moveUp(scene.walls);
				Tanks.update({
					_id: gs.myDoc
				}, {
					$set: {
						x: gs.myTank.x,
						y: gs.myTank.y,
						angle: gs.myTank.angle,
						mod: gs.myTank.mod
					}
				});
			}
			if (event.keyCode == 83) { //S
				gs.myTank.moveDown(scene.walls);
				Tanks.update({
					_id: gs.myDoc
				}, {
					$set: {
						x: gs.myTank.x,
						y: gs.myTank.y,
						angle: gs.myTank.angle,
						mod: gs.myTank.mod
					}
				});
			}
			if (event.keyCode == 65) { //A
				gs.myTank.rotateLeft();
				Tanks.update({
					_id: gs.myDoc
				}, {
					$set: {
						x: gs.myTank.x,
						y: gs.myTank.y,
						angle: gs.myTank.angle,
						mod: gs.myTank.mod
					}
				});
			}
			if (event.keyCode == 68) { //D
				gs.myTank.rotateRight();
				Tanks.update({
					_id: gs.myDoc
				}, {
					$set: {
						x: gs.myTank.x,
						y: gs.myTank.y,
						angle: gs.myTank.angle,
						mod: gs.myTank.mod
					}
				});
			}
		}

		window.addEventListener("keydown", keypress_handler, false);
		window.addEventListener("keyup", keyup_handler, false);
	}
}

if (Meteor.isServer) {
	Meteor.startup(function () {
		// code to run on server at startup
	});

	Tanks.allow({
		insert: function (userId, site) {
			console.log(userId);
			console.log(site);
			return true;
		},
		update: function (userId, site) {
			console.log(userId);
			console.log(site);
			return true;
		}
	});
}