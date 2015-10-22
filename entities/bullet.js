/*
	RetroTanks v1.x
	Eric J Nesser, March 2014
 */

'use strict';

/* global Meteor, _: true */
let gs = Meteor.gameSpace = Meteor.gameSpace || {};

//represents a player's bullet
gs.Bullet = function () {

	//defaults
	this.width = 3;
	this.height = 3;
	this.speed = 20;
	this.fillStyle = 'rgb(255, 255, 255)';
	this.fireUpdateCallback = null;
	gs.animatedEntity.init.call(this);
};

_.extend(gs.Bullet.prototype, gs.animatedEntity);
let proto = gs.Bullet.prototype;

//draw bullet
proto.draw = function (context) {

	let cx = this.x + 0.5 * this.width;
	let cy = this.y + 0.5 * this.height;

	context.save();
	context.translate(cx, cy);
	context.rotate(this.angle * Math.PI / 180);
	context.translate(-cx, -cy);
	context.shadowBlur = 6;
	context.shadowColor = '#fff';
	context.fillStyle = this.fillStyle;
	context.fillRect(this.x, this.y, this.width, this.height);
	context.restore();

	if (this.isOwner && this.fireUpdateCallback) {
		this.fireUpdateCallback(this);
	}
};