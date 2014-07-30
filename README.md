RetroTanks v1.0
==========

RetroTanks: Atari Combat Reimagined, built in Meteor

## Overview
RetroTanks is a project I wrote to learn Meteor. It's based on Atari Combat
(1977), which originally supported two players. Against my better judgement,
RetroTanks supports an unlimited number of players. There are currently four
spawn points, but you can always add more.

## Demo
There's no concept of separate lobbies or arenas yet, so this will probably
be pure chaos. If you're into chaos, feel free to try out the demo version at
[http://retrotanks.meteor.com](http://retrotanks.meteor.com).

## Instructions
- Press (w) or (↑) to move forward.
- Press (s) or (↓) to move back.
- Press (d) or (→) to rotate right.
- Press (a) or (←) to rotate left.
- Press (space) or (enter) to fire.

There are no special instructions to get RetroTanks up and running. Just type
"meteor" or "meteor run" in the project directory and you should be good to go.

## Known Issues
- Hit detection and respawning can be a little glitchy every once in a while.
- MongoDB is used unconventionally here and should probably be switched out for another technology (like streams.) MongoDB kept up like a champ in a 12 player live demo, though.
- This game was written in about four hours. Many improvements can be made. Feel free to reach out to me if you're interested in improving
  the game.

## Contributions
I'd be honored to entertain your pull requests and issues.

## License
Copyright (c) 2014 Eric J Nesser
MIT
