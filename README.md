RetroTanks
==========

RetroTanks: Atari Combat Reimagined, built in Meteor.

## Overview
RetroTanks is a project I wrote to learn [Meteor](https://www.meteor.com/ "Meteor"). It's based on Atari Combat
(1977), which originally supported two players. Against my better judgement,
RetroTanks supports an unlimited number of players. There are currently four
spawn points, but you can always add more.

This is a great isomorphic JavaScript example. The grand majority of the codebase runs
on both client and server. You can blow out some of the principles I have here to combat
cheating on the server side, create AI bots, and have in-depth front-side unit testing.

![combat](https://cloud.githubusercontent.com/assets/5659221/9772340/2ceab08a-5701-11e5-9397-6694fcaf1e8f.gif)

## Instructions
- Press (w) or (↑) to move forward.
- Press (s) or (↓) to move back.
- Press (d) or (→) to rotate right.
- Press (a) or (←) to rotate left.
- Press (space) or (enter) to fire.
- Press (x) to toggle scan lines effect.

## Installation
You must have Meteor installed to run RetroTanks. Instructions can be found at [https://www.meteor.com/install](https://www.meteor.com/install).

Once installed, you simply need to clone this repository and run ``meteor``!

```sh
$ git clone https://github.com/enesser/retroTanks.git
$ cd retroTanks
$ meteor
```

## Contributions
I'd be honored to have you contribute to this project. Check the issues board or come up
with your own cool ideas and send me pull requests!

Feel free to contact me about this project. I loved doing it.

## License
Copyright (c) 2014 Eric J Nesser
MIT
