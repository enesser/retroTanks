/*
	RetroTanks v1.x
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
	this.fillStyle = fillStyle || 'rgb(169, 125, 93)';
};

var proto = gs.Wall.prototype;
_.extend(proto, gs.abstractEntity);

//draw wall
proto.draw = function (context) {
	context.save();
	context.shadowBlur = 20; 
	context.shadowColor = '#000';
	context.fillStyle = this.fillStyle;
	context.fillRect(this.x, this.y, this.width, this.height);
	context.restore();
};