export interface Block {
    header:{
        nonce: number
        blockHash: string
    }
    payload:{
        order: number
        timestamp: number
        data: any
        prevHash: string
    }
}

export class Blockchain {
    #chain: Block[] = []
    private powPrefix = '0'

    constructor(private readonly difficulty: number = 4) {
        this.#chain.push(this.createBlockGenesis())
    }
    private createBlockGenesis(): Block {
        const payload: Block['payload'] = {
            order: 0,
            timestamp: +new Date(),
            data: 'Initial Block',
            prevHash: ""
    }

    return {
        header: {
        nonce: 0,
        blockHash:
            }

        }

    }
}