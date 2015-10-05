/*
    RetroTanks v1.x
    Eric J Nesser, March 2014
 */

'use strict';

/* global Meteor: true */
/* global Template: true */
let gs = Meteor.gameSpace || {};

//scoreboard
if (Meteor.isClient) {

    Template.playArea.helpers({

        //show score on template
        tanks: () => {
            if (gs.tankService) {
                return gs.tankService.getCursor();
            }
        }
    });

    //spawn tank
    Template.playArea.rendered = () => {
        Meteor.setTimeout(() => {
            gs.spawner.spawnTank();
        }, 250);
    };
}