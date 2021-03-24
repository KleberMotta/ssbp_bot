module.exports = {
  name: 'ping',
  description: 'Comando pra testar se o Bot está funcionando!',
  cooldown: 3,
  public: true,
  help: 'apenas !ping',
  exemple: '!ping',
  execute(message, args, cmd, client, discord) {

    if (args.length > 0 && args[0] === 'help') {
      message.channel.send(this.help);
      return;
    }

    message.channel.send('pong!');
  }
}