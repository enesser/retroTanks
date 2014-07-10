'use strict';

/* global Meteor: true */
var gs = Meteor.gameSpace = Meteor.gameSpace || {};

//synchrnonizes entities in an animation frame
gs.frame = {
	sync: function (scene, context) {
		if (gs.bulletStore && gs.tankStore) {

			var tanks = gs.tankStore.getAll();
			var bullets = gs.bulletStore.getAll();

			//draw scene on the clients
			if (Meteor.isClient) {
				scene.draw(context, tanks, bullets);
			}

			if (Meteor.isServer) {
				gs.bulletMover.moveBullets(scene.walls, tanks, bullets);
			}
		}
	}
};