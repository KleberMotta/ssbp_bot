module.exports = {
  name: 'comandos',
  description: 'Exibe todos os comandos disponíveis',
  cooldown: 5,
  public: true,
  help: 'Utilize "!help" sem nenhum argumento e sem espaços para ver a lista de comandos',
  exemple: '!help',
  execute(message, args, cmd, client, discord) {

    if (args.length > 0 && args[0] === 'help') {
      message.channel.send(this.help);
      return;
    }

    const channelDuvida = message.guild.channels.cache.find(c => c.name === '🤔┃dúvidas');
    const channelBot = message.guild.channels.cache.find(c => c.name === '👾┃comandos_bot');

    let mensagemComOsComandos = '__*Cada comando tem um help para maiores detalhes, ex.: !cliente help*__\n\n';
    mensagemComOsComandos += '!<comando> <descrição> <cooldown>\n\n';
    let userId = message.member.id;

    for (let command of client.commands) {
      const [name, atributos] = command;
      const { description, cooldown, public, exemple } = atributos;
      if (!public) continue;
      mensagemComOsComandos += `!${name} ➤ ${description}; cooldown: ${cooldown} segundos.\n`;
      mensagemComOsComandos += `Exemplo: ${exemple}`;
      mensagemComOsComandos += '\n\n';
    }

    let embed = new discord.MessageEmbed()
      .setColor('#69d8c1')
      .setTitle(`Lista de comandos do SSBP Bot`)
      .setDescription(mensagemComOsComandos
        + '**Cooldown** é o tempo mínimo de espera pra repetir um comando\n\n'
        + `Caso tenha dúvidas, dê uma lida no <#${channelBot.id}> ou mande sua pergunta no canal <#${channelDuvida.id}>\n`
      );

    message.channel.send(`<@${userId}>`, embed);
  }
}