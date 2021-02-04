import express from 'express';
import { createActorInterface } from './ic';

// TODO: one per every domain
const DEFAULT_CANISTER_ID = `lfvrz-miaaa-aaaab-aaaoa-cai`;

const PORT = 7812;
const HOST = `localhost`;
const app = express();

app.all('*', async (req, res) => {
    try {
        const canisterId = req.header('Canister-Id') ?? DEFAULT_CANISTER_ID;
        const path = req.path.replace(/\/$/, 'index').replace(/^\//, '').concat('.html');

        console.log(`incoming retrieve '${req.path}' from '${canisterId}'`);

        // XXX: pool?
        const actorInterface = createActorInterface({
            canisterId
        });

        console.log("fetching from dfinity network", path);
        const promise = actorInterface.retrieve(path);

        promise.then((dres: any) => {
            const sres = Buffer.from(dres).toString();

            console.log("received response", sres.substring(0, 256));
            // console.log("received response", sres);

            res.status(200).send(sres);
        }).catch((err) => {
            console.log(err);

            res.status(500);
        });
    } catch (err) {
        console.log(err);

        res.status(500);
    }
});

app.listen(PORT, HOST, async () => {
   console.log(`listen(): ${HOST}:${PORT}`);
});
