/*
    RetroTanks v1.x
    Eric J Nesser, March 2014
 */

'use strict';

/* global Meteor: true */
var gs = Meteor.gameSpace || {};

//represents the levels
gs.Levels = function(width, height) {

    var proto = gs.Levels.prototype;

    proto.width = width;
    proto.height = height;

    /**
     * Default level.
     * @type {Object}
     */
    proto.defaultLevel = {};

    /**
     * Walls.
     * @type {Array}
     */
    proto.defaultLevel.walls = [
        //interior walls
        new gs.Wall(100, 100, 14, 200), //left
        new gs.Wall(680, 100, 14, 200), //right
        new gs.Wall((proto.width / 2) - 50, (proto.height / 2) - 40, 100, 80), //middle

        //exterior walls
        new gs.Wall(0, 14, 14, proto.height - 28), //left
        new gs.Wall(proto.width - 14, 14, 14, proto.height - 28), //right
        new gs.Wall(0, 0, proto.width, 14), //top
        new gs.Wall(0, proto.height - 14, proto.width, 14) //bottom
    ];

    /**
     * Spawn points.
     * @type {Array}
     */
    proto.defaultLevel.spawnPoints = [{
            x: 34, //outer left
            y: 180,
            angle: 0
        }, {
            x: 719, //outer right
            y: 180,
            angle: 180
        }, {
            x: 376, //inner bottom
            y: 260,
            angle: 270
        }, {
            x: 375, //inner top
            y: 108,
            angle: 90
        }, {
            x: 580, //top right
            y: 60,
            angle: 130
        }, {
            x: 182, //top left
            y: 60,
            angle: 40
        }, {
            x: 196, //bottom left
            y: 315,
            angle: -35
        }, {
            x: 579, //bottom right
            y: 315,
            angle: -140
        }
    ];
};