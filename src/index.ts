import express from 'express';
import { exec } from 'child_process';
import { promisify } from 'util';

// TODO: one per every domain
const canisterId = `lfvrz-miaaa-aaaab-aaaoa-cai`;

const execAsync = promisify(exec);
const dfxPath = `/usr/local/bin/dfx`;

const PORT = 7812;
const HOST = `localhost`;
const app = express();

app.all('*', async (req, res) => {
    try {
        const path = req.path.replace(/\/$/, 'index.html').replace(/^\//, '');

        console.log(`incoming request ${req.path}, `);

        const cmd = `${dfxPath} canister --network=ic call ${canisterId} retrieve --output=idl --type=idl '("${path}")'`;
        console.log(`calling ${cmd}`);

        const { stdout } = await execAsync(cmd);

        console.log(`200`);

        res.status(200).send(stdout);
    } catch (err) {
        console.log(err);

        res.status(500);
    }
});

app.listen(PORT, HOST, async () => {
   console.log(`listen(): ${HOST}:${PORT}`);
});
