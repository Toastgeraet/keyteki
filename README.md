# Keyteki


Web based implementation of Keyforge: the Unique Deck Game

## FAQ

### What is it?

This is the respository for the code internally known as keyteki which is running on [thecrucible.online](https://thecrucible.online/) allowing people to play KeyForge online using only their browser

### Does't this look a lot like Jinteki/Throneteki? The Android netrunner/AGOT online experience?

Glad you noticed!  Yes, jinteki was a huge inspiration for this project, as the interface is clean and user friendly, so I've tried to make this similar in a lot of ways

Keyteki is a fork of the ringteki sourcecode

### Can I contribute?

Sure!  The code is written in node.js(server) and react.js(client).  Feel free to make suggestions, implement new cards, refactor bits of the code that are a bit clunky(there's a few of those atm), raise pull requests or submit bug reports

If you are going to contribute code, try and follow the style of the existing code as much as possible and talk to me before engaging in any big refactors.  Also bear in mind there is an .eslintrc file in the project so try to follow those rules.

[Documentation for implementing cards](https://github.com/keyteki/keyteki/blob/master/docs/implementing-cards.md)

There is also a list of events raised by the code [here](https://docs.google.com/spreadsheets/d/1gJEGGwZcbVoUZnuc0zkKNblleVP0qoMWUQOvI_8G3mQ/edit?usp=sharing). If you're writing abilities which listen for these events, it tells you what parameters the event has and whether it has a handler.  If you're writing code which calls any of these events, please make sure you pass the same parameters.

The biggest help at the moment would be in terms of CSS, as that's a bit of a weakness of mine, feel free to pick up any of the issues tagged 'CSS' in the issue list.

If you're not coding inclined, then just playing games on the site, and reporting bugs and issues that you find is a big help

### X Y Z doesn't work
That's not a question, but that still sucks, sorry :(  First, bear in mind the site is in its infancy so a lot of things aren't implemented yet, but you should be able to do most things with a bit of manual input.  If there's anything you can't do that you need to be able to do, let me know by raising an issue.

See this document for features I have planned and a link to the currently implemented cards:  

### How do I do X Y Z?

Check out the [About page](https://thecrucible.online/about) of Keyteki live deployment.

## Development

### Docker
If you have docker installed, you can use the containerised version of the site.

```
Clone the repository
git submodule init
git submodule update
docker-compose up

(in another terminal)
docker-compose exec lobby bash
node server/scripts/fetchdata
```

### Non Docker
#### Required Software
* Git
* Node.js 8
* MongoDB
* ZeroMQ Libraries

```
Clone the repository
git submodule init
git submodule update
npm install # See https://github.com/JustinTulloss/zeromq.node/issues/283 for zmq errors on OS X
mkdir server/logs
node server/scripts/fetchdata.js
npm run build-vendor-dev
node .
node server/gamenode
```

There are two exectuable components and you'll need to configure/run both to run a local server.  First is the lobby server and then there are game nodes. The default configurations assume you are running mongo locally on the default port. If you need to change any configurations, edit `config/default.json5` or create a `config/local.json5` configuration that overrides any desired settings.   

For production:

```
npm run build-vendor
npm run build
NODE_ENV=production PORT=4000 node .
```

Then for each game node (typically one per CPU/core):

```
PORT={port} SERVER={node-name} node server/gamenode
```

### Coding Guidelines

All JavaScript code included in Ringteki should pass (no errors, no warnings)
linting by [ESLint](http://eslint.org/), according to the rules defined in
`.eslintrc` at the root of this repo. To manually check that that is indeed the
case install ESLint and run

```
eslint client/ server/ test/
```

from repository's root.

All tests should also pass.  To run these manually do:

```
npm test
```

If you are making any game engine changes, these will not be accepted without unit tests to cover them.

### Discord Discusson
[Keyteki Discord Server](https://discord.gg/NncEXAs)
