module.exports = {
  name: 'twitch',
  description: 'Envia o link do nosso canal oficial da twitch!',
  execute(message, args, cmd, client, discord) {
    message.channel.send('Siga nosso canal oficial na Twitch - https://www.twitch.tv/mrmenta');
  }
}