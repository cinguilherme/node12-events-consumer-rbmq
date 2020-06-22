
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

  process.on('exit', (code) => {
    channel.close()
    console.log('Closing rabbitmq channel')
  })

  return channel
}

export { openChannel }
