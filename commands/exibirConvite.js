module.exports = {
  name: 'convite',
  description: 'Exibe o link de convite permanente do server',
  cooldown: 5,
  public: true,
  help: 'não tem segredo, apenas digite !convite e veja o convite aparecer :D',
  exemple: '!convite',
  execute(message, args, cmd, client, discord) {

    if (args.length > 0 && args[0] === 'help') {
      message.channel.send(this.help);
      return;
    }

    message.channel.send('Convida os amigos! https://discord.gg/4aS3PbxbU7');
  }
}