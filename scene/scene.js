'use strict';

/* global Meteor: true */
var gs = Meteor.gameSpace || {};

//represents the scene
gs.Scene = function () {

	var proto = gs.Scene.prototype;
	proto.width = 800;
	proto.height = 400;

	var levels = new gs.Levels(proto.width, proto.height);

	//get walls
	proto.walls = levels.defaultLevel.walls;

	proto.draw = function (context, tanks, bullets) {
		if (context) {
			context.fillStyle = 'rgb(0, 0, 200)';
			context.fillRect(0, 0, proto.width, proto.height);

			//specify drawing order, walls first
			var entities = proto.walls.concat(bullets, tanks);

			for (var i=0; i<entities.length; i++) {
				entities[i].draw(context);
			}
		}
	};
};