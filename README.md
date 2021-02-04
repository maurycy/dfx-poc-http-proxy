# dfx-poc-http-proxy

dfx-poc-http-proxy is a (proof of concept of a) HTTP proxy for DFINITY asset canisters.

A DFINITY asset canister is a canister with the following [interface](https://github.com/dfinity/candid/blob/master/spec/Candid.md):

```
 service {
   list: () -> (vec Path) query;
   retrieve: (Path) -> (Contents) query;
   store: (Path, Contents) -> ();
 };
 ```

## Development

```
$ yarn build && sls offline start -s dev
```

Then go to [http://localhost:3000/dev/index.html](http://localhost:3000/dev/index.html)

## Test Any Canister

```
curl -H "Canister-Id: xtjxx-ayaaa-aaaab-aacna-cai" http://localhost:7812/
```
