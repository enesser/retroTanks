'use strict';

/* global Meteor: true */
/* global _: true */
var gs = Meteor.gameSpace = Meteor.gameSpace || {};

var TanksDataCollection = new Meteor.Collection('tanks');
var allTanks = [];

TanksDataCollection.find().observe({

	//add tank from a doc
	added: function (doc) {
		var tank = new gs.Tank();
		tank.updateFromDoc(doc);
		allTanks.push(tank);
	},

	//change a tank according to a doc
	changed: function (doc) {
		var changedTank = _.find(allTanks, function (tank) {
			if (tank._id === doc._id) {
				tank.updateFromDoc(doc);
				return tank;
			}
		});

		if (!changedTank) {
			allTanks.push(new gs.Tank(doc));
		}
	},

	//tank's doc has been removed, so remove tank
	removed: function (doc) {
		allTanks = _.reject(allTanks, function (tank) {
			return tank._id === doc._id;
		});
	}
});

gs.tankStore = {

	getAll: function () {
		return allTanks;
	},

	getMine: function () {

	},

	/**
	 * Add tank to the data store.
	 * @param {object} tank
	 */
	add: function (tank) {
		return TanksDataCollection.insert(tank);
	},

	update: function (tank) {
		TanksDataCollection.update({
			_id: tank._id
		}, {
			$set: {
				x: tank.x,
				y: tank.y,
				angle: tank.angle,
				mod: tank.mod
			}
		});
	}
};