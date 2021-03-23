module.exports = {
  name: 'sugestão',
  description: 'cria uma sugestão',
  execute(message, args, cmd, client, discord) {
    const channel = message.guild.channels.cache.find(c => c.name === '🧠┃sugestões');
    if (!channel) return message.channel.send('O canal de sugestões ainda não existe');

    let messageArgs = args.join(' ');
    if (!messageArgs) return message.channel.send('Sua sugestão não pode ser em branco');

    const embed = new discord.MessageEmbed()
      .setColor('#69d8c1')
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(messageArgs);

    channel.send(embed).then((msg => {
      msg.react('✅');
      msg.react('❌');
      message.delete();
    })).catch((err) => {
      console.log(err);
    });

  }
}