const Block = require('./Block');
const {GENESIS_DATA} = require("./config");

describe('Block', () => {
    const timestamp = 'a-date'
    const lastHash = 'foo-hash'
    const hash = 'bar-hash'
    const data = ['Blockchain', 'crypto chain']
    const block = new Block({
        timestamp, lastHash, hash, data
    })

    it('has a timestamp, lastHash, hash, and data', () => {
        expect(block.timestamp).toEqual(timestamp)
        expect(block.lastHash).toEqual(lastHash)
        expect(block.hash).toEqual(hash)
        expect(block.data).toEqual(data)
    })


    describe('genesis()', () => {
        const genesisBlock = Block.genesis();

        it('returns a block instance', () => {
            expect(genesisBlock instanceof Block).toBe(true)
        })
        it('returns the genesis data', () => {
            expect(genesisBlock).toEqual(GENESIS_DATA)
        })
    })

    describe('mineBlock()', () => {
        const lastBlock = Block.genesis()
        const data = 'mine block'
        const minedBlock = Block.mineBlock({ lastBlock, data })

        it('returns a block instance', () => {
            expect(minedBlock instanceof Block).toBe(true)
        })
        it('sets the `lastHash` to equal the `hash` of previous block', () => {
            expect(minedBlock.lastHash).toEqual(lastBlock.hash)
        })
        it('sets the `data`', () => {
            expect(minedBlock.data).toEqual(data)
        })
        it('sets the `timestamp`', () => {
            expect(minedBlock.timestamp).not.toEqual(undefined)
        })
    })
})
