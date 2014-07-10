'use strict';

/* global Meteor: true */
/* global _: true */
var gs = Meteor.gameSpace = Meteor.gameSpace || {};

var BulletsDataCollection = new Meteor.Collection('bullets');
var allBullets = [];

BulletsDataCollection.find().observe({

	//add bullet from a doc
	added: function (doc) {
		var bullet = new gs.Bullet();
		bullet.updateFromDoc(doc);
		allBullets.push(bullet);
	},

	//change a bullet according to a doc
	changed: function (doc) {
		var changedBullet = _.find(allBullets, function (bullet) {
			if (bullet._id === doc._id) {
				bullet.updateFromDoc(doc);
				return bullet;
			}
		});

		if (!changedBullet) {
			allBullets.push(new gs.Bullet(doc));
		}
	},

	//bullet's doc has been removed, so remove bullet
	removed: function (doc) {
		allBullets = _.reject(allBullets, function (bullet) {
			return bullet._id === doc._id;
		});
	}
});

gs.bulletStore = {

	getAll: function () {
		return allBullets;
	},

	/**
	 * Add bullet to the data store.
	 * @param {object} bullet
	 */
	add: function (bullet) {
		return BulletsDataCollection.insert(bullet);
	},

	update: function (bullet) {
		BulletsDataCollection.update({
			_id: bullet._id
		}, {
			$set: {
				x: bullet.x,
				y: bullet.y,
				angle: bullet.angle,
				mod: bullet.mod
			}
		});
	}
};