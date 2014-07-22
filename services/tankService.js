'use strict';

/* global Meteor: true */
var gs = Meteor.gameSpace = Meteor.gameSpace || {};

gs.tankService = gs.entityService('tanks', gs.Tank);