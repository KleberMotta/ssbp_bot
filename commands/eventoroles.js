require('dotenv').config();

const ENV = process.env;

module.exports = {
  name: 'eventoroles',
  description: 'Adicionar cargos de eventos do BOT',
  async execute(message, args, cmd, client, discord) {

    if (!message.member.roles.cache.has(`${ENV.ADM_ROLE_ID}`)) {
      message.channel.send('Desculpe, você não tem permissão para usar esse comando');
      return;
    }

    // Emojis
    const hostEmoji = '🖥';
    const clientEmoji = '👤';

    // embed code
    let embed = new discord.MessageEmbed()
      .setColor('#69d8c1')
      .setTitle('Cargos de Notificações')
      .setDescription('Escolha se quer receber notificações dos Clientes ou dos Hosts, quando estiverem procurando jogo.\n\n'
        + `${hostEmoji} ➤ Quero ser notificado quando algum <@&${ENV.HOST_ROLE_ID}> estiver procurando jogadores. Ex.: <@&${ENV.ULTIMATE_CLIENT_ID}>, <@&${ENV.FAN_CLIENT_ID}> ...\n\n`
        + `${clientEmoji} ➤ Quero ser notificado quando algum <@&${ENV.CLIENT_ROLE_ID}> estiver procurando jogo. Ex.: <@&${ENV.SM4SH_HOST_ID}>, <@&${ENV.MELEE_HOST_ID}> ...\n\n`
        + 'Os cargos de Eventos serão adicionados automaticamente de acordo com seus interesses.\n');

    // embed reactions
    let messageEmbed = await message.channel.send(embed);
    messageEmbed.react(hostEmoji);
    messageEmbed.react(clientEmoji);

  }
}