require('dotenv').config();

const ENV = process.env;

module.exports = {
  name: 'host',
  description: 'Comando pra Host chamar os Clients pra jogar',
  cooldown: 10,
  execute(message, args, cmd, client, discord) {

    const channel = message.guild.channels.cache.find(c => c.name === 'sugestões');
    if (!channel) return message.channel.send('O canal de sugestões ainda não existe');

    const jogosMapeados = {
      'ultimate': ENV.ULTIMATE_CLIENT_ID,
      'sm4sh': ENV.SM4SH_CLIENT_ID,
      'fan': ENV.FAN_CLIENT_ID,
      'brawl': ENV.BRAWL_CLIENT_ID,
      'melee': ENV.MELEE_CLIENT_ID,
      '64': ENV.S64_CLIENT_ID,
    };

    if (!message.member.roles.cache.has(ENV.HOST_ROLE_ID)) {
      message.channel.send('Foi mal, você precisa ter o cargo de Host pra fazer isso');
      return;
    } else if (args.length === 0) {
      message.channel.send('Opa! Você esqueceu de dizer qual jogo quer Hospedar. Ex.: !host Ultimate');
      return;
    } else if (args.length > 2) {
      message.channel.send('Esse comando não aceita mais de dois argumentos. Na dúvida use "!host help" pra mais detalhes');
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
      message.channel.send('Parece que seu link do Parsec está incorreto, dá uma conferida.\nCaso tenha certeza de que o Link está certo avise um ADM');
      return;
    } else if (args[0] === 'help') {
      message.channel.send('O comando !host tem dois argumentos, um obrigatório e outro opcional, respectivamente, ex.: !host <nome do jogo> <link do parsec?>. '
        + 'O primeiro é o nome do jogo e, para o comando funcionar corretamente você precisa usar um dos nomes de jogos válidos, são eles: \n'
        + '- ultimate;\n'
        + '- sm4sh;\n'
        + '- fan;\n'
        + '- brawl;\n'
        + '- melee;\n'
        + '- 64;\n'
        + 'O segundo parâmetro opcional seria o link de host do Parsec. '
        + 'Caso continue com dúvidas peça ajuda no <#798001149047209994> ou <#797997302681436200>.\n'
      );
      return;
    }

    const jogo = args[0].toLowerCase();
    const hostId = message.member.user.id;
    const idxMensagem = Math.floor(Math.random() * 5);
    const qtdArgs = args.length;
    let mensagens = [];

    let msg1 = `<@&${jogosMapeados[jogo]}> \n\n O Host <@${hostId}> tá chamando vocês pra jogar ${jogo}. Bora!\n\n`;
    mensagens.push(msg1);

    const msg2 = `<@&${jogosMapeados[jogo]}> \n\n Um tal de <@${hostId}> os convida pra jogar ${jogo}, que tal?\n\n`;
    mensagens.push(msg2);

    const msg3 = `<@&${jogosMapeados[jogo]}> \n\n Eae pessoal! O <@${hostId}> quer saber se querem jogar um pouco de ${jogo}.\n\n`;
    mensagens.push(msg3);

    const msg4 = `<@&${jogosMapeados[jogo]}> \n\n Atenção! <@${hostId}> está convocando jogadores de ${jogo} para jogar agora!\n\n`;
    mensagens.push(msg4);

    const msg5 = `<@&${jogosMapeados[jogo]}> \n\n Bora jogar ${jogo} com o <@${hostId}>. Ele tá chamando vocês, não demorem!\n\n`;
    mensagens.push(msg5);

    let msgFinal = mensagens[idxMensagem];
    msgFinal = (qtdArgs == 2) ? msgFinal + `Link do Parsec ${args[1]}\n` : msgFinal;

    message.channel.send(msgFinal).then(msg => {
      msg.react('🖥');
      message.delete();
    }).catch((err) => {
      console.log(err);
    });;

  }
}