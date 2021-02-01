"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const child_process_1 = require("child_process");
const util_1 = require("util");
// TODO: one per every domain
const canisterId = `lfvrz-miaaa-aaaab-aaaoa-cai`;
const execAsync = util_1.promisify(child_process_1.exec);
const dfxPath = `/usr/local/bin/dfx`;
const PORT = 7812;
const HOST = `localhost`;
const app = express_1.default();
app.all('*', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const path = req.path.replace(/\/$/, 'index.html').replace(/^\//, '');
        console.log(`incoming request ${req.path}, `);
        const cmd = `${dfxPath} canister --network=ic call ${canisterId} retrieve --output=idl --type=idl '("${path}")'`;
        console.log(`calling ${cmd}`);
        const { stdout } = yield execAsync(cmd);
        console.log(`200`);
        res.status(200).send(stdout);
    }
    catch (err) {
        console.log(err);
        res.status(500);
    }
}));
app.listen(PORT, HOST, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`listen(): ${HOST}:${PORT}`);
}));
