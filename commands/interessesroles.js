require('dotenv').config();

const ENV = process.env;

module.exports = {
  name: 'interessesroles',
  description: 'Adicionar um determinado cargo',
  cooldoww: 0,
  public: false,
  async execute(message, args, cmd, client, discord) {

    if (!message.member.roles.cache.has(`${ENV.ADM_ROLE_ID}`)) {
      message.channel.send('Desculpe, você não tem permissão para usar esse comando');
      return;
    }

    // Emojis
    const hostEmoji = '🦄';
    const clientEmoji = '👀';
    const ultimateEmoji = '⚪';
    const sm4shEmoji = '🟡';
    const fanGamesEmoji = '🟠';
    const brawlEmoji = '🟤';
    const meleeEmoji = '🟣'
    const s64Emoji = '⚫';

    // embed code
    let embed = new discord.MessageEmbed()
      .setColor('#69d8c1')
      .setTitle('Cargos de Interesses')
      .setDescription('Reaja para ganhar acesso a canais específicos\n\n'
        + `${hostEmoji} ➤  <@&${ENV.HOST_ROLE_ID}> - Quero hospedar jogos\n\n`
        + `${clientEmoji} ➤  <@&${ENV.CLIENT_ROLE_ID}> - Quero jogar com os hosts\n\n`
        + `${ultimateEmoji} ➤  <@&${ENV.ULTIMATE_ROLE_ID}> - Quero visualizar os canais de Smash Ultimate\n\n`
        + `${sm4shEmoji} ➤  <@&${ENV.SM4SH_ROLE_ID}> - Quero visualizar os canais de Smash for Wii U\n\n`
        + `${fanGamesEmoji} ➤  <@&${ENV.FAN_ROLE_ID}> - Quero visualizar os canais de Fan Games / Smash Like\n\n`
        + `${brawlEmoji} ➤  <@&${ENV.BRAWL_ROLE_ID}> - Quero vizualizar os canais de Brawl\n\n`
        + `${meleeEmoji} ➤  <@&${ENV.MELEE_ROLE_ID}> - Quero vizualizar os canais de Melee\n\n`
        + `${s64Emoji} ➤  <@&${ENV.S64_ROLE_ID}> - Quero vizualizar os canais de Smash 64\n\n`);

    // embed reactions
    let messageEmbed = await message.channel.send(embed);
    messageEmbed.react(hostEmoji);
    messageEmbed.react(clientEmoji);
    messageEmbed.react(ultimateEmoji);
    messageEmbed.react(sm4shEmoji);
    messageEmbed.react(fanGamesEmoji);
    messageEmbed.react(brawlEmoji);
    messageEmbed.react(meleeEmoji);
    messageEmbed.react(s64Emoji);

  }
}