export interface Block {
    header: {
        nonce: number;
        blockHash: string;
    };
    payload: {
        order: number;
        timestamp: number;
        data: any;
        prevHash: string;
    };
}
export declare class Blockchain {
    #private;
    private readonly difficulty;
    private powPrefix;
    constructor(difficulty?: number);
    private createBlockGenesis;
    get chain(): Block[];
    private get lastBlock();
    private prevBlockHash;
    blockCreate(data: any): Block['payload'];
    blockMining(block: Block['payload']): {
        minedBlock: {
            payload: {
                order: number;
                timestamp: number;
                data: any;
                prevHash: string;
            };
            header: {
                nonce: number;
                blockHash: string;
            };
        };
    };
    blockVerify(block: Block): boolean;
    blockSend(block: Block): Block[];
}
//# sourceMappingURL=blockchain.d.ts.map