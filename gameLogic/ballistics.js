'use strict';

/* global Meteor: true */
var gs = Meteor.gameSpace = Meteor.gameSpace || {};

//moves bullets in a scene
gs.bulletMover = {

  //move bullets
  moveBullets: function (walls, tanks, bullets) {

    //on move
    function moveCallback(sender) {
      gs.bulletStore.update(sender);
    }

    //on collide
    function collideCallback(sender, obstacle) {
      /*
      if (obstacle.isDamaged !== undefined) {
        tankCollection.update({
          _id: obstacle._id
        }, {
          $set: {
            damageTime: new Date()
          }
        });
      }*/
/*
      gs.BulletsData.remove({
        _id: sender._id
      });*/
    }

    for (var i in bullets) {
      bullets[i].moveUp(walls.concat(tanks), moveCallback, collideCallback);
    }
  }
};