import { createHash } from 'crypto'
import { checkHash, hash } from './helpers'

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
        header:{
            nonce: 0,
            blockHash: hash(JSON.stringify(payload))
        },
        payload
    }
    }


    private get lastBlock (): Block {
        return this.#chain.at(-1) as Block
    }

    private prevBlockHash () {
        return this.lastBlock.header.blockHash
    }

    blockCreate (data: any): Block['payload'] {
        const blockNew = {
            order: this.lastBlock.payload.order + 1,
            timestamp: +new Date(),
            data,
            prevHash: this.prevBlockHash()
        }
        console.log(`Block #${blockNew.order} created: ${JSON.stringify(blockNew)}`)
        return blockNew
    }

    blockMining(block: Block['payload']) {
        let nonce = 0
        const init = +new Date()

        while (true) {
            const blockHash = hash(JSON.stringify(block))
            const powHash =  hash(blockHash + nonce)

            if (checkHash({
                hash: powHash, 
                difficulty: this.difficulty, 
                prefix: this.powPrefix
            })) {
                const final = +new Date()
                const reducedHash = blockHash.slice(0, 12)
                const miningTime = (final - init) / 1000

                console.log(`Block #${block.order} mined in ${miningTime}s. Hash${reducedHash} (${nonce} attempts)`)

                return {
                    minedBlock: {
                        payload: {...block},
                        header: {
                            nonce,
                            blockHash
                        }
                    }
                }
            }
            nonce++
        }
    }

    blockVerify(block: Block): boolean {
        if (block.payload.prevHash != this.prevBlockHash()) {
            console.error(`Invalid block #${block.payload.order}: previous hash: 
            ${this.prevBlockHash().slice(0, 12)} not ${block.payload.prevHash.slice(0, 12)}`)
            return false
        }

        const testHash = hash(hash(JSON.stringify(block.payload)) + block.header.nonce)
        if (!checkHash({hash: testHash, difficulty: this.difficulty, prefix: this.powPrefix})) {
            console.error(`Invalid block #${block.payload.order}: nonce ${block.header.nonce} couldnt be verified`)
            return false
        }
        return true
    }

    blockSend(block: Block): Block[]{
        if (this.blockVerify(block)) {
            this.#chain.push(block)
            console.log(`Block ${block.payload.order} added to blockchain: 
            ${JSON.stringify(block, null, 2)}`)
        }
        return this.#chain
    } 
    
}