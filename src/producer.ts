
import { Message } from './models/message'
import { openChannel } from './shared/rabbitConnection'

const produceMessages = async () => {
  const channel = await openChannel()

  const data = JSON.stringify(new Message('title', 'text'))

  setInterval(() => {
    console.log('sending message ', data)

    channel.sendToQueue('message', Buffer.from(data, 'utf-8'))
  }, 400)
}

produceMessages()

console.log('test producer running..')
