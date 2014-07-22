'use strict';

/* global Meteor: true */
var gs = Meteor.gameSpace = Meteor.gameSpace || {};

//move callback
function onMove(sender) {
	gs.bulletService.updateLocation(sender);
}

//collide callback
function onCollide(sender, obstacle) {
	gs.bulletService.remove(sender);
}

gs.ballistics = {

	//move bullets
	update: function (walls, tanks, bullets) {
		for (var i in bullets) {
			bullets[i].moveForward(walls.concat(tanks), onMove, onCollide);
		}
	}
};