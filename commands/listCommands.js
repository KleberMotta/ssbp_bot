module.exports = {
  name: 'comandos',
  description: 'Exibe todos os comandos disponíveis',
  execute(message, args, cmd, client, discord) {

    const channelDuvida = message.guild.channels.cache.find(c => c.name === '🤔┃dúvidas');

    let mensagemComOsComandos = 'Todos os comandos do bot => \n\n';
    let userId = message.member.id;

    for (let command of client.commands) {
      const [name, description] = command;
      mensagemComOsComandos += `${name} ➤ ${description}\n\n`;
    }

    let embed = new discord.MessageEmbed()
      .setColor('#69d8c1')
      .setTitle(`Lista dos comandos`)
      .setDescription(mensagemComOsComandos
        + `Caso tenha dúvidas, mande sua pergunta no canal <#${channelDuvida.id}>\n`
      );

    message.channel.send(`<@${userId}>`, embed);
  }
}