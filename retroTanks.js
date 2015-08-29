/*
    RetroTanks v1.x
    Eric J Nesser, March 2014
 */

'use strict';

/* global Meteor: true */
/* global Template: true */
var gs = Meteor.gameSpace || {};

//scoreboard
if (Meteor.isClient) {

    Template.playArea.helpers({

        //show score on template
        tanks: function() {
            if (gs.tankService) {
                return gs.tankService.getCursor();
            }
        }
    });

    //spawn tank
    Template.playArea.rendered = function() {
        Meteor.setTimeout(function() {
            gs.spawner.spawnTank();
        }, 250);
    };
}

if (Meteor.isServer) {
    Meteor.startup(function() {
        // code to run on server at startup
    });
}