module.exports = {
  name: 'convite',
  description: 'Exibe o link de convite permanente do server',
  execute(message, args, cmd, client, discord) {
    message.channel.send('Convida os amigos! https://discord.gg/4aS3PbxbU7');
  }
}