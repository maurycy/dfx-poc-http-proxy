import express from 'express';
import { exec } from 'child_process';
import { promisify } from 'util';
import { createActorInterface } from './ic';

// TODO: one per every domain
const canisterId = `lfvrz-miaaa-aaaab-aaaoa-cai`;

const execAsync = promisify(exec);
const dfxPath = `/usr/local/bin/dfx`;

const PORT = 7812;
const HOST = `localhost`;
const app = express();

app.all('*', async (req, res) => {
    try {
        const path = req.path.replace(/\/$/, 'index').replace(/^\//, '').concat('.html');

        console.log(`incoming request ${req.path}, `);

        // XXX: pool?
        const actorInterface = createActorInterface({
            canisterId,
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
