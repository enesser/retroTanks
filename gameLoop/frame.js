'use strict';

/* global Meteor: true */
var gs = Meteor.gameSpace = Meteor.gameSpace || {};

//synchrnonizes entities in an animation frame
gs.frame = {
	sync: function (scene, context, tankCollection, bulletCollection) {
		var allTanks = tankCollection.find({}).fetch();
		var allBullets = bulletCollection.find({}).fetch();
		var tanks = [];
		var bullets = [];

		//convert Mongo documents to entities
		for (var i in allTanks) {
			tanks.push(new gs.Tank(allTanks[i]));
		}

		for (i in allBullets) {
			bullets.push(new gs.Bullet(allBullets[i]));
		}

		//draw scene on the clients
		if (Meteor.isClient) {
			scene.draw(context, tanks, bullets);
		}

		if (Meteor.isServer) {
			gs.bulletMover.moveBullets(
				scene.walls,
				tankCollection,
				bulletCollection,
				tanks,
				bullets);
		}
	}
};