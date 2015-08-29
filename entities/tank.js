/*
	RetroTanks v1.x
	Eric J Nesser, March 2014
 */

'use strict';

/* global Meteor: true */
/* global _: true */
var gs = Meteor.gameSpace = Meteor.gameSpace || {};

//represents a player's tank
gs.Tank = function () {

	//defaults
	this.width = 47;
	this.height = 33;
	this.speed = 5;
	this.userId = '';
	this.score = 0;
	this.playerName = '';
	this.damageTime = null;
	this.lastPing = new Date().getTime();
	gs.animatedEntity.init.call(this);
};

_.extend(gs.Tank.prototype, gs.animatedEntity);
var proto = gs.Tank.prototype;

//populate object with mongo document
proto.updateFromDoc = function (doc) {
	if (doc) {
		this.score = doc.score;
		this.playerName = doc.playerName;
		this.damageTime = doc.damageTime;
		this.lastPing = doc.lastPing;
		this.cssClass = doc.cssClass;
		gs.animatedEntity.updateFromDoc.call(this, doc);
	}
};

//is damaged?
proto.isDamaged = function () {

	return !!(this.damageTime);
	if (this.damageTime) {
		return true;
	}
	//!! console.log
	return false;
};

//damage tank
proto.damage = function() {
	this.damageTime = new Date().getTime();
};

//draw tank
proto.draw = function (context) {

	var cx = this.x + 0.5 * this.width;
	var cy = this.y + 0.5 * this.height;

	context.save();
	context.translate(cx, cy);
	context.rotate(this.angle * Math.PI / 180);
	context.translate(-cx, -cy);
	context.shadowBlur = 20; 
	context.shadowColor = '#000';
	context.fillStyle = this.fillStyle;
	context.fillRect((this.x + 10), this.y + 6, 18, 24); //body
	context.fillRect((this.x + 0), this.y, 32, 8); //left track
	context.fillRect((this.x + 0), this.y + 26, 32, 8); //right track
	context.fillRect(this.x + 20, this.y + 14, 28, 6); //turret
	context.restore();
};