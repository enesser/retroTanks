/*
	RetroTanks v1.0
	Eric J Nesser, March 2014
 */

'use strict';

/* global Meteor: true */
/* global _: true */
var gs = Meteor.gameSpace = Meteor.gameSpace || {};

//represents a wall, real exciting
gs.Wall = function (x, y, width, height, fillStyle) {
	//defaults
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.fillStyle = fillStyle || 'rgb(0, 0, 0)';
};

var proto = gs.Wall.prototype;
_.extend(proto, gs.abstractEntity);

//draw wall
proto.draw = function (context) {
	context.save();
	context.fillStyle = this.fillStyle;
	context.fillRect(this.x, this.y, this.width, this.height);
	context.restore();
};