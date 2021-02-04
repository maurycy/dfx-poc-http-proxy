// https://gist.github.com/studna/98af3ca1fafedfcebd901c737d1d50f5
const ic = require("@dfinity/agent");
const nacl = require("tweetnacl");

const keyPair = nacl.sign.keyPair();
const canisterId = "vawux-iaaaa-aaaab-aacdq-cai";

global.fetch = require("node-fetch");
global.crypto = require("crypto").webcrypto;

class UserIdentity extends ic.SignIdentity {
  constructor(keyPair) {
    super();
    this.keyPair = keyPair;
  }

  getPublicKey() {
    return {
      toDer: () => Buffer.from(this.keyPair.publicKey).toString(),
    };
  }

  sign(blob) {
    return Buffer.from(nacl.sign.detached(blob, this.keyPair.secretKey));
  }
}

const identity = new UserIdentity(keyPair);

const { HttpAgent } = ic;

// const identity = new ic.AnonymousIdentity();

const agent = new HttpAgent({
  principal: identity.getPrincipal(),
  host: "https://gw.dfinity.network",
});

// agent.addTransform(ic.makeNonceTransform());

// this works
agent.status().then((status) => {
  console.log("status", status);
});

global.ic = {
  ...ic,
  agent,
};

export const createActorInterface = agent.makeActorFactory(({ IDL: e }) => {
  const t = e.Text,
    r = e.Vec(e.Nat8);
  return e.Service({
    retrieve: e.Func([t], [r], ["query"]),
    list: e.Func([], [e.Vec(t)], ["query"]),
    store: e.Func([t, r], [], []),
  });
});
