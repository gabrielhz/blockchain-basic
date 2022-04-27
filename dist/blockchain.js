"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Blockchain_chain;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blockchain = void 0;
const helpers_1 = require("./helpers");
class Blockchain {
    constructor(difficulty = 4) {
        this.difficulty = difficulty;
        _Blockchain_chain.set(this, []);
        this.powPrefix = '0';
        __classPrivateFieldGet(this, _Blockchain_chain, "f").push(this.createBlockGenesis());
    }
    createBlockGenesis() {
        const payload = {
            order: 0,
            timestamp: +new Date(),
            data: 'Initial Block',
            prevHash: ""
        };
        return {
            header: {
                nonce: 0,
                blockHash: (0, helpers_1.hash)(JSON.stringify(payload))
            },
            payload
        };
    }
    get chain() {
        return __classPrivateFieldGet(this, _Blockchain_chain, "f");
    }
    get lastBlock() {
        return __classPrivateFieldGet(this, _Blockchain_chain, "f").at(-1);
    }
    prevBlockHash() {
        return this.lastBlock.header.blockHash;
    }
    blockCreate(data) {
        const blockNew = {
            order: this.lastBlock.payload.order + 1,
            timestamp: +new Date(),
            data,
            prevHash: this.prevBlockHash()
        };
        console.log(`Block #${blockNew.order} created: ${JSON.stringify(blockNew)}`);
        return blockNew;
    }
    blockMining(block) {
        let nonce = 0;
        const init = +new Date();
        while (true) {
            const blockHash = (0, helpers_1.hash)(JSON.stringify(block));
            const powHash = (0, helpers_1.hash)(blockHash + nonce);
            if ((0, helpers_1.checkHash)({
                hash: powHash,
                difficulty: this.difficulty,
                prefix: this.powPrefix
            })) {
                const final = +new Date();
                const reducedHash = blockHash.slice(0, 12);
                const miningTime = (final - init) / 1000;
                console.log(`Block #${block.order} mined in ${miningTime}s. Hash${reducedHash} (${nonce} attempts)`);
                return {
                    minedBlock: {
                        payload: Object.assign({}, block),
                        header: {
                            nonce,
                            blockHash
                        }
                    }
                };
            }
            nonce++;
        }
    }
    blockVerify(block) {
        if (block.payload.prevHash != this.prevBlockHash()) {
            console.error(`Invalid block #${block.payload.order}: previous hash: 
            ${this.prevBlockHash().slice(0, 12)} not ${block.payload.prevHash.slice(0, 12)}`);
            return false;
        }
        const testHash = (0, helpers_1.hash)((0, helpers_1.hash)(JSON.stringify(block.payload)) + block.header.nonce);
        if (!(0, helpers_1.checkHash)({ hash: testHash, difficulty: this.difficulty, prefix: this.powPrefix })) {
            console.error(`Invalid block #${block.payload.order}: nonce ${block.header.nonce} couldnt be verified`);
            return false;
        }
        return true;
    }
    blockSend(block) {
        if (this.blockVerify(block)) {
            __classPrivateFieldGet(this, _Blockchain_chain, "f").push(block);
            console.log(`Block ${block.payload.order} added to blockchain: 
            ${JSON.stringify(block, null, 2)}`);
        }
        return __classPrivateFieldGet(this, _Blockchain_chain, "f");
    }
}
exports.Blockchain = Blockchain;
_Blockchain_chain = new WeakMap();
//# sourceMappingURL=blockchain.js.map