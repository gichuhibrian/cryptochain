const Block = require("./block");
const Blockchain = require("./blockchain");

describe('Blockchain', () => {
    let blockchain, newChain, originalChain

    beforeEach(() => {
        blockchain = new Blockchain()
        newChain = new Blockchain()
        originalChain = blockchain.chain
    })

    it('contains a `chain` Array instance', () => {
        expect(blockchain.chain instanceof Array).toBe(true)
    })
    it('starts with the genesis block', () => {
        expect(blockchain.chain[0]).toEqual(Block.genesis())
    })
    it('adds a new block into the chain', () => {
        const newData = 'foo'
        blockchain.addBlock({ data: newData })

        expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(newData)
    })

    describe('isValidChain()', () => {
        describe('when the chain does not start with the genesis block', () => {
            it('returns false', () => {
                blockchain.chain[0] = { data: 'fake-genesis'}

                expect(Blockchain.isValidChain(blockchain.chain)).toBe(false)
            })
        })
        describe('when the chain starts with the genesis block and has multiple blocks', () => {
            beforeEach(() => {
                blockchain.addBlock({ data: 'test1' })
                blockchain.addBlock({ data: 'test2' })
                blockchain.addBlock({ data: 'test3' })
            })

            describe('and a lastHash reference has changed', () => {
                it('returns false', () => {
                    blockchain.chain[2].lastHash = 'broken-hash'
                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false)
                })
            })
            describe('and the chain contains a block with an invalid field', () => {
                it('returns false', () => {
                    blockchain.chain[2].data = 'false-data-in-the-chain'
                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false)
                })
            })
            describe('and the chain does not contain any invalid blocks', () => {
                it('returns true', () => {
                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(true)

                })
            })
        })
    })

    describe('replaceChain()', () => {
        describe('when the new chain is not longer', () => {
            it('does not replace the chain', () => {
                newChain.chain[0] = { new: 'chain'}
                blockchain.replaceChain(newChain.chain)
                expect(blockchain.chain).toEqual(originalChain)
            })
        })
        describe('when the new chain is longer', () => {
            beforeEach(() => {
                newChain.addBlock({ data: 'test1' })
                newChain.addBlock({ data: 'test2' })
                newChain.addBlock({ data: 'test3' })
            })
            describe('when the chain is invalid', () => {
                it('does not replace the chain', () => {
                    newChain.chain[2].hash = 'some-fake-hash'

                    blockchain.replaceChain(newChain.chain)

                    expect(blockchain.chain).toEqual(originalChain)
                })
            })
            describe('when the chain is valid', () => {
                it('replaces the chain', () => {
                    blockchain.replaceChain(newChain.chain)

                    expect(blockchain.chain).toEqual(newChain.chain)
                })
            })
        })
    })
})
