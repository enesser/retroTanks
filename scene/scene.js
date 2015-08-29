/*
	RetroTanks v1.x
	Eric J Nesser, March 2014
 */

'use strict';

/* global Meteor: true */
var gs = Meteor.gameSpace || {};
var width = 800,
	height = 400;
var levels = new gs.Levels(width, height);

//represents the scene
gs.scene = {

	// walls
	walls: levels.defaultLevel.walls,

	// spawn points
	spawnPoints: levels.defaultLevel.spawnPoints,

	/**
	 * Draw scene.
	 * @param {[object]} canvas context
	 * @param {[object]} tanks
	 * @param {[object]} bullets
	 */
	draw: function (context, tanks, bullets) {
		if (context) {
			context.fillStyle = 'rgb(51, 111, 51)';
			context.fillRect(0, 0, width, height);

			//specify drawing order, walls first
			var entities = this.walls.concat(bullets, tanks);

			for (var i = 0; i < entities.length; i++) {
				entities[i].draw(context);
			}
		}
	}
};