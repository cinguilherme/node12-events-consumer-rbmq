
import { openChannel } from './shared/rabbitConnection'

const messageProcessor = (message) => {
  if (message?.content) {
    const content = message.content.toString('utf-8')
    const msg = JSON.parse(content)
    console.log('consuming message', msg)
  }
}

const consumeMessages = async () => {
  const channel = await openChannel()

  channel.consume(
    'message',
    (message) => {
      messageProcessor(message)
      channel.ack(message)
    },
    { noAck: false })
}

consumeMessages()

console.log('this is a test consumer')
