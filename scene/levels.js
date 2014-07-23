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
		//interior walls
		new gs.Wall(100, 100, 14, 200), //left
		new gs.Wall(680, 100, 14, 200), //right
		new gs.Wall((proto.width / 2) - 50, (proto.height / 2) - 40, 100, 80), //middle

		//exterior walls
		new gs.Wall(0, 0, proto.width, 14), //top
		new gs.Wall(0, 14, 14, proto.height - 28), //left
		new gs.Wall(proto.width - 14, 14, 14, proto.height - 28), //right
		new gs.Wall(0, proto.height - 14, proto.width, 14), //bottom
	];

	//spawn #1: 34, 180
	//spawn #2: 719, 180
	//spawn #3: 376, 260
	//spawn #4: 102, 378
};