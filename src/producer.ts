
import amqp from 'amqplib'
import Message from './models/message'

const getOpenConn = async () => {
  var connectionObject = {
    protocol: 'amqp',
    hostname: 'localhost',
    port: 5672,
    username: 'admin',
    password: 'admin',
    frameMax: 0,
    heartbeat: 1,
    vhost: '/'
  }

  const conn = await amqp.connect(connectionObject)

  return conn
}

const openChannel = async () => {
  var openConn = await getOpenConn()
  var channel = await openConn.createChannel()

  return channel
}

const produceMessages = async () => {
  const channel = await openChannel()

  process.on('exit', (code) => {
    channel.close()
    console.log('Closing rabbitmq channel')
  })

  const data = JSON.stringify(new Message('title', 'text'))

  setInterval(() => {
    channel.sendToQueue('messages', new Buffer(data))
  }, 100)
}

produceMessages()

console.log('test producer running..')
