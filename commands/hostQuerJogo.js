require('dotenv').config();

const ENV = process.env;

module.exports = {
  name: 'host',
  description: 'Comando pra Host chamar os Clients pra jogar',
  cooldown: 5,
  public: true,
  help: 'O comando !host tem dois argumentos, um obrigatório e outro opcional, respectivamente, ex.: !host <nome do jogo> <link do parsec?>. '
    + 'O primeiro é o nome do jogo e, para o comando funcionar corretamente você precisa usar um dos nomes de jogos válidos, são eles: \n'
    + '- ultimate;\n'
    + '- sm4sh;\n'
    + '- fan;\n'
    + '- brawl;\n'
    + '- melee;\n'
    + '- 64;\n'
    + 'O segundo parâmetro opcional seria o link de host do Parsec. '
    + 'Caso continue com dúvidas peça ajuda no <#798001149047209994> ou <#797997302681436200>.\n',
  exemple: '!host sm4sh ou !host ultmate <link parsec>',
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

    const reactionEmoji = '👀';

    const jogosMapeados = {
      'ultimate': [ENV.ULTIMATE_CLIENT_ID, ultimateChannel, ultimateChat],
      'sm4sh': [ENV.SM4SH_CLIENT_ID, sm4shChannel, sm4shChat],
      'fan': [ENV.FAN_CLIENT_ID, fanChannel, fanChat],
      'brawl': [ENV.BRAWL_CLIENT_ID, brawlChannel, brawlChat],
      'melee': [ENV.MELEE_CLIENT_ID, meleeChannel, meleeChat],
      '64': [ENV.S64_CLIENT_ID, s64Channel, s64Chat]
    };

    if (!message.member.roles.cache.has(ENV.HOST_ROLE_ID)) {
      message.channel.send('Você precisa ter o cargo de Host pra fazer isso');
      return;
    } else if (args.length === 0) {
      message.channel.send('Opa! Você esqueceu de dizer qual jogo quer Hospedar. Ex.: !host Ultimate');
      return;
    } else if (args[0] === 'help') {
      message.channel.send(this.help);
      return;
    } else if (args.length > 2) {
      message.channel.send('Esse comando não aceita mais de dois argumentos. Na dúvida use "!host help" pra mais detalhes');
      return;
    } else if (args.length > 1 && !(args[1].length >= 56 && args[1].substr(0, 20) === 'https://parsec.gg/g/')) {
      message.channel.send(`Parece que seu link do Parsec está incorreto, dá uma conferida => ${args[1]}`);
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
    } else if (args.length > 1 && !(args[1].length >= 56 && args[1].substr(0, 20) === 'https://parsec.gg/g/')) {
      message.channel.send(`Parece que seu link do Parsec está incorreto, dá uma conferida => ${args[1]}`);
      return;
    }

    const jogo = args[0].toLowerCase();
    const hostId = message.member.user.id;
    const idxMensagem = Math.floor(Math.random() * 5);
    const qtdArgs = args.length;

    let [clientRole, gameChannel, chatChannel] = jogosMapeados[jogo];
    let mensagens = [];

    let msg1 = `O Host <@${hostId}> tá chamando vocês pra jogar ${jogo}. Bora!\n\n`;
    mensagens.push(msg1);

    const msg2 = `Um tal de <@${hostId}> os convida pra jogar ${jogo}, que tal?\n\n`;
    mensagens.push(msg2);

    const msg3 = `Eae pessoal! O <@${hostId}> quer saber se querem jogar um pouco de ${jogo}.\n\n`;
    mensagens.push(msg3);

    const msg4 = `Atenção! <@${hostId}> está convocando jogadores de ${jogo} para jogar agora!\n\n`;
    mensagens.push(msg4);

    const msg5 = `Bora jogar ${jogo} com o <@${hostId}>. Ele tá chamando vocês, não demorem!\n\n`;
    mensagens.push(msg5);

    let msgFinal = mensagens[idxMensagem];
    msgFinal = (qtdArgs == 2) ? msgFinal + `Link do Parsec: ${args[1]}\n\n` : msgFinal;

    let embed = new discord.MessageEmbed()
      .setColor('#69d8c1')
      .setTitle(`Host procurando jogo`)
      .setDescription(msgFinal
        + `${reactionEmoji} ➤  Reaja pro Host saber que você quer jogar\n\n`
      );

    let channelMessage = null;

    try {
      channelMessage = await gameChannel.send(`<@&${clientRole}>`, embed);
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
        if (hostId === user.id) return;

        if (reaction.message.id === channelMessage.id) {
          if (reaction.emoji.name === reactionEmoji) {
            await chatChannel.send(`Alô <@${hostId}>, o cliente <@${user.id}> quer jogar!`);
          }
          usuarioJaReagiu[user.id] = true;
        }

      });
    } catch (err) {
      message.channel.send(`Parece que estou sem alguma permissão, no canal <#${chatChannel.id}>`);
      console.log(`${this.name} command: `, err);
    }

  }
}