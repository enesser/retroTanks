'use strict';

/* global Meteor: true */
var gs = Meteor.gameSpace || {};

//represents the levels
gs.Levels = function (width, height) {

	var proto = gs.Levels.prototype;

	proto.width = width;
	proto.height = height;

	proto.defaultLevel = {};

	//walls
	proto.defaultLevel.walls = [
		//exterior walls
		new gs.Wall(0, 0, proto.width, 14), //top
		new gs.Wall(0, 14, 14, proto.height - 28), //left
		new gs.Wall(proto.width - 14, 14, 14, proto.height - 28), //right
		new gs.Wall(0, proto.height - 14, proto.width, 14), //bottom

		//interior walls
		new gs.Wall(100, 100, 14, 200),
		new gs.Wall(80, 100, 20, 14),
		new gs.Wall(80, 286, 20, 14),
		new gs.Wall(714, 100, 20, 14),
		new gs.Wall(714, 286, 20, 14),
		new gs.Wall(700, 100, 14, 200)
	];
};