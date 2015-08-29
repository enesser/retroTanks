/*
    RetroTanks v1.x
    Eric J Nesser, March 2014
 */

'use strict';

/* global Meteor: true */
var gs = Meteor.gameSpace = Meteor.gameSpace || {};

gs.controls = {
    scanlines: true,
    keyMap: {},

    //initialize controls
    initialize: function() {
        Meteor.setInterval(function() {
            var myTank = gs.tankService.getMyTank();
            if (myTank && !myTank.isDamaged()) {
                if (gs.controls.keyMap[87] || gs.controls.keyMap[38]) { //W, up
                    myTank.moveForward(gs.scene.walls);
                    gs.tankService.updateLocation(myTank);
                }
                if (gs.controls.keyMap[83] || gs.controls.keyMap[40]) { //S, down
                    myTank.moveBack(gs.scene.walls);
                    gs.tankService.updateLocation(myTank);
                }
                if (gs.controls.keyMap[65] || gs.controls.keyMap[37]) { //A, left
                    myTank.rotateLeft();
                    gs.tankService.updateLocation(myTank);
                }
                if (gs.controls.keyMap[68] || gs.controls.keyMap[39]) { //D, right
                    myTank.rotateRight();
                    gs.tankService.updateLocation(myTank);
                }
            }
        }, 40);
    },

    //key up
    keyUpHandler: function(event) {
        var myTank = gs.tankService.getMyTank();
        gs.controls.keyMap[event.keyCode] = false;

        if (event.keyCode === 32 || event.keyCode === 13) { //space, enter
            if (myTank && !myTank.isDamaged()) {
                var bullet = new gs.Bullet();
                bullet.x = myTank.x + (myTank.width * 0.5);
                bullet.y = myTank.y + (myTank.height * 0.5);
                bullet.angle = myTank.angle;
                bullet.userId = myTank.userId;
                bullet.mod = myTank.mod;
                gs.bulletService.add(bullet);
                event.stopPropagation();
                event.preventDefault();
            }
        }

        if (event.keyCode === 88) { //X, scan line toggle
            gs.scanlines = !gs.scanlines;
            var body = document.getElementsByTagName('body')[0];
            body.className = (gs.scanlines ? 'scanlines' : '');
            event.stopPropagation();
            event.preventDefault();
        }
    },

    //key press
    keyPressHandler: function(event) {
        gs.controls.keyMap[event.keyCode] = true;

        //prevent browser scrolling on up and down keys
        if (event.keyCode === 38 || event.keyCode === 40) {
            event.stopPropagation();
            event.preventDefault();
        }
    }
};