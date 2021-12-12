const redis = require('redis')

const CHANNELS = {
    TEST: 'TEST'
}

class Pubsubredis {
    constructor() {
        this.publisher = redis.createClient();
        this.subscriber = redis.createClient();

        this.subscriber.subscribe(CHANNELS.TEST)
        this.subscriber.on('message', (channel, message) => this.handleMessage)
    }

    handleMessage(channel, message) {
        console.log(`Message received. Channel: ${channel}. Message: ${message}`)
    }
}

const testPubSub = new Pubsubredis();

setTimeout(() => testPubSub.publisher.publish(CHANNELS.TEST, 'foo'), 1000)
