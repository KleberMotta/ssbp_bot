module.exports = {
  name: 'ping',
  description: 'this is a ping command!',
  execute(message, args, cmd, client, discord) {
    message.channel.send('pong!');
  }
}