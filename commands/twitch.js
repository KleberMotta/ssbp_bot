module.exports = {
  name: 'twitch',
  description: 'Envia o link do nosso canal oficial da twitch!',
  execute(message, args, cmd, client, discord) {

    if (message.member.roles.cache.has('798700941784121384')) {
      message.channel.send('Siga nosso canal oficial na Twitch - https://www.twitch.tv/mrmenta');
    } else {
      message.channel.send('Desculpe, você não tem permissão para usar esse comando');
    }

  }
}