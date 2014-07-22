'use strict';

/* global Meteor: true */
/* global _: true */
var gs = Meteor.gameSpace = Meteor.gameSpace || {};

//represents a player's tank
gs.Tank = function () {

	//defaults
	this.width = 47;
	this.height = 33;
	this.userId = '';
	this.score = 0;
	this.playerName = '';
	this.damageTime = null;
	gs.animatedEntity.init.call(this);
};

//populate object with mongo document
gs.Tank.updateFromDoc = function (doc) {
	if (doc) {
		this.score = doc.score;
		this.playerName = doc.playerName;
		this.damageTime = doc.damageTime;
		gs.animatedEntity.updateFromDoc.call(this, doc);
	}
};

_.extend(gs.Tank.prototype, gs.animatedEntity);
var proto = gs.Tank.prototype;

//is damaged?
proto.isDamaged = function () {
	if (this.damageTime) {
		return true;
	}
	return false;
};

//draw tank
//node-drawille-canvas for debugging canvas on the console
proto.draw = function (context) {

	var cx = this.x + 0.5 * this.width;
	var cy = this.y + 0.5 * this.height;

	context.save();
	context.translate(cx, cy);
	context.rotate(this.angle * Math.PI / 180);
	context.translate(-cx, -cy);
	context.fillStyle = this.fillStyle;
	context.fillRect(this.x + 20, this.y + 14, 28, 6); //turret
	context.fillRect((this.x + 10), this.y + 6, 18, 24); //body
	context.fillRect((this.x + 0), this.y, 32, 8); //left track
	context.fillRect((this.x + 0), this.y + 26, 32, 8); //right track
	context.restore();
};