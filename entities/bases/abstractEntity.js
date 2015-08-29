/*
	RetroTanks v1.x
	Eric J Nesser, March 2014
 */

'use strict';

/* global Meteor: true */
var gs = Meteor.gameSpace = Meteor.gameSpace || {};

//represents an abstract entity
gs.abstractEntity = {

	//is coordinate in hitbox?
	isInHitBox: function (x, y, width, height) {
		return !(
			((y + height) < (this.y)) ||
			(y > (this.y + this.height)) ||
			((x + width) < this.x) ||
			(x > (this.x + this.width))
		);
	}
};