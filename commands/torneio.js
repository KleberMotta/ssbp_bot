require('dotenv').config();

const ENV = process.env;

module.exports = {
  name: 'torneio',
  description: 'Cria o embed para cadastro no torneio',
  cooldown: 0,
  public: false,
  help: '',
  exemple: '!torneio (Super Torneio Maneiro) <Mensagem do torneio aqui>',
  async execute(message, args, cmd, client, discord) {

    const competidorRole = message.guild.roles.cache.get(`${ENV.COMPETIDOR_ROLE_ID}`);
    const torneioChannel = message.guild.channels.cache.find(c => c.name === '🏆┃torneios');
    const punchEmoji = '👊';

    if (!message.member.roles.cache.has(`${ENV.ADM_ROLE_ID}`)) {
      message.channel.send('Você não tem permissão para usar esse comando');
      return;
    }

    if (args.length > 0 && args[0] === 'help') {
      message.channel.send(this.help);
      return;
    } else if (args.length === 0) {
      message.channel.send('Você esqueceu o nome e a mensagem do torneio');
      return;
    }

    let argumentos = args.join(' ');

    let nomeTorneio = argumentos.substring(
      argumentos.lastIndexOf("(") + 1,
      argumentos.lastIndexOf(")")
    );

    let mensagemTorneio = argumentos.substr(argumentos.lastIndexOf(")") + 2);

    let embed = new discord.MessageEmbed()
      .setColor('#69d8c1')
      .setTitle(`🏆 Inscrições para o torneio - ${nomeTorneio} 🏆`)
      .setDescription(`${mensagemTorneio}\n\n`
        + `${punchEmoji} ➤ Reaja para se inscrever\n\n`
        + `*Qualquer dúvida manda sua pergunta no canal ${torneioChannel}.*\n`);

    let messageEmbed = await message.channel.send(embed);
    messageEmbed.react(punchEmoji);

    try {
      client.on('messageReactionAdd', async (reaction, user) => {

        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();
        if (user.bot) return;
        if (!reaction.message.guild) return;

        if (reaction.message.channel.id === ENV.CARGOS_ID) {
          if (reaction.emoji.name === punchEmoji) {
            message.guild.members.cache.get(user.id).roles.add(competidorRole);
          }
        }

      });
    } catch (err) {
      message.channel.send(`Parece que estou sem alguma permissão, no canal <#${chatChannel.id}>`);
      console.log(`${this.name} command: `, err);
    }

    try {
      client.on('messageReactionRemove', async (reaction, user) => {

        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();
        if (user.bot) return;
        if (!reaction.message.guild) return;

        if (reaction.message.channel.id === ENV.CARGOS_ID) {
          if (reaction.emoji.name === punchEmoji) {
            message.guild.members.cache.get(user.id).roles.remove(competidorRole);
          }
        }

      });
    } catch (err) {
      message.channel.send(`Parece que estou sem alguma permissão, no canal <#${chatChannel.id}>`);
      console.log(`${this.name} command: `, err);
    }

  }
}