/*
	RetroTanks v1.x
	Eric J Nesser, March 2014
 */

'use strict';

/* global Meteor: true */
/* global Session: true */
/* global _: true */

var gs = Meteor.gameSpace = Meteor.gameSpace || {};

//represents an animated entity
gs.animatedEntity = {

	//initialize
	init: function () {
		this.x = this.x || 0;
		this.y = this.y || 0;
		this.width = this.width || 0;
		this.height = this.height || 0;
		this.speed = this.speed || 5;
		this.mod = this.mod || 0;
		this.angle = this.angle || 0;
		this.fillStyle = this.fillStyle || 'rgb(255, 255, 255)';
		this.userId = this.userId || '';
	},

	//update properties from Mongo document
	updateFromDoc: function (doc) {
		if (doc) {
			this._id = doc._id;
			this.width = doc.width;
			this.height = doc.height;
			this.x = doc.x;
			this.y = doc.y;
			this.id = doc._id;
			this.speed = doc.speed;
			this.angle = doc.angle;
			this.fillStyle = doc.fillStyle;
			this.userId = doc.userId;
		}
	},

	//move forward
	moveForward: function (obstacles, moveCallback, collideCallback) {
		this.mod = 1;
		this.updatePosition(obstacles, moveCallback, collideCallback);
	},

	//move back
	moveBack: function (obstacles, callback) {
		this.mod = -1;
		this.updatePosition(obstacles, callback);
	},

	//rotate left
	rotateLeft: function () {
		this.angle -= 5;
	},

	//rotate right
	rotateRight: function () {
		this.angle += 5;
	},

	//stop
	stop: function () {
		this.mod = 0;
	},

	//update position
	updatePosition: function (obstacles, moveCallback, collideCallback) {

		var pX = this.x + ((this.speed * this.mod) *
			Math.cos(Math.PI / 180 * this.angle));

		var pY = this.y + (this.speed * this.mod) *
			Math.sin(Math.PI / 180 * this.angle);

		if (obstacles) {

			var obstacle = null;

			for (var i = 0; i < obstacles.length; i++) {
				obstacle = obstacles[i];

				if (obstacle.userId !== this.userId &&
					obstacle.isInHitBox(pX, pY, this.width, this.height)) {

					if (collideCallback) {
						collideCallback(this, obstacle);
					}
					return;
				}
			}
		}

		this.x = pX;
		this.y = pY;

		if (moveCallback) {
			moveCallback(this);
		}
	},

	//does entity belong to current player?
	isOwner: function () {
		return this.userId === Session.get('sessionId');
	}
};

_.extend(gs.animatedEntity, gs.abstractEntity);