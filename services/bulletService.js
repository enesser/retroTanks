/*
	RetroTanks v1.x
	Eric J Nesser, March 2014
 */

'use strict';

/* global Meteor: true */
let gs = Meteor.gameSpace = Meteor.gameSpace || {};

gs.bulletService = gs.entityService('bullets', gs.Bullet);