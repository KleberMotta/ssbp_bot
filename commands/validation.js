require('dotenv').config();

module.exports = {
  name: 'validation',
  description: 'Ganhar acesso ao servidor',
  cooldown: 0,
  public: false,
  async execute(message, args, cmd, client, discord) {

    if (args.length > 0 && args[0] === 'help') {
      message.channel.send(this.help);
      return;
    }

    const membroEmoji = '👍';

    let embed = new discord.MessageEmbed()
      .setColor('#e42643')
      .setTitle('**REGRAS**')
      .setDescription('> Siga todas as orientações das diretrizes do Discord\n'
        + '> :link: https://discord.com/guidelines\n\n'
        + '**CANAIS DE TEXTO**\n\n'
        + '``Regra #1``\n'
        + '> Não é permitido spam ou flood de qualquer tipo.\n\n'
        + '``Regra #2``\n'
        + '> Não pratique qualquer discurso de ódio.\n\n'
        + '``Regra #3``\n'
        + '> Não diminua ou agrida verbalmente NINGUÉM (Membros, Mods ou Administradores).\n\n'
        + '``Regra #4``\n'
        + '> Sem discussões pessoas em canais de texto, façam isso em DM.\n\n'
        + '``Regra #5``\n'
        + '> É proíbido compartilhar ou discutir qualquer tipo de pirataria em qualquer um dos canais do server.\n\n'
        + '``Regra #6``\n'
        + '> Respeite o nível de habilidade e conheciemento dos membros, não seja escroto.\n\n'
        + '``Regra #7``\n'
        + '> É proibido compartilhar qualquer tipo de conteúdo impróprio, pornografia, apologia a ideologias extremistas e afins, em qualquer canal do server.\n\n'
        + '**CANAIS DE VOZ**\n\n'
        + '``Regra #1``\n'
        + '> Não grite no microfone.\n\n'
        + '``Regra #2``\n'
        + '> Não xingue ninguém.\n\n'
        + '``Regra #3``\n'
        + '> Não saia e entre varias vezes.\n\n'
        + '``Regra #4``\n'
        + '> Evite ficar interrompendo os outros, espere sua vez de falar ou uso um canal de texto.\n\n'
        + '``Regra #5``\n'
        + '> Evite o máximo que puder o Back Seat Gaming, respeite o nível de habilidade dos jogadores.\n\n'
        + '``Regra #6``\n'
        + '> Em partidas competitivas evite ficar falando muito durante as lutas.\n\n'
        + `**QUALQUER** violação das regras citadas acima estão sujeitas a discussão e punição dependendo da sua gravidade!\n\n`
        + 'Reaja com 👍 se leu e compreendeu as regras');

    try {
      let messageEmbed = await message.channel.send(embed);
      messageEmbed.react(membroEmoji);
    } catch (err) {
      console.log(err);
      return;
    }
  }
}