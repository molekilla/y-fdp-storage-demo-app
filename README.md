## y-fdp-storage demo app

## How to execute demo app

1. Configure environment variables in a .env file and then run fdp-play. If you need a postage stamp, run unit tests found in `y-fdp-storage` and enable postage stamps seed in jest setup.

```yaml
# example
REACT_APP_BEE_URL=http://localhost:1633
REACT_APP_BEE_POSTAGE=1c082c5e642e15d49b6689f5437c2eb9e6aa9c546a8ed1d11d0024b043bca371
```

2. Install demo with `npm i`
3. Run react app with `npm run start`
4. Open `http://localhost:3000` in two different tabs
5. Fill in `Private Key` and `Document Name` value and click Connect
6. Write anything in text editor
7. Wait a few seconds and watch editors being synchronized


## How it works

`y-fdp-storage` uses Yjs as CRDT sync mechanism while storing data in Swarm using a Swarm Sequence Feed. To grab the latest updates, `y-fdp-storage` long-polls `setLastUpdate` on the sequence feeds and auto updates inside a `setInterval` to the swarm feed.

## Requirements

A `fdp-play` environment or a Bee RPC url plus its batch id.

