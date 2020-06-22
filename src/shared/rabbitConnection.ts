
import amqp from 'amqplib'

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

  await channel.assertExchange(
    'x-messages', 'direct',
    { durable: true })

  await channel.assertQueue(
    'message',
    { durable: true })

  await channel.assertQueue('message')
  await channel.assertExchange('x-messages')
  await channel.bindQueue('message', 'x-messages', 'message')

  process.on('exit', (code) => {
    channel.close()
    console.log('Closing rabbitmq channel')
  })

  return channel
}

export { openChannel }
