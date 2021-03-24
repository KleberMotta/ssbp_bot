module.exports = {
  name: 'youtube',
  description: 'Envia o link do nosso canal oficial do YouTube!',
  cooldown: 5,
  public: true,
  help: 'utilize o comando !youtube para ver o link do nosso canal do YouTube',
  exemple: '!youtube',
  execute(message, args, cmd, client, discord) {

    if (args.length > 0 && args[0] === 'help') {
      message.channel.send(this.help);
      return;
    }

    message.channel.send('Siga nosso canal oficial no YouTube - https://www.youtube.com/channel/UClGZGkR5uBDXAlY27OF69SQ');
  }
}