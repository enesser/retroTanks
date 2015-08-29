/*
    RetroTanks v1.x
    Eric J Nesser, March 2014
 */

'use strict';

/* global Meteor: true */
/* global Session: true */
/* global _: true */
var gs = Meteor.gameSpace = Meteor.gameSpace || {};

// possible respawn colors using Atari's color pallete
var respawnColors = [{
    cssClass: 'color1',
    fillStyle: 'rgb(207, 83, 83)'
}, {
    cssClass: 'color2',
    fillStyle: 'rgb(130, 134, 255)'
}, {
    cssClass: 'color3',
    fillStyle: 'rgb(250, 253, 0)'
}, {
    cssClass: 'color4',
    fillStyle: 'rgb(174, 102, 222)'
}, ];

/**
 * Attempt a spawn at preferred spawn index
 * @param  {object} myTank
 * @param  {number} preferredSpawnIndex
 * @param  {function} callback
 */
function attemptSpawn(myTank, preferredSpawnIndex, callback) {
    var spawnPoints = gs.scene.spawnPoints;
    var spawnIndex = preferredSpawnIndex;
    var spawnPoint = spawnPoints[preferredSpawnIndex];

    var spawnInterval = Meteor.setInterval(function() {
        var allTanks = gs.tankService.getAll();
        var goodSpawnPoint;

        if (!spawnPoint) {
            spawnIndex = 0;
            spawnPoint = spawnPoints[spawnIndex];
        }

        goodSpawnPoint = true;

        //make sure tank doesn't spawn on top of an existing tank in the scene
        for (var i = 0; i < allTanks.length; i++) {
            if (allTanks[i].isInHitBox(spawnPoint.x, spawnPoint.y, myTank.width, myTank.height)) {
                goodSpawnPoint = false;
                break;
            }
        }

        //we have a good spawn point, trigger callback
        if (goodSpawnPoint) {
            Meteor.clearInterval(spawnInterval);
            if (callback) {
                callback(spawnPoint);
            }
        } else {
            spawnPoint = spawnPoints[++spawnIndex];
        }
    }, 200);
}

gs.spawner = {

    /**
     * Respawn counter
     * @type {Number}
     */
    respawnCount: 0,

    /**
     * Spawn tank into the scene
     */
    spawnTank: function() {
        var self = this;
        var myTank = gs.tankService.getMyTank();

        if (!myTank) {

            myTank = new gs.Tank();

            //name dialog box
            var input = document.querySelector('.inputPlayerName');
            var focus = 50;

            var focusBug = Meteor.setInterval(function() {
                input.focus();

                //TODO: figure this ridiculous bug out later
                if (--focus <= 0) {
                    Meteor.clearInterval(focusBug);
                }
            }, 10);

            var button = document.querySelector('.inputPlayerName--button');
            button.addEventListener('click', function() {
                var result = input.value;

                var overlay = document.querySelector('.enterPlayerName');
                var dialog = document.querySelector('.enterPlayerName--dialog');

                //hide name dialog box after submit
                overlay.classList.add('hidden');
                dialog.classList.add('hidden');

                //truncate name if longer than 10 characters
                if (result) {
                    if (result.length > 10) {
                        result = result.substr(0, 10) + '...';
                    }

                    myTank.playerName = result;
                    Session.set('sessionId', Meteor.uuid());
                    myTank.userId = Session.get('sessionId');

                    var allTanks = gs.tankService.getAll();
                    var tankCount = allTanks.length;

                    //find a color
                    var c = 0;

                    for (var i=0; i<allTanks.length; i++) {
                        if (++c > respawnColors.length -1) {
                            c = 0;
                        }
                    }

                    myTank.cssClass = respawnColors[c].cssClass;
                    myTank.fillStyle = respawnColors[c].fillStyle;

                    //attempt a spawn
                    attemptSpawn(myTank, tankCount - 1, function(spawnPoint) {
                        myTank.x = spawnPoint.x;
                        myTank.y = spawnPoint.y;
                        myTank.angle = spawnPoint.angle;
                        myTank._id = gs.tankService.add(myTank);
                        self.attachControls();
                    });
                } else {
                    self.spawnTank();
                }

            });
        }
    },

    /**
     * Attach controls
     */
    attachControls: function() {
        Meteor.defer(function() {
            gs.controls.initialize();
            window.addEventListener('keyup', gs.controls.keyUpHandler, false);
            window.addEventListener('keydown', gs.controls.keyPressHandler, false);
        }, 250);
    },

    /**
     * Respawn a tank after it's been damaged
     */
    respawnTank: function(tank) {
        var self = this;
        var spawnPoints = gs.scene.spawnPoints;
        ++self.respawnCount;
        attemptSpawn(tank, Math.floor(Math.random() * spawnPoints.length),
            function(spawnPoint) {
                gs.tankService.update(tank, {
                    x: spawnPoint.x,
                    y: spawnPoint.y,
                    angle: spawnPoint.angle,
                    damageTime: null
                });
                --self.respawnCount;
            });
    }
};