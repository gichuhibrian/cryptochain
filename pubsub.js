const PubNub = require('pubnub');

const credentials = {
    publishKey: 'pub-c-4c0ff8a3-58d3-4bcd-a869-21e2b6a8b7c9',
    subscribeKey: 'sub-c-fd9e8eec-5b71-11ec-b9bb-4ee50875e851',
    secretKey: 'sec-c-YjE3YzBiYzYtYjg0Yy00N2Y3LWFjODYtYzlkMjkxNmMyY2U5'
}

const CHANNELS = {
    TEST: 'TEST'
}

class PubSub {
    constructor() {
        this.pubnub = new PubNub(credentials)

        this.pubnub.subscribe({channels: Object.values(CHANNELS)})

        this.pubnub.addListener(this.listener)
    }

    listener() {
        return {
            message: messageObject => {
                const {channel, message} = messageObject

                console.log(`Message received. Channel: ${channel}. Message: ${message}`)
            }
        }
    }

    publish({ channel, message }) {
      this.pubnub.publish({ channel, message })
    }
}

const testPubSub = new PubSub()
testPubSub.publish({channel: CHANNELS.TEST, message: 'hello pubnub' })
module.exports = PubSub
