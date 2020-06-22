import Message from './models/message'
import { openChannel } from './shared/rabbitConnection'

const consumeMessages = async () => {
  const channel = await openChannel()
  channel.consume('messages', (message) => {
    if (message?.content) {
      channel.ack(message)
      const content = message.content.toString('utf-8')
      const msg:Message = JSON.parse(content)
      console.log('consuming message', msg)
    }
  })
}

consumeMessages()

console.log('this is a test consumer')
