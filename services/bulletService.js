'use strict';

/* global Meteor: true */
var gs = Meteor.gameSpace = Meteor.gameSpace || {};

gs.bulletService = gs.entityService('bullets', gs.Bullet);