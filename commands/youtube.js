module.exports = {
  name: 'youtube',
  description: 'Envia o link do nosso canal oficial do YouTube!',
  execute(message, args, cmd, client, discord) {
    message.channel.send('Siga nosso canal oficial no YouTube - https://www.youtube.com/channel/UClGZGkR5uBDXAlY27OF69SQ');
  }
}