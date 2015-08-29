/*
	RetroTanks v1.x
	Eric J Nesser, March 2014
 */

'use strict';

/* global Meteor: true */
/* global _: true */
var gs = Meteor.gameSpace = Meteor.gameSpace || {};

gs.entityService = function (entityCollectionName, EntityConstructor) {
	var DataCollection = new Meteor.Collection(entityCollectionName);
	var allEntities = [];

	DataCollection.find().observe({

		//add an entity wrapper around doc
		added: function (doc) {
			var entity = new EntityConstructor();
			if (typeof entity.updateFromDoc === 'function') {
				entity.updateFromDoc(doc);
			}
			allEntities.push(entity);
		},

		//change an entity based on doc changes
		changed: function (doc) {
			var changedEntity = _.find(allEntities, function (entity) {
				if (entity._id === doc._id) {
					if (typeof entity.updateFromDoc === 'function') {
						entity.updateFromDoc(doc);
					}
					return entity;
				}
			});
			if (!changedEntity) {
				allEntities.push(new EntityConstructor(doc));
			}
		},

		//doc representing wrapped entity has been removed, remove entity
		removed: function (doc) {
			allEntities = _.reject(allEntities, function (entity) {
				return entity._id === doc._id;
			});
		}
	});

	return {

		/**
		 * Get all entities
		 * @return {array} all entities
		 */
		getAll: function () {
			return allEntities;
		},

		/**
		 * Get handle on data collection cursor
		 * @param  {object} sort
		 */
		getCursor: function(criteria, sort)
		{
			return DataCollection.find({}, { sort: sort });
		},

		/**
		 * Find entity by criteria
		 * @param  {[type]} criteria
		 * @return {[type]} entity matching criteria
		 */
		find: function (criteria) {
			return _.findWhere(allEntities, criteria);
		},

		/**
		 * Add entity
		 * @param {object} entity
		 */
		add: function (entity) {
			return DataCollection.insert(entity);
		},

		/**
		 * Update entity
		 * @param {object} entity
		 * @param {object} entity properties to update
		 */
		update: function (entity, doc) {
			DataCollection.update({
				_id: entity._id
			}, {
				$set: doc
			});
		},

		/**
		 * Update entity's location
		 * @param {object} entity
		 */
		updateLocation: function (entity) {
			this.update(entity, {
				x: entity.x,
				y: entity.y,
				angle: entity.angle,
				mod: entity.mod
			});
		},

		/**
		 * Remove an entity.
		 * @param {object} entity
		 */
		remove: function (entity) {
			DataCollection.remove({
				_id: entity._id
			});
		}
	};
};