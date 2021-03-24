module.exports = {
  name: 'twitch',
  description: 'Envia o link do nosso canal oficial da twitch!',
  cooldown: 5,
  public: true,
  help: 'utilize !twitch pra ver o link do nosso canal da twich',
  exemple: '!twitch',
  execute(message, args, cmd, client, discord) {

    if (args.length > 0 && args[0] === 'help') {
      message.channel.send(this.help);
      return;
    }

    message.channel.send('Siga nosso canal oficial na Twitch - https://www.twitch.tv/mrmenta');
  }
}