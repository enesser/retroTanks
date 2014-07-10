'use strict';

/* global Meteor: true */
var gs = Meteor.gameSpace = Meteor.gameSpace || {};

/*
gs.gameLoop = {
	run: function (scene, context, tankCollection, bulletCollection) {

    console.dir(gs.frame);
    gs.frame.sync(scene, context, tankCollection, bulletCollection);
    console.log('set interval...');

		setInterval(
			function() { gs.frame.sync(scene, context, tankCollection, bulletCollection) }, 33);
	}
};*/