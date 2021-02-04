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

## Usage

```
$ yarn build
$ yarn start
```

Then go to [https://localhost:7812/](https://localhost:7812/)

## TODO

 * work with any canister, not only with `lfvrz-miaaa-aaaab-aaaoa-cai` (it is hard-coded now)
