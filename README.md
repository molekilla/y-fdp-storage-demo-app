## y-fdp-storage demo app


1. `npm i`
2. `npm run start`
3. Open `http://localhost:3000` in two tabs
4. Fill in `Private Key` and `Document Name` value and click connect
5. Write anything in text editor
6. Wait a few seconds and watch editors being synchronized


## How it works

`y-fdp-storage` uses Yjs as CRDT sync mechanism while storing data in Swarm using a Swarm Sequence Feed. To grab the latest updates, `y-fdp-storage` long-polls `setLastUpdate` on the sequence feeds and auto updates inside a `setInterval` to the swarm feed.

## Requirements

A `fdp-play` environment or a Bee RPC url plus its batch id.

