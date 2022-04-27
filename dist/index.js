"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blockchain_1 = require("./blockchain");
const difficulty = Number(process.argv[2]) || 4;
const blockchain = new blockchain_1.Blockchain(difficulty);
const numBlocks = Number(process.argv[3]) || 10;
let chain = blockchain.chain;
for (let i = 1; i <= numBlocks; i++) {
    const block = blockchain.blockCreate(`Block ${i}`);
    const mineInfo = blockchain.blockMining(block);
    chain = blockchain.blockSend(mineInfo.minedBlock);
}
console.log('------ BLOCKCHAIN ------');
console.log(chain);
//# sourceMappingURL=index.js.map