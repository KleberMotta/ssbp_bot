require('dotenv').config();

const ENV = process.env;

module.exports = {
  name: 'cliente',
  description: 'Comando pros clientes pergunterem pros Hosts se alguém quer jogar',
  cooldown: 10,
  async execute(message, args, cmd, client, discord) {

    const ultimateChannel = message.guild.channels.cache.find(c => c.name === '⚪┃ultimate_links');
    const ultimateChat = message.guild.channels.cache.find(c => c.name === '⚪┃ultimate_chat');

    const sm4shChannel = message.guild.channels.cache.find(c => c.name === '🟡┃sm4sh_links');
    const sm4shChat = message.guild.channels.cache.find(c => c.name === '🟡┃sm4sh_chat');

    const fanChannel = message.guild.channels.cache.find(c => c.name === '🟠┃fan_links');
    const fanChat = message.guild.channels.cache.find(c => c.name === '🟠┃fan_chat');

    const brawlChannel = message.guild.channels.cache.find(c => c.name === '🟤┃brawl_links');
    const brawlChat = message.guild.channels.cache.find(c => c.name === '🟤┃brawl_chat');

    const meleeChannel = message.guild.channels.cache.find(c => c.name === '🟣┃melee_links');
    const meleeChat = message.guild.channels.cache.find(c => c.name === '🟣┃melee_chat');

    const s64Channel = message.guild.channels.cache.find(c => c.name === '⚫┃64_links');
    const s64Chat = message.guild.channels.cache.find(c => c.name === '⚫┃64_chat');

    const reactionEmoji = '🦄';

    const jogosMapeados = {
      'ultimate': [ENV.ULTIMATE_CLIENT_ID, ultimateChannel, ultimateChat],
      'sm4sh': [ENV.SM4SH_CLIENT_ID, sm4shChannel, sm4shChat],
      'fan': [ENV.FAN_CLIENT_ID, fanChannel, fanChat],
      'brawl': [ENV.BRAWL_CLIENT_ID, brawlChannel, brawlChat],
      'melee': [ENV.MELEE_CLIENT_ID, meleeChannel, meleeChat],
      '64': [ENV.S64_CLIENT_ID, s64Channel, s64Chat]
    };

    if (args.length === 0) {
      message.channel.send('Opa! Você esqueceu de dizer qual jogo quer jogar. Ex.: !client ultimate');
      return;
    } else if (args.length > 1) {
      message.channel.send('Esse comando não aceita mais de um argumento. Na dúvida use "!client help" pra mais detalhes');
      return;
    } else if (!jogosMapeados[args[0].toLowerCase()]) {
      message.channel.send('Eita, esse jogo não é válido. Escolha um jogo válido: \n'
        + '- ultimate;\n'
        + '- sm4sh;\n'
        + '- fan;\n'
        + '- brawl;\n'
        + '- melee;\n'
        + '- 64;\n'
      );
      return;
    } else if (args[0] === 'help') {
      message.channel.send('O comando !client tem um argumento obrigatório, ex.: !client <nome do jogo>. '
        + 'Pro comando funcionar corretamente você precisa usar um dos nomes de jogos válidos, são eles: \n'
        + '- ultimate;\n'
        + '- sm4sh;\n'
        + '- fan;\n'
        + '- brawl;\n'
        + '- melee;\n'
        + '- 64;\n'
      );
      return;
    }

    const jogo = args[0].toLowerCase();
    const clientId = message.member.user.id;
    const idxMensagem = Math.floor(Math.random() * 5);
    const qtdArgs = args.length;

    let [clientRole, gameChannel, chatChannel] = jogosMapeados[jogo];
    let mensagens = [];

    let msg1 = `O Client <@${clientId}> gostaria de saber se algum Host quer jogar um pouco de ${jogo}. O que acham?\n\n`;
    mensagens.push(msg1);

    const msg2 = `Um tal de <@${clientId}> mandou perguntar se algum ${reactionEmoji} pode hospedar ${jogo}, bora?\n\n`;
    mensagens.push(msg2);

    const msg3 = `Eae pessoal! O <@${clientId}> quer saber se querem jogar um pouco de ${jogo}.\n\n`;
    mensagens.push(msg3);

    const msg4 = `Comunicado! O nobre cliente <@${clientId}> respeitosamente os questiona sobre a possibilidade de hospedarem o ${jogo} pra jogarem. Obrigado pela atenção!\n\n`;
    mensagens.push(msg4);

    const msg5 = `Quem ai quer jogar um pouco de ${jogo} com o <@${clientId}>? Será que rola?\n\n`;
    mensagens.push(msg5);

    let msgFinal = mensagens[idxMensagem];
    msgFinal = (qtdArgs == 2) ? msgFinal + `Link do Parsec ${args[1]}\n` : msgFinal;

    let embed = new discord.MessageEmbed()
      .setColor('#69d8c1')
      .setTitle(`Cliente procurando jogo`)
      .setDescription(msgFinal
        + `${reactionEmoji} ➤  Reaja pros clientes saberem que você quer Hospedar\n\n`
      );

    try {
      let channelMessage = await gameChannel.send(`<@&${clientRole}>`, embed);
      channelMessage.react(reactionEmoji);
      message.delete();
    } catch (err) {
      message.channel.send(`Parece que estou sem alguma permissão, no canal <#${gameChannel.id}>`);
      console.log(`${this.name} command: `, err);
    }

    let usuarioJaReagiu = {};

    try {
      client.on('messageReactionAdd', async (reaction, user) => {

        if (usuarioJaReagiu[user.id]) return;
        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();
        if (user.bot) return;
        if (!reaction.message.guild) return;
        if (clientId === user.id) return;

        usuarioJaReagiu[user.id] = true;

        if (reaction.message.channel.id === gameChannel.id) {
          if (reaction.emoji.name === reactionEmoji) {
            await chatChannel.send(`Alô <@${clientId}>, o host <@${user.id}> quer jogar!`);
          }
        }

      });
    } catch (err) {
      message.channel.send(`Parece que estou sem alguma permissão, no canal <#${chatChannel.id}>`);
      console.log(`${this.name} command: `, err);
    }

  }
}