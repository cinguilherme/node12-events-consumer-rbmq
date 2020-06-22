
import Message from './models/message'
import { openChannel } from './shared/rabbitConnection'

const produceMessages = async () => {
  const channel = await openChannel()

  process.on('exit', (code) => {
    channel.close()
    console.log('Closing rabbitmq channel')
  })

  const data = JSON.stringify(new Message('title', 'text'))

  setInterval(() => {
    channel.sendToQueue('messages', Buffer.from(data, 'utf-8'))
  }, 400)
}

produceMessages()

console.log('test producer running..')
